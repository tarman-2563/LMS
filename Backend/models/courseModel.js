const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:String,
    description:String,
    category:String,
    price:Number,
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    lectures:[{
        title:String,
        videoUrl:String,
        notes:String
    }],
    assignments:[{
        title:String,
        description:String,
        dueDate:Date
    }]
})

const Course = mongoose.model("Course",courseSchema);
module.exports = Course;