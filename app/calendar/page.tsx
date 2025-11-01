"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  ChevronDown,
  MapPinIcon,
} from "lucide-react";

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
        name: "John Anderson",
        assign: "Abul Kalam",
        time: "8:00am - 11:00am",
        location: "Tech Room",
        status: "completed",
        date: new Date(
          weekDates[1].getFullYear(),
          weekDates[1].getMonth(),
          weekDates[1].getDate()
        ),
        hour: 8,
      },
      {
        id: 2,
        name: "Jennifer Davis",
        assign: "Bbul Kalam",
        time: "8:00am - 11:00am",
        location: "Main Room",
        status: "completed",
        date: new Date(
          weekDates[2].getFullYear(),
          weekDates[2].getMonth(),
          weekDates[2].getDate()
        ),
        hour: 8,
      },
      {
        id: 3,
        name: "John Anderson",
        assign: "Abul Kalam",
        time: "9:00am",
        location: "New York Office",
        status: "completed",
        date: new Date(
          weekDates[1].getFullYear(),
          weekDates[1].getMonth(),
          weekDates[1].getDate()
        ),
        hour: 9,
      },
      {
        id: 4,
        name: "Julia Anderson",
        assign: "Abul Kalam",
        time: "10:00am",
        location: "Board Room",
        status: "pending",
        date: new Date(
          weekDates[0].getFullYear(),
          weekDates[0].getMonth(),
          weekDates[0].getDate()
        ),
        hour: 10,
      },
      {
        id: 5,
        name: "Jennifer Davis",
        assign: "Bbul Kalam",
        time: "11:00am - 2:00pm",
        location: "Main Hall",
        status: "pending",
        date: new Date(
          weekDates[1].getFullYear(),
          weekDates[1].getMonth(),
          weekDates[1].getDate()
        ),
        hour: 11,
      },
      {
        id: 6,
        name: "Sarah Anderson",
        assign: "Abul Kalam",
        time: "2:00pm",
        location: "Board Room",
        status: "completed",
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
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm flex flex-col gap-4">
          {/* Top Row */}
          <div className="flex flex-wrap items-center justify-between w-full gap-3">
            {/* Left Side */}
            <div className="flex flex-nowrap items-center gap-2">
              {/* Schedule Calendar Button */}
              <div className="relative" ref={datePickerRef}>
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

                {/* Date Picker Dropdown */}
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

              {/* Navigation Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPreviousWeek}
                  className=" hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={goToToday}
                  className="text-xs sm:text-sm font-medium hover:bg-gray-100 rounded transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={goToNextWeek}
                  className="hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0 ">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>All Technicians</option>
              </select>
              <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors whitespace-nowrap">
                Week
              </button>
            </div>
          </div>

          {/* Week Range Section (Below) */}
          <div className="flex items-center justify-start w-full">
            <p className="text-sm text-gray-600 font-medium">
              {formatWeekRange()}
            </p>
          </div>
        </div>

        {/* Main Calendar Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto overflow-y-auto min-h-fit border border-gray-300">
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
                  <div className="p-4 text-sm text-gray-600 border-r bg-gray-50 border-gray-200 whitespace-nowrap">
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
                              event.status === "completed"
                                ? "bg-blue-50 border-blue-300"
                                : "bg-orange-50 border-orange-300"
                            } border-l-6 border rounded-lg shadow-md p-2 sm:p-3 h-full flex flex-col justify-between`}
                          >
                            <div className="flex flex-col gap-1">
                              <div className="font-medium text-[10px] sm:text-sm text-gray-900 truncate">
                                {event.name}
                              </div>
                              <div
                                className={`hidden lg:inline-flex items-center gap-1 text-[8px] sm:text-xs text-${
                                  event.status === "completed"
                                    ? "blue-700"
                                    : "orange-700"
                                } truncate`}
                              >
                                <MapPinIcon className="w-3 h-3" />
                                <span className="truncate">
                                  {event.location}
                                </span>
                              </div>

                              <div className="hidden lg:block text-[8px] sm:text-xs text-gray-600 truncate">
                                <div className="mb-1">Assigned By</div>
                                <img
                                  src="/img.png"
                                  alt="profile"
                                  className="w-4 h-4 rounded-full inline-block mr-1"
                                />
                                {event.assign}
                              </div>
                            </div>
                            <button
                              className={`w-full mt-2 rounded text-[.45rem] lg:text-[.7rem] p-2 font-medium text-white ${
                                event.status === "completed"
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : "bg-orange-500 hover:bg-orange-600"
                              } transition-colors`}
                            >
                              <span className="">{event.time}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className=" bg-gray-50 p-4 h-20 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 gap-3">
              <div className="flex flex-wrap items-center gap-6">
                <span>
                  Total Jobs This Week:{" "}
                  <span className="font-medium text-gray-900">
                    {stats.total}
                  </span>
                </span>
                <span>
                  Assigned:{" "}
                  <span className="font-medium text-blue-600">
                    {stats.assigned}
                  </span>
                </span>
                <span>
                  Completed:{" "}
                  <span className="font-medium text-green-600">
                    {stats.completed}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CalendarOverview;
