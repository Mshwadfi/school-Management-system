"use client";
import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "School Closure for Holidays",
    time: "October 20, 2024",
    description: "The school will be closed from October 20th to 23rd for the holidays. Classes will resume on October 24th.",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    time: "October 5, 2024, 5 PM - 7 PM",
    description: "Meet with teachers to discuss your child's progress and important updates.",
  },
  {
    id: 3,
    title: "Science Fair",
    time: "November 15, 2024",
    description: "Join us for the annual Science Fair where students will showcase their projects.",
  },
  {
    id: 4,
    title: "End of Term Exams",
    time: "December 1-5, 2024",
    description: "Final exams will be held during this week. Please prepare accordingly.",
  },
  {
    id: 5,
    title: "Winter Break",
    time: "December 20, 2024 - January 3, 2025",
    description: "School will be closed for winter break. Classes will resume on January 4, 2025.",
  },
  {
    id: 6,
    title: "Field Trip to the Museum",
    time: "November 22, 2024",
    description: "Students will go on a field trip to the local museum to enhance their learning experience.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='bg-white rounded-md shadow-sm p-2'>
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="View more" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4 h-72 overflow-y-auto scrollbar-custom"> 
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-Sky even:border-t-Purple"
            key={event.id}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
        {events.length > 4 && (
          <div className="text-center text-gray-500 text-sm mt-2">
            Scroll for more events...
          </div>
        )}
    </div>
  );
}

export default EventCalendar;
