import React from 'react';

const PatientReportsPage: React.FC = () => {
  return (
    <div className="h-full bg-ayur-cream min-h-0">
      <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-4 lg:mb-6">
            <div className="w-10 h-10 bg-ayur-green rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-800">My Reports</h2>
              <p className="text-sm text-gray-600">View your medical reports and test results</p>
            </div>
          </div>
          
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Reports Coming Soon</h3>
            <p className="text-gray-500">This feature is under development and will be available soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReportsPage;
