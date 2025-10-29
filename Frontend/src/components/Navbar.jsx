import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout(); 
      nav('/login');
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-gray-900">EduNexus</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/courses" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <i className="fas fa-book mr-2"></i>Courses
              </Link>
              {user?.role === 'Student' && (
                <Link to="/my-courses" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <i className="fas fa-graduation-cap mr-2"></i>My Courses
                </Link>
              )}
              {user?.role === 'Instructor' && (
                <>
                  <Link to="/instructor-courses" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <i className="fas fa-book-open mr-2"></i>My Courses
                  </Link>
                  <Link to="/create-course" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <i className="fas fa-plus mr-2"></i>Create Course
                  </Link>
                </>
              )}
              {user?.role === 'Admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <i className="fas fa-cog mr-2"></i>Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-teal-600 text-sm"></i>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}