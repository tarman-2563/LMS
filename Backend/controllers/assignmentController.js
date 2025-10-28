const Assignment = require('../models/assignmentModel');
const Course = require('../models/courseModel');

const createAssignment = async (req, res) => {
  try {
    const { title, description, deadline, totalMarks } = req.body;
    const { courseId } = req.params;

    const assignment = await Assignment.create({
      title,
      description,
      deadline,
      totalMarks,
      courseId
    })
    await Course.findByIdAndUpdate(courseId, { $push: { assignments: assignment._id } });
    res.status(201).json({ message: "Assignment created successfully", assignment });
  } 
  catch (error) {
    res.status(500).json({ message: "Error creating assignment", error: error.message });
  }

}

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId).populate('courseId', 'title');

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    res.status(200).json(assignment);
  } 

  catch (error) {
    res.status(500).json({ message: "Error fetching assignment", error: error.message });
  }

}

module.exports={
    createAssignment,
    getAssignmentById
}


