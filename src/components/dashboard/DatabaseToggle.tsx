import React from 'react';
import { Database, HardDrive, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';

const DatabaseToggle: React.FC = () => {
  const { useDatabase, setUseDatabase, user } = useAuth();

  // Only show to super admins and in development
  if (user?.role !== 'super_admin' || process.env.NODE_ENV === 'production') {
    return null;
  }

  const handleToggle = () => {
    const newValue = !useDatabase;
    setUseDatabase(newValue);
    dataService.setUseDatabase(newValue);
  };

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${useDatabase ? 'bg-green-100' : 'bg-blue-100'}`}>
            {useDatabase ? (
              <Database className="w-6 h-6 text-green-600" />
            ) : (
              <HardDrive className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-poppins">
              Data Source: {useDatabase ? 'Supabase Database' : 'Local Demo Data'}
            </h3>
            <p className="text-sm text-gray-600">
              {useDatabase 
                ? 'Connected to real Supabase database with authentication'
                : 'Using local mock data for demonstration purposes'
              }
            </p>
          </div>
        </div>
        
        <button
          onClick={handleToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            useDatabase 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          {useDatabase ? (
            <ToggleRight className="w-6 h-6" />
          ) : (
            <ToggleLeft className="w-6 h-6" />
          )}
          <span className="font-medium">
            {useDatabase ? 'Database Mode' : 'Demo Mode'}
          </span>
        </button>
      </div>
      
      {useDatabase && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">
              Connected to Supabase Database
            </span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            All data operations are now using the real database with Row Level Security enabled.
          </p>
        </div>
      )}
    </div>
  );
};

export default DatabaseToggle;