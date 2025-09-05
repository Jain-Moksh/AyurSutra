import React from 'react';
import TodaysSchedule from './TodaysSchedule';
import PatientManagement from './PatientManagement';
import AlertsNotifications from './AlertsNotifications';

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
      {/* Today's Schedule Section */}
      <TodaysSchedule />
      
      {/* Bottom row with Patient Management and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <PatientManagement />
        <AlertsNotifications />
      </div>
    </div>
  );
};

export default MainContent;