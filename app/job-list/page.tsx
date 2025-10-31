"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Eye, Trash2 } from "lucide-react";
import Wrapper from "@/components/common/Wrapper";

const jobs = [
  {
    id: "01",
    jobId: "JOB-12223",
    customer: "John Anderson",
    contact: "(555) 111-2222\njohn@email.com",
    location: "1650 Amphitheatre Parkway, Mountain View, CA",
    dateTime: "10/18/25 - 11:00\n(Plumbing inspection)",
    technician: "John Anderson",
    status: "Pending",
    action: "Email Reminder",
  },
  {
    id: "02",
    jobId: "JOB-12224",
    customer: "Lisa Thompson",
    contact: "(555) 222-3333\nlisa@email.com",
    location: "1 Infinite Loop, Cupertino, CA",
    dateTime: "10/18/25 - 09:00\n(Drain cleaning)",
    technician: "Lisa Thompson",
    status: "Completed",
    action: "Email Reminder",
  },
  {
    id: "03",
    jobId: "JOB-12225",
    customer: "Robert Williams",
    contact: "(555) 333-4444\nrobert@email.com",
    location: "233 W Wacker Dr, Chicago, IL",
    dateTime: "10/18/25 - 14:00\n(Pipe replacement)",
    technician: "Jennifer Davis",
    status: "Pending",
    action: "View Schedule",
  },
  {
    id: "04",
    jobId: "JOB-12226",
    customer: "Jennifer Davis",
    contact: "(555) 444-5555\njennifer@email.com",
    location: "600 Congress Ave, Austin, TX",
    dateTime: "10/18/25 - 11:00\n(Water heater installation)",
    technician: "Michael Brown",
    status: "Completed",
    action: "Email Reminder",
  },
  {
    id: "05",
    jobId: "JOB-12227",
    customer: "Amanda Garcia",
    contact: "(555) 555-6666\namanda@email.com",
    location: "101 Main Street, Dallas, TX",
    dateTime: "10/18/25 - 12:00\n(Leak repair)",
    technician: "Amanda Garcia",
    status: "Pending",
    action: "Email Reminder",
  },
];

export default function JobListPage() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement | null>(null); // ✅ typed ref

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (selectedTab === "Completed") filtered = filtered.filter((j) => j.status === "Completed");
    if (selectedTab === "Pending") filtered = filtered.filter((j) => j.status === "Pending");
    if (searchQuery)
      filtered = filtered.filter(
        (j) =>
          j.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.technician.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (statusFilter !== "All Status") filtered = filtered.filter((j) => j.status === statusFilter);
    return filtered;
  }, [selectedTab, searchQuery, statusFilter]);

  const completedCount = jobs.filter((j) => j.status === "Completed").length;
  const pendingCount = jobs.filter((j) => j.status === "Pending").length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { // ✅ typed event
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusOptions = [
    { value: "All Status", label: "All Status", color: "gray" },
    { value: "Pending", label: "Pending", color: "yellow" },
    { value: "Completed", label: "Completed", color: "blue" },
  ];

  const handleStatusSelect = (value: string) => {
    setStatusFilter(value);
    setShowStatusDropdown(false);
  };

  return (
    <Wrapper>
      <div className="">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center lg:items-start">
        <h1 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2 3.3335H2.00667"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 8H2.00667"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12.6665H2.00667"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.3335 3.3335H14.0002"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.3335 8H14.0002"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.3335 12.6665H14.0002"
                stroke="#8A19FB"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          Job List
        </h1>
        <p className="text-sm text-gray-500">
          Manage and track your active and completed jobs
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Jobs", value: jobs.length,  emoji: <img src="/total.svg" alt="clipboard" className="w-10 h-10" /> },
          { label: "Assigned", value: jobs.length,  emoji: <img src="/complete.svg" alt="user" className="w-10 h-10" /> },
          { label: "Pending", value: pendingCount,  emoji: <img src="/pending.svg" alt="clock" className="w-10 h-10" /> },
          { label: "Completed", value: completedCount, emoji: <img src="/pending.svg" alt="check" className="w-10 h-10" /> },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-lg p-4 shadow-sm transition hover:shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-600">{card.label}</p>
              <div
                className={`w-8 h-8  rounded-lg flex items-center justify-center`}
              >
                <span className={`text-lg`}>{card.emoji}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {card.value.toString().padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job ID, customer, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex w-full lg:w-auto gap-4">
            <div className="relative flex-1 lg:flex-none" ref={statusDropdownRef}>
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center justify-between gap-3 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer w-full lg:min-w-[150px]"
              >
                <span className="font-medium text-gray-700">{statusFilter}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 w-full lg:min-w-[150px]">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusSelect(option.value)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                        statusFilter === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        option.color === 'blue' ? 'bg-blue-500' :
                        option.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="font-medium">{option.label}</span>
                      {statusFilter === option.value && (
                        <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <select className="px-4 py-2 border bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Technicians</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs
      <div className="border-b border-gray-200 mb-4">
        <div className="flex px-4 sm:px-6">
          {[
            { label: "All", count: jobs.length },
            { label: "Completed", count: completedCount },
            { label: "Pending", count: pendingCount },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setSelectedTab(tab.label)}
              className={`py-3 px-4 text-[.65rem] md:text-sm font-medium border-b-2 transition-colors text-nowrap ${
                selectedTab === tab.label
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label} ({tab.count.toString().padStart(2, "0")})
            </button>
          ))}
        </div>
      </div> */}

      {/* Jobs Table */}
      <div className="w-full h-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="w-full overflow-x-auto overflow-y-visible min-h-fit">
          <table className="w-full border-collapse">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="hidden lg:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Job No
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Job ID - Customer
                </th>
                <th className="hidden sm:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Contact
                </th>
                <th className="hidden lg:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="hidden lg:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Date & Time
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Technician
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="hidden lg:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800">
                      {job.id}
                    </td>

                    <td className="px-3 py-2 text-[11px] md:text-sm text-gray-800">
                      <div className="font-medium text-nowrap">{job.jobId}</div>
                      <div className="text-gray-500 text-[10px] md:text-xs">
                        {job.customer}
                      </div>
                    </td>

                    <td className="hidden sm:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800 whitespace-pre-line">
                      {job.contact}
                    </td>

                    <td className="hidden lg:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800">
                      {job.location}
                    </td>

                    <td className="hidden lg:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800 whitespace-pre-line">
                      {job.dateTime}
                    </td>

                    <td className="px-3 py-2 text-[11px] md:text-sm text-gray-800 text-nowrap">
                      {job.technician}
                    </td>

                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] md:text-sm font-medium ${
                          job.status === "Completed"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button className="text-orange-600 hover:text-orange-700 text-[11px] md:text-sm flex items-center gap-1">
                          ⚠️ {job.action}
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-4 text-center text-[11px] md:text-sm text-gray-500"
                  >
                    No jobs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Wrapper>
  );
}
