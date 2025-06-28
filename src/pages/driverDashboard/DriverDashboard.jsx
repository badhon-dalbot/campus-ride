import axios from "axios";
import { Car, Clock, DollarSign, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import CampusRideHeader from "../../components/CampusRideHeader";
import OfferRideModal from "./OfferRide";
import QuickAction from "./QuickAction";
import Rides from "./Ride";
import SectionCard from "./SectionCard";
import StatCard from "./StatCard";
export default function DriverDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [driverData, setDriverData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")).user;

  console.log("User:", user);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        console.log("Fetching dashboard for user ID:", user.id);
        const response = await axios.get(
          `http://localhost:3000/api/driver/${user.id}/dashboard`
        );
        console.log("Fetched driver data:", response.data);
        setDriverData(response.data);
      } catch (error) {
        console.error("Failed to fetch driver data:", error);
      }
    };

    fetchDriverData();
  }, []);

  console.log("Driver Data:", driverData);

  if (!driverData) {
    return (
      <>
        <CampusRideHeader />
        <div className="bg-ice-blue min-h-screen p-6">
          <h1 className="text-xl text-center">Loading driver dashboard...</h1>
        </div>
      </>
    );
  }
  const { summary, vehicle, upcomingRides } = driverData;

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
            Welcome back, {driverData?.driver_name}!
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
            value={1}
            icon={<DollarSign />}
            subtext={`+${summary?.total_earnings} rides completed`}
          />
          <StatCard
            label="Driver Rating"
            value={summary?.average_rating}
            icon={<Star />}
            subtext={`${summary?.total_trips} total trips`}
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
            value={driverData.responseTime || 15}
            icon={<Clock />}
            subtext="Average response"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-container mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Upcoming Rides">
              {driverData.upcomingRides.map((ride) => (
                <Rides key={ride.ride_id} ride={ride} />
              ))}
            </SectionCard>

            <SectionCard title="Recent Earnings">
              {/* {summary.earng.map((e, i) => (
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
              ))} */}
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
                  {vehicle.make} {vehicle.model}
                </p>
                <p className="text-sm text-gray-500">
                  {vehicle.fuel_type} • {vehicle.color}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                License Plate:
                <span className="font-medium text-black ml-1">
                  {vehicle.license_plate}
                </span>
              </div>
            </SectionCard>

            <SectionCard title="This Week">
              <p className="text-xl font-bold text-green-600 text-center">
                ${summary?.total_earnings}
              </p>
              <div className="grid grid-cols-2 text-center text-sm mt-2">
                <div>
                  <p className="font-semibold">{summary?.total_rides}</p>
                  <p className="text-gray-500">Rides</p>
                </div>
                <div>
                  <p className="font-semibold">{summary?.total_distance}</p>
                  <p className="text-gray-500">Miles</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-1 mt-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{summary?.average_rating}</span>
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
