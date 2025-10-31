"use client";

import { useState } from "react";
import { Key, Bell, Building, Sparkles, MapPin } from "lucide-react";

export default function SettingsPage() {
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoTerminate, setAutoTerminate] = useState(false);
  const [routeOptimize, setRouteOptimize] = useState(false);
  const [realTimeTracking, setRealTimeTracking] = useState(true);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center lg:items-start justify-between">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-1 gap-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.05893 3.44663C8.10485 2.96358 8.32921 2.515 8.68818 2.18853C9.04716 1.86206 9.51495 1.68115 10.0002 1.68115C10.4854 1.68115 10.9532 1.86206 11.3122 2.18853C11.6712 2.515 11.8955 2.96358 11.9414 3.44663C11.969 3.75868 12.0714 4.05948 12.2399 4.32358C12.4084 4.58768 12.638 4.8073 12.9093 4.96386C13.1807 5.12042 13.4857 5.2093 13.7987 5.22298C14.1116 5.23666 14.4233 5.17474 14.7073 5.04246C15.1482 4.84228 15.6478 4.81331 16.1089 4.9612C16.57 5.10909 16.9596 5.42326 17.2019 5.84255C17.4441 6.26185 17.5217 6.75627 17.4195 7.22961C17.3173 7.70294 17.0426 8.12131 16.6489 8.4033C16.3926 8.58317 16.1833 8.82214 16.0389 9.09998C15.8944 9.37783 15.819 9.68639 15.819 9.99955C15.819 10.3127 15.8944 10.6213 16.0389 10.8991C16.1833 11.177 16.3926 11.4159 16.6489 11.5958C17.0426 11.8778 17.3173 12.2962 17.4195 12.7695C17.5217 13.2428 17.4441 13.7372 17.2019 14.1565C16.9596 14.5758 16.57 14.89 16.1089 15.0379C15.6478 15.1858 15.1482 15.1568 14.7073 14.9566C14.4233 14.8244 14.1116 14.7624 13.7987 14.7761C13.4857 14.7898 13.1807 14.8787 12.9093 15.0352C12.638 15.1918 12.4084 15.4114 12.2399 15.6755C12.0714 15.9396 11.969 16.2404 11.9414 16.5525C11.8955 17.0355 11.6712 17.4841 11.3122 17.8106C10.9532 18.137 10.4854 18.3179 10.0002 18.3179C9.51495 18.3179 9.04716 18.137 8.68818 17.8106C8.32921 17.4841 8.10485 17.0355 8.05893 16.5525C8.03138 16.2403 7.92901 15.9394 7.76049 15.6752C7.59196 15.411 7.36224 15.1913 7.09079 15.0347C6.81934 14.8782 6.51416 14.7893 6.20108 14.7757C5.88801 14.7621 5.57627 14.8242 5.29227 14.9566C4.85134 15.1568 4.3517 15.1858 3.8906 15.0379C3.42949 14.89 3.03991 14.5758 2.79767 14.1565C2.55543 13.7372 2.47786 13.2428 2.58007 12.7695C2.68227 12.2962 2.95693 11.8778 3.3506 11.5958C3.60695 11.4159 3.81621 11.177 3.96067 10.8991C4.10514 10.6213 4.18056 10.3127 4.18056 9.99955C4.18056 9.68639 4.10514 9.37783 3.96067 9.09998C3.81621 8.82214 3.60695 8.58317 3.3506 8.4033C2.95749 8.12117 2.68331 7.70296 2.58135 7.22995C2.47939 6.75694 2.55694 6.26291 2.79892 5.84389C3.0409 5.42487 3.43003 5.11078 3.89067 4.96266C4.35132 4.81455 4.85059 4.84299 5.29143 5.04246C5.5754 5.17474 5.88705 5.23666 6.20002 5.22298C6.51298 5.2093 6.81804 5.12042 7.08938 4.96386C7.36072 4.8073 7.59034 4.58768 7.75882 4.32358C7.9273 4.05948 8.02967 3.75868 8.05727 3.44663"
                stroke="#155DFC"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                stroke="#155DFC"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>{" "}
          Settings
        </h1>
        <p className="text-sm text-gray-500 text-center lg:text-left">
          Configure your platform settings and integrations
        </p>
      </div>

      <div className="space-y-6">
        {/* API Configuration */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4 pb-8 border-b border-gray-200">
            <Key className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              API Configuration
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps API Key
              </label>
              <input
                type="text"
                placeholder="Required for address validation and distance features"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twilio API Key (SMS)
              </label>
              <input
                type="text"
                placeholder="Enter Twilio key for SMS notifications"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twilio Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (XXX) XXX-XXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Route Optimization */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4 pb-8 border-b border-gray-200">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Route Optimization
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Search Radius (miles)
              </label>
              <input
                type="text"
                placeholder="Distance to search for nearby jobs when creating new appointments"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Time Slots
              </label>
              <div className="space-y-2">
                <p className="text-xs text-gray-500">
                  Predefined time slots for newly scheduled appointments
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  <div>• 8:00 AM - 10:00 AM</div>
                  <div>• 2:00 PM - 4:00 PM</div>
                  <div>• 10:00 AM - 12:00 PM</div>
                  <div>• 4:00 PM - 6:00 PM</div>
                  <div>• 12:00 PM - 2:00 PM</div>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-between gap-2 p-2 border border-gray-100 rounded-xl text-sm text-blue-600 hover:text-blue-700 font-medium">
              <span>🕐</span>
              Customize Time Slots
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4 pb-8 border-b border-gray-200">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Notifications
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Notifications
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Send text notifications when jobs are newly created
                </p>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={smsNotifications}
                      onChange={(e) => setSmsNotifications(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        smsNotifications ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          smsNotifications ? "transform translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Notifications
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Send email notifications to customers
                </p>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        emailNotifications ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          emailNotifications ? "transform translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4 pb-8 border-b border-gray-200">
            <Building className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Company Information
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Address
              </label>
              <input
                type="text"
                placeholder="123 Main St, Suite 456, ZIP"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4 pb-8 border-b border-purple-200">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Advanced Features
            </h2>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-assign Technicians
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Automatically assign jobs nearer to available (no overtime)
                </p>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={autoTerminate}
                      onChange={(e) => setAutoTerminate(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        autoTerminate ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          autoTerminate ? "transform translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Route Optimization
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Automatically optimize routes for assigned jobs
              </p>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={routeOptimize}
                    onChange={(e) => setRouteOptimize(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    routeOptimize ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      routeOptimize ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Real-time Tracking
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Share live location of workers at road time
                </p>
              </div>
              <div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={realTimeTracking}
                      onChange={(e) => setRealTimeTracking(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition-colors ${
                        realTimeTracking ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          realTimeTracking ? "transform translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center md:justify-end gap-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Reset to Default
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
