import { Car, Clock, DollarSign, Star, Users } from "lucide-react";
import { useState } from "react";
import CampusRideHeader from "../../components/CampusRideHeader";
import OfferRideModal from "./OfferRide";
import QuickAction from "./QuickAction";
import Rides from "./Ride";
import SectionCard from "./SectionCard";
import StatCard from "./StatCard";
export default function DriverDashboard() {
  const [driverData] = useState({
    name: "Alex Johnson",
    rating: 4.8,
    totalTrips: 127,
    recentEarnings: [
      { date: "Today", amount: 23.5, rides: 4 },
      { date: "Yesterday", amount: 31.25, rides: 5 },
      { date: "Dec 22", amount: 28.75, rides: 4 },
      { date: "Dec 21", amount: 35.0, rides: 6 },
      { date: "Dec 20", amount: 42.25, rides: 7 },
    ],
    upcomingRides: [
      {
        id: 1,
        passenger: "Emily Parker",
        from: "Downtown",
        to: "North Campus",
        time: "8:00 AM",
        date: "Today",
        price: 5,
        status: "confirmed",
      },
      {
        id: 2,
        passenger: "Jason Wong",
        from: "South Apartments",
        to: "Engineering Building",
        time: "9:30 AM",
        date: "Today",
        price: 4,
        status: "confirmed",
      },
      {
        id: 3,
        passenger: "Maria Garcia",
        from: "Library",
        to: "Student Center",
        time: "2:15 PM",
        date: "Tomorrow",
        price: 3.5,
        status: "pending",
      },
    ],
    pendingRequests: 3,
    weeklyStats: {
      totalEarnings: 245.75,
      totalRides: 26,
      totalDistance: 156,
      avgRating: 4.8,
    },
    vehicle: {
      make: "Toyota",
      model: "Prius",
      year: 2020,
      color: "Blue",
      licensePlate: "ABC-1234",
      fuelEfficiency: "52 MPG",
    },
    responseTime: "2 min",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get("/api/driver/profile"); // Replace with your actual endpoint
        setDriverData(response.data);
      } catch (error) {
        console.error("Failed to fetch driver data:", error);
      }
    };

    fetchDriverData();
  }, []);

  console.log("Driver Data:", driverData);

  return (
    <>
      <CampusRideHeader />
      <div
        className={`bg-ice-blue min-h-screen p-6 transition duration-300 ${
          isModalOpen === true ? "blur-sm" : ""
        }`}
      >
        <header className="flex justify-between items-center mb-12 w-container mx-auto">
          <h1 className="text-2xl font-bold">
            Welcome back, {driverData.name}!
          </h1>
          <div className="space-x-2">
            <button
              className="bg-night-ink text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Offer New Ride
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 w-container mx-auto">
          <StatCard
            label="Today's Earnings"
            value={`$${driverData.recentEarnings[0].amount}`}
            icon={<DollarSign />}
            subtext={`+${driverData.recentEarnings[0].rides} rides completed`}
          />
          <StatCard
            label="Driver Rating"
            value={driverData.rating}
            icon={<Star />}
            subtext={`${driverData.totalTrips} total trips`}
          />
          <StatCard
            label="Completion Rate"
            value="96%"
            icon={<Clock />}
            subtext={
              <div className="w-full bg-gray-200 h-1 rounded">
                <div className="bg-night-ink h-1 rounded w-11/12"></div>
              </div>
            }
          />
          <StatCard
            label="Response Time"
            value={driverData.responseTime}
            icon={<Clock />}
            subtext="Average response"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-container mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Upcoming Rides">
              {driverData.upcomingRides.map((ride) => (
                <Rides key={ride.id} ride={ride} />
              ))}
            </SectionCard>

            <SectionCard title="Recent Earnings">
              {driverData.recentEarnings.map((e, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center w-container mx-auto"
                >
                  <div>
                    <p>{e.date}</p>
                    <p className="text-sm text-gray-500">{e.rides} rides</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${e.amount}</p>
                    <div className="w-24 bg-gray-200 h-2 rounded-full mt-1">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(e.amount / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="Quick Actions">
              <QuickAction
                label="View Ride Requests"
                icon={<Users />}
                badge={driverData.pendingRequests}
              />
              <QuickAction label="View Earnings" icon={<DollarSign />} />
              <QuickAction label="Manage Vehicle" icon={<Car />} />
            </SectionCard>

            <SectionCard title="Your Vehicle">
              <div className="mb-2">
                <p className="font-medium">
                  {driverData.vehicle.make} {driverData.vehicle.model}
                </p>
                <p className="text-sm text-gray-500">
                  {driverData.vehicle.year} • {driverData.vehicle.color}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                License Plate:{" "}
                <span className="font-medium text-black ml-1">
                  {driverData.vehicle.licensePlate}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Fuel Efficiency:{" "}
                <span className="font-medium text-black ml-1">
                  {driverData.vehicle.fuelEfficiency}
                </span>
              </div>
            </SectionCard>

            <SectionCard title="This Week">
              <p className="text-xl font-bold text-green-600 text-center">
                ${driverData.weeklyStats.totalEarnings}
              </p>
              <div className="grid grid-cols-2 text-center text-sm mt-2">
                <div>
                  <p className="font-semibold">
                    {driverData.weeklyStats.totalRides}
                  </p>
                  <p className="text-gray-500">Rides</p>
                </div>
                <div>
                  <p className="font-semibold">
                    {driverData.weeklyStats.totalDistance}
                  </p>
                  <p className="text-gray-500">Miles</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-1 mt-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{driverData.weeklyStats.avgRating}</span>
                <span className="text-gray-500">avg rating</span>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <OfferRideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
