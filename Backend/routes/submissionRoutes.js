const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const multer = require('multer');
const {createSubmission,getMySubmission,getAllSubmissions,deleteSubmission} = require('../controllers/submissionController');

const submissionRouter = express.Router({ mergeParams: true });
const upload = multer({ dest: 'uploads/' });

submissionRouter.post('/', protect, roleMiddleware("Student"), upload.single('file'), createSubmission);
submissionRouter.get('/my', protect, roleMiddleware("Student"), getMySubmission);
submissionRouter.get('/', protect, roleMiddleware("Instructor"), getAllSubmissions);
submissionRouter.delete('/:submissionId', protect, roleMiddleware("Instructor"), deleteSubmission);

module.exports = submissionRouter;
