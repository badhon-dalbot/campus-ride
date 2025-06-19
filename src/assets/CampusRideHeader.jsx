import React from 'react';
import logo from './images/logo.png'; // Adjust the path to your actual logo

export default function CampusRideHeader() {
  return (
    <header className="bg-[#17252A] text-[#FEFFFF] px-8 py-2 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div>
          <img src={logo} alt="CampusRide Logo" className="w-55 h-16" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6">
          <a href="/" className="hover:text-gray-300 transition-colors font-medium">
            Home
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors font-medium">
            Services
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors font-medium">
            Ride
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors font-medium">
            Drive
          </a>
          <a href="/aboutus" className="hover:text-gray-300 transition-colors font-medium">
            About Us
          </a>
          <a href="/login" className="hover:text-gray-300 transition-colors font-medium">
            Log in
          </a>

          {/* Sign Up Button */}
          <button className="bg-white text-[#17252A] px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
}
