"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from "lucide-react";

const CalendarOverview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const hours = Array.from({ length: 12 }, (_, i) => i + 7);

  // Sample events
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
        date: new Date(
          weekDates[1].getFullYear(),
          weekDates[1].getMonth(),
          weekDates[1].getDate()
        ),
        hour: 8,
      },
      {
        id: 2,
        title: "Jennifer Davis",
        subtitle: "@ Annual Meetup",
        time: "8:00am",
        location: "Main Room",
        color: "orange",
        date: new Date(
          weekDates[2].getFullYear(),
          weekDates[2].getMonth(),
          weekDates[2].getDate()
        ),
        hour: 8,
      },
      {
        id: 3,
        title: "John Anderson",
        subtitle: "@ Tech Conference",
        time: "9:00am",
        location: "Tech Room",
        color: "blue",
        date: new Date(
          weekDates[1].getFullYear(),
          weekDates[1].getMonth(),
          weekDates[1].getDate()
        ),
        hour: 9,
      },
      {
        id: 4,
        title: "Julia Anderson",
        subtitle: "@ Team Meeting",
        time: "10:00am",
        location: "Board Room",
        color: "blue",
        date: new Date(
          weekDates[0].getFullYear(),
          weekDates[0].getMonth(),
          weekDates[0].getDate()
        ),
        hour: 10,
      },
      {
        id: 5,
        title: "Jennifer Davis",
        subtitle: "@ Workshop",
        time: "11:00am",
        location: "Main Hall",
        color: "orange",
        date: new Date(
          weekDates[1].getFullYear(),
          weekDates[1].getMonth(),
          weekDates[1].getDate()
        ),
        hour: 11,
      },
      {
        id: 6,
        title: "Sarah Anderson",
        subtitle: "@ Team Conference",
        time: "2:00pm",
        location: "Board Room",
        color: "blue",
        date: new Date(
          weekDates[2].getFullYear(),
          weekDates[2].getMonth(),
          weekDates[2].getDate()
        ),
        hour: 14,
      },
    ];
  };

  const [events] = useState(getTodayEvents());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        event.target instanceof Node &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const goToToday = () => setCurrentDate(new Date());
  const goToDate = (dateString: string) => {
    const newDate = new Date(dateString + "T12:00:00");
    if (!isNaN(newDate.getTime())) {
      setCurrentDate(newDate);
      setShowDatePicker(false);
    }
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return "12:00 AM";
    if (hour === 12) return "12:00 PM";
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };

  const formatDate = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatWeekRange = () =>
    `Week of ${
      monthNames[startOfWeek.getMonth()]
    } ${startOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameDate = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getEventForSlot = (date: Date, hour: number) =>
    events.find(
      (event) =>
        event.date && isSameDate(event.date, date) && event.hour === hour
    );

  const getWeekStats = () => {
    const weekStart = new Date(weekDates[0]);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekDates[6]);
    weekEnd.setHours(23, 59, 59, 999);
    const weekEvents = events.filter(
      (event) => event.date && event.date >= weekStart && event.date <= weekEnd
    );
    return {
      total: weekEvents.length,
      assigned: Math.floor(weekEvents.length * 0.5),
      completed: Math.floor(weekEvents.length * 0.125),
    };
  };

  const stats = getWeekStats();

  // ... keep all imports, state, and functions exactly as before ...

  return (
    <div className="w-full min-h-fit bg-gray-50">
      {/* Header */}
      <div className="flex flex-col items-center justify-center lg:items-start mb-6 gap-4">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2 text-center">
            <span className="text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.3335 1.3335V4.00016"
                  stroke="#8A19FB"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.6665 1.3335V4.00016"
                  stroke="#8A19FB"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z"
                  stroke="#8A19FB"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 6.6665H14"
                  stroke="#8A19FB"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>{" "}
            Calendar Overview
          </h1>
          <p className="text-sm text-gray-500">
            Summary metrics and insights across all submissions
          </p>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          <div className="relative shrink-0" ref={datePickerRef}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <Calendar size={16} className="text-gray-600" />
              <span className="text-sm font-medium truncate">
                Schedule Calendar
              </span>
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
                  Week starts: {monthNames[startOfWeek.getMonth()]}{" "}
                  {startOfWeek.getDate()}, {startOfWeek.getFullYear()}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={goToToday}
              className="px-1 lg:px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors"
            >
              Today
            </button>
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="text-sm font-medium text-gray-700 shrink-0 truncate">
            {formatWeekRange()}
          </div>
        </div>

        {/* Right Buttons Section */}
        <div className="flex flex-nowrap items-center gap-2 shrink-0">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 transition-colors whitespace-nowrap">
            <Calendar size={16} /> All Technicians
          </button>
          <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap">
            Event
          </button>
          {/* Day button commented out as per your code */}
        </div>
      </div>

      {/* Main Calendar Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto overflow-y-auto min-h-fit">
        <div className="min-w-[900px]">
          {" "}
          {/* ensure table has min width for scrolling */}
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
            <div className="p-4 text-sm font-medium text-gray-700">Time</div>
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`p-4 text-center border-l border-gray-200 ${
                  isToday(date) ? "bg-blue-50" : ""
                }`}
              >
                <div
                  className={`text-sm font-medium ${
                    isToday(date) ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {weekDays[index]}
                </div>
                <div
                  className={`text-sm ${
                    isToday(date)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {formatDate(date)}
                </div>
              </div>
            ))}
          </div>
          {/* Body Rows */}
          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]"
              >
                <div className="p-4 text-sm text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {formatTime(hour)}
                </div>
                {weekDates.map((date, dayIndex) => {
                  const event = getEventForSlot(date, hour);
                  return (
                    <div
                      key={dayIndex}
                      className={`border-l border-gray-200 p-1 sm:p-2 relative ${
                        isToday(date) ? "bg-blue-50 bg-opacity-30" : ""
                      }`}
                    >
                      {event && (
                        <div
                          className={`${
                            event.color === "blue"
                              ? "bg-blue-50 border-blue-300"
                              : "bg-orange-50 border-orange-300"
                          } border-l-4 rounded-lg shadow-md p-2 sm:p-3 h-full flex flex-col justify-between`}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="font-medium text-[10px] sm:text-sm text-gray-900 truncate">
                              {event.title}
                            </div>
                            <div className="hidden xl:block text-[8px] sm:text-xs text-gray-600 truncate">
                              {event.subtitle}
                            </div>
                            <div className="text-[8px] sm:text-xs text-gray-500">
                              {event.time}
                            </div>
                            <div
                              className={`hidden xl:inline-flex items-center gap-1 text-[8px] sm:text-xs mt-1 text-${
                                event.color === "blue"
                                  ? "blue-700"
                                  : "orange-700"
                              } truncate`}
                            >
                              <Calendar size={12} />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                          <button
                            className={`w-full mt-2 py-1 sm:py-2 rounded text-[8px] sm:text-xs font-medium text-white ${
                              event.color === "blue"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-orange-500 hover:bg-orange-600"
                            } transition-colors`}
                          >
                            <span className="whitespace-nowrap">
                              <span>View</span> Details
                            </span>
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

      {/* Stats */}
      <div className="border-t border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 gap-3">
        <div className="flex flex-wrap items-center gap-6">
          <span>
            Total Jobs This Week:{" "}
            <span className="font-medium text-gray-900">{stats.total}</span>
          </span>
          <span>
            Assigned:{" "}
            <span className="font-medium text-blue-600">{stats.assigned}</span>
          </span>
          <span>
            Completed:{" "}
            <span className="font-medium text-green-600">{stats.completed}</span>
          </span>
        </div>
        {/* <div className="text-gray-500 text-xs sm:text-sm">
        Drag & drop to reschedule (requires in development)
      </div> */}
      </div>
    </div>
  );
};

export default CalendarOverview;



// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Calendar, ChevronDown, X, MapPin, Clock, User } from "lucide-react";

// const CalendarOverview = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const datePickerRef = useRef<HTMLDivElement | null>(null);

//   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const hours = Array.from({ length: 12 }, (_, i) => i + 7);

//   // Sample events
//   const getTodayEvents = () => {
//     const today = new Date();
//     const weekDates = getWeekDates(today);

//     return [
//       {
//         id: 1,
//         title: "John Anderson",
//         subtitle: "@ Tech Conference",
//         time: "8:00am",
//         location: "Tech Room",
//         color: "blue",
//         date: new Date(
//           weekDates[1].getFullYear(),
//           weekDates[1].getMonth(),
//           weekDates[1].getDate()
//         ),
//         hour: 8,
//         customerName: "Tech Corp",
//         phone: "(415) 123-4567",
//         email: "john@techcorp.com",
//         serviceAddress: "1650 Amphitheatre Parkway, CA",
//         jobDescription: "Installation and configuration of network equipment",
//         status: "Scheduled"
//       },
//       {
//         id: 2,
//         title: "Jennifer Davis",
//         subtitle: "@ Annual Meetup",
//         time: "8:00am",
//         location: "Main Room",
//         color: "orange",
//         date: new Date(
//           weekDates[2].getFullYear(),
//           weekDates[2].getMonth(),
//           weekDates[2].getDate()
//         ),
//         hour: 8,
//         customerName: "Acme Solutions",
//         phone: "(415) 234-5678",
//         email: "jennifer@acme.com",
//         serviceAddress: "350 Fifth Avenue, New York, NY",
//         jobDescription: "Routine maintenance and system check",
//         status: "In Progress"
//       },
//       {
//         id: 3,
//         title: "John Anderson",
//         subtitle: "@ Tech Conference",
//         time: "9:00am",
//         location: "Tech Room",
//         color: "blue",
//         date: new Date(
//           weekDates[1].getFullYear(),
//           weekDates[1].getMonth(),
//           weekDates[1].getDate()
//         ),
//         hour: 9,
//         customerName: "Innovation Labs",
//         phone: "(415) 345-6789",
//         email: "contact@innovation.com",
//         serviceAddress: "1 Infinite Loop, Cupertino, CA",
//         jobDescription: "Hardware upgrade and testing",
//         status: "Scheduled"
//       },
//       {
//         id: 4,
//         title: "Julia Anderson",
//         subtitle: "@ Team Meeting",
//         time: "10:00am",
//         location: "Board Room",
//         color: "blue",
//         date: new Date(
//           weekDates[0].getFullYear(),
//           weekDates[0].getMonth(),
//           weekDates[0].getDate()
//         ),
//         hour: 10,
//         customerName: "Tech Innovators",
//         phone: "(415) 456-7890",
//         email: "julia@techinnovators.com",
//         serviceAddress: "233 S Wacker Dr, Chicago, IL",
//         jobDescription: "Network security assessment",
//         status: "Scheduled"
//       },
//       {
//         id: 5,
//         title: "Jennifer Davis",
//         subtitle: "@ Workshop",
//         time: "11:00am",
//         location: "Main Hall",
//         color: "orange",
//         date: new Date(
//           weekDates[1].getFullYear(),
//           weekDates[1].getMonth(),
//           weekDates[1].getDate()
//         ),
//         hour: 11,
//         customerName: "Digital Systems",
//         phone: "(415) 567-8901",
//         email: "info@digitalsystems.com",
//         serviceAddress: "600 Congress Ave, Austin, TX",
//         jobDescription: "Software installation and training",
//         status: "Scheduled"
//       },
//       {
//         id: 6,
//         title: "Sarah Anderson",
//         subtitle: "@ Team Conference",
//         time: "2:00pm",
//         location: "Board Room",
//         color: "blue",
//         date: new Date(
//           weekDates[2].getFullYear(),
//           weekDates[2].getMonth(),
//           weekDates[2].getDate()
//         ),
//         hour: 14,
//         customerName: "Future Tech",
//         phone: "(415) 678-9012",
//         email: "sarah@futuretech.com",
//         serviceAddress: "1901 Main Street, Dallas, TX",
//         jobDescription: "Emergency repair and diagnostics",
//         status: "Urgent"
//       },
//     ];
//   };

//   const [events] = useState(getTodayEvents());

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         datePickerRef.current &&
//         event.target instanceof Node &&
//         !datePickerRef.current.contains(event.target)
//       ) {
//         setShowDatePicker(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   function getWeekDates(date: Date) {
//     const week = [];
//     const d = new Date(date);
//     const day = d.getDay();
//     const diff = d.getDate() - day;
//     const sunday = new Date(d.setDate(diff));

//     for (let i = 0; i < 7; i++) {
//       const weekDate = new Date(sunday);
//       weekDate.setDate(sunday.getDate() + i);
//       week.push(weekDate);
//     }
//     return week;
//   }

//   const weekDates = getWeekDates(currentDate);
//   const startOfWeek = weekDates[0];

//   const goToPreviousWeek = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(currentDate.getDate() - 7);
//     setCurrentDate(newDate);
//   };

//   const goToNextWeek = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(currentDate.getDate() + 7);
//     setCurrentDate(newDate);
//   };

//   const goToToday = () => setCurrentDate(new Date());
//   const goToDate = (dateString: string) => {
//     const newDate = new Date(dateString + "T12:00:00");
//     if (!isNaN(newDate.getTime())) {
//       setCurrentDate(newDate);
//       setShowDatePicker(false);
//     }
//   };

//   const formatTime = (hour: number) => {
//     if (hour === 0) return "12:00 AM";
//     if (hour === 12) return "12:00 PM";
//     if (hour < 12) return `${hour}:00 AM`;
//     return `${hour - 12}:00 PM`;
//   };

//   const formatDate = (date: Date) => {
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     return `${months[date.getMonth()]} ${date.getDate()}`;
//   };

//   const formatDateForInput = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const formatWeekRange = () =>
//     `Week of ${
//       monthNames[startOfWeek.getMonth()]
//     } ${startOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;

//   const isToday = (date: Date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const isSameDate = (date1: Date | null, date2: Date | null) => {
//     if (!date1 || !date2) return false;
//     return (
//       date1.getFullYear() === date2.getFullYear() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getDate() === date2.getDate()
//     );
//   };

//   const getEventForSlot = (date: Date, hour: number) =>
//     events.find(
//       (event) =>
//         event.date && isSameDate(event.date, date) && event.hour === hour
//     );

//   const getWeekStats = () => {
//     const weekStart = new Date(weekDates[0]);
//     weekStart.setHours(0, 0, 0, 0);
//     const weekEnd = new Date(weekDates[6]);
//     weekEnd.setHours(23, 59, 59, 999);
//     const weekEvents = events.filter(
//       (event) => event.date && event.date >= weekStart && event.date <= weekEnd
//     );
//     return {
//       total: weekEvents.length,
//       assigned: Math.floor(weekEvents.length * 0.5),
//       completed: Math.floor(weekEvents.length * 0.125),
//     };
//   };

//   const stats = getWeekStats();

//   const openDetailsModal = (event) => {
//     setSelectedEvent(event);
//     setShowDetailsModal(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false);
//     setSelectedEvent(null);
//     document.body.style.overflow = 'unset';
//   };

//   return (
//     <div className="w-full min-h-fit bg-gray-50">
//       {/* Header */}
//       <div className="flex flex-col items-center justify-center lg:items-start mb-6 gap-4">
//         <div className="flex flex-col items-center lg:items-start">
//           <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2 text-center">
//             <span className="text-blue-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 16 16"
//                 fill="none"
//               >
//                 <path
//                   d="M5.3335 1.3335V4.00016"
//                   stroke="#8A19FB"
//                   strokeWidth="1.33333"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M10.6665 1.3335V4.00016"
//                   stroke="#8A19FB"
//                   strokeWidth="1.33333"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z"
//                   stroke="#8A19FB"
//                   strokeWidth="1.33333"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M2 6.6665H14"
//                   stroke="#8A19FB"
//                   strokeWidth="1.33333"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>{" "}
//             Calendar Overview
//           </h1>
//           <p className="text-sm text-gray-500">
//             Summary metrics and insights across all submissions
//           </p>
//         </div>
//       </div>

//       {/* Schedule Section */}
//       <div className="bg-white rounded-lg p-4 mb-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         {/* Left Section */}
//         <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
//           <div className="relative shrink-0" ref={datePickerRef}>
//             <button
//               onClick={() => setShowDatePicker(!showDatePicker)}
//               className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
//             >
//               <Calendar size={16} className="text-gray-600" />
//               <span className="text-sm font-medium truncate">
//                 Schedule Calendar
//               </span>
//               <ChevronDown size={16} className="text-gray-600" />
//             </button>
//             {showDatePicker && (
//               <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 w-64">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(currentDate)}
//                   onChange={(e) => goToDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//                 <div className="mt-3 text-xs text-gray-500">
//                   Week starts: {monthNames[startOfWeek.getMonth()]}{" "}
//                   {startOfWeek.getDate()}, {startOfWeek.getFullYear()}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-1 shrink-0">
//             <button
//               onClick={goToPreviousWeek}
//               className="p-2 hover:bg-gray-100 rounded transition-colors"
//             >
//               <ChevronLeft size={20} className="text-gray-600" />
//             </button>
//             <button
//               onClick={goToToday}
//               className="px-1 lg:px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors"
//             >
//               Today
//             </button>
//             <button
//               onClick={goToNextWeek}
//               className="p-2 hover:bg-gray-100 rounded transition-colors"
//             >
//               <ChevronRight size={20} className="text-gray-600" />
//             </button>
//           </div>

//           <div className="text-sm font-medium text-gray-700 shrink-0 truncate">
//             {formatWeekRange()}
//           </div>
//         </div>

//         {/* Right Buttons Section */}
//         <div className="flex flex-nowrap items-center gap-2 shrink-0">
//           <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 transition-colors whitespace-nowrap">
//             <Calendar size={16} /> All Technicians
//           </button>
//           <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap">
//             Event
//           </button>
//         </div>
//       </div>

//       {/* Main Calendar Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-x-auto overflow-y-auto min-h-fit">
//         <div className="min-w-[900px]">
//           {/* Header Row */}
//           <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
//             <div className="p-4 text-sm font-medium text-gray-700">Time</div>
//             {weekDates.map((date, index) => (
//               <div
//                 key={index}
//                 className={`p-4 text-center border-l border-gray-200 ${
//                   isToday(date) ? "bg-blue-50" : ""
//                 }`}
//               >
//                 <div
//                   className={`text-sm font-medium ${
//                     isToday(date) ? "text-blue-600" : "text-gray-700"
//                   }`}
//                 >
//                   {weekDays[index]}
//                 </div>
//                 <div
//                   className={`text-sm ${
//                     isToday(date)
//                       ? "text-blue-600 font-semibold"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {formatDate(date)}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* Body Rows */}
//           <div className="relative">
//             {hours.map((hour) => (
//               <div
//                 key={hour}
//                 className="grid grid-cols-8 border-b border-gray-200 min-h-[80px]"
//               >
//                 <div className="p-4 text-sm text-gray-600 border-r border-gray-200 whitespace-nowrap">
//                   {formatTime(hour)}
//                 </div>
//                 {weekDates.map((date, dayIndex) => {
//                   const event = getEventForSlot(date, hour);
//                   return (
//                     <div
//                       key={dayIndex}
//                       className={`border-l border-gray-200 p-1 sm:p-2 relative ${
//                         isToday(date) ? "bg-blue-50 bg-opacity-30" : ""
//                       }`}
//                     >
//                       {event && (
//                         <div
//                           className={`${
//                             event.color === "blue"
//                               ? "bg-blue-50 border-blue-300"
//                               : "bg-orange-50 border-orange-300"
//                           } border-l-4 rounded-lg shadow-md p-2 sm:p-3 h-full flex flex-col justify-between`}
//                         >
//                           <div className="flex flex-col gap-1">
//                             <div className="font-medium text-[10px] sm:text-sm text-gray-900 truncate">
//                               {event.title}
//                             </div>
//                             <div className="hidden xl:block text-[8px] sm:text-xs text-gray-600 truncate">
//                               {event.subtitle}
//                             </div>
//                             <div className="text-[8px] sm:text-xs text-gray-500">
//                               {event.time}
//                             </div>
//                             <div
//                               className={`hidden xl:inline-flex items-center gap-1 text-[8px] sm:text-xs mt-1 text-${
//                                 event.color === "blue"
//                                   ? "blue-700"
//                                   : "orange-700"
//                               } truncate`}
//                             >
//                               <Calendar size={12} />
//                               <span className="truncate">{event.location}</span>
//                             </div>
//                           </div>
//                           <button
//                             onClick={() => openDetailsModal(event)}
//                             className={`w-full mt-2 py-1 sm:py-2 rounded text-[8px] sm:text-xs font-medium text-white ${
//                               event.color === "blue"
//                                 ? "bg-blue-500 hover:bg-blue-600"
//                                 : "bg-orange-500 hover:bg-orange-600"
//                             } transition-colors`}
//                           >
//                             <span className="whitespace-nowrap">
//                               <span>View</span> Details
//                             </span>
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="border-t border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 gap-3">
//         <div className="flex flex-wrap items-center gap-6">
//           <span>
//             Total Jobs This Week:{" "}
//             <span className="font-medium text-gray-900">{stats.total}</span>
//           </span>
//           <span>
//             Assigned:{" "}
//             <span className="font-medium text-blue-600">{stats.assigned}</span>
//           </span>
//           <span>
//             Completed:{" "}
//             <span className="font-medium text-green-600">{stats.completed}</span>
//           </span>
//         </div>
//       </div>

//       {/* Details Modal */}
//       {showDetailsModal && selectedEvent && (
//         <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
//           <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
//             <style>{`
//               .scrollbar-hide::-webkit-scrollbar {
//                 display: none;
//               }
//             `}</style>
            
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
//               <h2 className="text-lg font-semibold text-gray-800">Job Details</h2>
//               <button
//                 onClick={closeDetailsModal}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-4 space-y-4">
//               {/* Technician Info */}
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
//                     {selectedEvent.title.split(' ').map(n => n[0]).join('')}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{selectedEvent.title}</h3>
//                     <p className="text-xs text-gray-600">{selectedEvent.subtitle}</p>
//                   </div>
//                 </div>
//                 <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                   selectedEvent.status === 'Urgent' 
//                     ? 'bg-red-100 text-red-700'
//                     : selectedEvent.status === 'In Progress'
//                     ? 'bg-yellow-100 text-yellow-700'
//                     : 'bg-green-100 text-green-700'
//                 }`}>
//                   {selectedEvent.status}
//                 </div>
//               </div>

//               {/* Customer Information */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer Information</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-start gap-2">
//                     <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="text-xs text-gray-500">Customer Name</p>
//                       <p className="text-sm font-medium text-gray-800">{selectedEvent.customerName}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <div>
//                       <p className="text-xs text-gray-500">Phone</p>
//                       <p className="text-sm font-medium text-gray-800">{selectedEvent.phone}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     <div>
//                       <p className="text-xs text-gray-500">Email</p>
//                       <p className="text-sm font-medium text-gray-800">{selectedEvent.email}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Location & Schedule */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">Location & Schedule</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-start gap-2">
//                     <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="text-xs text-gray-500">Service Address</p>
//                       <p className="text-sm font-medium text-gray-800">{selectedEvent.serviceAddress}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="text-xs text-gray-500">Scheduled Time</p>
//                       <p className="text-sm font-medium text-gray-800">{selectedEvent.time} • {selectedEvent.location}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="text-xs text-gray-500">Date</p>
//                       <p className="text-sm font-medium text-gray-800">
//                         {selectedEvent.date.toLocaleDateString('en-US', { 
//                           weekday: 'long', 
//                           year: 'numeric', 
//                           month: 'long', 
//                           day: 'numeric' 
//                         })}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Job Description */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-2">Job Description</h3>
//                 <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                   <p className="text-sm text-gray-700">{selectedEvent.jobDescription}</p>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-2 pt-2">
//                 <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//                   Reschedule
//                 </button>
//                 <button className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all">
//                   Mark Complete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarOverview;