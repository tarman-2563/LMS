const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    title:{
        type:"String",
        required:true
    },
    videoUrl:{
        type:"String",
        required:true
    },
    notes:{
        type:"String",
        default:""
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    duration:{
        type:Number,
        default:0
    }
})

const Lecture = mongoose.model("Lecture",lectureSchema);
module.exports = Lecture;