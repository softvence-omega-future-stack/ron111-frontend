"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hide layout on login and forgot password pages
  if (pathname === "/login" || pathname === "/forget-password") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Mobile Menu Button (below navbar) */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 flex items-center px-2 py-2">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed top-16 lg:top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-100 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <Sidebar />
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "blur-sm lg:blur-0" : ""
        } mt-[4.5rem] lg:mt-16 lg:ml-64 p-4 sm:p-6`}
      >
        {children}
      </main>

      {/* Slide Animation */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
