import React, { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'radio';
  options?: string[];
  required: boolean;
}

const BookAppointmentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Sharma',
      specialty: 'Panchakarma Specialist',
      experience: '15 years',
      rating: 4.8,
      image: '👨‍⚕️'
    },
    {
      id: '2',
      name: 'Dr. Priya Patel',
      specialty: 'Ayurvedic Medicine',
      experience: '12 years',
      rating: 4.9,
      image: '👩‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Amit Kumar',
      specialty: 'Yoga Therapy',
      experience: '10 years',
      rating: 4.7,
      image: '👨‍⚕️'
    },
    {
      id: '4',
      name: 'Dr. Sunita Joshi',
      specialty: 'Herbal Medicine',
      experience: '18 years',
      rating: 4.9,
      image: '👩‍⚕️'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '2:30 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:30 PM', available: false }
  ];

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is the primary reason for your visit?',
      type: 'select',
      options: ['General Consultation', 'Follow-up', 'New Condition', 'Preventive Care', 'Emergency'],
      required: true
    },
    {
      id: '2',
      question: 'Have you visited this doctor before?',
      type: 'radio',
      options: ['Yes', 'No'],
      required: true
    },
    {
      id: '3',
      question: 'Please describe your current symptoms or concerns',
      type: 'textarea',
      required: true
    },
    {
      id: '4',
      question: 'Are you currently taking any medications?',
      type: 'textarea',
      required: false
    },
    {
      id: '5',
      question: 'Do you have any allergies?',
      type: 'text',
      required: false
    }
  ];

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(2);
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    setCurrentStep(3);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const sendConfirmationEmail = async (appointmentDetails: any) => {
    const emailData = {
      to: 'appointments@ayursutra.com', // Default email address
      subject: 'Appointment Confirmation - AyurSutra',
      message: `
        Congratulations! Your appointment has been successfully booked.
        
        Appointment Details:
        • Patient Name: ${answers['2'] === 'Yes' ? 'Returning Patient' : 'New Patient'}
        • Doctor: ${selectedDoctor?.name}
        • Date: ${selectedDate.toLocaleDateString()}
        • Time: ${selectedTimeSlot}
        • Primary Reason: ${answers['1'] || 'Not specified'}
        
        Please arrive 15 minutes before your scheduled time.
        If you need to reschedule or cancel, please contact us at least 24 hours in advance.
        
        Thank you for choosing AyurSutra for your wellness journey!
      `,
      _replyto: 'noreply@ayursutra.com'
    };

    try {
      const response = await fetch('https://formspree.io/f/mrbyzbrb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Confirmation email sent successfully');
      } else {
        console.error('Failed to send confirmation email');
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const handleBookAppointment = async () => {
    const requiredQuestions = questions.filter(q => q.required);
    const missingAnswers = requiredQuestions.filter(q => !answers[q.id]);
    
    if (missingAnswers.length > 0) {
      alert('Please answer all required questions before booking.');
      return;
    }

    setIsSubmitting(true);

    const appointmentDetails = {
      doctor: selectedDoctor,
      date: selectedDate.toLocaleDateString(),
      time: selectedTimeSlot,
      answers
    };

    // Send confirmation email
    await sendConfirmationEmail(appointmentDetails);

    // Show success toast
    setShowToast(true);
    
    // Hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);

    console.log('Appointment details:', appointmentDetails);
    setIsSubmitting(false);
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAvailableSlots = (date: Date) => {
    const day = date.getDate();
    if (day % 3 === 0) return 0;
    if (day % 2 === 0) return Math.floor(Math.random() * 3) + 1;
    return Math.floor(Math.random() * 8) + 3;
  };

  const days = getDaysInMonth(selectedDate);
  const monthYear = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return (
    <div className="h-full bg-ayur-cream min-h-0 overflow-y-auto">
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Book New Appointment
          </h1>
          <p className="text-gray-600">Follow the steps below to schedule your appointment</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-ayur-green text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-ayur-green' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-2">
            <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-ayur-green' : 'text-gray-500'}`}>
              Select Doctor
            </span>
            <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-ayur-green' : 'text-gray-500'}`}>
              Choose Time
            </span>
            <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-ayur-green' : 'text-gray-500'}`}>
              Answer Questions
            </span>
          </div>
        </div>

        {/* Step 1: Doctor Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Your Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => handleDoctorSelect(doctor)}
                  className="border border-gray-200 rounded-lg p-6 hover:border-ayur-green hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{doctor.image}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{doctor.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium flex items-center">
                        ⭐ {doctor.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Time Slot Selection */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Select Date & Time</h2>
                <p className="text-gray-600">Doctor: {selectedDoctor?.name}</p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-ayur-green hover:text-ayur-light-green font-medium"
              >
                ← Change Doctor
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Select Date</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="text-gray-600">←</span>
                    </button>
                    <h4 className="font-semibold text-gray-800">{monthYear}</h4>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="text-gray-600">→</span>
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-7 gap-1">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-600 py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((date, index) => {
                        if (!date) {
                          return <div key={index} className="h-8"></div>;
                        }

                        const slots = getAvailableSlots(date);
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        const isToday = date.toDateString() === new Date().toDateString();

                        return (
                          <div
                            key={index}
                            onClick={() => setSelectedDate(date)}
                            className={`h-8 p-1 border border-gray-200 rounded cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                              isSelected ? 'bg-ayur-green text-white border-ayur-green' : 
                              isToday ? 'bg-green-50 border-green-300' : 'bg-white'
                            }`}
                          >
                            <div className="text-xs font-medium text-center">
                              {date.getDate()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                      disabled={!slot.available}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
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
                <p className="text-sm text-gray-500 mt-4">
                  Selected: {formatDate(selectedDate)} at {selectedTimeSlot || 'No time selected'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Questions */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Appointment Details</h2>
                <p className="text-gray-600">
                  {selectedDoctor?.name} • {formatDate(selectedDate)} • {selectedTimeSlot}
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="text-ayur-green hover:text-ayur-light-green font-medium"
              >
                ← Change Time
              </button>
            </div>

            <div className="space-y-6">
              {questions.map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {question.type === 'text' && (
                    <input
                      type="text"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
                      placeholder="Enter your answer..."
                    />
                  )}

                  {question.type === 'textarea' && (
                    <textarea
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
                      placeholder="Enter your answer..."
                    />
                  )}

                  {question.type === 'select' && (
                    <select
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ayur-green text-sm"
                    >
                      <option value="">Select an option...</option>
                      {question.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {question.type === 'radio' && (
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            className="w-4 h-4 text-ayur-green border-gray-300 focus:ring-ayur-green"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={handleBookAppointment}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-ayur-green text-white hover:bg-ayur-light-green'
                }`}
              >
                {isSubmitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md">
              <div className="text-2xl">🎉</div>
              <div>
                <h3 className="font-semibold">Congratulations!</h3>
                <p className="text-sm opacity-90">
                  Your appointment has been successfully booked with {selectedDoctor?.name} on {selectedDate.toLocaleDateString()} at {selectedTimeSlot}. A confirmation email has been sent to you.
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-white hover:text-gray-200 ml-2"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentPage;

