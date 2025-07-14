import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Filter, 
  Download,
  Search,
  Eye,
  FileText,
  Target,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockResults, mockAnalytics } from '../../data/mockData';

const ResultsAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [results, setResults] = useState(mockResults);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.examTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || result.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Results & Analytics</h1>
          <p className="text-gray-600 mt-1">View and analyze student performance and exam results</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="btn-secondary">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <FileText className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="dashboard-card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Results</p>
              <p className="text-2xl font-bold text-blue-900">{results.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Average Score</p>
              <p className="text-2xl font-bold text-green-900">{mockAnalytics.averageScore}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-purple-50 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Pass Rate</p>
              <p className="text-2xl font-bold text-purple-900">{mockAnalytics.passRate}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-orange-50 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Top Subject</p>
              <p className="text-lg font-bold text-orange-900">{mockAnalytics.topPerformingSubject}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Performance Chart */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 font-poppins mb-6">Subject Performance</h2>
        <div className="space-y-4">
          {mockAnalytics.subjectPerformance.map((subject, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-32 text-sm font-medium text-gray-700">
                {subject.subject}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{subject.studentsCount} students</span>
                  <span className="text-sm font-medium text-gray-900">{subject.averageScore}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${subject.averageScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search results..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="all">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English Language">English Language</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Economics">Economics</option>
        </select>
        <button className="btn-secondary">
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>

      {/* Results Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id}>
                  <td>
                    <div className="font-medium text-gray-900">{result.studentName}</div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium text-gray-900">{result.examTitle}</p>
                      <p className="text-sm text-gray-600">{new Date(result.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td>
                    <span className="font-medium text-gray-900">{result.subject}</span>
                  </td>
                  <td>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{result.score}/{result.totalMarks}</p>
                      <p className="text-sm text-gray-600">{result.percentage}%</p>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{result.timeSpent}m</p>
                      <p className="text-sm text-gray-600">/{result.totalTime}m</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">{result.correctAnswers}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600">{result.wrongAnswers}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 font-poppins mb-6">Weekly Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mockAnalytics.weeklyStats.map((week, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">{week.week}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{week.exams}</p>
                  <p className="text-sm text-gray-600">Exams</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{week.students}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsAnalytics;