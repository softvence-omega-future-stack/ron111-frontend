"use client";

import { Plus } from "lucide-react";

export default function DashboardHeader({ openModal }: { openModal: () => void }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center lg:items-start md:justify-between mb-6 gap-4">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <span className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V7.33333C2 7.70152 2.29848 8 2.66667 8H6C6.36819 8 6.66667 7.70152 6.66667 7.33333V2.66667C6.66667 2.29848 6.36819 2 6 2Z"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3335 2H10.0002C9.63197 2 9.3335 2.29848 9.3335 2.66667V4.66667C9.3335 5.03486 9.63197 5.33333 10.0002 5.33333H13.3335C13.7017 5.33333 14.0002 5.03486 14.0002 4.66667V2.66667C14.0002 2.29848 13.7017 2 13.3335 2Z"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3335 8H10.0002C9.63197 8 9.3335 8.29848 9.3335 8.66667V13.3333C9.3335 13.7015 9.63197 14 10.0002 14H13.3335C13.7017 14 14.0002 13.7015 14.0002 13.3333V8.66667C14.0002 8.29848 13.7017 8 13.3335 8Z"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 10.6665H2.66667C2.29848 10.6665 2 10.965 2 11.3332V13.3332C2 13.7014 2.29848 13.9998 2.66667 13.9998H6C6.36819 13.9998 6.66667 13.7014 6.66667 13.3332V11.3332C6.66667 10.965 6.36819 10.6665 6 10.6665Z"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 text-center lg:text-start">
          Summary metrics and insights across all submissions
        </p>
      </div>

      <button
        onClick={openModal}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add New Job
      </button>
    </div>
  );
}
