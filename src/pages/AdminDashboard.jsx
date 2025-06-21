import CampusRideFooter from "../components/CampusRideFooter.jsx";
import CampusRideHeader from "../components/CampusRideHeader.jsx";

import { BarChart2, DollarSign, MapPin, UserCheck, Users } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#edf7f8] p-6 font-sans">
      {/* Header Section */}
      <CampusRideHeader />
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Rides</p>
            <h2 className="text-xl font-bold">1,234</h2>
            <p className="text-xs text-blue-500">↑ 12.5% Since Last Month</p>
          </div>
          <BarChart2 className="text-yellow-500 w-8 h-8" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-xl font-bold">৳12,345</h2>
            <p className="text-xs text-blue-500">↑ 12.5% Since Last Month</p>
          </div>
          <DollarSign className="text-orange-500 w-8 h-8" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Drivers</p>
            <h2 className="text-xl font-bold">123</h2>
            <p className="text-xs text-red-500">↓ 2.5% Since Last Month</p>
          </div>
          <UserCheck className="text-blue-500 w-8 h-8" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">New Users</p>
            <h2 className="text-xl font-bold">234</h2>
            <p className="text-xs text-blue-500">↑ 12.5% Since Last Month</p>
          </div>
          <Users className="text-red-400 w-8 h-8" />
        </div>
      </div>

      {/* Active Ride Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Active Ride</h2>
            <button className="text-sm bg-[#edf7f8] px-3 py-1 rounded-md border border-gray-300">
              Today
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Ride ID</th>
                  <th>Driver</th>
                  <th>User</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "In Progress",
                  "Cancel",
                  "Picking Up",
                  "Scheduled",
                  "In Progress",
                  "Picking Up",
                ].map((status, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2">#RD7829</td>
                    <td>John Smith</td>
                    <td>Michel Brown</td>
                    <td>Downtown</td>
                    <td>Airport</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          status === "In Progress"
                            ? "bg-green-100 text-green-700"
                            : status === "Cancel"
                            ? "bg-red-100 text-red-700"
                            : status === "Picking Up"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>
                      <button className="bg-[#007bff] text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ride Map Section */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="font-semibold text-lg">Live Tracking Map</h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            Real-time vehicle location tracking will be displayed here
          </p>
        </div>
      </div>

      {/* Footer */}
      <CampusRideFooter />
    </div>
  );
};

export default AdminDashboard;
