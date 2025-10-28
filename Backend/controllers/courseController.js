const express = require('express');
const Course = require('../models/courseModel');
const User = require('../models/userModel');

const getAllCourses=async(req,res)=>{
    try {
     const courses = await Course.find().populate('instructor', 'name email');
     res.status(200).json(courses);
    } 
    catch (error) {
     res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
}

const getCourseById=async(req,res)=>{
    try {
     const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email')
      .populate({
        path: 'lectures',
        select: 'title videoUrl notes',
      })
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json(course);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
}

const createCourse=async(req,res)=>{
    try{
        const {title,description,category,price,instructor,lectures,assignments}=req.body;
        const instructorUser = await User.findById(instructor);
        if (!instructorUser || (instructorUser.role !== 'Instructor')) {
          return res.status(403).json({ message: 'Only instructors can create courses' });
        }
        const newCourse=await Course.create({
            title,
            description,
            category,
            price,
            instructor,
            lectures,
            assignments
        });
        res.status(201).json({message:"Course created successfully",course:newCourse});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

const updateCourse=async(req,res)=>{
    try{
        const courseId=req.params.id;
        const updates=req.body;
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        if(course.instructor.toString()!==req.user.id && req.user.role!=="Admin"){
            return res.status(403).json({message:"You are not authorized to update this course"});
        }
        const updatedCourse=await Course.findByIdAndUpdate(courseId,updates,{new:true});
        res.status(200).json({message:"Course updated successfully",course:updatedCourse});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

const deleteCourse=async(req,res)=>{
    try{
        const courseId=req.params.id;
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        if(course.instructor.toString()!==req.user.id && req.user.role!=="Admin"){
            return res.status(403).json({message:"You are not authorized to delete this course"});
        }
        await Course.findByIdAndDelete(courseId);
        res.status(200).json({message:"Course deleted successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

const enrollInCourse=async(req,res)=>{
    try{
        const courseId=req.params.id;
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(user.enrolledCourses.includes(courseId)){
            return res.status(400).json({message:"Already enrolled in this course"});
        }
        user.enrolledCourses.push(courseId);
        await user.save();
        res.status(200).json({message:"Enrolled in course successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

const getEnrolledCourses=async(req,res)=>{
    try{
        const userId=req.params.userId;
        if(req.user.id!==userId && req.user.role!=="Admin"){
            return res.status(403).json({message:"You are not authorized to view these courses"});
        }
        const user=await User.findById(userId).populate({
            path:'enrolledCourses',
            populate:{path:'instructor',select:'name email'}
        });
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({enrolledCourses:user.enrolledCourses});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

module.exports={
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    getEnrolledCourses
}