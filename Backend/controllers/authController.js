const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken=(user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"5d"});
}

const register=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return  res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
            role:role || "Student"
        })
        const token=generateToken(newUser);
        res.status(201).json({message:"User registered successfully",user:newUser,token});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

const login=async(req,res)=>{
    try{
        console.log(req.body);
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=generateToken(user);
        res.status(200).json({message:"Login successful",user,token});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
}

const getProfile=async(req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({user});
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
}

module.exports={
    register,
    login,
    getProfile
}