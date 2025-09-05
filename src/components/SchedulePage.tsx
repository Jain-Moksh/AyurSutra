import React, { useState } from 'react';

interface Therapy {
  id: string;
  name: string;
  duration: number;
  price: number;
  therapist: string;
  description: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  const therapies: Therapy[] = [
    {
      id: '1',
      name: 'Abhyanga (Oil Massage)',
      duration: 60,
      price: 2500,
      therapist: 'Dr. Sharma',
      description: 'A form of Ayurvedic medicine that involves massage of the body with large amounts of warm oil. The oil is often pre-medicated with herbs for specific conditions. Abhyanga can be done as part of the Panchakarma treatment, or as a standalone therapy.'
    },
    {
      id: '2',
      name: 'Shirodhara',
      duration: 45,
      price: 3000,
      therapist: 'Dr. Patel',
      description: 'A therapeutic procedure where medicated oil is poured in a continuous stream on the forehead. This treatment is highly effective for stress, anxiety, and neurological conditions.'
    },
    {
      id: '3',
      name: 'Nasya',
      duration: 30,
      price: 1500,
      therapist: 'Dr. Joshi',
      description: 'Nasal administration of medicated oils or herbal preparations. This therapy is beneficial for sinus problems, headaches, and respiratory issues.'
    },
    {
      id: '4',
      name: 'Udvartana',
      duration: 50,
      price: 2000,
      therapist: 'Dr. Kumar',
      description: 'A therapeutic massage using herbal powders. This treatment helps in weight management, improves circulation, and enhances skin texture.'
    },
    {
      id: '5',
      name: 'Pinda Sweda',
      duration: 40,
      price: 2200,
      therapist: 'Dr. Singh',
      description: 'A fomentation therapy using medicated boluses. This treatment is effective for joint pain, muscle stiffness, and rheumatic conditions.'
    }
  ];

  const therapists = [
    'Dr. Sharma (Abhyanga Specialist)',
    'Dr. Patel (Shirodhara Expert)',
    'Dr. Joshi (Nasya Specialist)',
    'Dr. Kumar (Udvartana Expert)',
    'Dr. Singh (Pinda Sweda Specialist)'
  ];

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '2:30 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:30 PM', available: true }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAvailableSlots = (date: Date) => {
    // Simulate random availability
    const day = date.getDate();
    if (day % 3 === 0) return 0;
    if (day % 2 === 0) return Math.floor(Math.random() * 3) + 1;
    return Math.floor(Math.random() * 8) + 3;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTherapySelect = (therapyId: string) => {
    const therapy = therapies.find(t => t.id === therapyId);
    setSelectedTherapy(therapy || null);
    setSelectedTherapist('');
    setSelectedTimeSlot('');
  };

  const handleBookAppointment = () => {
    if (selectedTherapy && selectedTherapist && selectedTimeSlot) {
      alert(`Appointment booked!\n\nTherapy: ${selectedTherapy.name}\nTherapist: ${selectedTherapist}\nDate: ${formatDate(selectedDate)}\nTime: ${selectedTimeSlot}`);
    } else {
      alert('Please select all required fields to book an appointment.');
    }
  };

  const days = getDaysInMonth(selectedDate);
  const monthYear = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return (
    <div className="flex flex-col lg:flex-row h-full bg-ayur-cream min-h-0">
      {/* Left Panel - Calendar */}
      <div className="w-full lg:w-1/2 xl:w-3/5 bg-white border-r border-gray-200 flex flex-col min-h-0">
        {/* Calendar Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
            Schedule Therapy
          </h2>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-gray-600">←</span>
            </button>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
              {monthYear}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-gray-600">→</span>
            </button>
          </div>

          {/* View Toggles */}
          <div className="flex space-x-2">
            {(['month', 'week', 'day'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCalendarView(view)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  calendarView === view
                    ? 'bg-ayur-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {calendarView === 'month' && (
            <div className="space-y-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-16"></div>;
                  }

                  const slots = getAvailableSlots(date);
                  const isSelected = date.toDateString() === selectedDate.toDateString();
                  const isToday = date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className={`h-16 p-1 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        isSelected ? 'bg-ayur-green text-white border-ayur-green' : 
                        isToday ? 'bg-green-50 border-green-300' : 'bg-white'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">
                        {date.getDate()}
                      </div>
                      {slots > 0 && (
                        <div className={`text-xs px-1 py-0.5 rounded ${
                          isSelected ? 'bg-white text-ayur-green' : 'bg-green-100 text-green-800'
                        }`}>
                          {slots} slot{slots !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {calendarView === 'week' && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Week View</h3>
              <p className="text-sm text-gray-500">Week view coming soon</p>
            </div>
          )}

          {calendarView === 'day' && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Day View</h3>
              <p className="text-sm text-gray-500">Day view coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Booking Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 bg-white flex flex-col min-h-0">
        {/* Form Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
            Schedule Panchakarma Therapy
          </h2>
          <p className="text-sm text-gray-600">
            Selected Date: <span className="font-semibold">{formatDate(selectedDate)}</span>
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-6">
          {/* Therapy Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Therapy Type
            </label>
            <select
              value={selectedTherapy?.id || ''}
              onChange={(e) => handleTherapySelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
            >
              <option value="">Choose a therapy...</option>
              {therapies.map((therapy) => (
                <option key={therapy.id} value={therapy.id}>
                  {therapy.name}
                </option>
              ))}
            </select>
          </div>

          {/* Therapist Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Therapist
            </label>
            <select
              value={selectedTherapist}
              onChange={(e) => setSelectedTherapist(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
              disabled={!selectedTherapy}
            >
              <option value="">Choose a therapist...</option>
              {therapists.map((therapist) => (
                <option key={therapist} value={therapist}>
                  {therapist}
                </option>
              ))}
            </select>
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTimeSlot(slot.time)}
                  disabled={!slot.available}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeSlot === slot.time
                      ? 'bg-ayur-green text-white'
                      : slot.available
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          {/* Therapy Details */}
          {selectedTherapy && (
            <div className="bg-ayur-cream p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">{selectedTherapy.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{selectedTherapy.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">₹{selectedTherapy.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Therapist:</span>
                  <span className="font-medium">{selectedTherapy.therapist}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {selectedTherapy.description}
              </p>
            </div>
          )}
        </div>

        {/* Book Appointment Button */}
        <div className="p-4 lg:p-6 border-t border-gray-200">
          <button
            onClick={handleBookAppointment}
            className="w-full bg-ayur-green text-white py-3 px-4 rounded-lg hover:bg-ayur-light-green transition-colors font-medium text-sm lg:text-base"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
