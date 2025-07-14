import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Play,
  Pause,
  FileText,
  Clock,
  Users,
  Target,
  Calendar,
  Award,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockExams } from '../../data/mockData';

const ExamsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [exams, setExams] = useState(mockExams);
  const navigate = useNavigate();

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
  };

  const handleTakeExam = (examId: string) => {
    navigate(`/dashboard/exam/${examId}`);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'mock': return 'bg-purple-100 text-purple-800';
      case 'practice': return 'bg-green-100 text-green-800';
      case 'assessment': return 'bg-blue-100 text-blue-800';
      case 'quiz': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamButtonColor = (subject: string, status: string) => {
    if (status === 'completed') return 'btn-secondary';
    
    switch (subject.toLowerCase()) {
      case 'mathematics': return 'btn-primary';
      case 'english language': return 'btn-success';
      case 'physics': return 'btn-purple';
      case 'chemistry': return 'btn-danger';
      case 'biology': return 'btn-warning';
      case 'economics': return 'btn-indigo';
      case 'geography': return 'btn-pink';
      default: return 'btn-primary';
    }
  };
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Exams Management</h1>
          <p className="text-gray-600 mt-1">Create, schedule, and manage all examinations</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Exam
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="dashboard-card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Exams</p>
              <p className="text-2xl font-bold text-blue-900">{exams.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Exams</p>
              <p className="text-2xl font-bold text-green-900">{exams.filter(e => e.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-purple-50 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Scheduled</p>
              <p className="text-2xl font-bold text-purple-900">{exams.filter(e => e.status === 'scheduled').length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-orange-50 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Completed</p>
              <p className="text-2xl font-bold text-orange-900">{exams.filter(e => e.status === 'completed').length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search exams..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary">
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div key={exam.id} className={`exam-card ${exam.subject.toLowerCase().replace(' ', '_')}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className={`status-badge ${getExamTypeColor(exam.examType)}`}>
                  {exam.examType}
                </span>
                <span className={`status-badge ${getStatusColor(exam.status)}`}>
                  {exam.status}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{exam.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{exam.subject} • {exam.class}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{exam.duration}m</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{exam.totalQuestions} questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{exam.studentsRegistered} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{exam.totalMarks} marks</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{exam.scheduledDate} at {exam.scheduledTime}</span>
              </div>
            </div>
            
            {exam.averageScore > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="text-sm font-medium text-gray-900">{exam.averageScore}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${exam.averageScore}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">By {exam.createdBy}</span>
              <button 
                onClick={() => handleTakeExam(exam.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${getExamButtonColor(exam.subject, exam.status)}`}
              >
                Take Exam
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 font-poppins">Create New Exam</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-6 h-6 transform rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleAddExam} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
                  <input type="text" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="input-field">
                    <option>Mathematics</option>
                    <option>English Language</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Economics</option>
                    <option>Geography</option>
                    <option>History</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select className="input-field">
                    <option>SS3A</option>
                    <option>SS3B</option>
                    <option>SS3C</option>
                    <option>SS2A</option>
                    <option>SS2B</option>
                    <option>SS2C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                  <select className="input-field">
                    <option>mock</option>
                    <option>practice</option>
                    <option>assessment</option>
                    <option>quiz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input type="number" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
                  <input type="number" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                  <input type="number" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score</label>
                  <input type="number" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input type="date" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input type="time" required className="input-field" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea rows={4} className="input-field" placeholder="Enter exam instructions..." />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsManagement;