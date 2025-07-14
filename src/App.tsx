import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ExamInterface from './components/dashboard/ExamInterface';
import FooterPages from './pages/FooterPages';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<FooterPages page="about" />} />
        <Route path="/pricing" element={<FooterPages page="pricing" />} />
        <Route path="/security" element={<FooterPages page="security" />} />
        <Route path="/integrations" element={<FooterPages page="integrations" />} />
        <Route path="/support" element={<FooterPages page="support" />} />
        <Route path="/documentation" element={<FooterPages page="documentation" />} />
        <Route path="/training" element={<FooterPages page="training" />} />
        <Route path="/help-center" element={<FooterPages page="help-center" />} />
        <Route path="/status" element={<FooterPages page="status" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/*"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;