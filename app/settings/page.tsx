"use client";

import { useState } from "react";
import { Key, Bell, Building, Sparkles } from "lucide-react";

export default function SettingsPage() {
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoTerminate, setAutoTerminate] = useState(false);
  const [realTimeTracking, setRealTimeTracking] = useState(true);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <span className="text-blue-600">⚙️</span> Settings
        </h1>
        <p className="text-sm text-gray-500">Configure your platform settings and integrations</p>
      </div>

      <div className="space-y-6">
        {/* API Configuration */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">API Configuration</h2>
          </div>

          <div className="space-y-4">
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
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🗺️</span>
            <h2 className="text-lg font-semibold text-gray-800">Route Optimization</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Handoff Radius (Miles)
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
                <p className="text-xs text-gray-500">Predefined time slots for newly scheduled appointments</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>• 8:00 AM - 10:00 AM</div>
                  <div>• 2:00 PM - 4:00 PM</div>
                  <div>• 10:00 AM - 12:00 PM</div>
                  <div>• 4:00 PM - 6:00 PM</div>
                  <div>• 12:00 PM - 2:00 PM</div>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <span>🕐</span>
              Customize Time Slots
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
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
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      smsNotifications ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
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
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      emailNotifications ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </label>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Company Information</h2>
          </div>

          <div className="space-y-4">
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
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Advanced Features</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-assign Techniques
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
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    autoTerminate ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      autoTerminate ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </label>
              </div>
            </div>
            {/* <div className="flex items-center justify-between">
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
                    checked={autoTerminate}
                    onChange={(e) => setAutoTerminate(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    autoTerminate ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      autoTerminate ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </label>
              </div>
            </div> */}
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
                    checked={autoTerminate}
                    onChange={(e) => setAutoTerminate(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    realTimeTracking ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      realTimeTracking ? 'transform translate-x-5' : ''
                    }`}></div>
                  </div>
                </div>
              </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
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