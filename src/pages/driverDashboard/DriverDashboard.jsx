import axios from "axios";
import { Car, Clock, DollarSign, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import CampusRideHeader from "../../components/CampusRideHeader";
import OfferRideModal from "./OfferRide";
import QuickAction from "./QuickAction";
import Rides from "./Ride";
import SectionCard from "./SectionCard";
import StatCard from "./StatCard";

export default function DriverDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn, loading: authLoading } = useAuth(); // Get user and loading from AuthContext

  const fetchDriverData = async () => {
    // Check if user is available from AuthContext
    if (!user || !user.user || !user.user.id) {
      console.log("No user data available from AuthContext:", user);
      setError("User data not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching dashboard for user ID:", user.user.id);
      const response = await axios.get(
        `http://localhost:3000/api/driver/${user.user.id}/dashboard`
      );
      console.log("Fetched driver data:", response.data);
      setDriverData(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch driver data:", error);
      setError("Failed to load driver dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch data if user is logged in and user data is available
    if (isLoggedIn && user) {
      fetchDriverData();
    } else if (!isLoggedIn && !authLoading) {
      setError("Please login to access the driver dashboard.");
      setLoading(false);
    }
  }, [user, isLoggedIn, authLoading]);

  console.log("AuthContext User:", user);
  console.log("Is Logged In:", isLoggedIn);
  console.log("Auth Loading:", authLoading);
  console.log("Driver Data:", driverData);
  console.log("Complete Backend Response:", JSON.stringify(driverData, null, 2));

  // Show loading state while AuthContext is loading or driver data is being fetched
  if (authLoading || loading) {
    return (
      <>
        <CampusRideHeader />
        <div className="bg-ice-blue min-h-screen p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-night-ink mx-auto mb-4"></div>
              <h1 className="text-xl">
                {authLoading ? "Checking authentication..." : "Loading driver dashboard..."}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <CampusRideHeader />
        <div className="bg-ice-blue min-h-screen p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h1 className="text-xl text-red-600 mb-4">{error}</h1>
              <button 
                onClick={() => window.location.href = '/login'} 
                className="bg-night-ink text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show loading state while driver data is being fetched
  if (!driverData) {
    return (
      <>
        <CampusRideHeader />
        <div className="bg-ice-blue min-h-screen p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-night-ink mx-auto mb-4"></div>
              <h1 className="text-xl">Loading driver data...</h1>
            </div>
          </div>
        </div>
      </>
    );
  }

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
            Welcome back, {driverData?.summary?.driver_name || user?.user?.name || "Driver"}!
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
            value={`$${parseFloat(driverData?.summary?.total_earnings || 0).toFixed(2)}`}
            icon={<DollarSign />}
            subtext={`${driverData?.summary?.total_bookings || 0} rides completed`}
          />
          <StatCard
            label="Driver Rating"
            value={parseFloat(driverData?.summary?.average_rating || 0).toFixed(2)}
            icon={<Star />}
            subtext={`${driverData?.summary?.total_trips || 0} total trips`}
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
            value={`${driverData?.responseTime || 15}m`}
            icon={<Clock />}
            subtext="Average response"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-container mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Upcoming Rides">
              {driverData.upcomingRides && driverData.upcomingRides.length > 0 ? (
                driverData.upcomingRides.map((ride) => (
                  <Rides key={ride.ride_id} ride={ride} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No upcoming rides scheduled</p>
                </div>
              )}
            </SectionCard>

            <SectionCard title="Recent Earnings">
              {driverData.recentEarnings && driverData.recentEarnings.length > 0 ? (
                driverData.recentEarnings.map((earning, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center w-container mx-auto"
                  >
                    <div>
                      <p>{new Date(earning.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{earning.rides} rides</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${parseFloat(earning.amount || 0).toFixed(2)}</p>
                      <div className="w-24 bg-gray-200 h-2 rounded-full mt-1">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.min((earning.amount / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No recent earnings data</p>
                </div>
              )}
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="Quick Actions">
              <QuickAction
                label="View Ride Requests"
                icon={<Users />}
                badge={driverData.pendingRequests || 0}
              />
              <QuickAction label="View Earnings" icon={<DollarSign />} />
              <QuickAction label="Manage Vehicle" icon={<Car />} />
            </SectionCard>

            <SectionCard title="Your Vehicle">
              {driverData.vehicle ? (
                <>
                  <div className="mb-2">
                    <p className="font-medium">
                      {driverData.vehicle.make} {driverData.vehicle.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {driverData.vehicle.fuel_type} • {driverData.vehicle.color}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    License Plate:
                    <span className="font-medium text-black ml-1">
                      {driverData.vehicle.license_plate}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No vehicle information available</p>
                </div>
              )}
            </SectionCard>

            <SectionCard title="This Week">
              <p className="text-xl font-bold text-green-600 text-center">
                ${parseFloat(driverData?.summary?.total_earnings || 0).toFixed(2)}
              </p>
              <div className="grid grid-cols-2 text-center text-sm mt-2">
                <div>
                  <p className="font-semibold">{driverData?.summary?.total_trips || 0}</p>
                  <p className="text-gray-500">Rides</p>
                </div>
                <div>
                  <p className="font-semibold">{driverData?.summary?.total_bookings || 0}</p>
                  <p className="text-gray-500">Bookings</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-1 mt-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{parseFloat(driverData?.summary?.average_rating || 0).toFixed(2)}</span>
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
          onRideCreated={fetchDriverData}
        />
      )}
    </>
  );
}
