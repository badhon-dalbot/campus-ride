import { MessageCircle } from "lucide-react";
import { useState } from "react";

import MessageBox from "./MessageBox";

export default function Rides({ ride }) {
  const [activeMessageRideId, setActiveMessageRideId] = useState(null);
  return (
    <div
      key={ride.ride_id}
      className="flex flex-col border border-night-ink p-3 rounded"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{ride.passenger}</p>
          <p className="text-sm text-gray-500">
            {ride.from_location} → {ride.to_location}
          </p>
          <p className="text-sm text-gray-500">
            {ride.ride_date} at {ride.ride_time}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs px-2 py-1 rounded ${
              ride.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {ride.status}
          </span>
          <span className="font-medium">${ride.price_per_seat}</span>
          <button
            onClick={() =>
              setActiveMessageRideId(
                activeMessageRideId === ride.id ? null : ride.id
              )
            }
          >
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {activeMessageRideId === ride.ride_id && <MessageBox ride={ride} />}
    </div>
  );
}
