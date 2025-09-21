import React from 'react';
import PatientAppointments from './PatientAppointments';

interface PatientAppointmentsPageProps {
  onBookNew?: () => void;
}

const PatientAppointmentsPage: React.FC<PatientAppointmentsPageProps> = ({ onBookNew }) => {
  return (
    <div className="h-full bg-ayur-cream min-h-0">
      <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
        <PatientAppointments onBookNew={onBookNew} />
      </div>
    </div>
  );
};

export default PatientAppointmentsPage;
