import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  initials: string;
  therapyHistory: string[];
  lastVisit: string;
}

const PatientManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const patients: Patient[] = [
    { id: '1', name: 'Ananya Deshmukh', initials: 'AD', therapyHistory: ['Abhyanga', 'Shirodhara'], lastVisit: 'Today' },
    { id: '2', name: 'Rahul Mehta', initials: 'RM', therapyHistory: ['Shirodhara', 'Nasya'], lastVisit: 'Yesterday' },
    { id: '3', name: 'Vikram Patel', initials: 'VP', therapyHistory: ['Nasya', 'Consultation'], lastVisit: '2 days ago' },
    { id: '4', name: 'Meera Joshi', initials: 'MJ', therapyHistory: ['Udvartana', 'Pinda Sweda'], lastVisit: '3 days ago' },
    { id: '5', name: 'Arjun Singh', initials: 'AS', therapyHistory: ['Pinda Sweda', 'Abhyanga'], lastVisit: '1 week ago' },
  ];

  const filters = [
    { key: 'all', label: 'All Patients' },
    { key: 'recent', label: 'Recent Visits' },
    { key: 'therapy', label: 'By Therapy' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Patient Management</h2>
        <button className="bg-ayur-green text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-ayur-light-green transition-colors flex items-center justify-center space-x-2 text-sm lg:text-base">
          <span>👤</span>
          <span className="hidden sm:inline">New Patient</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 lg:space-x-3 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-green focus:border-transparent text-sm lg:text-base"
          />
        </div>
        <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
          <span className="text-gray-600">🔍</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
              activeFilter === filter.key
                ? 'bg-ayur-green text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Mobile: Card Layout */}
      <div className="block md:hidden space-y-3">
        {patients.map((patient) => (
          <div key={patient.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-ayur-green rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{patient.initials}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">{patient.name}</div>
                  <div className="text-xs text-gray-500">{patient.lastVisit}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="View Records">
                  <span className="text-gray-600">📄</span>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Schedule">
                  <span className="text-gray-600">📅</span>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Delete">
                  <span className="text-gray-600">🗑️</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {patient.therapyHistory.map((therapy, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {therapy}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet: Card Layout */}
      <div className="hidden md:block lg:hidden space-y-3">
        {patients.map((patient) => (
          <div key={patient.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-ayur-green rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{patient.initials}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800 text-sm">{patient.name}</div>
                  <div className="text-xs text-gray-500">{patient.lastVisit}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="View Records">
                  <span className="text-gray-600">📄</span>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Schedule">
                  <span className="text-gray-600">📅</span>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Delete">
                  <span className="text-gray-600">🗑️</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {patient.therapyHistory.map((therapy, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {therapy}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Laptop & Desktop: Table Layout */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600">Patient Name</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600">Therapy History</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600">Last Visit</th>
              <th className="text-left py-3 px-2 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-ayur-green rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{patient.initials}</span>
                    </div>
                    <span className="font-medium text-gray-800">{patient.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex flex-wrap gap-1">
                    {patient.therapyHistory.map((therapy, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {therapy}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-600">{patient.lastVisit}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="View Records">
                      <span className="text-gray-600">📄</span>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Schedule">
                      <span className="text-gray-600">📅</span>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Delete">
                      <span className="text-gray-600">🗑️</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;