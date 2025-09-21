import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DoctorApp from './components/DoctorApp';
import PatientApp from './components/PatientApp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dr" element={<DoctorApp />} />
          <Route path="/patient" element={<PatientApp />} />
          <Route path="/" element={<Navigate to="/dr" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;