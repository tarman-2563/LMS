const User = require('../models/userModel');
const Submission = require('../models/submissionModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const validRoles = ['Student', 'Instructor', 'Admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Choose from Student, Instructor, or Admin.' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('studentId', 'name email role')
      .populate('assignmentId', 'title');
    res.status(200).json({ submissions });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
}

module.exports={
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllSubmissions
}