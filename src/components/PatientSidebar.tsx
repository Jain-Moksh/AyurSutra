import React, { useState } from 'react';

interface NavItem {
  name: string;
  icon: string;
  active?: boolean;
}

interface PatientSidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ onClose, isOpen = false, currentPage = 'Home', onPageChange }) => {
  const [activeItem, setActiveItem] = useState(currentPage);

  const navItems: NavItem[] = [
    { name: 'Home', icon: '🏠' },
    { name: 'Appointments', icon: '📅' },
    { name: 'History', icon: '📋' },
    { name: 'Prescriptions', icon: '💊' },
    { name: 'Reports', icon: '📊' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    // Handle page change
    if (onPageChange) {
      onPageChange(itemName);
    }
    // Close sidebar on mobile after selection
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full h-full bg-ayur-green text-white">
      {/* Mobile close button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-2xl"
        >
          ×
        </button>
      </div>
      
      <div className="p-4 lg:p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-ayur-green font-bold text-lg">A</span>
          </div>
          <span className="text-lg lg:text-xl font-bold">AyurSutra</span>
        </div>
      </div>
      
      <nav className="mt-4 lg:mt-8">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`px-4 lg:px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
              currentPage === item.name
                ? 'bg-ayur-light-green border-r-4 border-white shadow-lg'
                : 'hover:bg-ayur-light-green hover:shadow-md'
            }`}
            onClick={() => handleItemClick(item.name)}
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: isOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
            }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg transition-transform duration-300 hover:scale-110">{item.icon}</span>
              <span className="font-medium text-sm lg:text-base transition-all duration-300">{item.name}</span>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default PatientSidebar;
