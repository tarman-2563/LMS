import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

export default function InstructorCourses(){
  const [courses,setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await API.get('/courses');
      const all = Array.isArray(res.data) ? res.data : (res.data.courses || []);
      setCourses(all);
    } 
    catch(err){
      console.error(err);
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ fetch(); },[]);

  if(loading) return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-teal-600 mb-4"></i>
            <p className="text-gray-600">Loading your courses...</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Courses you have created</p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-book text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses created yet</h3>
            <p className="text-gray-600 mb-6">Create a course to start teaching.</p>
            <Link to="/create-course" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <i className="fas fa-plus mr-2"></i>Create Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <i className="fas fa-chalkboard-teacher text-6xl text-white opacity-80"></i>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                    
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded-full">{course.category || 'Programming'}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">{course.level || 'Beginner'}</span>
                  </div>

                  

                  <div className="flex gap-2">
                    <Link to={`/courses/${course._id}`} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      <i className="fas fa-eye mr-2"></i>View
                    </Link>
                    <Link to={`/create-course?id=${course._id}`} className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      <i className="fas fa-edit mr-1"></i>Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}