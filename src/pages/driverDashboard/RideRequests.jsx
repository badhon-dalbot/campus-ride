import { Calendar, DollarSign, MessageCircle, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CampusRideHeader from "../../components/CampusRideHeader";
import { getAcceptedRides, getRideRequests } from "../../services/driverAPI";

export default function RideRequests() {
  const [activeTab, setActiveTab] = useState("pending");
  const [rideRequests, setRideRequests] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user")).user;

  // const rideRequests = [
  //   {
  //     id: 1,
  //     from: "Downtown",
  //     to: "North Campus",
  //     date: "Tomorrow",
  //     time: "8:00 AM",
  //     passenger: "Emily Parker",
  //     rating: 4.7,
  //     seats: 1,
  //     price: 5,
  //   },
  //   {
  //     id: 2,
  //     from: "South Apartments",
  //     to: "Engineering Building",
  //     date: "Tomorrow",
  //     time: "9:30 AM",
  //     passenger: "Jason Wong",
  //     rating: 4.9,
  //     seats: 2,
  //     price: 4,
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.id) return;
      if (activeTab === "pending") {
        const data = await getRideRequests(currentUser.id);
        setRideRequests(data);
      } else {
        const data = await getAcceptedRides(currentUser.id);
        setAcceptedRides(data);
      }
    };
    fetchData();
  }, [activeTab, currentUser?.id]);

  console.log("Ride Requests:", rideRequests);
  console.log("Accepted Rides:", acceptedRides);

  return (
    <>
      <CampusRideHeader />
      <div className="p-6 bg-white min-h-screen w-container mx-auto">
        <div className="text-sm text-gray-500 mb-2 cursor-pointer">
          <Link to="/driver/dashboard">← Back to Dashboard</Link>
        </div>
        <h1 className="text-3xl font-bold mb-5">Ride Requests</h1>

        {/* Tabs */}
        <div className="flex border rounded overflow-hidden mb-4 w-full max-w-md mx-auto">
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "pending"
                ? "bg-gray-100 text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Requests
          </button>
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "accepted"
                ? "bg-gray-100 text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("accepted")}
          >
            Accepted Requests
          </button>
        </div>

        <div className="space-y-4">
          {rideRequests.map((ride) => (
            <div
              key={ride.request_id}
              className="border rounded p-4 flex flex-col gap-3 shadow-sm"
            >
              <div>
                <p className="font-semibold">
                  {ride.from_location} to {ride.to_location}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {ride.ride_date} at{" "}
                  {ride.ride_time}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <User className="w-4 h-4" /> Passenger: {ride.rider_name}{" "}
                  <span className="text-yellow-500">★ {ride.rider_rating}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {ride.seats} seat{ride.seats > 1 ? "s" : ""}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> ${ride.price_per_seat}/seat
                </span>
              </div>

              <div className="flex justify-end gap-2">
                <button className="border border-gray-300 px-3 py-1 rounded flex items-center gap-1 text-sm">
                  <MessageCircle className="w-4 h-4" /> Message
                </button>
                <button className="bg-night-ink text-white px-4 py-1 rounded text-sm">
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
