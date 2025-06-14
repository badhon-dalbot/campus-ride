import React from 'react';

const LandingPage = () => {
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
          <a href="#" className="hover:text-blue-300 transition">About Us</a>
          <a href="#" className="hover:text-blue-300 transition">Help</a>
        </nav>
        <div className="space-x-4">
          <button className="bg-[#FEFFFF] text-[#17252A] px-5 py-2 rounded-full text-sm hover:opacity-90 transition">Login</button>
          <button className="bg-[#FEFFFF] text-[#17252A] px-5 py-2 rounded-full text-sm hover:opacity-90 transition">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 px-10 py-14 items-center gap-12 bg-[#eaf4f5]">
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">Go anywhere with <span className="text-blue-700">Campus</span>Ride</h1>
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <input type="text" placeholder="Pick-up Location" className="w-full p-3 border rounded-lg text-sm" />
            <input type="text" placeholder="Drop-off Location" className="w-full p-3 border rounded-lg text-sm" />
            <div className="flex justify-between items-center pt-2">
              <button className="bg-[#17252A] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition">Ride</button>
              <button className="text-gray-600 text-sm hover:underline">See more options</button>
            </div>
          </div>
        </div>
        <div>
          <img src="/map.png" alt="Map" className="rounded-xl w-full shadow-md" />
        </div>
      </section>

      {/* Suggestions */}
      <section className="px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Rentals 🚗', desc: 'Book rentals for your journey', btn: 'See more' },
          { title: 'Reserve 📅', desc: 'Schedule your ride in advance', btn: 'Book Now' },
          { title: 'Share your Ride 🚘', desc: 'Save cost by carpooling', btn: 'Share Now' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700 mb-4">{item.desc}</p>
            <button className="bg-[#17252A] text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition">{item.btn}</button>
          </div>
        ))}
      </section>

      {/* Login Prompt */}
      <section className="bg-white px-10 py-16 flex flex-col md:flex-row justify-between items-center gap-10 rounded-t-3xl shadow-inner">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-4">Log in to see your recent activity</h2>
          <p className="text-sm text-gray-600 mb-6">View your past rides, saved locations, and booking history.</p>
          <button className="bg-[#17252A] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition">Login to CampusRide</button>
        </div>
        <img src="/app-preview.png" alt="App Preview" className="w-72 md:w-80 rounded-xl" />
      </section>

      {/* Plan & Benefits */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="font-bold text-xl mb-3">Plan for later</h3>
          <p className="text-sm text-[#4b4b4b] mb-4">Get a ride when you need it, or plan ahead with reservations.</p>
          <button className="bg-[#17252A] text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition">Reserve</button>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="font-bold text-xl mb-3">Benefits</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Save money by sharing rides</li>
            <li>Easy access through our app</li>
            <li>Fast and secure bookings</li>
          </ul>
        </div>
      </section>

      {/* Driver Call to Action */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20 items-center bg-[#f9fbfc]">
        <img src="/driver-illustration.png" alt="Driver" className="w-full rounded-xl shadow-md" />
        <div>
          <h2 className="text-3xl font-bold mb-4">Drive when you want, make what you need</h2>
          <p className="text-sm text-gray-700 mb-6">Make extra income by offering rides with CampusRide. Join our driver program today.</p>
          <button className="bg-[#17252A] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition">Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f2b38] text-white px-10 py-12">
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

export default LandingPage;
