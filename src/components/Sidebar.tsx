import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  School, 
  BookOpen, 
  Users, 
  GraduationCap, 
  FileText, 
  HelpCircle,
  BarChart3,
  Settings,
  User,
  LogOut,
  X,
  PenTool,
  Award,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, setCurrentPage }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' }
    ];

    if (user?.role === 'super_admin') {
      return [
        ...baseItems,
        { id: 'schools', label: 'Schools', icon: School, path: '/dashboard/schools' },
        { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/dashboard/subjects' },
        { id: 'students', label: 'Students', icon: Users, path: '/dashboard/students' },
        { id: 'teachers', label: 'Teachers', icon: GraduationCap, path: '/dashboard/teachers' },
        { id: 'exams', label: 'Exams', icon: FileText, path: '/dashboard/exams' },
        { id: 'questions', label: 'Question Bank', icon: HelpCircle, path: '/dashboard/questions' },
        { id: 'results', label: 'Results & Analytics', icon: BarChart3, path: '/dashboard/results' },
        { id: 'reports', label: 'Reports', icon: FileText, path: '/dashboard/reports' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
        { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
      ];
    }

    if (user?.role === 'school_admin') {
      return [
        ...baseItems,
        { id: 'subjects', label: 'Subjects', icon: BookOpen, path: '/dashboard/subjects' },
        { id: 'students', label: 'Students', icon: Users, path: '/dashboard/students' },
        { id: 'teachers', label: 'Teachers', icon: GraduationCap, path: '/dashboard/teachers' },
        { id: 'exams', label: 'Exams', icon: FileText, path: '/dashboard/exams' },
        { id: 'questions', label: 'Question Bank', icon: HelpCircle, path: '/dashboard/questions' },
        { id: 'results', label: 'Results & Analytics', icon: BarChart3, path: '/dashboard/results' },
        { id: 'reports', label: 'Reports', icon: FileText, path: '/dashboard/reports' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' },
        { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
      ];
    }

    if (user?.role === 'teacher') {
      return [
        ...baseItems,
        { id: 'exams', label: 'My Exams', icon: FileText, path: '/dashboard/exams' },
        { id: 'questions', label: 'Question Bank', icon: HelpCircle, path: '/dashboard/questions' },
        { id: 'students', label: 'My Students', icon: Users, path: '/dashboard/students' },
        { id: 'results', label: 'Results', icon: BarChart3, path: '/dashboard/results' },
        { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
      ];
    }

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { id: 'exams', label: 'My Exams', icon: FileText, path: '/dashboard/exams' },
        { id: 'results', label: 'My Results', icon: Award, path: '/dashboard/results' },
        { id: 'schedule', label: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
        { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
      ];
    }

    return baseItems;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const menuItems = getMenuItems();
  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 dark-sidebar shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="sidebar-header flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-poppins text-white">Cbity</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="sidebar-user-info p-4">
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-gray-300 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-scrollable p-4" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white border-r-4 border-blue-400' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    onClick={() => {
                      setCurrentPage(item.id);
                      onClose();
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:bg-red-900 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;