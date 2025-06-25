import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

// Import all components from the chatting folder
import CampusRideFooter from "../../components/CampusRideFooter";
import CampusRideHeader from "../../components/CampusRideHeader";
import ActiveRide from "./ActiveRide";
import PastRideChat from "./PastRideChat";
import SafetyGuidelines from "./SafetyGuidelines";

export default function RideTracker() {
  // State for selected past ride to show in right panel (null means no panel shown)
  const [selectedPastRide, setSelectedPastRide] = useState(null);

  // User role - 'driver' or 'passenger'
  const [userRole] = useState("driver"); // Change to 'driver' to test driver view
  const user = localStorage.getItem("user");
  const driverId = user ? JSON.parse(user).user.id : null; // Get driver ID from local storage
  console.log("Driver ID:", driverId);

  const [activeRides, setActiveRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [activeRes, pastRes] = await Promise.all([
          axios.get(
            `http://localhost:3000/api/driver/${driverId}/active-rides`
          ),
          axios.get(`/api/driver/${driverId}/past-rides`),
        ]);
        console.log("Active Rides Response:", activeRes.data);
        setActiveRides(activeRes.data); // 👉 shape must match <ActiveRide/>
        setPastRides(pastRes.data); // 👉 id, route, contact, etc.
      } catch (err) {
        console.error(err);
        setError("Failed to load rides. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [driverId]);

  // Function to select a past ride and show it in right panel
  const handleSelectPastRide = (ride) => {
    setSelectedPastRide(ride);
  };

  // Function to close past ride chat
  const handleClosePastRideChat = () => {
    setSelectedPastRide(null);
  };
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading rides…
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#EBF5F5" }}
    >
      {/* Header */}
      <CampusRideHeader />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">My Rides</span>
          </button>

          {/* Dynamic Layout: Single column when no past ride selected, two columns when selected */}
          <div
            className={`grid gap-6 ${
              selectedPastRide ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {/* Main Column */}
            <div className="space-y-6">
              {/* Active Rides - Show all active rides */}
              {activeRides.map((ride) => (
                <ActiveRide
                  key={ride.ride_id}
                  ride={ride}
                  userRole={userRole}
                  bookingId={ride.passengers[0]?.booking_id}
                  // onSendMessage={handleSendMessage}
                />
              ))}

              {/* Recent Ride Communications List */}
              {/* <PastRidesList
                pastRides={pastRides}
                selectedPastRide={selectedPastRide}
                onSelectPastRide={handleSelectPastRide}
              /> */}
            </div>

            {/* Right Column - Past Ride Chat (Only appears when a past ride is selected) */}
            <PastRideChat
              selectedPastRide={selectedPastRide}
              userRole={userRole}
              onClose={handleClosePastRideChat}
            />
          </div>

          {/* Safety Guidelines */}
          <SafetyGuidelines />
        </div>
      </div>

      {/* Footer */}
      <CampusRideFooter />
    </div>
  );
}
