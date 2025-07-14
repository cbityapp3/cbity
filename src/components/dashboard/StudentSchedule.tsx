import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, MapPin, Bell, Filter } from 'lucide-react';

const StudentSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduleData = [
    {
      id: '1',
      title: 'Mathematics Mock Exam',
      subject: 'Mathematics',
      type: 'exam',
      date: '2024-11-25',
      time: '09:00',
      duration: 180,
      location: 'Computer Lab A',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Physics Practical Test',
      subject: 'Physics',
      type: 'exam',
      date: '2024-11-22',
      time: '11:00',
      duration: 90,
      location: 'Physics Lab',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'English Language Practice',
      subject: 'English Language',
      type: 'practice',
      date: '2024-11-20',
      time: '14:00',
      duration: 120,
      location: 'Computer Lab B',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Chemistry Quiz',
      subject: 'Chemistry',
      type: 'quiz',
      date: '2024-11-28',
      time: '10:30',
      duration: 60,
      location: 'Computer Lab A',
      status: 'upcoming'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800';
      case 'practice': return 'bg-green-100 text-green-800';
      case 'quiz': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">My Schedule</h1>
          <p className="text-gray-600 mt-1">View your upcoming exams and practice sessions</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
          <button className="btn-primary">
            <Bell className="w-5 h-5 mr-2" />
            Set Reminders
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-4">Calendar View</h2>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + i);
            const dateStr = date.toISOString().split('T')[0];
            const hasEvent = scheduleData.some(item => item.date === dateStr);
            
            return (
              <div
                key={i}
                className={`p-2 text-center cursor-pointer transition-colors ${
                  dateStr === selectedDate
                    ? 'bg-blue-600 text-white'
                    : hasEvent
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDate(dateStr)}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Schedule List */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {scheduleData.map((item) => (
            <div key={item.id} className="border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <span className={`status-badge ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                    <span className={`status-badge ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{item.subject}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{item.time} ({item.duration} min)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  {item.status === 'upcoming' && (
                    <button className="btn-primary text-sm">
                      Set Reminder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dashboard-card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Upcoming Exams</p>
              <p className="text-2xl font-bold text-blue-900">
                {scheduleData.filter(item => item.status === 'upcoming' && item.type === 'exam').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Practice Sessions</p>
              <p className="text-2xl font-bold text-green-900">
                {scheduleData.filter(item => item.type === 'practice').length}
              </p>
            </div>
            <div className="p-3 bg-green-100">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="dashboard-card bg-purple-50 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">This Week</p>
              <p className="text-2xl font-bold text-purple-900">
                {scheduleData.filter(item => {
                  const itemDate = new Date(item.date);
                  const now = new Date();
                  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                  return itemDate >= now && itemDate <= weekFromNow;
                }).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;