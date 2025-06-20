import { useNavigate } from "react-router-dom";
import CampusRideFooter from "../components/CampusRideFooter.jsx";
import CampusRideHeader from "../components/CampusRideHeader.jsx";

import {
  Calendar,
  CarFront,
  Clock,
  CreditCard,
  DollarSign,
  Info,
  MapPin,
  Phone,
  Route,
  StickyNote,
  UserCheck,
  Users,
} from "lucide-react";

const RideDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f4f8f9] text-[#1f2b38] font-sans min-h-screen">
      {/* Header */}
      <CampusRideHeader />

      {/* Back Button */}
      <div className="px-10 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="px-10 py-10">
        <h1 className="text-4xl font-bold mb-10 flex items-center gap-2">
          <Route size={28} />
          Ride Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Side: Ride Information */}
          <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md md:col-span-2 space-y-6">
            {/* Route Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1" size={16} />
                <div>
                  <p className="font-semibold">Pickup</p>
                  <p>Downtown</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-1" size={16} />
                <div>
                  <p className="font-semibold">Dropoff</p>
                  <p>North Campus</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-1" size={16} />
                <div>
                  <p className="font-semibold">Date</p>
                  <p>Today</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-1" size={16} />
                <div>
                  <p className="font-semibold">Time</p>
                  <p>8:00 AM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white h-64 rounded-lg flex items-center justify-center text-gray-400">
              [Map Placeholder]
            </div>

            {/* Trip Details Heading */}
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info size={18} />
              Trip Details
            </h2>

            {/* Trip Details Boxes */}
            <div className="grid grid-cols-3 gap-6 text-center text-sm">
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
                <Route className="mb-1 text-gray-500" />
                <p className="text-gray-600 mb-1">Distance</p>
                <p className="font-semibold text-lg">4.5 miles</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
                <Clock className="mb-1 text-gray-500" />
                <p className="text-gray-600 mb-1">Duration</p>
                <p className="font-semibold text-lg">15 minutes</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
                <Users className="mb-1 text-gray-500" />
                <p className="text-gray-600 mb-1">Available Seats</p>
                <p className="font-semibold text-lg">3</p>
              </div>
            </div>

            {/* Stops and Description */}
            <div>
              <h3 className="font-semibold mt-6 mb-1 flex items-center gap-1">
                <StickyNote size={16} />
                Stops
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                <li>Coffee Shop</li>
                <li>Library</li>
              </ul>
              <div className="bg-white rounded-lg shadow-md p-4 mt-3 text-sm text-gray-600 italic">
                Regular commute to campus. I usually park near the Engineering
                building. Air conditioning, comfortable seats, and good music!
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white p-4 rounded-lg flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                <CarFront />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">
                  Vehicle Information
                </h4>
                <p className="text-sm text-gray-700">
                  Toyota Prius (Blue 2020)
                </p>
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
                  <p className="font-semibold flex items-center gap-1">
                    <UserCheck size={16} />
                    Alex Johnson
                  </p>
                  <span className="text-green-600 text-xs">✔️ Verified</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                  IMG
                </div>
              </div>
              <button className="w-full bg-white text-[#1f2b38] px-4 py-2 rounded-lg text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                <Phone size={16} /> Contact Driver
              </button>
              <div className="bg-white rounded-lg shadow-md p-3 mt-2 text-xs text-gray-600">
                Contact the driver to confirm pickup details before booking.
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md space-y-3">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} /> Ride fare
                </span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} /> Service fee
                </span>
                <span>$0.50</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-sm">
                <span className="flex items-center gap-1">
                  <CreditCard size={14} /> Total
                </span>
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
      <CampusRideFooter />
    </div>
  );
};

export default RideDetails;
