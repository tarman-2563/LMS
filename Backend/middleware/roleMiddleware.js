const Course=require("../models/courseModel");

const roleMiddleware=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({message:"Not authorized"});
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden: You don't have enough privileges"});
        }
        next();
    }
}

const canAccessCourse=async(req,res,next)=>{
    const courseId=req.params.id;
    const userId=req.user.id;
    const course=await Course.findById(courseId);
    if(!course){
        return res.status(404).json({message:"Course not found"});
    }
    const isAdmin = req.user.role === "Admin";
    const isInstructor = req.user.role === "Instructor" && course.instructor.toString() === userId.toString();
    const isStudent = req.user.role === "Student" && req.user.enrolledCourses?.includes(courseId.toString());

    if (isAdmin || isInstructor || isStudent) {
      return next();
    }
    return res.status(403).json({message:"Forbidden: You don't have enough privileges to access this course"});
}



module.exports={roleMiddleware,canAccessCourse};
