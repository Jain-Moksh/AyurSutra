import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import MessagePage from './components/MessagePage';
import SchedulePage from './components/SchedulePage';
import ProgressTrackingPage from './components/ProgressTrackingPage';
import ComingSoonPage from './components/ComingSoonPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Messages':
        return <MessagePage />;
      case 'Schedule':
        return <SchedulePage />;
      case 'Progress Tracking':
        return <ProgressTrackingPage />;
      case 'Patients':
      case 'Therapies':
      case 'Settings':
      case 'Reports':
        return <ComingSoonPage pageName={currentPage} />;
      case 'Home':
      default:
        return <Dashboard />;
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
          <Sidebar 
            onClose={() => setSidebarOpen(false)} 
            isOpen={sidebarOpen}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;