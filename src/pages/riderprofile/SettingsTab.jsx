// components/SettingsTab.jsx
import React from 'react';
import { Eye } from 'lucide-react';

export default function SettingsTab() {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Ride Preferences</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">Receive ride suggestions</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">Auto-accept rides from trusted drivers</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Share location with emergency contacts during rides</span>
            </label>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Notifications</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">Ride confirmations</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">Driver arrival notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Promotional offers</span>
            </label>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Privacy & Security</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Profile visibility</span>
              </div>
              <select className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Students Only</option>
                <option>Drivers Only</option>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-300">
          <button className="text-red-600 hover:text-red-700 font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}