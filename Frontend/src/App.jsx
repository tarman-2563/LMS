import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import InstructorCourses from './pages/InstructorCourses';
import Submissions from './pages/Submissions';
import Profile from './pages/Profile';
import CourseDetail from './pages/CourseDetail';
import CreateCourse from './pages/CreateCourse';
import UploadLecture from './pages/UploadLecture';
import CreateAssignment from './pages/CreateAssignment';
import SubmitAssignment from './pages/SubmitAssignment';
import AdminPanel from './pages/AdminPanel';

const PrivateRoute = ({ children, roles = [] }) => {
  const { user } = useAuth();
  if(!user) return <Navigate to="/login" />;
  if(roles.length && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<PrivateRoute><Courses/></PrivateRoute>} />
          <Route path="/courses" element={<PrivateRoute><Courses/></PrivateRoute>} />
          <Route path="/my-courses" element={<PrivateRoute roles={['Student']}><MyCourses/></PrivateRoute>} />
          <Route path="/instructor-courses" element={<PrivateRoute roles={['Instructor']}><InstructorCourses/></PrivateRoute>} />
          <Route path="/submissions" element={<PrivateRoute roles={['Instructor']}><Submissions/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="/courses/:id" element={<PrivateRoute><CourseDetail/></PrivateRoute>} />
          <Route path="/create-course" element={<PrivateRoute roles={['Instructor']}><CreateCourse/></PrivateRoute>} />
          <Route path="/upload-lecture/:courseId" element={<PrivateRoute roles={['Instructor']}><UploadLecture/></PrivateRoute>} />
          <Route path="/create-assignment/:courseId" element={<PrivateRoute roles={['Instructor']}><CreateAssignment/></PrivateRoute>} />
          <Route path="/submit-assignment/:assignmentId" element={<PrivateRoute roles={['Student']}><SubmitAssignment/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute roles={['Admin']}><AdminPanel/></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}