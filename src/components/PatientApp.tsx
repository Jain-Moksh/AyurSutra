import React, { useState } from 'react';
import PatientDashboard from './PatientDashboard';
import PatientAppointmentsPage from './PatientAppointmentsPage';
import PatientHistoryPage from './PatientHistoryPage';
import PatientPrescriptionsPage from './PatientPrescriptionsPage';
import PatientReportsPage from './PatientReportsPage';
import PatientSettingsPage from './PatientSettingsPage';
import PatientSidebar from './PatientSidebar';
import PatientHeader from './PatientHeader';

const PatientApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Appointments':
        return <PatientAppointmentsPage />;
      case 'History':
        return <PatientHistoryPage />;
      case 'Prescriptions':
        return <PatientPrescriptionsPage />;
      case 'Reports':
        return <PatientReportsPage />;
      case 'Settings':
        return <PatientSettingsPage />;
      case 'Home':
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="App">
      <div className="flex h-screen bg-ayur-cream">
        {/* Mobile sidebar overlay */}
        <div 
          className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-500 ease-in-out ${
            sidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-all duration-500 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <PatientSidebar 
            onClose={() => setSidebarOpen(false)} 
            isOpen={sidebarOpen}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          <PatientHeader onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientApp;
