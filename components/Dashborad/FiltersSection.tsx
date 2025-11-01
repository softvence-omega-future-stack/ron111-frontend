"use client";

import { Search } from "lucide-react";
import { useRef, RefObject } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  stateOptions: string[];
  selectedState: string;
  setSelectedState: (val: string) => void;
  showStateDropdown: boolean;
  setShowStateDropdown: (val: boolean) => void;
  selectedDate: string;
  setSelectedDate: (val: string) => void;
  stateDropdownRef: RefObject<HTMLDivElement | null>;
}

export default function FiltersSection({
  searchQuery,
  setSearchQuery,
  stateOptions,
  selectedState,
  setSelectedState,
  showStateDropdown,
  setShowStateDropdown,
  selectedDate,
  setSelectedDate,
  stateDropdownRef,
}: Props) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Filters</h3>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ZIP code or city name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* State Dropdown */}
        <div className="relative" ref={stateDropdownRef}>
          <button
            onClick={() => setShowStateDropdown(!showStateDropdown)}
            className="flex w-full items-center justify-between gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer min-w-[150px]"
          >
            <span className="font-medium text-gray-700">{selectedState}</span>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showStateDropdown && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[150px] max-h-60 overflow-y-auto">
              {stateOptions.map((state) => (
                <button
                  key={state}
                  onClick={() => {
                    setSelectedState(state);
                    setShowStateDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                    selectedState === state ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Picker */}
        <div className="relative flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent w-full outline-none cursor-pointer text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
