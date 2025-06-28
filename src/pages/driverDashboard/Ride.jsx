import { MessageCircle } from "lucide-react";
import { useState } from "react";
export default function Rides({ ride }) {
  const [activeMessageRideId, setActiveMessageRideId] = useState(null);
  const renderMessageBox = (ride) => (
    <div className="mt-4 bg-white border border-night-ink-50 p-3 rounded">
      <p className="text-sm font-medium mb-2">Message {ride.passenger}</p>
      <textarea
        className="w-full border border-gray-300 rounded p-2 text-sm"
        rows="3"
        placeholder="Type your message..."
      ></textarea>
      <div className="flex justify-end mt-2">
        <button className="bg-night-ink text-white px-3 py-1 text-sm rounded">
          Send
        </button>
      </div>
    </div>
  );

  return (
    <div
      key={ride.id}
      className="flex flex-col border border-night-ink p-3 rounded"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{ride.passenger}</p>
          <p className="text-sm text-gray-500">
            {ride.from} → {ride.to}
          </p>
          <p className="text-sm text-gray-500">
            {ride.date} at {ride.time}
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
          <span className="font-medium">${ride.price}</span>
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

      {activeMessageRideId === ride.id && renderMessageBox(ride)}
    </div>
  );
}
