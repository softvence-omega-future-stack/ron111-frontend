// "use client";

// import { useState, useMemo } from "react";
// import { Search, Calendar, Plus, Eye, X, MapPin } from "lucide-react";

// const jobs = [
//   {
//     id: 1,
//     location: "1650 Amphitheatre Parkway, CA",
//     technician: "John Anderson",
//     date: "October 18, 2025",
//     time: "11:00 am - 01:00 pm",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     location: "1 Infinite Loop, Cupertino, CA",
//     technician: "Lisa Thompson",
//     date: "October 18, 2025",
//     time: "09:00 am - 11:00 am",
//     status: "Completed",
//   },
//   {
//     id: 3,
//     location: "350 Fifth Avenue, New York, NY",
//     technician: "Robert Williams",
//     date: "October 18, 2025",
//     time: "10:00 am - 12:00 pm",
//     status: "Pending",
//   },
//   {
//     id: 4,
//     location: "233 S Wacker Dr, Chicago, IL",
//     technician: "Jennifer Davis",
//     date: "October 18, 2025",
//     time: "1:00 pm - 03:00 pm",
//     status: "Completed",
//   },
//   {
//     id: 5,
//     location: "600 Congress Ave, Austin, TX",
//     technician: "Michael Brown",
//     date: "October 18, 2025",
//     time: "11:00 am - 01:00 pm",
//     status: "Completed",
//   },
//   {
//     id: 6,
//     location: "1901 Main Street, Dallas, TX",
//     technician: "Amanda Garcia",
//     date: "October 18, 2025",
//     time: "10:00 am - 12:00 pm",
//     status: "Pending",
//   },
// ];

// export default function DashboardPage() {
//   const [selectedTab, setSelectedTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     customerName: "",
//     phone: "",
//     email: "",
//     serviceAddress: "",
//     zipCode: "",
//     jobDescription: "",
//     date: "",
//     timeSlot: "",
//     technician: "",
//   });

//   const filteredJobs = useMemo(() => {
//     let filtered = jobs;
//     if (selectedTab === "Completed")
//       filtered = filtered.filter((j) => j.status === "Completed");
//     if (selectedTab === "Pending")
//       filtered = filtered.filter((j) => j.status === "Pending");
//     if (searchQuery)
//       filtered = filtered.filter(
//         (j) =>
//           j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           j.technician.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     if (statusFilter !== "All Status")
//       filtered = filtered.filter((j) => j.status === statusFilter);
//     return filtered;
//   }, [selectedTab, searchQuery, statusFilter]);

//   const completedCount = jobs.filter((j) => j.status === "Completed").length;
//   const pendingCount = jobs.filter((j) => j.status === "Pending").length;

//   const handleInputChange = (
//   e: React.ChangeEvent<
//     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//   >
// ) => {
//   const { name, value } = e.target;
//   setFormData((prev) => ({ ...prev, [name]: value }));
// };

//   const handleSubmit = () => {
//     console.log("New Job Data:", formData);
//     // Add your submission logic here
//     setShowModal(false);
//     document.body.style.overflow = "unset";
//     // Reset form
//     setFormData({
//       customerName: "",
//       phone: "",
//       email: "",
//       serviceAddress: "",
//       zipCode: "",
//       jobDescription: "",
//       date: "",
//       timeSlot: "",
//       technician: "",
//     });
//   };

//   const openModal = () => {
//     setShowModal(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     document.body.style.overflow = "unset";
//   };

//   return (
//     <div className="">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-center justify-center lg:items-start md:justify-between mb-6 gap-4">
//         <div className="flex flex-col items-center lg:items-start">
//           <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2 text-center">
//             <span className="text-blue-600">
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="20"
//   height="20"
//   viewBox="0 0 16 16"
//   fill="none"
// >
//   <path
//     d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V7.33333C2 7.70152 2.29848 8 2.66667 8H6C6.36819 8 6.66667 7.70152 6.66667 7.33333V2.66667C6.66667 2.29848 6.36819 2 6 2Z"
//     stroke="#8A19FB"
//     stroke-width="1.33333"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   />
//   <path
//     d="M13.3335 2H10.0002C9.63197 2 9.3335 2.29848 9.3335 2.66667V4.66667C9.3335 5.03486 9.63197 5.33333 10.0002 5.33333H13.3335C13.7017 5.33333 14.0002 5.03486 14.0002 4.66667V2.66667C14.0002 2.29848 13.7017 2 13.3335 2Z"
//     stroke="#8A19FB"
//     stroke-width="1.33333"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   />
//   <path
//     d="M13.3335 8H10.0002C9.63197 8 9.3335 8.29848 9.3335 8.66667V13.3333C9.3335 13.7015 9.63197 14 10.0002 14H13.3335C13.7017 14 14.0002 13.7015 14.0002 13.3333V8.66667C14.0002 8.29848 13.7017 8 13.3335 8Z"
//     stroke="#8A19FB"
//     stroke-width="1.33333"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   />
//   <path
//     d="M6 10.6665H2.66667C2.29848 10.6665 2 10.965 2 11.3332V13.3332C2 13.7014 2.29848 13.9998 2.66667 13.9998H6C6.36819 13.9998 6.66667 13.7014 6.66667 13.3332V11.3332C6.66667 10.965 6.36819 10.6665 6 10.6665Z"
//     stroke="#8A19FB"
//     stroke-width="1.33333"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   />
// </svg>
//             </span>{" "}
//             Dashboard Overview
//           </h1>
//           <p className="text-sm text-gray-500">
//             Summary metrics and insights across all submissions
//           </p>
//         </div>
//         <button
//           onClick={openModal}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Add New Job
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
//         <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by ZIP code or city name..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//           >
//             <option>All Status</option>
//             <option>Pending</option>
//             <option>Completed</option>
//           </select>
//           <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white">
//             <Calendar className="w-4 h-4 text-gray-500" />
//             <span>Oct 18, 2025</span>
//           </div>
//         </div>
//       </div>

//       {/* Map */}
//       <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-sm h-64 sm:h-80 md:h-96">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12656842.462405518!2d-106.34433134999998!3d37.27560149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//           className="w-full h-full"
//         ></iframe>
//       </div>

//       {/* Stats Cards */}
//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {[
//   {
//     label: "Total Assigned",
//     value: jobs.length,
//     color: "blue",
//     emoji: "👤",
//   },
//   {
//     label: "Pending",
//     value: pendingCount,
//     color: "purple",
//     emoji: "⏱",
//   },
//   {
//     label: "Completed",
//     value: completedCount,
//     color: "blue",
//     emoji: "✓",
//   },
// ].map((card) => {
//   const bgColors: Record<string, string> = {
//     blue: "bg-blue-100",
//     purple: "bg-purple-100",
//     gray: "bg-gray-100",
//   };
//   const textColors: Record<string, string> = {
//     blue: "text-blue-600",
//     purple: "text-purple-600",
//     gray: "text-gray-600",
//   };

//   return (
//     <div
//       key={card.label}
//       className="bg-white rounded-lg p-4 shadow-sm transition hover:shadow-md"
//     >
//       <div className="flex items-center justify-between mb-2">
//         <p className="text-xs text-gray-600">{card.label}</p>
//         <div
//           className={`w-8 h-8 rounded-lg flex items-center justify-center ${bgColors[card.color]}`}
//         >
//           <span className={`text-lg ${textColors[card.color]}`}>
//             {card.emoji}
//           </span>
//         </div>
//       </div>
//       <p className="text-2xl font-bold text-gray-800">
//         {card.value.toString().padStart(2, "0")}
//       </p>
//     </div>
//   );
// })}

//       </div>

//       {/* Jobs Table */}
//       <div className="w-full h-auto bg-white rounded-lg shadow-sm">
//         {/* Tabs */}
//         <div className="border-b border-gray-200">
//           <div className="flex px-4 sm:px-6">
//             {[
//               { label: "All", count: jobs.length },
//               { label: "Completed", count: completedCount },
//               { label: "Pending", count: pendingCount },
//             ].map((tab) => (
//               <button
//                 key={tab.label}
//                 onClick={() => setSelectedTab(tab.label)}
//                 className={`py-3 px-4 text-[.65rem] md:text-sm font-medium border-b-2 transition-colors text-nowrap ${
//                   selectedTab === tab.label
//                     ? "border-blue-600 text-blue-600"
//                     : "border-transparent text-gray-600 hover:text-gray-800"
//                 }`}
//               >
//                 {tab.label} ({tab.count.toString().padStart(2, "0")})
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="w-full overflow-x-auto overflow-y-visible min-h-fit">
//           <table className="w-full border-collapse">
//             <thead className="border-b border-gray-200 bg-gray-50">
//               <tr>
//                 <th className="hidden md:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
//                   Location
//                 </th>
//                 <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
//                   Technician
//                 </th>
//                 <th className="hidden md:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
//                   Date
//                 </th>
//                 <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
//                   Time Slot
//                 </th>
//                 <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
//                   Status
//                 </th>
//                 <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredJobs.length > 0 ? (
//                 filteredJobs.map((job) => (
//                   <tr
//                     key={job.id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="hidden md:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800">
//                       {job.location}
//                     </td>
//                     <td className="px-3 py-2 text-[11px] md:text-sm text-gray-800 text-nowrap">
//                       {job.technician}
//                     </td>
//                     <td className="hidden md:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800">
//                       {job.date}
//                     </td>
//                     <td className="px-3 py-2 text-[11px] md:text-sm text-gray-800 text-nowrap">
//                       {job.time}
//                     </td>
//                     <td className="px-3 py-2">
//                       <span
//                         className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] md:text-sm font-medium ${
//                           job.status === "Completed"
//                             ? "bg-blue-500 text-white"
//                             : "bg-gray-200 text-gray-700"
//                         }`}
//                       >
//                         {job.status}
//                       </span>
//                     </td>
//                     <td className="px-3 py-2">
//                       <button className="flex items-center gap-1 text-[11px] md:text-sm text-gray-600 hover:text-gray-800 transition-colors">
//                         <Eye className="w-3 h-3" /> View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-3 py-4 text-center text-[11px] md:text-sm text-gray-500"
//                   >
//                     No jobs found matching your criteria
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
//           <div
//             className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl scrollbar-hide"
//             style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           >
//             <style>{`
//               .scrollbar-hide::-webkit-scrollbar {
//                 display: none;
//               }
//             `}</style>
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Create New Job
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-4 space-y-4">
//               {/* Info Banner */}
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
//                 <div>
//                   <p className="text-sm font-medium text-blue-800">
//                     Add New Job
//                   </p>
//                   <p className="text-xs text-blue-600 mt-0.5">
//                     Enter client information and schedule appointment
//                   </p>
//                 </div>
//               </div>

//               {/* Customer Information */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                   Customer Information
//                 </h3>

//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Customer Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="customerName"
//                       value={formData.customerName}
//                       onChange={handleInputChange}
//                       placeholder="John Doe"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         Phone <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="(555) 123-4567"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="john@example.com"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Location */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <MapPin className="w-4 h-4" /> Location
//                 </h3>

//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Service Address <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="serviceAddress"
//                       value={formData.serviceAddress}
//                       onChange={handleInputChange}
//                       placeholder="123 Main Street, City, State"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       Address will be validated with Google Places
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Zip Code
//                     </label>
//                     <input
//                       type="text"
//                       name="zipCode"
//                       value={formData.zipCode}
//                       onChange={handleInputChange}
//                       placeholder="12345"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Job Details */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                   Job Details
//                 </h3>

//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Job Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="jobDescription"
//                       value={formData.jobDescription}
//                       onChange={handleInputChange}
//                       placeholder="Describe the service needed..."
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Schedule */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                   <Calendar className="w-4 h-4" /> Schedule
//                 </h3>

//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Date <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Time Slot <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="timeSlot"
//                       value={formData.timeSlot}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                     >
//                       <option value="">Select time slot</option>
//                       <option value="09:00 am - 11:00 am">
//                         09:00 am - 11:00 am
//                       </option>
//                       <option value="10:00 am - 12:00 pm">
//                         10:00 am - 12:00 pm
//                       </option>
//                       <option value="11:00 am - 01:00 pm">
//                         11:00 am - 01:00 pm
//                       </option>
//                       <option value="01:00 pm - 03:00 pm">
//                         01:00 pm - 03:00 pm
//                       </option>
//                       <option value="02:00 pm - 04:00 pm">
//                         02:00 pm - 04:00 pm
//                       </option>
//                       <option value="03:00 pm - 05:00 pm">
//                         03:00 pm - 05:00 pm
//                       </option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Assign Technician <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="technician"
//                       value={formData.technician}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                     >
//                       <option value="">Select technician</option>
//                       <option value="John Anderson">John Anderson</option>
//                       <option value="Lisa Thompson">Lisa Thompson</option>
//                       <option value="Robert Williams">Robert Williams</option>
//                       <option value="Jennifer Davis">Jennifer Davis</option>
//                       <option value="Michael Brown">Michael Brown</option>
//                       <option value="Amanda Garcia">Amanda Garcia</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Job & Send SMS
//               </button>

//               <p className="text-xs text-gray-500 text-center">
//                 SMS will be sent to assigned technician
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Calendar, Plus, Eye, X, MapPin } from "lucide-react";

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
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null); // <-- typed

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceAddress: "",
    zipCode: "",
    jobDescription: "",
    date: "",
    timeSlot: "",
    technician: "",
  });

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (selectedTab === "Completed")
      filtered = filtered.filter((j) => j.status === "Completed");
    if (selectedTab === "Pending")
      filtered = filtered.filter((j) => j.status === "Pending");
    if (searchQuery)
      filtered = filtered.filter(
        (j) =>
          j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.technician.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (statusFilter !== "All Status")
      filtered = filtered.filter((j) => j.status === statusFilter);
    return filtered;
  }, [selectedTab, searchQuery, statusFilter]);

  const completedCount = jobs.filter((j) => j.status === "Completed").length;
  const pendingCount = jobs.filter((j) => j.status === "Pending").length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Job Data:", formData);
    setShowModal(false);
    document.body.style.overflow = "unset";
    setFormData({
      customerName: "",
      phone: "",
      email: "",
      serviceAddress: "",
      zipCode: "",
      jobDescription: "",
      date: "",
      timeSlot: "",
      technician: "",
    });
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };
  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-center lg:items-start md:justify-between mb-6 gap-4">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2 text-center">
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
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.3335 2H10.0002C9.63197 2 9.3335 2.29848 9.3335 2.66667V4.66667C9.3335 5.03486 9.63197 5.33333 10.0002 5.33333H13.3335C13.7017 5.33333 14.0002 5.03486 14.0002 4.66667V2.66667C14.0002 2.29848 13.7017 2 13.3335 2Z"
                  stroke="#8A19FB"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.3335 8H10.0002C9.63197 8 9.3335 8.29848 9.3335 8.66667V13.3333C9.3335 13.7015 9.63197 14 10.0002 14H13.3335C13.7017 14 14.0002 13.7015 14.0002 13.3333V8.66667C14.0002 8.29848 13.7017 8 13.3335 8Z"
                  stroke="#8A19FB"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 10.6665H2.66667C2.29848 10.6665 2 10.965 2 11.3332V13.3332C2 13.7014 2.29848 13.9998 2.66667 13.9998H6C6.36819 13.9998 6.66667 13.7014 6.66667 13.3332V11.3332C6.66667 10.965 6.36819 10.6665 6 10.6665Z"
                  stroke="#8A19FB"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>{" "}
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500">
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
          <div className="relative" ref={statusDropdownRef}>
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center justify-between gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer min-w-[150px]"
            >
              <span className="font-medium text-gray-700">{statusFilter}</span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showStatusDropdown && (
              <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[150px]">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStatusSelect(option.value)}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      statusFilter === option.value
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        option.color === "blue"
                          ? "bg-blue-500"
                          : option.color === "yellow"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="font-medium">{option.label}</span>
                    {statusFilter === option.value && (
                      <svg
                        className="w-4 h-4 ml-auto text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Assigned",
            value: jobs.length,
            color: "blue",
            emoji: "👤",
          },
          {
            label: "Pending",
            value: pendingCount,
            color: "purple",
            emoji: "⏱",
          },
          {
            label: "Completed",
            value: completedCount,
            color: "blue",
            emoji: "✓",
          },
        ].map((card) => {
          const bgColors: Record<string, string> = {
            blue: "bg-blue-100",
            purple: "bg-purple-100",
            gray: "bg-gray-100",
          };
          const textColors: Record<string, string> = {
            blue: "text-blue-600",
            purple: "text-purple-600",
            gray: "text-gray-600",
          };

          return (
            <div
              key={card.label}
              className="bg-white rounded-lg p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-600">{card.label}</p>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    bgColors[card.color]
                  }`}
                >
                  <span className={`text-lg ${textColors[card.color]}`}>
                    {card.emoji}
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {card.value.toString().padStart(2, "0")}
              </p>
            </div>
          );
        })}
      </div>

      {/* Jobs Table */}
      <div className="w-full h-auto bg-white rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200">
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
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto overflow-y-visible min-h-fit">
          <table className="w-full border-collapse">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="hidden md:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Technician
                </th>
                <th className="hidden md:table-cell text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Time Slot
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left px-3 py-2 text-[10px] md:text-sm font-semibold text-gray-600">
                  Actions
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
                    <td className="hidden md:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800">
                      {job.location}
                    </td>
                    <td className="px-3 py-2 text-[11px] md:text-sm text-gray-800 text-nowrap">
                      {job.technician}
                    </td>
                    <td className="hidden md:table-cell px-3 py-2 text-[11px] md:text-sm text-gray-800">
                      {job.date}
                    </td>
                    <td className="px-3 py-2 text-[11px] md:text-sm text-gray-800 text-nowrap">
                      {job.time}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] md:text-sm font-medium ${
                          job.status === "Completed"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <button className="flex items-center gap-1 text-[11px] md:text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-4 text-center text-[11px] md:text-sm text-gray-500"
                  >
                    No jobs found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div
            className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-gray-800">
                Create New Job
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <Plus className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Add New Job
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    Enter client information and schedule appointment
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Customer Information
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Service Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="serviceAddress"
                      value={formData.serviceAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, City, State"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Address will be validated with Google Places
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="12345"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Job Details
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Describe the service needed..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Schedule
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Time Slot <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select time slot</option>
                      <option value="09:00 am - 11:00 am">
                        09:00 am - 11:00 am
                      </option>
                      <option value="10:00 am - 12:00 pm">
                        10:00 am - 12:00 pm
                      </option>
                      <option value="11:00 am - 01:00 pm">
                        11:00 am - 01:00 pm
                      </option>
                      <option value="01:00 pm - 03:00 pm">
                        01:00 pm - 03:00 pm
                      </option>
                      <option value="02:00 pm - 04:00 pm">
                        02:00 pm - 04:00 pm
                      </option>
                      <option value="03:00 pm - 05:00 pm">
                        03:00 pm - 05:00 pm
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Assign Technician <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="technician"
                      value={formData.technician}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select technician</option>
                      <option value="John Anderson">John Anderson</option>
                      <option value="Lisa Thompson">Lisa Thompson</option>
                      <option value="Robert Williams">Robert Williams</option>
                      <option value="Jennifer Davis">Jennifer Davis</option>
                      <option value="Michael Brown">Michael Brown</option>
                      <option value="Amanda Garcia">Amanda Garcia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Job & Send SMS
              </button>

              <p className="text-xs text-gray-500 text-center">
                SMS will be sent to assigned technician
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
