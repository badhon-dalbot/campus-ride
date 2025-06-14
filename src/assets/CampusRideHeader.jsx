import React from 'react';
import { MapPin } from 'lucide-react';

export default function CampusRideHeader() {
  return (
    <header className="bg-slate-700 text-white px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MapPin size={24} className="text-slate-700" />
          </div>
          <span className="text-xl font-bold">CampusRide</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-8">
          <a href="/" className="text-white hover:text-gray-200 transition-colors font-medium">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
            Ride
          </a>
          <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
            Drive
          </a>
          <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
            About Us
          </a>
          <a href="#" className="text-white hover:text-gray-200 transition-colors font-medium">
            Log in
          </a>
          
          {/* Sign Up Button */}
          <button className="bg-white text-slate-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
}