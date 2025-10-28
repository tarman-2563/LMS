const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const {getAllUsers,updateUserRole,deleteUser,getAllSubmissions} = require('../controllers/adminController');

const adminRouter = express.Router();

adminRouter.use(protect, roleMiddleware('Admin'));
adminRouter.get('/users', getAllUsers);
adminRouter.put('/users/:userId/role', updateUserRole);
adminRouter.delete('/users/:userId', deleteUser);
adminRouter.get('/submissions', getAllSubmissions);

module.exports = adminRouter;
