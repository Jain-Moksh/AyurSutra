import React from 'react';
import PatientMainContent from './PatientMainContent';

interface PatientDashboardProps {
  onBookNew?: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onBookNew }) => {
  return (
    <div className="h-full bg-ayur-cream min-h-0">
      <PatientMainContent onBookNew={onBookNew} />
    </div>
  );
};

export default PatientDashboard;
