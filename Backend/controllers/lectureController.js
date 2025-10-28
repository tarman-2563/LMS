const Lecture = require('../models/lectureModel');
const Course = require('../models/courseModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const createLecture = async (req, res) => {
  try {
    const { title, notes, duration } = req.body;
    const courseId = req.params.courseId;
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',
      folder: 'lectures',
    })

    const newLecture = await Lecture.create({
      title,
      videoUrl: uploadResult.secure_url,
      notes,
      duration,
      courseId,
    })

    await Course.findByIdAndUpdate(courseId, {
      $push: { lectures: newLecture._id },
    })

    res.status(201).json({
      message: 'Lecture uploaded successfully',
      lecture: newLecture,
    })
 } 
 catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}


const getLectureById = async (req, res) => {
  try {
    const lectureId = req.params.lectureId;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });
    res.status(200).json(lecture);
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

module.exports = {
  createLecture,
  getLectureById
}
