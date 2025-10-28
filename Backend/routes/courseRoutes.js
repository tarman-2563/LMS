const express = require('express');
const {getAllCourses,getCourseById,createCourse,updateCourse,deleteCourse,enrollInCourse,getEnrolledCourses} = require('../controllers/courseController');
const {protect} = require('../middleware/authMiddleware');
const {roleMiddleware} = require('../middleware/roleMiddleware');
const contentRoutes = require('./lectureRoutes');

const courseRouter = express.Router();
courseRouter.use('/:courseId', contentRoutes);

courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.post('/', protect,roleMiddleware("Instructor") ,createCourse);
courseRouter.put('/:id', protect,roleMiddleware("Instructor") ,updateCourse);
courseRouter.delete('/:id', protect, roleMiddleware("Admin" , "Instructor") ,deleteCourse);
courseRouter.post('/:id/enroll', protect, roleMiddleware("Student") ,enrollInCourse);
courseRouter.get('/enrolled/user/:userId', protect, roleMiddleware("Student") ,getEnrolledCourses);

module.exports = courseRouter; 

