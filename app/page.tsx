"use client";

import { useState, useMemo } from "react";
import { Search, Calendar, Plus, Eye } from "lucide-react";

const jobs = [
  { id: 1, location: "1650 Amphitheatre Parkway, CA", technician: "John Anderson", date: "October 18, 2025", time: "11:00 am - 01:00 pm", status: "Pending" },
  { id: 2, location: "1 Infinite Loop, Cupertino, CA", technician: "Lisa Thompson", date: "October 18, 2025", time: "09:00 am - 11:00 am", status: "Completed" },
  { id: 3, location: "350 Fifth Avenue, New York, NY", technician: "Robert Williams", date: "October 18, 2025", time: "10:00 am - 12:00 pm", status: "Pending" },
  { id: 4, location: "233 S Wacker Dr, Chicago, IL", technician: "Jennifer Davis", date: "October 18, 2025", time: "1:00 pm - 03:00 pm", status: "Completed" },
  { id: 5, location: "600 Congress Ave, Austin, TX", technician: "Michael Brown", date: "October 18, 2025", time: "11:00 am - 01:00 pm", status: "Completed" },
  { id: 6, location: "1901 Main Street, Dallas, TX", technician: "Amanda Garcia", date: "October 18, 2025", time: "10:00 am - 12:00 pm", status: "Pending" },
];

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (selectedTab === "Completed") filtered = filtered.filter(j => j.status === "Completed");
    if (selectedTab === "Pending") filtered = filtered.filter(j => j.status === "Pending");
    if (searchQuery)
      filtered = filtered.filter(j =>
        j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.technician.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (statusFilter !== "All Status") filtered = filtered.filter(j => j.status === statusFilter);
    return filtered;
  }, [selectedTab, searchQuery, statusFilter]);

  const completedCount = jobs.filter(j => j.status === "Completed").length;
  const pendingCount = jobs.filter(j => j.status === "Pending").length;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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
      <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-sm h-64 sm:h-80 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12656842.462405518!2d-106.34433134999998!3d37.27560149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Assigned", value: 15, color: "blue" },
          { label: "Completed", value: 8, color: "yellow" },
          { label: "Pending", value: 7, color: "purple" }
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{card.label}</p>
              <div className={`w-12 h-12 bg-${card.color}-100 rounded-xl flex items-center justify-center`}>
                <span className={`text-${card.color}-600 font-bold text-lg`}>📊</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{card.value.toString().padStart(2, '0')}</p>
          </div>
        ))}
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg overflow-x-auto shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row px-4 sm:px-6">
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
          <table className="min-w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Technician</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Time Slot</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                    <td className="px-4 py-2 text-sm text-gray-800">{job.location}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{job.technician}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{job.date}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{job.time}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === "Completed"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                    No jobs found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
