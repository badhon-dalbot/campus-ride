import CampusRideFooter from "../components/CampusRideFooter.jsx";
import CampusRideHeader from "../components/CampusRideHeader.jsx";

import {
  Car,
  Clock,
  FileText,
  MapPin,
  Route,
  Star,
  User,
  UserCheck,
  Wallet,
} from "lucide-react";

const DriverDashboard = () => {
  return (
    <div className="bg-[#f4f8f9] text-[#1f2b38] font-sans min-h-screen flex flex-col">
      {/* Header */}
      <CampusRideHeader />

      {/* Page Content */}
      <main className="px-6 py-10 md:px-20 space-y-10 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
          <div className="bg-[#eaf4f5] p-4 rounded-xl shadow text-center text-sm space-y-2">
            <UserCheck className="mx-auto text-[#1f2b38]" />
            <p className="font-semibold">Status :</p>
            <p>Active / Available</p>
          </div>
          <div className="bg-[#eaf4f5] p-4 rounded-xl shadow text-center text-sm space-y-2">
            <Car className="mx-auto text-[#1f2b38]" />
            <p className="font-semibold">Total Rides :</p>
            <p>126</p>
          </div>
          <div className="bg-[#eaf4f5] p-4 rounded-xl shadow text-center text-sm space-y-2">
            <Star className="mx-auto text-yellow-500" />
            <p className="font-semibold">Rating :</p>
            <p>⭐ 4.7</p>
          </div>
          <div className="bg-[#eaf4f5] p-4 rounded-xl shadow text-center text-sm space-y-2">
            <Wallet className="mx-auto text-[#1f2b38]" />
            <p className="font-semibold">Total Earnings :</p>
            <p>৳ 4570</p>
          </div>
        </div>

        {/* Google Map Embed Placeholder */}
        <div className="bg-white p-4 rounded-xl shadow-md text-center w-full max-w-4xl">
          <div className="flex justify-center items-center gap-2 mb-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Google maps embed</span>
          </div>
          <div className="bg-gray-200 h-32 w-full rounded-lg" />
        </div>

        {/* Incoming Ride Request Box */}
        <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 w-full max-w-xl transform transition duration-300 hover:scale-[1.015] hover:shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Incoming Ride Request
          </h2>
          <div className="bg-[#eaf4f5] rounded-lg p-6 space-y-4 text-center">
            <div className="space-y-1">
              <p>
                <MapPin className="inline w-4 h-4 mr-1" />
                <span className="font-semibold">Pickup :</span> CSE Department
              </p>
              <p>
                <Route className="inline w-4 h-4 mr-1" />
                <span className="font-semibold">Drop Off :</span> Female
                Dormitory
              </p>
              <p>
                <User className="inline w-4 h-4 mr-1" />
                <span className="font-semibold">Passenger :</span> Nashita A.
              </p>
              <p>
                <Clock className="inline w-4 h-4 mr-1" />
                <span className="font-semibold">Estimated :</span> 12 km
              </p>
            </div>
            <div className="flex justify-center gap-6 pt-3">
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
                Accept
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
                Decline
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Info Card */}
        <div className="bg-[#eaf4f5] p-6 rounded-xl shadow-md text-center space-y-2 max-w-md w-full">
          <p className="font-semibold text-lg flex items-center justify-center gap-2">
            <Car className="w-5 h-5" /> Vehicle: Toyota Aqua
          </p>
          <p>
            <span className="font-medium">Plate No. :</span> DK 20-XXXX
          </p>
          <p>
            <span className="font-medium">Verification :</span>{" "}
            <span className="text-green-600 text-sm">✔️ Verified</span>
          </p>
        </div>

        {/* Ride History */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" /> Ride History
            </h2>
            <span className="text-sm text-gray-500">view all</span>
          </div>
          <table className="w-full text-sm text-left border-t">
            <thead>
              <tr className="text-gray-600">
                <th className="py-2">Date</th>
                <th>From</th>
                <th>To</th>
                <th>Fare (৳)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2">25-Apr-2025</td>
                <td>Library</td>
                <td>TSC</td>
                <td>80</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">17-Apr-2025</td>
                <td>Admin Building</td>
                <td>Student Hall</td>
                <td>45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <CampusRideFooter />
    </div>
  );
};

export default DriverDashboard;
