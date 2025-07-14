import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  GraduationCap,
  Award,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';
import { mockTeachers } from '../../data/mockData';

const TeachersManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [teachers, setTeachers] = useState(mockTeachers);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Teachers Management</h1>
          <p className="text-gray-600 mt-1">Manage all teaching staff and their assignments</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary mt-4 sm:mt-0"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Teacher
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="dashboard-card bg-blue-50 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Teachers</p>
              <p className="text-2xl font-bold text-blue-900">{teachers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-green-50 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Teachers</p>
              <p className="text-2xl font-bold text-green-900">{teachers.filter(t => t.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-purple-50 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Students</p>
              <p className="text-2xl font-bold text-purple-900">{teachers.reduce((acc, teacher) => acc + teacher.studentsCount, 0)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="dashboard-card bg-orange-50 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Exams Created</p>
              <p className="text-2xl font-bold text-orange-900">{teachers.reduce((acc, teacher) => acc + teacher.examsCreated, 0)}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
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
            placeholder="Search teachers..."
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

      {/* Teachers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Employee ID</th>
                <th>Subjects</th>
                <th>Experience</th>
                <th>Students</th>
                <th>Exams Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={teacher.avatar} 
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{teacher.name}</p>
                        <p className="text-sm text-gray-600">{teacher.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-mono font-medium text-blue-600">{teacher.employeeId}</span>
                  </td>
                  <td>
                    <div className="space-y-1">
                      {teacher.subjects.map((subject, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium text-gray-900">{teacher.experience}</p>
                      <p className="text-sm text-gray-600">{teacher.qualification}</p>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{teacher.studentsCount}</p>
                      <p className="text-xs text-gray-500">{teacher.classesAssigned.length} classes</p>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{teacher.examsCreated}</p>
                      <p className="text-xs text-gray-500">this term</p>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${teacher.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 font-poppins">Add New Teacher</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-6 h-6 transform rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleAddTeacher} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input type="text" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select className="input-field">
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>Languages</option>
                    <option>Social Sciences</option>
                    <option>Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input type="text" placeholder="e.g., 5 years" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                  <input type="text" placeholder="e.g., M.Sc Mathematics" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input type="text" className="input-field" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Geography', 'History'].map((subject) => (
                    <label key={subject} className="flex items-center space-x-2">
                      <input type="checkbox" className="text-blue-600 rounded" />
                      <span className="text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Classes Assigned</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {['SS3A', 'SS3B', 'SS3C', 'SS2A', 'SS2B', 'SS2C', 'SS1A', 'SS1B', 'SS1C'].map((className) => (
                    <label key={className} className="flex items-center space-x-2">
                      <input type="checkbox" className="text-blue-600 rounded" />
                      <span className="text-sm text-gray-700">{className}</span>
                    </label>
                  ))}
                </div>
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
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersManagement;