import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getTotalTrips } from "../../services/driverAPI/tripsAPI.js";
import { formatDateLabel } from "../../utilities/dateformate";
export default function RideSummary({ ride }) {
  const [totalTrips, setTotalTrips] = useState(null);
  const driverId = ride?.ride?.driver_id;
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const trips = await getTotalTrips(driverId);
        setTotalTrips(trips);
      } catch (err) {
        console.error(err);
        setError("Could not load total trips.");
      }
    };

    if (driverId) fetchTrips();
  }, [driverId]);
  return (
    <div className="bg-[#D4E4E4] rounded-lg p-5 border border-black shadow-lg">
      <h2 className="text-base font-semibold mb-4 text-gray-800">
        Ride Summary
      </h2>

      {/* Driver Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-800 text-sm">
              {ride?.ride?.driver_first_name +
                " " +
                ride?.ride?.driver_last_name}
            </div>
            <div className="text-xs text-gray-600 flex items-center">
              ⭐ {parseFloat(ride?.ride?.driver_rating).toFixed(1)} ·{" "}
              {totalTrips} trips
            </div>
          </div>
        </div>
        <div className="text-base font-bold text-gray-800">৳{ride?.fare}</div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Trip Details */}
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-gray-800">Pickup</div>
              <div className="text-xs text-gray-600">UIU campus</div>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-gray-800">Drop Off</div>
              <div className="text-xs text-gray-600">Dhanmondi</div>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="space-y-3">
          <div className="flex items-start">
            <Calendar className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-gray-800">Date</div>
              <div className="text-xs text-gray-600">
                {formatDateLabel(ride?.ride?.ride_date)}{" "}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-gray-800">Time</div>
              <div className="text-xs text-gray-600">
                {ride?.ride?.ride_time}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
