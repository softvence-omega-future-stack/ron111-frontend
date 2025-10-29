"use client";

import { MapPin, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-100 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-800 text-base">Route Optima</h1>
            <p className="text-xs text-gray-500">Job Scheduling Platform</p>
          </div>
        </div>

        {/* Right side - User Info */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Dispatcher</p>
          </div>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            AU
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
