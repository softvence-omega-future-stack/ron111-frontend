"use client";

import { useState, ChangeEvent } from "react";
import { Plus, Phone, MapPin, X, Upload } from "lucide-react";
import Wrapper from "@/components/common/Wrapper";
import Link from "next/link";

type Technician = {
  id: number;
  name: string;
  role: string;
  isActive?: boolean;
  rating: number;
  phone: string;
  email: string;
  location: string;
  availability: string;
  jobsToday: number;
  completed: number;
  pending: number;
};

const technicians: Technician[] = [
  {
    id: 1,
    name: "David Mathias",
    role: "Senior",
    isActive: true,
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
    isActive: true,
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
    isActive: false,
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
    isActive: true,
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
    isActive: true,
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
    isActive: false,
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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    serviceRegion: string;
    workHours: string;
    profileImage: File | null;
  }>({
    name: "",
    phone: "",
    serviceRegion: "",
    workHours: "",
    profileImage: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = (): void => {
    console.log("New Technician Data:", formData);
    setShowModal(false);
    document.body.style.overflow = "unset";

    setFormData({
      name: "",
      phone: "",
      serviceRegion: "",
      workHours: "",
      profileImage: null,
    });
  };

  const openModal = (): void => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (): void => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  return (
      <div>
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mb-6 gap-4">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2 text-center lg:text-left">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M15.8337 17.5V15.8333C15.8337 14.9493 15.4825 14.1014 14.8573 13.4763C14.2322 12.8512 13.3844 12.5 12.5003 12.5H7.50033C6.61627 12.5 5.76842 12.8512 5.1433 13.4763C4.51818 14.1014 4.16699 14.9493 4.16699 15.8333V17.5"
                    stroke="#155DFC"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0003 9.16667C11.8413 9.16667 13.3337 7.67428 13.3337 5.83333C13.3337 3.99238 11.8413 2.5 10.0003 2.5C8.15938 2.5 6.66699 3.99238 6.66699 5.83333C6.66699 7.67428 8.15938 9.16667 10.0003 9.16667Z"
                    stroke="#155DFC"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Technician Management
            </h1>
            <p className="text-sm text-gray-500 text-center lg:text-left">
              Manage assigned technicians with per-site schedule
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-nowrap">Add Technician</span>
          </button>
        </div>

        {/* Technician Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[28rem]"
            >
              {/* Top section */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {tech.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{tech.name}</h3>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-lg text-xs font-medium text-white ${
                        tech.isActive ? "bg-blue-500" : "bg-orange-500"
                      }`}
                    >
                      {tech.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <img src="/edit.svg" alt="edit" className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <img src="/delete.svg" alt="delete" className="w-4 h-4" />
                  </button>
                  <button className="text-blue-600">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Contact & availability */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-4 h-4" />
                  {tech.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {tech.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img src="/clock.svg" alt="clock" className="w-4 h-4" />
                  {tech.availability}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between border-t border-gray-300 pt-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Jobs Today</div>
                  <div className="text-md font-bold text-gray-800">
                    {tech.jobsToday}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Completed</div>
                  <div className="text-md font-bold text-green-400">
                    {tech.completed}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Pending</div>
                  <div className="text-md font-bold text-yellow-500">
                    {tech.pending}
                  </div>
                </div>
              </div>

              {/* View schedule button */}
              <Link href="/calendar" className="w-full">
                <button className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  View Schedule
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
            <div
              className="bg-white rounded-lg w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-xl scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

              <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h2 className="text-lg font-semibold text-gray-800">
                  Add New Technician
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Service Region
                  </label>
                  <input
                    type="text"
                    name="serviceRegion"
                    value={formData.serviceRegion}
                    onChange={handleInputChange}
                    placeholder="West Coast"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Work Hours
                  </label>
                  <input
                    type="text"
                    name="workHours"
                    value={formData.workHours}
                    onChange={handleInputChange}
                    placeholder="8:00 AM - 6:00 PM"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Add Profile Picture
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden text-black"
                      id="profile-upload"
                    />
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-green-500" />
                        <p className="text-sm text-gray-600">
                          <span className="text-green-600 font-medium">
                            Drag your image here or browse
                          </span>
                        </p>
                        {formData.profileImage && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formData.profileImage.name}
                          </p>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-800 transition-all"
                >
                  Add Technician
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
