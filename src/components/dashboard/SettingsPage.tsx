import React, { useState } from 'react';
import { 
  Settings,
  School,
  Shield,
  Bell,
  User,
  Save,
  Upload,
  Globe,
  Clock,
  FileText,
  Users
} from 'lucide-react';
import { mockSettings } from '../../data/mockData';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('school');
  const [settings, setSettings] = useState(mockSettings);

  const tabs = [
    { id: 'school', label: 'School Info', icon: School },
    { id: 'exam', label: 'Exam Settings', icon: FileText },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users }
  ];

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Show success message
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your system configuration and preferences</p>
        </div>
        <button onClick={handleSave} className="btn-primary mt-4 sm:mt-0">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'school' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-6">School Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={settings.school.logo} 
                    alt="School Logo"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <button className="btn-secondary">
                      <Upload className="w-5 h-5 mr-2" />
                      Change Logo
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Recommended size: 512x512 pixels</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={settings.school.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        school: { ...settings.school, name: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="input-field" 
                      value={settings.school.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        school: { ...settings.school, email: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="input-field" 
                      value={settings.school.phone}
                      onChange={(e) => setSettings({
                        ...settings,
                        school: { ...settings.school, phone: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input 
                      type="url" 
                      className="input-field" 
                      value={settings.school.website}
                      onChange={(e) => setSettings({
                        ...settings,
                        school: { ...settings.school, website: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Established</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={settings.school.established}
                      onChange={(e) => setSettings({
                        ...settings,
                        school: { ...settings.school, established: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Motto</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      value={settings.school.motto}
                      onChange={(e) => setSettings({
                        ...settings,
                        school: { ...settings.school, motto: e.target.value }
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea 
                    rows={3} 
                    className="input-field" 
                    value={settings.school.address}
                    onChange={(e) => setSettings({
                      ...settings,
                      school: { ...settings.school, address: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exam' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-6">Exam Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Duration (minutes)</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      value={settings.exam.defaultDuration}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, defaultDuration: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Warning Time (minutes)</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      value={settings.exam.warningTime}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, warningTime: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Attempts</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      value={settings.exam.maxAttempts}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, maxAttempts: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Show Results</label>
                    <select 
                      className="input-field"
                      value={settings.exam.showResults}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, showResults: e.target.value }
                      })}
                    >
                      <option value="immediate">Immediate</option>
                      <option value="after_exam">After Exam</option>
                      <option value="manual">Manual Release</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="autoSubmit"
                      checked={settings.exam.autoSubmit}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, autoSubmit: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="autoSubmit" className="text-sm font-medium text-gray-700">
                      Auto-submit exams when time expires
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="randomizeQuestions"
                      checked={settings.exam.randomizeQuestions}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, randomizeQuestions: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="randomizeQuestions" className="text-sm font-medium text-gray-700">
                      Randomize question order
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="allowReview"
                      checked={settings.exam.allowReview}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, allowReview: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="allowReview" className="text-sm font-medium text-gray-700">
                      Allow question review before submission
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="proctoring"
                      checked={settings.exam.proctoring}
                      onChange={(e) => setSettings({
                        ...settings,
                        exam: { ...settings.exam, proctoring: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="proctoring" className="text-sm font-medium text-gray-700">
                      Enable proctoring features
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      value={settings.security.sessionTimeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      value={settings.security.passwordExpiry}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="deviceTracking"
                      checked={settings.security.deviceTracking}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, deviceTracking: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="deviceTracking" className="text-sm font-medium text-gray-700">
                      Enable device tracking
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="ipRestriction"
                      checked={settings.security.ipRestriction}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, ipRestriction: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="ipRestriction" className="text-sm font-medium text-gray-700">
                      Restrict access by IP address
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="twoFactorAuth"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="twoFactorAuth" className="text-sm font-medium text-gray-700">
                      Enable two-factor authentication
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-6">Notification Settings</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="emailNotifications"
                      checked={settings.notification.emailNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notification: { ...settings.notification, emailNotifications: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="smsNotifications"
                      checked={settings.notification.smsNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notification: { ...settings.notification, smsNotifications: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-700">
                      SMS notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="pushNotifications"
                      checked={settings.notification.pushNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notification: { ...settings.notification, pushNotifications: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700">
                      Push notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="examReminders"
                      checked={settings.notification.examReminders}
                      onChange={(e) => setSettings({
                        ...settings,
                        notification: { ...settings.notification, examReminders: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="examReminders" className="text-sm font-medium text-gray-700">
                      Exam reminders
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="resultNotifications"
                      checked={settings.notification.resultNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notification: { ...settings.notification, resultNotifications: e.target.checked }
                      })}
                      className="text-blue-600 rounded"
                    />
                    <label htmlFor="resultNotifications" className="text-sm font-medium text-gray-700">
                      Result notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 font-poppins mb-6">User Management</h2>
              <div className="space-y-6">
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">User roles and permissions management will be available here.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;