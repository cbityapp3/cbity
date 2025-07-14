import React from 'react';
import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Award, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import DatabaseToggle from './DatabaseToggle';
import type { User, Exam } from '../../lib/supabase';

const DashboardHome: React.FC = () => {
  const { user, useDatabase } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    activeExams: 0,
    averageScore: 0
  });
  const [recentExams, setRecentExams] = useState<Exam[]>([]);
  const [topStudents, setTopStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.setUseDatabase(useDatabase);
    loadDashboardData();
  }, [useDatabase]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load basic stats
      const [students, teachers, exams] = await Promise.all([
        dataService.getUsers('student', user?.school_id),
        dataService.getUsers('teacher', user?.school_id),
        dataService.getExams(user?.school_id)
      ]);

      setStats({
        totalStudents: students.length,
        totalTeachers: teachers.length,
        activeExams: exams.filter(e => e.status === 'active').length,
        averageScore: 73.5 // This would be calculated from actual results
      });

      setRecentExams(exams.slice(0, 5));
      setTopStudents(students.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  const statsCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers.toString(),
      icon: BookOpen,
      color: 'green',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Active Exams',
      value: stats.activeExams.toString(),
      icon: FileText,
      color: 'purple',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: TrendingUp,
      color: 'orange',
      change: '+3%',
      trend: 'up'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-center py-12">
          <div className="loading-spinner"></div>
          <span className="ml-3 text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Database Toggle - Only for Super Admins */}
      <DatabaseToggle />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.name}! Here's what's happening in your CBT system.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary">
            <FileText className="w-5 h-5 mr-2" />
            Create New Exam
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="dashboard-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Exams */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Recent Exams</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    exam.status === 'active' ? 'bg-green-500' : 
                    exam.status === 'scheduled' ? 'bg-blue-500' : 
                    'bg-gray-500'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.subject?.name || 'Unknown Subject'} • {exam.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{exam.students_registered || 0} students</p>
                  <p className="text-xs text-gray-600">{exam.scheduledDate}</p>
                </div>
              </div>
            ))}
            {recentExams.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No exams found</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Students */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-poppins">Top Students</h2>
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topStudents.map((student, index) => (
              <div key={student.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.class || 'No class assigned'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">---%</p>
                  <p className="text-xs text-gray-500">-- exams</p>
                </div>
              </div>
            ))}
            {topStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No students found</p>
              </div>
            )}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins mb-6">Subject Performance</h2>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', averageScore: 78 },
              { subject: 'English Language', averageScore: 82 },
              { subject: 'Physics', averageScore: 69 },
              { subject: 'Chemistry', averageScore: 71 },
              { subject: 'Biology', averageScore: 76 }
            ].map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
                  <span className="text-sm text-gray-600">{subject.averageScore}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${subject.averageScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins mb-6">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">New exam created</p>
                <p className="text-xs text-gray-500">Mathematics Mock Test</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Students registered</p>
                <p className="text-xs text-gray-500">{stats.totalStudents} total students</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Exam reminder</p>
                <p className="text-xs text-gray-500">{useDatabase ? 'Database connected' : 'Demo mode active'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-primary text-sm py-2 px-3">
              <FileText className="w-4 h-4 mr-1" />
              New Exam
            </button>
            <button className="btn-secondary text-sm py-2 px-3">
              <Users className="w-4 h-4 mr-1" />
              Add Student
            </button>
            <button className="btn-success text-sm py-2 px-3">
              <BookOpen className="w-4 h-4 mr-1" />
              New Subject
            </button>
            <button className="btn-warning text-sm py-2 px-3">
              <TrendingUp className="w-4 h-4 mr-1" />
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;