"use client";

import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import { useState } from 'react';

moment.updateLocale('en', {
    week: {
      dow: 6, 
      doy: 1,
    },
    
  });
  
// Initialize localizer with moment.js
const localizer = momentLocalizer(moment);

// Example events for the school timetable
const myEventsList = [
  {
    title: 'Mathematics',
    start: new Date(2024, 9, 9, 9, 0), // October 9th, 2024, 9:00 AM
    end: new Date(2024, 9, 9, 10, 30), // October 9th, 2024, 10:30 AM
    desc: 'Algebra and Calculus',
    location: 'Room 101',
  },
  {
    title: 'English Literature',
    start: new Date(2024, 9, 9, 11, 0), 
    end: new Date(2024, 9, 9, 12, 30),
    desc: 'Shakespeare\'s Plays',
    location: 'Room 102',
  },
  {
    title: 'Chemistry',
    start: new Date(2024, 9, 9, 13, 0), 
    end: new Date(2024, 9, 9, 14, 30),
    desc: 'Organic Chemistry',
    location: 'Lab 1',
  },
  {
    title: 'History',
    start: new Date(2024, 9, 9, 15, 0), 
    end: new Date(2024, 9, 9, 16, 0),
    desc: 'World War II',
    location: 'Room 103',
  },
  {
    title: 'Physical Education',
    start: new Date(2024, 9, 10, 9, 0), 
    end: new Date(2024, 9, 10, 10, 30),
    desc: 'Basketball Training',
    location: 'Gym',
  },
];

const BigCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.DAY);

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        date={currentDate} 
        view={view} 
        onNavigate={handleNavigate} 
        onView={handleViewChange} 
        views={['day', 'week', 'work_week']} 
        style={{ height: 500 }}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
      />
    </div>
  );
};

export default BigCalendar;
