import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail(){
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lectures');

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);
      setLectures(res.data.lectures || []);
    } 
    catch(err){ 
      console.error(err); 
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ fetch(); },[id])


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-teal-600 mb-4"></i>
              <p className="text-gray-600">Loading course...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/courses" 
          className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back to courses
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{course?.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <i className="fas fa-user mr-2"></i>
                  <span>Instructor: {course?.instructor?.name}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0 lg:ml-8"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('lectures')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lectures'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-play mr-2"></i>
                Lectures ({lectures.length})
              </button>
              
              {user?.role === 'Instructor' && (
                <button
                  onClick={() => setActiveTab('instructor')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'instructor'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <i className="fas fa-cog mr-2"></i>
                  Instructor Tools
                </button>
              )}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'lectures' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Lectures</h3>
                {lectures.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-video text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600">No lectures available yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lectures.map((lecture, index) => (
                      <div key={lecture._id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                                {index + 1}
                              </span>
                              <h4 className="text-lg font-medium text-gray-900">{lecture.title}</h4>
                            </div>
                            <p className="text-gray-600 mb-4">{lecture.notes}</p>
                            {lecture.videoUrl && (
                              <div className="bg-black rounded-lg overflow-hidden">
                                <video 
                                  width="100%" 
                                  controls 
                                  className="w-full"
                                  src={lecture.videoUrl}
                                >
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'instructor' && user?.role === 'Instructor' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to={`/upload-lecture/${id}`}
                    className="bg-teal-600 hover:bg-teal-700 text-white p-6 rounded-lg text-center transition-colors"
                  >
                    <i className="fas fa-upload text-3xl mb-3"></i>
                    <h4 className="font-medium">Upload Lecture</h4>
                    <p className="text-sm opacity-90">Add new video content</p>
                  </Link>
                  <Link
                    to={`/create-assignment/${id}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-6 rounded-lg text-center transition-colors"
                  >
                    <i className="fas fa-tasks text-3xl mb-3"></i>
                    <h4 className="font-medium">Create Assignment</h4>
                    <p className="text-sm opacity-90">Add new assignments</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}