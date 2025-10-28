const express = require("express");
const {register,login,getProfile} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/profile",protect,getProfile);

module.exports = authRouter;