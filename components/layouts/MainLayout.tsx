"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide layout on login and forgot password pages
  if (pathname === "/login" || pathname === "/forget-password") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Full Width at Top */}
      <Navbar />
      
      <div className="flex">
        {/* Sidebar - Below Navbar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}