const express = require('express');
const {createLecture, getLectureById} = require('../controllers/lectureController');
const {protect} = require('../middleware/authMiddleware');
const {roleMiddleware,canAccessCourse} = require('../middleware/roleMiddleware');
const multer = require('multer');

const lectureRouter = express.Router({ mergeParams: true });

const upload = multer({ dest: 'uploads/' });

lectureRouter.post('/lectures', protect, roleMiddleware("Instructor"), upload.single('video'), createLecture);
lectureRouter.get('/:lectureId', protect, canAccessCourse, getLectureById);

module.exports = lectureRouter;