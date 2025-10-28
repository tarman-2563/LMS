const Submission = require('../models/submissionModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const createSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw"
    })

    const submission = await Submission.create({
      studentId: req.user._id,
      assignmentId,
      submissonUrl: uploadResult.secure_url,
      submittedAt: new Date()
    })

    res.status(201).json({ message: "Submission uploaded successfully", submission });
  } 
  catch (error) {
    res.status(500).json({ message: "Error uploading submission", error: error.message });
  }
}

const getMySubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submission = await Submission.findOne({ studentId: req.user._id, assignmentId });
    res.status(200).json(submission);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await Submission.find({ assignmentId }).populate('studentId', 'name email');
    res.status(200).json(submissions);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    await Submission.findByIdAndDelete(submissionId);
    res.status(200).json({ message: "Submission deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports={
    createSubmission,
    getMySubmission,
    getAllSubmissions,
    deleteSubmission
}
