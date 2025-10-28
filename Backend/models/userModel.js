const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String",
        required:true
    },
    role:{
        type:"String",
        enum:["Student","Instructor","Admin"],
        default:"Student"
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    bio:{
        type:"String",
        default:""
    },
    profilePicture:{
        type:"String",
        default:""
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User;