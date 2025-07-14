import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  Users,
  Award,
  TrendingUp,
  Printer,
  Mail,
  Share2
} from 'lucide-react';
import { mockAnalytics, mockResults } from '../../data/mockData';

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('performance');
  const [dateRange, setDateRange] = useState('this_month');

  const reportTypes = [
    { id: 'performance', label: 'Performance Report', icon: BarChart3 },
    { id: 'attendance', label: 'Attendance Report', icon: Users },
    { id: 'grades', label: 'Grades Report', icon: Award },
    { id: 'analytics', label: 'Analytics Report', icon: TrendingUp }
  ];

  const generateReport = () => {
    // Generate report logic here
    console.log('Generating report:', selectedReport, dateRange);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and download comprehensive reports</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="btn-secondary">
            <Printer className="w-5 h-5 mr-2" />
            Print
          </button>
          <button className="btn-secondary">
            <Mail className="w-5 h-5 mr-2" />
            Email
          </button>
          <button className="btn-primary" onClick={generateReport}>
            <Download className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-4">Report Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select 
              className="input-field"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              className="input-field"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="this_term">This Term</option>
              <option value="this_year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select className="input-field">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div 
              key={type.id}
              className={`card p-6 cursor-pointer transition-all ${
                selectedReport === type.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedReport(type.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${
                  selectedReport === type.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedReport === type.id 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                }`}></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.label}</h3>
              <p className="text-sm text-gray-600">
                {type.id === 'performance' && 'Student performance and score analysis'}
                {type.id === 'attendance' && 'Exam attendance and participation rates'}
                {type.id === 'grades' && 'Grade distribution and statistics'}
                {type.id === 'analytics' && 'Comprehensive analytics and insights'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Report Preview */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 font-poppins">
            Report Preview - {reportTypes.find(t => t.id === selectedReport)?.label}
          </h2>
          <button className="btn-secondary">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </button>
        </div>

        {selectedReport === 'performance' && (
          <div className="space-y-6">
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Average Score</h3>
                <p className="text-2xl font-bold text-blue-600">{mockAnalytics.averageScore}%</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">Pass Rate</h3>
                <p className="text-2xl font-bold text-green-600">{mockAnalytics.passRate}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900">Total Students</h3>
                <p className="text-2xl font-bold text-purple-600">{mockAnalytics.totalStudents}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-900">Total Exams</h3>
                <p className="text-2xl font-bold text-orange-600">{mockAnalytics.totalExams}</p>
              </div>
            </div>

            {/* Subject Performance */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Subject Performance</h3>
              <div className="space-y-3">
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

            {/* Recent Results */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Recent Results</h3>
              <div className="overflow-x-auto">
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Subject</th>
                      <th>Score</th>
                      <th>Grade</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockResults.slice(0, 5).map((result) => (
                      <tr key={result.id}>
                        <td className="font-medium text-gray-900">{result.studentName}</td>
                        <td>{result.subject}</td>
                        <td>{result.score}/{result.totalMarks}</td>
                        <td>
                          <span className={`status-badge ${
                            result.grade === 'A' ? 'bg-green-100 text-green-800' :
                            result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.grade}
                          </span>
                        </td>
                        <td>{new Date(result.submittedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'attendance' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Report</h3>
              <p className="text-gray-600">Exam attendance and participation statistics will be displayed here.</p>
            </div>
          </div>
        )}

        {selectedReport === 'grades' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Grades Report</h3>
              <p className="text-gray-600">Grade distribution and statistics will be displayed here.</p>
            </div>
          </div>
        )}

        {selectedReport === 'analytics' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Report</h3>
              <p className="text-gray-600">Comprehensive analytics and insights will be displayed here.</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary">
            <FileText className="w-5 h-5 mr-2" />
            Student Report Cards
          </button>
          <button className="btn-secondary">
            <BarChart3 className="w-5 h-5 mr-2" />
            Class Performance
          </button>
          <button className="btn-success">
            <Award className="w-5 h-5 mr-2" />
            Merit Lists
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;