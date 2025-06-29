import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { formatDateLabel } from "../utilities/dateformate.js";

const RideDetails = () => {
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [driver, setDriver] = useState(null);
  const location = useLocation();
  const rideId = localStorage.getItem("selectedRideId");
  useEffect(() => {
    const driverId = localStorage.getItem("selectedDriverId");

    // Fetch ride details
    if (rideId) {
      axios
        .get(`http://localhost:3000/api/rides/${rideId}`)
        .then((res) => {
          setRide(res.data);
          console.log("Ride data fetched:", res.data);
        })
        .catch((err) => console.error("Failed to fetch ride data", err));
    }

    // Fetch driver details
    // if (driverId) {
    //   axios
    //     .get(`http://localhost:3000/api/driver/${driverId}/profile`)
    //     .then((res) => {
    //       setDriver(res.data);
    //     })
    //     .catch((err) => console.error("Failed to fetch driver data", err));
    // }
  }, []);

  const handleBookRide = () => {
    navigate(`/bookride/${rideId}`);
  };

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
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
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
            {ride && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1" size={16} />
                  <div>
                    <p className="font-semibold">Pickup</p>
                    {ride?.ride?.start_location}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-1" size={16} />
                  <div>
                    <p className="font-semibold">Dropoff</p>
                    {ride?.ride?.destination}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="mt-1" size={16} />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p>{formatDateLabel(ride?.ride?.ride_date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-1" size={16} />
                  <div>
                    <p className="font-semibold">Time</p>
                    {ride?.ride?.ride_time &&
                      new Date(
                        `1970-01-01T${ride?.ride?.ride_time}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </div>
                </div>
              </div>
            )}

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
              {ride && (
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
                  <Users className="mb-1 text-gray-500" />
                  <p className="text-gray-600 mb-1">Available Seats</p>
                  <p className="font-semibold text-lg">
                    {ride?.ride?.seats_available}
                  </p>
                </div>
              )}
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
            {ride?.driverVehicle && (
              <div className="bg-white p-4 rounded-lg flex items-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
                  <CarFront />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    Vehicle Information
                  </h4>
                  <p className="text-sm text-gray-700">
                    {/* Toyota Prius (Blue 2020) */}
                    {ride.driverVehicle.make} {ride.driverVehicle.model} (
                    {ride.driverVehicle.color})
                  </p>
                  <p className="text-sm text-gray-500">
                    License: {ride.driverVehicle.license_plate}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Cards */}
          <div className="space-y-8">
            {/* Driver Card */}
            {ride?.driverVehicle && (
              <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold flex items-center gap-1">
                      <UserCheck size={16} />
                      {ride.driverVehicle.first_name}{" "}
                      {ride.driverVehicle.last_name}
                    </p>
                    <span className="text-green-600 text-xs">
                      {ride.driverVehicle.driver_verified
                        ? "✔️ verified"
                        : "❌ not verified"}
                    </span>
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
            )}

            {/* Price Card */}
            <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md space-y-3">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} /> Ride fare
                </span>
                {console.log("Ride fare:", ride?.fare)}
                <span>{ride?.fare}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} /> Service fee
                </span>
                <span>৳ {parseFloat(ride?.fare * 0.1)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-sm">
                <span className="flex items-center gap-1">
                  <CreditCard size={14} /> Total
                </span>
                <span>
                  {parseFloat(ride?.fare) + parseFloat(ride?.fare * 0.1)}
                </span>
              </div>
              <button
                onClick={handleBookRide}
                className="w-full bg-[#1f2b38] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
              >
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
