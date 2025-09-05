import React, { useState, useEffect } from 'react';

interface ComingSoonPageProps {
  pageName?: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageName = 'Feature' }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const getPageIcon = (page: string) => {
    switch (page.toLowerCase()) {
      case 'patients':
        return '👥';
      case 'therapies':
        return '🌿';
      case 'settings':
        return '⚙️';
      case 'reports':
        return '📈';
      default:
        return '🚀';
    }
  };

  const getPageDescription = (page: string) => {
    switch (page.toLowerCase()) {
      case 'patients':
        return 'Patient management system with comprehensive records, history tracking, and treatment plans.';
      case 'therapies':
        return 'Complete therapy management with treatment protocols, scheduling, and progress monitoring.';
      case 'settings':
        return 'System configuration, user preferences, and administrative controls for your practice.';
      case 'reports':
        return 'Detailed analytics, patient reports, and business insights for your Ayurvedic practice.';
      default:
        return 'This feature is currently under development and will be available soon.';
    }
  };

  const getPageFeatures = (page: string) => {
    switch (page.toLowerCase()) {
      case 'patients':
        return [
          'Patient Registration & Profiles',
          'Medical History Tracking',
          'Treatment Plans',
          'Appointment Scheduling',
          'Progress Monitoring'
        ];
      case 'therapies':
        return [
          'Therapy Protocols',
          'Treatment Scheduling',
          'Progress Tracking',
          'Resource Management',
          'Quality Assurance'
        ];
      case 'settings':
        return [
          'User Management',
          'System Configuration',
          'Practice Settings',
          'Notification Preferences',
          'Data Management'
        ];
      case 'reports':
        return [
          'Patient Analytics',
          'Treatment Reports',
          'Business Insights',
          'Performance Metrics',
          'Export Options'
        ];
      default:
        return [
          'Advanced Features',
          'Enhanced Functionality',
          'Better User Experience',
          'Improved Performance',
          'New Capabilities'
        ];
    }
  };

  return (
    <div className="h-full bg-ayur-cream min-h-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-full p-4 lg:p-8">
        <div className="max-w-2xl w-full">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12 text-center">
            {/* Icon */}
            <div className="text-8xl mb-6 animate-bounce">
              {getPageIcon(pageName)}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {pageName} Coming Soon{dots}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {getPageDescription(pageName)}
            </p>

            {/* Features List */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What to Expect:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {getPageFeatures(pageName).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                  >
                    <span className="text-green-500">✅</span>
                    <span className="text-sm font-medium text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Development Progress</span>
                <span className="text-sm font-medium text-gray-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-ayur-green to-ayur-light-green h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '75%' }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-ayur-green text-white rounded-lg hover:bg-ayur-light-green transition-colors font-medium">
                Notify Me When Ready
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-4">
                We're working hard to bring you the best Ayurvedic practice management experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-500">📧</span>
                  <span className="text-sm text-gray-600">support@ayursutra.com</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-500">📞</span>
                  <span className="text-sm text-gray-600">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
