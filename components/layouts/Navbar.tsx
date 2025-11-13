"use client";

import { MapPin, LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useLogoutUserMutation,
  useGetUserProfileQuery,
} from "@/redux/libraryApi";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  });

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const [showModal, setShowModal] = useState(false);

  const { data: userResponse, isLoading: profileLoading } =
    useGetUserProfileQuery(undefined, {
      skip: !token,
      refetchOnMountOrArgChange: true,
    });

  const user = userResponse?.data || userResponse;

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setToken(null);
      router.replace("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed!");
    }
  };

  if (profileLoading) return null;

  return (
    <>
      <header className="bg-white border-b border-gray-100 h-16 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-semibold text-gray-800 text-base">
                Dispatch Bros
              </h1>
              <p className="text-xs text-gray-500">Job Scheduling Platform</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Loading..."}
              </p>
              <p className="text-xs text-gray-500">{user?.role || ""}</p>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
              {user?.photo ? (
                <Image
                  src={user.photo}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  unoptimized={true}
                />
              ) : user?.name ? (
                user.name.slice(0, 2).toUpperCase()
              ) : (
                "NA"
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setShowModal(true)}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
