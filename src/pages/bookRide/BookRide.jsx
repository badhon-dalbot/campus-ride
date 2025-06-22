import { ArrowLeft } from "lucide-react";
import ChatBox from "../chat/ChatBox.jsx";
import { useNavigate } from "react-router-dom";

import CampusRideFooter from "../../components/CampusRideFooter.jsx";
import CampusRideHeader from "../../components/CampusRideHeader.jsx";
import PaymentDetails from "./PaymentDetails.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import RideSummary from "./RideSummary.jsx";

export default function RideBookingApp() {
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
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
              <RideSummary />

              {/* Message to Driver */}

              {/* <MessageBox /> */}
              <ChatBox bookingId={1} currentUserId={2} otherUserId={5} />
              {/* Payment Method */}
              <PaymentMethod />
            </div>

            {/* Right Column - Price Details */}
            <div className="w-64">
              <PaymentDetails />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Full width, no margins */}
      <CampusRideFooter />
    </div>
  );
}
