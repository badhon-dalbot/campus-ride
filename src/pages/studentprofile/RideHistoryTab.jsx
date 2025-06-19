// components/RideHistoryTab.jsx
import React from 'react';
import { MapPin } from 'lucide-react';

export default function RideHistoryTab({ rideHistory }) {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Rides</h3>
      <div className="space-y-4">
        {rideHistory.map(ride => (
          <div key={ride.id} className="p-4 rounded-lg border border-gray-300" style={{backgroundColor: '#EBF5F5'}}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">{ride.route}</div>
                  <div className="text-sm text-gray-600">{ride.date} • Driver: {ride.driver}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{ride.cost}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                {ride.status}
              </span>
              <button className="text-gray-600 hover:text-gray-800 text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-white py-2 rounded-lg text-sm font-medium transition-colors" style={{backgroundColor: '#17252A'}}>
        View All Rides
      </button>
    </div>
  );
}