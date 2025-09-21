import React from 'react';

interface Therapy {
  id: string;
  name: string;
  duration: string;
  status: 'Completed' | 'Ongoing' | 'Prescribed';
  startDate: string;
  endDate?: string;
  description: string;
}

interface Visit {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  notes: string;
}

const PatientMedicalHistory: React.FC = () => {
  const therapies: Therapy[] = [
    {
      id: '1',
      name: 'Panchakarma Therapy',
      duration: '21 days',
      status: 'Completed',
      startDate: '2024-01-01',
      endDate: '2024-01-21',
      description: 'Complete detoxification and rejuvenation therapy'
    },
    {
      id: '2',
      name: 'Abhyanga Massage',
      duration: '14 days',
      status: 'Ongoing',
      startDate: '2024-01-15',
      description: 'Daily oil massage for muscle relaxation and circulation'
    },
    {
      id: '3',
      name: 'Herbal Supplements',
      duration: '30 days',
      status: 'Prescribed',
      startDate: '2024-01-20',
      description: 'Ashwagandha and Brahmi for stress management'
    }
  ];

  const recentVisits: Visit[] = [
    {
      id: '1',
      date: '2024-01-10',
      doctor: 'Dr. Rajesh Sharma',
      diagnosis: 'Stress-related digestive issues',
      notes: 'Patient showing improvement with current treatment. Continue Panchakarma therapy.'
    },
    {
      id: '2',
      date: '2024-01-05',
      doctor: 'Dr. Priya Patel',
      diagnosis: 'Chronic fatigue syndrome',
      notes: 'Initial consultation completed. Started comprehensive treatment plan.'
    },
    {
      id: '3',
      date: '2023-12-28',
      doctor: 'Dr. Rajesh Sharma',
      diagnosis: 'General wellness check',
      notes: 'Annual health assessment. Overall health is good with minor lifestyle adjustments needed.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Prescribed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-4 lg:mb-6">
        <div className="w-10 h-10 bg-ayur-green rounded-full flex items-center justify-center">
          <span className="text-white text-lg">📋</span>
        </div>
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-gray-800">Medical History</h2>
          <p className="text-sm text-gray-600">Your treatment history and recent visits</p>
        </div>
      </div>

      {/* Current Therapies */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-ayur-green rounded-full mr-2"></span>
          Current Therapies
        </h3>
        <div className="space-y-3">
          {therapies.filter(therapy => therapy.status === 'Ongoing' || therapy.status === 'Prescribed').map((therapy) => (
            <div key={therapy.id} className="bg-ayur-cream border border-ayur-beige rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{therapy.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(therapy.status)}`}>
                      {therapy.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{therapy.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Duration: {therapy.duration}</span>
                    <span>Started: {therapy.startDate}</span>
                    {therapy.endDate && <span>Ended: {therapy.endDate}</span>}
                  </div>
                </div>
                <button className="text-ayur-green hover:text-ayur-light-green text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Visits */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Recent Visits
        </h3>
        <div className="space-y-3">
          {recentVisits.map((visit) => (
            <div key={visit.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{visit.doctor}</h4>
                    <span className="text-sm text-gray-500">{visit.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 font-medium">{visit.diagnosis}</p>
                  <p className="text-sm text-gray-500">{visit.notes}</p>
                </div>
                <button className="text-ayur-green hover:text-ayur-light-green text-sm font-medium">
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Therapies Summary */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Completed Therapies
        </h3>
        <div className="space-y-3">
          {therapies.filter(therapy => therapy.status === 'Completed').map((therapy) => (
            <div key={therapy.id} className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{therapy.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(therapy.status)}`}>
                      {therapy.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{therapy.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Duration: {therapy.duration}</span>
                    <span>Completed: {therapy.endDate}</span>
                  </div>
                </div>
                <button className="text-ayur-green hover:text-ayur-light-green text-sm font-medium">
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalHistory;
