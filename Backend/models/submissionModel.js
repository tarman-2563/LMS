const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    assignmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment"
    },
    submissonUrl:{
        type:"String",
        required:true
    },
    submittedAt:{
        type:Date
    }
})

const Submission = mongoose.model("Submission",submissionSchema);
module.exports = Submission;