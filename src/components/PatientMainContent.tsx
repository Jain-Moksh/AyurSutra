import React from 'react';
import PatientAppointments from './PatientAppointments';
import PatientMedicalHistory from './PatientMedicalHistory';
// import PatientNotifications from './PatientNotifications';
import PatientNotifications from './PatientNotifications';
import PatientProfile from './PatientProfile';

const PatientMainContent: React.FC = () => {
  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
      {/* Top row with Appointments and Medical History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <PatientAppointments />
        <PatientMedicalHistory />
      </div>
      
      {/* Bottom row with Notifications and Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <PatientNotifications />
        <PatientProfile />
      </div>
    </div>
  );
};

export default PatientMainContent;
