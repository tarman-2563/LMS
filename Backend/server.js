const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectToDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRouter = require("./routes/courseRoutes");
const lectureRouter = require("./routes/lectureRoutes");
const assignmentRouter = require("./routes/assignmentRoutes");
const submissionRouter = require("./routes/submissionRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-deploy-teal.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

connectToDB();

app.use("/api/auth",authRoutes);
app.use("/api/courses",courseRouter);
app.use('/api/courses/:courseId', lectureRouter);
app.use('/api/courses/:courseId', assignmentRouter);
app.use('/api/assignments/:assignmentId/submissions', submissionRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 3838;

app.get("/health",(req,res)=>{
    res.status(200).send("Server is up and running");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})