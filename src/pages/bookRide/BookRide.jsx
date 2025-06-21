import { ArrowLeft } from "lucide-react";
import ChatBox from "../chat/ChatBox.jsx";

import CampusRideFooter from "../../components/CampusRideFooter.jsx";
import CampusRideHeader from "../../components/CampusRideHeader.jsx";
import PaymentDetails from "./PaymentDetails.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import RideSummary from "./RideSummary.jsx";

export default function RideBookingApp() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Full width, no margins */}
      <CampusRideHeader />

      {/* Main Content - With page margins */}
      <div className="flex-1 bg-[#E8F1F1] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-gray-600 text-sm">
                Back to ride details
              </span>
            </div>
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
