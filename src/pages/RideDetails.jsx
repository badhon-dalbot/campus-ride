import React from 'react';

const RideDetails = () => {
  return (
    <div className="bg-[#f4f8f9] text-[#1f2b38] font-sans min-h-screen">
      {/* Header */}
      <header className="bg-[#1f2b38] shadow-md flex justify-between items-center px-10 py-4 sticky top-0 z-50 text-white">
        <div className="text-2xl font-bold flex items-center gap-1">
          <span className="text-white">Campus</span>Ride
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-blue-300 transition">Home</a>
          <a href="#" className="hover:text-blue-300 transition">Services</a>
          <a href="#" className="hover:text-blue-300 transition">Ride</a>
          <a href="#" className="hover:text-blue-300 transition">Drive</a>
          <a href="#" className="hover:text-blue-300 transition">About Us</a>
        </nav>
        <div className="space-x-4">
          <button className="bg-[#FEFFFF] text-[#17252A] px-5 py-2 rounded-full text-sm hover:opacity-90 transition">Log in</button>
          <button className="bg-[#FEFFFF] text-[#17252A] px-5 py-2 rounded-full text-sm hover:opacity-90 transition">Sign up</button>
        </div>
      </header>

      {/* Page Title */}
      <div className="px-10 py-10">
        <h1 className="text-4xl font-bold mb-10">Ride Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Side: Ride Information */}
          <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md md:col-span-2 space-y-6">
            {/* Route Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold">Pickup</p>
                <p>Downtown</p>
              </div>
              <div>
                <p className="font-semibold">Dropoff</p>
                <p>North Campus</p>
              </div>
              <div>
                <p className="font-semibold">Date</p>
                <p>Today</p>
              </div>
              <div>
                <p className="font-semibold">Time</p>
                <p>8:00 AM</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white h-64 rounded-lg flex items-center justify-center text-gray-400">
              [Map Placeholder]
            </div>

            {/* Trip Details Heading */}
            <h2 className="text-lg font-semibold mb-4">Trip Details</h2>

            {/* Trip Details Boxes */}
            <div className="grid grid-cols-3 gap-6 text-center text-sm">
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
                <p className="text-gray-600 mb-1">Distance</p>
                <p className="font-semibold text-lg">4.5 miles</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
                <p className="text-gray-600 mb-1">Duration</p>
                <p className="font-semibold text-lg">15 minutes</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
                <p className="text-gray-600 mb-1">Available Seats</p>
                <p className="font-semibold text-lg">3</p>
              </div>
            </div>

            {/* Stops and Description */}
            {/* Stops and Description */}
<div>
  <h3 className="font-semibold mt-6 mb-1">Stops</h3>
  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
    <li>Coffee Shop</li>
    <li>Library</li>
  </ul>
  <div className="bg-white rounded-lg shadow-md p-4 mt-3 text-sm text-gray-600 italic">
    Regular commute to campus. I usually park near the Engineering building. Air conditioning, comfortable seats, and good music!
  </div>
</div>


            {/* Vehicle Information */}
            <div className="bg-white p-4 rounded-lg flex items-center gap-4 mt-6">
  <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
    CAR
  </div>
  <div>
    <h4 className="font-semibold text-sm mb-1">Vehicle Information</h4>
    <p className="text-sm text-gray-700">Toyota Prius (Blue 2020)</p>
    <p className="text-sm text-gray-500">License: ABC-1234</p>
  </div>
</div>
          </div>

          {/* Right Sidebar Cards */}
          <div className="space-y-8">
            {/* Driver Card */}
            <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Alex Johnson</p>
                  <span className="text-green-600 text-xs">✔️ Verified</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                  IMG
                </div>
              </div>
              <button className="w-full bg-white text-[#1f2b38] px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
                Contact Driver
              </button>
              {/* Warning message in box */}
              <div className="bg-white rounded-lg shadow-md p-3 mt-2 text-xs text-gray-600">
                Contact the driver to confirm pickup details before booking.
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md space-y-3">
              <div className="flex justify-between text-sm">
                <span>Ride fare</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>$0.50</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-sm">
                <span>Total</span>
                <span>$5.50</span>
              </div>
              <button className="w-full bg-[#1f2b38] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
                Book Ride
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1f2b38] text-white px-10 py-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Products</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Ride</a></li>
              <li><a href="#" className="hover:underline">Reserve</a></li>
              <li><a href="#" className="hover:underline">Share your Ride</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Travel</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">University</a></li>
              <li><a href="#" className="hover:underline">City</a></li>
              <li><a href="#" className="hover:underline">Campus</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm">CampusRide is a Community-Based Ridesharing Platform developed to empower campus commuters with smart travel options.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RideDetails;
