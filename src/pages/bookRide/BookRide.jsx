import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatBox from "../chat/ChatBox.jsx";

import CampusRideFooter from "../../components/CampusRideFooter.jsx";
import CampusRideHeader from "../../components/CampusRideHeader.jsx";
import { getRideById } from "../../services/rideAPI.js";
import PaymentDetails from "./PaymentDetails.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import RideSummary from "./RideSummary.jsx";

export default function RideBookingApp() {
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const data = await getRideById(rideId);
        setRide(data);
      } catch (err) {
        console.error("Error fetching ride:", err);
        setError("Ride not found or server error.");
      }
    };

    fetchRide();
  }, [rideId]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Full width, no margins */}
      <CampusRideHeader />

      {/* Main Content - With page margins */}
      <div className="flex-1 bg-[#E8F1F1] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 focus:outline-none text-gray-600 hover:text-gray-800 mb-4"
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
              <span className="font-medium">Back to ride details</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Book Your Ride
            </h1>
            <div></div>
          </div>

          <div className="flex gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              {/* Ride Summary */}
              <RideSummary ride={ride} />

              {/* Message to Driver */}

              {/* <MessageBox /> */}
              <ChatBox ride={ride?.ride} />
              {/* Payment Method */}
              <PaymentMethod />
            </div>

            {/* Right Column - Price Details */}
            <div className="w-64">
              <PaymentDetails fare={ride?.fare} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Full width, no margins */}
      <CampusRideFooter />
    </div>
  );
}
