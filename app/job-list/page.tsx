"use client";

import { Search, Eye, Trash2 } from "lucide-react";

const jobs = [
  {
    id: "01",
    jobId: "JOB-12223",
    contact: "(555) 111-2222\njohn@email.com",
    location: "1650 Amphitheatre Parkway, Mountain View, CA",
    dateTime: "10/18/25 - 11:00\n(Plumbing inspection)",
    technician: "John Anderson",
    action: "Email Reminder",
  },
  {
    id: "02",
    jobId: "JOB-12224",
    contact: "(555) 222-3333\nlisa@email.com",
    location: "1 Infinite Loop, Cupertino, CA",
    dateTime: "10/18/25 - 09:00\n(Drain cleaning)",
    technician: "Lisa Thompson",
    action: "Email Reminder",
  },
  {
    id: "03",
    jobId: "JOB-12225",
    contact: "(555) 333-4444\nrobert@email.com",
    location: "233 W Wacker Dr, Chicago, IL",
    dateTime: "10/18/25 - 14:00\n(Pipe replacement)",
    technician: "Jennifer Davis",
    action: "View Schedule",
  },
  {
    id: "04",
    jobId: "JOB-12226",
    contact: "(555) 444-5555\njennifer@email.com",
    location: "600 Congress Ave, Austin, TX",
    dateTime: "10/18/25 - 11:00\n(Water heater installation)",
    technician: "Michael Brown",
    action: "Email Reminder",
  },
  {
    id: "05",
    jobId: "JOB-12227",
    contact: "(555) 555-6666\namanda@email.com",
    location: "101 Main Street, Dallas, TX",
    dateTime: "10/18/25 - 12:00\n(Leak repair)",
    technician: "Amanda Garcia",
    action: "Email Reminder",
  },
];

export default function JobListPage() {
  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <span className="text-blue-600">📋</span> Job List
        </h1>
        <p className="text-sm text-gray-500">Summary metrics and insights across at submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">Total Jobs</p>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">📋</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">15</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">Assigned</p>
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-lg">👤</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">07</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">Pending</p>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg">⏱</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">01</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-600">Completed</p>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">✓</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">07</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name, address, or phone"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Technicians</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Job No</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Job ID - Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Date & Time</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Technician</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-800">{job.id}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-800">{job.jobId}</div>
                    <div className="text-xs text-gray-500">John Anderson</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-800 whitespace-pre-line">{job.contact}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">{job.location}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-800 whitespace-pre-line">{job.dateTime}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">{job.technician}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-orange-600 hover:text-orange-700 text-xs">
                        ⚠️ {job.action}
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}