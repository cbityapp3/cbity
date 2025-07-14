import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardHome from '../components/dashboard/DashboardHome';
import SchoolsManagement from '../components/dashboard/SchoolsManagement';
import SubjectsManagement from '../components/dashboard/SubjectsManagement';
import StudentsManagement from '../components/dashboard/StudentsManagement';
import TeachersManagement from '../components/dashboard/TeachersManagement';
import ExamsManagement from '../components/dashboard/ExamsManagement';
import QuestionBank from '../components/dashboard/QuestionBank';
import ResultsAnalytics from '../components/dashboard/ResultsAnalytics';
import ReportsPage from '../components/dashboard/ReportsPage';
import SettingsPage from '../components/dashboard/SettingsPage';
import ProfilePage from '../components/dashboard/ProfilePage';
import StudentSchedule from '../components/dashboard/StudentSchedule';
import ExamInterface from '../components/dashboard/ExamInterface';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/exam/:examId" element={<ExamInterface />} />
            <Route path="/exam/:examId" element={<ExamInterface />} />
            {user.role === 'super_admin' && (
              <>
                <Route path="/schools" element={<SchoolsManagement />} />
                <Route path="/subjects" element={<SubjectsManagement />} />
                <Route path="/students" element={<StudentsManagement />} />
                <Route path="/teachers" element={<TeachersManagement />} />
                <Route path="/exams" element={<ExamsManagement />} />
                <Route path="/questions" element={<QuestionBank />} />
                <Route path="/results" element={<ResultsAnalytics />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </>
            )}
            {(user.role === 'school_admin') && (
              <>
                <Route path="/subjects" element={<SubjectsManagement />} />
                <Route path="/students" element={<StudentsManagement />} />
                <Route path="/teachers" element={<TeachersManagement />} />
                <Route path="/exams" element={<ExamsManagement />} />
                <Route path="/questions" element={<QuestionBank />} />
                <Route path="/results" element={<ResultsAnalytics />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </>
            )}
            {user.role === 'teacher' && (
              <>
                <Route path="/exams" element={<ExamsManagement />} />
                <Route path="/questions" element={<QuestionBank />} />
                <Route path="/students" element={<StudentsManagement />} />
                <Route path="/results" element={<ResultsAnalytics />} />
              </>
            )}
            {user.role === 'student' && (
              <>
                <Route path="/exams" element={<ExamsManagement />} />
                <Route path="/results" element={<ResultsAnalytics />} />
                <Route path="/schedule" element={<StudentSchedule />} />
              </>
            )}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;