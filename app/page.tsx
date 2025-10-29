"use client";

import { useState, useMemo } from "react";
import { Search, Calendar, Plus, Eye } from "lucide-react";

const jobs = [
  {
    id: 1,
    location: "1650 Amphitheatre Parkway, CA",
    technician: "John Anderson",
    date: "October 18, 2025",
    time: "11:00 am - 01:00 pm",
    status: "Pending",
  },
  {
    id: 2,
    location: "1 Infinite Loop, Cupertino, CA",
    technician: "Lisa Thompson",
    date: "October 18, 2025",
    time: "09:00 am - 11:00 am",
    status: "Completed",
  },
  {
    id: 3,
    location: "350 Fifth Avenue, New York, NY",
    technician: "Robert Williams",
    date: "October 18, 2025",
    time: "10:00 am - 12:00 pm",
    status: "Pending",
  },
  {
    id: 4,
    location: "233 S Wacker Dr, Chicago, IL",
    technician: "Jennifer Davis",
    date: "October 18, 2025",
    time: "1:00 pm - 03:00 pm",
    status: "Completed",
  },
  {
    id: 5,
    location: "600 Congress Ave, Austin, TX",
    technician: "Michael Brown",
    date: "October 18, 2025",
    time: "11:00 am - 01:00 pm",
    status: "Completed",
  },
  {
    id: 6,
    location: "1901 Main Street, Dallas, TX",
    technician: "Amanda Garcia",
    date: "October 18, 2025",
    time: "10:00 am - 12:00 pm",
    status: "Pending",
  },
];

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Filter jobs based on tab and search
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Filter by tab
    if (selectedTab === "Completed") {
      filtered = filtered.filter(job => job.status === "Completed");
    } else if (selectedTab === "Pending") {
      filtered = filtered.filter(job => job.status === "Pending");
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.technician.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status dropdown
    if (statusFilter !== "All Status") {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    return filtered;
  }, [selectedTab, searchQuery, statusFilter]);

  const completedCount = jobs.filter(j => j.status === "Completed").length;
  const pendingCount = jobs.filter(j => j.status === "Pending").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <span className="text-blue-600">📊</span> Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500">Summary metrics and insights across all submissions</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ZIP code or city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Oct 18, 2025</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12656842.462405518!2d-106.34433134999998!3d37.27560149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-96"
        ></iframe>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Assigned</p>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">15</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Completed</p>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">08</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pending</p>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">07</p>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className=" border-b border-gray-200">
          <div className="flex px-6">
            {[
              { label: "All", count: jobs.length },
              { label: "Completed", count: completedCount },
              { label: "Pending", count: pendingCount }
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => setSelectedTab(tab.label)}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === tab.label
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label} ({tab.count.toString().padStart(2, '0')})
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600">Location</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600">Technician name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600">Time Slot</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-800">{job.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{job.technician}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{job.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{job.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === "Completed"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                    No jobs found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

};