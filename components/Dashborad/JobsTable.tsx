"use client";

import { Eye, MapPin } from "lucide-react";

interface Job {
  id: number;
  jobNo: string;
  city: string;
  state: string;
  zip: string;
  status: string;
  date: string;
}

interface Props {
  filteredJobs: Job[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function JobsTable({ filteredJobs, activeTab, setActiveTab }: Props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Tabs */}
      <div className="border-b bg-gray-50 flex justify-between px-4 py-2">
        <div className="flex gap-4">
          {["All", "Pending", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Job No</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">City</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">State</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">ZIP</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Status</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-800">{job.jobNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{job.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{job.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{job.zip}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{job.date}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <Eye className="w-4 h-4 inline-block" />
                    </button>
                    <button className="ml-3 text-gray-600 hover:text-gray-800 transition">
                      <MapPin className="w-4 h-4 inline-block" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-sm text-gray-500 py-6">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
