const express = require('express');
const { createAssignment, getAssignmentById } = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware, canAccessCourse } = require('../middleware/roleMiddleware');

const assignmentRouter = express.Router({ mergeParams: true });

assignmentRouter.post('/assignments', protect, roleMiddleware("Instructor"), createAssignment);
assignmentRouter.get('/assignments/:assignmentId', protect, canAccessCourse, getAssignmentById);

module.exports = assignmentRouter;
