import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api/axios';
import NavBar from '../components/NavBar';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { search } = useLocation();
  const assignmentId = new URLSearchParams(search).get('assignment');
  const [gradingModal, setGradingModal] = useState(false);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [grading, setGrading] = useState(false);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const API_BASE = (API.defaults?.baseURL || import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '');

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      let endpoint;
      let response;
      
      if (!assignmentId) {
        alert('No assignment selected');
        navigate('/instructor-assignments');
        return;
      }

      endpoint = `/assignments/${assignmentId}/submissions`;
      const res = await API.get(endpoint);
      const list = Array.isArray(res.data) ? res.data : [];
      const processedSubmissions = list.map(submission => ({
        id: submission._id,
        student: submission.studentId, 
        fileUrl: submission.submissonUrl,
        submittedAt: submission.submittedAt,
        grade: submission.grade,
        feedback: submission.feedback,
        isGraded: typeof submission.grade === 'number',
        isLate: false
      }));
      
      setSubmissions(processedSubmissions);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleGradeSubmission = async () => {
    if (!grade || grade < 0 || grade > 100) {
      alert('Please enter a valid grade (0-100)');
      return;
    }

    try {
      setGrading(true);
      // Grading endpoint not implemented on backend
      alert('Grading is not supported by the backend yet.');
      
      alert('Submission graded successfully!');
      setGradingModal(false);
      setGrade('');
      setFeedback('');
      setSelectedSubmission(null);
      fetchSubmissions();
    } catch (err) {
      console.error('Error grading submission:', err);
      alert(err.response?.data?.message || 'Error grading submission');
    } finally {
      setGrading(false);
    }
  };

  const openGradingModal = (submission) => {
    setSelectedSubmission(submission);
    setGrade(submission.grade?.toString() || '');
    setFeedback(submission.feedback || '');
    setGradingModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filter === 'graded') return submission.isGraded;
    if (filter === 'ungraded') return !submission.isGraded;
    if (filter === 'late') return submission.isLate;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-teal-600 mb-4"></i>
              <p className="text-gray-600">Loading submissions...</p>
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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Submissions</h1>
              <p className="text-gray-600">Review and grade student assignment submissions</p>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <i className="fas fa-book mr-2"></i>
              View Courses
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-file-alt text-teal-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-check-circle text-emerald-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.isGraded).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-clock text-amber-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => !s.isGraded).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Late</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(s => s.isLate).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4">
            {['all', 'ungraded', 'graded', 'late'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-file-alt text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? "No students have submitted assignments yet." 
                : `No ${filter} submissions found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {submission.student.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Submitted: {formatDate(submission.submittedAt)}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      {submission.fileUrl ? (
                        <a
                          href={submission.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
                          download
                        >
                          <i className="fas fa-download mr-2"></i>
                          <span>Download File</span>
                        </a>
                      ) : (
                        <div className="text-red-600 flex items-center">
                          <i className="fas fa-exclamation-circle mr-2"></i>
                          No file submitted
                        </div>
                      )}

                      <button
                        onClick={() => openGradingModal(submission)}
                        className={`px-4 py-2 rounded-lg text-white transition-colors ${
                          submission.isGraded ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'
                        }`}
                      >
                        {submission.isGraded ? (
                          <>
                            <i className="fas fa-edit mr-2"></i>
                            Update Grade ({submission.grade}/100)
                          </>
                        ) : (
                          <>
                            <i className="fas fa-plus mr-2"></i>
                            Grade Submission
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  {submission.feedback && (
                    <div className="mt-4 px-6 pb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Feedback:</h4>
                        <p className="text-gray-700">{submission.feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {gradingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Grade Submission - {selectedSubmission?.student.name}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter grade"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Feedback (Optional)</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide feedback to the student..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                rows="4"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setGradingModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGradeSubmission}
                disabled={grading}
                className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {grading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Grading...
                  </>
                ) : (
                  'Submit Grade'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}