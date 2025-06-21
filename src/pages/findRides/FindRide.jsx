import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Calendar, Clock, Star } from 'lucide-react';

import CampusRideFooter from '../../assets/CampusRideFooter.jsx';
import CampusRideHeader from '../../assets/CampusRideHeader.jsx';
import Filters from './Filters.jsx';
import RideOffers from './RideOffers.jsx';
import RideCard from './RideCard.jsx';

export default function FindRide() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/rides/available")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched rides:", data);
        setRides(data);
      })
      .catch(error => {
        console.error("Error fetching rides:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Full width, no margins */}
      <CampusRideHeader />

      {/* Main Content - With page margins */}
      <div className="flex-1 px-6 pl-20" style={{ backgroundColor: '#DEEEED' }}>
        {/* Back button */}
        <div className="py-4 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <ChevronLeft size={24} className="font-semibold" />
            <span className="text-lg font-medium">Back to home</span>
          </button>
        </div>

        <div className="py-3">
          <h1 className="text-3xl font-bold">Find Ride</h1>
        </div>

        <div className="flex gap-14">
          {/* Sidebar */}
          <div className="w-80 py-4">
            <Filters />
            <RideOffers />
          </div>

          {/* Main Content */}
          <div className="flex-1 py-4 pr-4">
            {/* From/To/Search Buttons */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button className="px-6 py-2.5 border-2 border-gray-200 rounded-lg flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FFFFFF' }}>
                <svg width="16" height="18" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 13.5 8 20 8 20C8 20 16 13.5 16 8C16 3.58 12.42 0 8 0ZM8 11C6.34 11 5 9.66 5 8C5 6.34 6.34 5 8 5C9.66 5 11 6.34 11 8C11 9.66 9.66 11 8 11Z" fill="#6B7280" />
                </svg>
                <span>From</span>
              </button>
              <button className="px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold shadow-sm border-2 border-gray-200 hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FFFFFF' }}>
                <svg width="16" height="18" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 13.5 8 20 8 20C8 20 16 13.5 16 8C16 3.58 12.42 0 8 0ZM8 11C6.34 11 5 9.66 5 8C5 6.34 6.34 5 8 5C9.66 5 11 6.34 11 8C11 9.66 9.66 11 8 11Z" fill="#6B7280" />
                </svg>
                <span>To</span>
              </button>
              <button
                onClick={() => alert('Searching for rides...')}
                className="px-8 py-2.5 bg-gray-900 text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Search</span>
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Available Rides</h2>
              <select className="px-4 py-2 border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FFFFFF' }}>
                <option>Newest First</option>
              </select>
            </div>

            {/* Ride Cards */}
            <div className="space-y-4 max-w-3xl">
              {rides.map((ride) => (
                <RideCard key={ride.ride_id} ride={ride} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-8 max-w-3xl">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Previous</button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 bg-black text-white rounded text-sm font-medium">1</button>
                <button className="w-8 h-8 text-sm font-medium hover:bg-gray-100 transition-colors rounded">2</button>
                <button className="w-8 h-8 text-sm font-medium hover:bg-gray-100 transition-colors rounded">3</button>
                <span className="px-2 text-sm font-normal">...</span>
                <button className="w-8 h-8 text-sm font-medium hover:bg-gray-100 transition-colors rounded">10</button>
              </div>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Full width, no margins */}
      <CampusRideFooter />
    </div>
  );
}