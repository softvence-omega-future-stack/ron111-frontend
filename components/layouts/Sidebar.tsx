"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, List, Users, Settings } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Job List", href: "/job-list", icon: List },
  { name: "Technicians", href: "/technicians", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-full flex flex-col justify-between">
      <nav className="p-4">
        <div className="space-y-1">
          {links.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-xs font-semibold text-gray-600 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Total Jobs</span>
              <span className="text-sm font-semibold text-gray-800">15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Technicians</span>
              <span className="text-sm font-semibold text-gray-800">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Efficiency</span>
              <span className="text-sm font-semibold text-green-600">↗ 87%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
