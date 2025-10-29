"use client";

import { Plus, Star, Phone, Mail, MapPin } from "lucide-react";

const technicians = [
  {
    id: 1,
    name: "David Mathias",
    role: "Senior",
    rating: 4.8,
    phone: "(415) 123-4567",
    email: "david@company.com",
    location: "West Coast",
    availability: "8:00 AM - 5:30 PM",
    jobsToday: 4,
    completed: 2,
    pending: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Junior",
    rating: 4.7,
    phone: "(415) 234-5678",
    email: "sarah@company.com",
    location: "East Coast",
    availability: "7:00 AM - 4:00 PM",
    jobsToday: 3,
    completed: 1,
    pending: 2,
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Senior",
    rating: 4.9,
    phone: "(415) 345-6789",
    email: "mike@company.com",
    location: "Midwest",
    availability: "9:00 AM - 6:00 PM",
    jobsToday: 5,
    completed: 3,
    pending: 2,
  },
  {
    id: 4,
    name: "David Mathias",
    role: "Senior",
    rating: 4.8,
    phone: "(415) 456-7890",
    email: "david2@company.com",
    location: "West Coast",
    availability: "8:00 AM - 5:30 PM",
    jobsToday: 4,
    completed: 2,
    pending: 2,
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Junior",
    rating: 4.7,
    phone: "(415) 567-8901",
    email: "sarah2@company.com",
    location: "East Coast",
    availability: "7:00 AM - 4:00 PM",
    jobsToday: 3,
    completed: 1,
    pending: 2,
  },
  {
    id: 6,
    name: "Mike Chen",
    role: "Senior",
    rating: 4.9,
    phone: "(415) 678-9012",
    email: "mike2@company.com",
    location: "Midwest",
    availability: "9:00 AM - 6:00 PM",
    jobsToday: 5,
    completed: 3,
    pending: 2,
  },
];

export default function TechniciansPage() {
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <span className="text-blue-600">👥</span> Technician Management
          </h1>
          <p className="text-sm text-gray-500">Manage assigned technicians with per-site schedule</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Technician
        </button>
      </div>

      {/* Technician Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        {technicians.map((tech) => (
          <div key={tech.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {tech.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{tech.name}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    tech.role === 'Senior' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {tech.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-800">{tech.rating}</span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {tech.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {tech.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {tech.location}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-4 pb-4 border-b">
              <div className="text-xs text-gray-500 mb-1">Availability</div>
              <div className="text-sm font-medium text-gray-800">{tech.availability}</div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className="text-xs text-gray-500">Jobs Today</div>
                <div className="text-lg font-bold text-gray-800">{tech.jobsToday}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Completed</div>
                <div className="text-lg font-bold text-gray-800">{tech.completed}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Pending</div>
                <div className="text-lg font-bold text-gray-800">{tech.pending}</div>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              View Schedule
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}