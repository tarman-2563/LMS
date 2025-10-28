const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title:{
        type:"String",
        required:true
    },
    description:{
        type:"String",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    deadline:{
        type:Date,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    }
})

const Assignment = mongoose.model("Assignment",assignmentSchema);
module.exports = Assignment;