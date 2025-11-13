"use client";

import { useState, ChangeEvent } from "react";
import { Plus, Phone, MapPin, X, Upload } from "lucide-react";
import Link from "next/link";
import {
  useAddTechnicianMutation,
  useGetAllTechniciansQuery,
  useUpdateTechnicianMutation,
  useDeleteTechnicianMutation,
} from "@/redux/libraryApi";

type Technician = {
  id: string;
  name: string;
  phone: string;
  address?: string | null;
  workStartTime?: string;
  workEndTime?: string;
  photo?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  todayStats: {
    assigned: number;
    completed: number;
    pending: number;
  };
};

export default function TechniciansPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceRegion: "",
    startTime: "",
    endTime: "",
    profileImage: null as File | null,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  // ✅ API hooks
  const [addTechnician, { isLoading: adding }] = useAddTechnicianMutation();
  const { data, isLoading, isError } = useGetAllTechniciansQuery({});
  const [updateTechnician, { isLoading: updating }] =
    useUpdateTechnicianMutation();
  const [deleteTechnician, { isLoading: deleting }] =
    useDeleteTechnicianMutation();

  // Support different possible response shapes safely:
  // - API returns an array directly
  // - API returns { meta: Technician[] }
  // - API returns { data: Technician[] }
  let technicians: Technician[] = [];

  if (Array.isArray(data)) {
    technicians = data;
  } else if (typeof data === "object" && data !== null) {
    const obj = data as unknown as Record<string, unknown>;
    if (Array.isArray(obj.meta)) {
      technicians = obj.meta as Technician[];
    } else if (Array.isArray(obj.data)) {
      technicians = obj.data as Technician[];
    }
  }

  // ===== Handlers =====
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

  const handleSubmit = async (): Promise<void> => {
    if (!formData.name || !formData.phone || !formData.profileImage) {
      alert("Please fill in all required fields and upload a photo!");
      return;
    }

    const data = {
      name: formData.name,
      phone: formData.phone,
      address: formData.serviceRegion,
      workStartTime: convertTo24Hour(formData.startTime) || "09:00",
      workEndTime: convertTo24Hour(formData.endTime) || "18:00",
    };

    try {
      const response = await addTechnician({
        data,
        photo: formData.profileImage,
      }).unwrap();

      console.log("Technician added successfully:", response);
      alert("Technician added successfully!");

      setShowModal(false);
      // document.body.style.overflow = "unset";
      setFormData({
        name: "",
        phone: "",
        serviceRegion: "",
        startTime: "",
        endTime: "",
        profileImage: null,
      });
    } catch (error) {
      console.error("Error adding technician:", error);
      alert("Failed to add technician. Please try again.");
    }
  };

  const openModal = (): void => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (): void => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  // === EDIT ===
  const openEditModal = (tech: Technician) => {
    setSelectedTechnician(tech);
    setShowEditModal(true);
    // document.body.style.overflow = "hidden";
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedTechnician((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleEditSubmit = async () => {
    if (!selectedTechnician) return;

    const data = {
      name: selectedTechnician.name,
      phone: selectedTechnician.phone,
      address: selectedTechnician.address,
      workStartTime: convertTo24Hour(selectedTechnician.workStartTime || ""),
      workEndTime: convertTo24Hour(selectedTechnician.workEndTime || ""),
      isActive: selectedTechnician.isActive,
    };

    try {
      await updateTechnician({
        id: selectedTechnician.id,
        data,
      }).unwrap();
      alert("Technician updated successfully!");
      setShowEditModal(false);
      // document.body.style.overflow = "unset";
    } catch (error) {
      console.error("Error updating technician:", error);
      alert("Failed to update technician.");
    }
  };

  // === DELETE ===
  const openDeleteModal = (tech: Technician) => {
    setSelectedTechnician(tech);
    setShowDeleteModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = async () => {
    if (!selectedTechnician) return;
    try {
      await deleteTechnician(selectedTechnician.id).unwrap();
      alert("Technician deleted successfully!");
      setShowDeleteModal(false);
      document.body.style.overflow = "unset";
    } catch (error) {
      console.error("Error deleting technician:", error);
      alert("Failed to delete technician.");
    }
  };

  // ===== Render =====
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 font-medium">Loading technicians...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-medium">Failed to load technicians.</p>
      </div>
    );
  }

  // Convert 12-hour to 24-hour format (for backend)
  function convertTo24Hour(time: string): string {
    if (!time) return "";
    const [hoursMinutes, modifier] = time.trim().split(" ");
    const parts = hoursMinutes.split(":").map(Number);
    let hours = parts[0];
    const minutes = parts[1];

    if (modifier?.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (modifier?.toLowerCase() === "am" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  // Convert 24-hour to 12-hour format (for frontend display)
  function convertTo12Hour(time: string): string {
    if (!time) return "";
    const parts = time.split(":").map(Number);
    let hours = parts[0];
    const minutes = parts[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  }

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
          className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
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
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                {tech.photo ? (
                  <img
                    src={
                      tech.photo.startsWith("https://")
                        ? tech.photo
                        : `${process.env.NEXT_PUBLIC_BASE_URL}${tech.photo}`
                    }
                    alt={tech.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null; // prevent infinite loop
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        tech.name
                      )}&background=4F46E5&color=fff`;
                    }}
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      tech.name
                    )}&background=4F46E5&color=fff`}
                    alt={tech.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}

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
                <button
                  onClick={() => openEditModal(tech)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <img src="/edit.svg" alt="edit" className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openDeleteModal(tech)}
                  className="text-gray-400 hover:text-red-600 cursor-pointer"
                >
                  <img src="/delete.svg" alt="delete" className="w-4 h-4" />
                </button>
                <button className="text-blue-600 cursor-pointer">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                {tech.phone || "N/A"}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {tech.address || "Unknown"}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <img src="/clock.svg" alt="clock" className="w-4 h-4" />
                {tech.workStartTime && tech.workEndTime ? (
                  <>
                    {convertTo12Hour(tech.workStartTime)} -{" "}
                    {convertTo12Hour(tech.workEndTime)}
                  </>
                ) : (
                  "N/A"
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-300 pt-4 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-500">Jobs Today</div>
                <div className="text-md font-bold text-gray-800">
                  {tech.todayStats.assigned}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Completed</div>
                <div className="text-md font-bold text-green-400">
                  {tech.todayStats.completed}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Pending</div>
                <div className="text-md font-bold text-yellow-500">
                  {tech.todayStats.pending}
                </div>
              </div>
            </div>

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
            className="bg-white rounded-lg w-full max-w-sm max-h-[90vh] overflow-y-auto border border-gray-200 scrollbar-hide"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    placeholder="09:00 AM"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    placeholder="05:00 PM"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>
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
                disabled={adding}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {adding ? "Adding..." : "Add Technician"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedTechnician && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div
            className="bg-white rounded-lg w-full max-w-sm max-h-[90vh] overflow-y-auto border border-gray-200 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Technician
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedTechnician.name}
                  onChange={handleEditChange}
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
                  value={selectedTechnician.phone}
                  onChange={handleEditChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={selectedTechnician.address || ""}
                  onChange={handleEditChange}
                  placeholder="123 Main St"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    name="workStartTime"
                    value={convertTo12Hour(
                      selectedTechnician.workStartTime || ""
                    )}
                    onChange={(e) =>
                      setSelectedTechnician((prev) =>
                        prev ? { ...prev, workStartTime: e.target.value } : null
                      )
                    }
                    placeholder="09:00 AM"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    name="workEndTime"
                    value={convertTo12Hour(
                      selectedTechnician.workEndTime || ""
                    )}
                    onChange={(e) =>
                      setSelectedTechnician((prev) =>
                        prev ? { ...prev, workEndTime: e.target.value } : null
                      )
                    }
                    placeholder="05:00 PM"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleEditSubmit}
                disabled={updating}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedTechnician && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm border border-gray-200 p-5 text-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Delete Technician
            </h2>
            <p className="text-gray-600">
              Are you sure you want to delete <b>{selectedTechnician.name}</b>?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
