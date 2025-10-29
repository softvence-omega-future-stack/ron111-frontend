"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from 'lucide-react';

const CalendarOverview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  // Sample event data - replace with your backend data
  // Using dates that will always show in current week for demo
  const getTodayEvents = () => {
    const today = new Date();
    const weekDates = getWeekDates(today);
    
    return [
      {
        id: 1,
        title: "John Anderson",
        subtitle: "@ Tech Conference",
        time: "8:00am",
        location: "Tech Room",
        color: "blue",
        date: new Date(weekDates[1].getFullYear(), weekDates[1].getMonth(), weekDates[1].getDate()),
        hour: 8
      },
      {
        id: 2,
        title: "Jennifer Davis",
        subtitle: "@ Annual Meetup",
        time: "8:00am",
        location: "Main Room",
        color: "orange",
        date: new Date(weekDates[2].getFullYear(), weekDates[2].getMonth(), weekDates[2].getDate()),
        hour: 8
      },
      {
        id: 3,
        title: "John Anderson",
        subtitle: "@ Tech Conference",
        time: "9:00am",
        location: "Tech Room",
        color: "blue",
        date: new Date(weekDates[1].getFullYear(), weekDates[1].getMonth(), weekDates[1].getDate()),
        hour: 9
      },
      {
        id: 4,
        title: "Julia Anderson",
        subtitle: "@ Team Meeting",
        time: "10:00am",
        location: "Board Room",
        color: "blue",
        date: new Date(weekDates[0].getFullYear(), weekDates[0].getMonth(), weekDates[0].getDate()),
        hour: 10
      },
      {
        id: 5,
        title: "Jennifer Davis",
        subtitle: "@ Workshop",
        time: "11:00am",
        location: "Main Hall",
        color: "orange",
        date: new Date(weekDates[1].getFullYear(), weekDates[1].getMonth(), weekDates[1].getDate()),
        hour: 11
      },
      {
        id: 6,
        title: "Sarah Anderson",
        subtitle: "@ Team Conference",
        time: "2:00pm",
        location: "Board Room",
        color: "blue",
        date: new Date(weekDates[2].getFullYear(), weekDates[2].getMonth(), weekDates[2].getDate()),
        hour: 14
      }
    ];
  };

  const [events] = useState(getTodayEvents());

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const hours = Array.from({ length: 17 }, (_, i) => i + 7);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && event.target instanceof Node && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function getWeekDates(date: Date) {
    const week = [];
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    const sunday = new Date(d.setDate(diff));
    
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(sunday);
      weekDate.setDate(sunday.getDate() + i);
      week.push(weekDate);
    }
    return week;
  }

  const weekDates = getWeekDates(currentDate);
  const startOfWeek = weekDates[0];

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToDate = (dateString: string) => {
    const newDate = new Date(dateString + 'T12:00:00');
    if (!isNaN(newDate.getTime())) {
      setCurrentDate(newDate);
      setShowDatePicker(false);
    }
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatWeekRange = () => {
    return `Week of ${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSameDate = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const getEventForSlot = (date: Date, hour: number) => {
    return events.find(event => {
      if (!event.date) return false;
      return isSameDate(event.date, date) && event.hour === hour;
    });
  };

  const getWeekStats = () => {
    const weekStart = new Date(weekDates[0]);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekDates[6]);
    weekEnd.setHours(23, 59, 59, 999);
    
    const weekEvents = events.filter(event => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });

    return {
      total: weekEvents.length,
      assigned: Math.floor(weekEvents.length * 0.5),
      completed: Math.floor(weekEvents.length * 0.125)
    };
  };

  const stats = getWeekStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <Calendar size={16} />
                <span>Calendar Overview</span>
              </div>
              <p className="text-gray-500 text-sm">Summary view and insights across all calendars.</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <div className="relative" ref={datePickerRef}>
                <button 
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  <Calendar size={16} className="text-gray-600" />
                  <span className="text-sm font-medium">Schedule Calendar</span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>
                
                {showDatePicker && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 w-64">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={formatDateForInput(currentDate)}
                      onChange={(e) => goToDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="mt-3 text-xs text-gray-500">
                      Week starts: {monthNames[startOfWeek.getMonth()]} {startOfWeek.getDate()}, {startOfWeek.getFullYear()}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={goToPreviousWeek}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Previous Week"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button 
                  onClick={goToToday}
                  className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors"
                  title="Go to Today"
                >
                  Today
                </button>
                <button 
                  onClick={goToNextWeek}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Next Week"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="text-sm font-medium text-gray-700">
                {formatWeekRange()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 transition-colors">
                <Calendar size={16} />
                Technicians
              </button>
              <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Event
              </button>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Day
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
              <div className="p-4 text-sm font-medium text-gray-700">Time</div>
              {weekDates.map((date, index) => (
                <div key={index} className={`p-4 text-center border-l border-gray-200 ${isToday(date) ? 'bg-blue-50' : ''}`}>
                  <div className={`text-sm font-medium ${isToday(date) ? 'text-blue-600' : 'text-gray-700'}`}>
                    {weekDays[index]}
                  </div>
                  <div className={`text-sm ${isToday(date) ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                    {formatDate(date)}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-gray-200" style={{ minHeight: '80px' }}>
                  <div className="p-4 text-sm text-gray-600 border-r border-gray-200">
                    {formatTime(hour)}
                  </div>
                  {weekDates.map((date, dayIndex) => {
                    const event = getEventForSlot(date, hour);
                    return (
                      <div key={dayIndex} className={`border-l border-gray-200 p-2 relative ${isToday(date) ? 'bg-blue-50 bg-opacity-30' : ''}`}>
                        {event && (
                          <div className={`${event.color === 'blue' ? 'bg-blue-50 border-blue-300' : 'bg-orange-50 border-orange-300'} border-l-4 rounded-lg shadow-md p-3 h-full`}>
                            <div className="font-medium text-sm text-gray-900">{event.title}</div>
                            <div className="text-xs text-gray-600 mt-1">{event.subtitle}</div>
                            <div className="text-xs text-gray-500 mt-2">{event.time}</div>
                            <div className={`inline-flex items-center gap-1 mt-2 text-xs ${event.color === 'blue' ? 'text-blue-700' : 'text-orange-700'}`}>
                              <Calendar size={12} />
                              <span>{event.location}</span>
                            </div>
                            <button className={`w-full mt-2 py-1 rounded text-xs font-medium text-white ${event.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} transition-colors`}>
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <span>Total Jobs This Week: <span className="font-medium text-gray-900">{stats.total}</span></span>
            <span>Assigned: <span className="font-medium text-gray-900">{stats.assigned}</span></span>
            <span>Completed: <span className="font-medium text-gray-900">{stats.completed}</span></span>
          </div>
          <div className="text-gray-500">
            Drag & drop to reschedule (requires in development)
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarOverview;