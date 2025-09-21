import React from 'react';
import PatientMedicalHistory from './PatientMedicalHistory';

const PatientHistoryPage: React.FC = () => {
  return (
    <div className="h-full bg-ayur-cream min-h-0">
      <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
        <PatientMedicalHistory />
      </div>
    </div>
  );
};

export default PatientHistoryPage;
