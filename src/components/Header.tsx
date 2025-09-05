import React, { useState } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'हिंदी', 'मराठी'];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button, Logo and Title */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
          >
            <svg className="w-6 h-6 text-gray-600 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-ayur-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-lg">A</span>
            </div>
            <span className="text-ayur-green text-lg lg:text-xl font-bold">AyurSutra</span>
          </div>
        </div>

        {/* Right side - Language options and User profile */}
        <div className="flex items-center space-x-2 lg:space-x-6">
          {/* Language options - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:flex items-center space-x-2">
            {languages.map((lang, index) => (
              <React.Fragment key={lang}>
                <button 
                  className={`px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium transition-colors ${
                    selectedLanguage === lang 
                      ? 'text-ayur-green font-semibold' 
                      : 'text-gray-600 hover:text-ayur-green'
                  }`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </button>
                {index < languages.length - 1 && <span className="text-gray-300">|</span>}
              </React.Fragment>
            ))}
          </div>

          {/* User profile */}
          <div className="flex items-center space-x-2 lg:space-x-3 cursor-pointer hover:bg-gray-50 p-1 lg:p-2 rounded-lg transition-colors">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-ayur-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs lg:text-sm">DR</span>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-xs lg:text-sm font-medium text-gray-800">Dr. Rajesh Sharma</div>
              <div className="text-xs text-gray-500">Ayurvedic Practitioner</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;