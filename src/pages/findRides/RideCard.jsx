import { Calendar, Clock } from 'lucide-react';
import { renderStars } from './renderStar.jsx';
export default function RideCard({ ride }) {
  return (
    <div key={ride.ride_id} className="rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow w-full" style={{ backgroundColor: '#FFFFFF' }}>
      <h3 className="font-bold text-base mb-3">
        {ride.start_location} → {ride.destination}
      </h3>
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-2 font-medium">
          <Calendar size={16} />
          <span>{ride.ride_date.substring(0, 10)}</span>
        </span>
        <span className="flex items-center gap-2 font-medium">
          <Clock size={16} />
          <span>
            {ride.ride_time
              ? new Date(`2025-06-15T${ride.ride_time}Z`).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })
              : 'N/A'
            }
          </span>
        </span>
        <span className="flex items-center gap-2 font-medium">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>{ride.seats_available} seats</span>
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4 font-normal leading-relaxed">
        {ride.pickup_description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`https://i.pravatar.cc/150?u=${ride.driver_first_name}`}
            alt={ride.driver_first_name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{ride.driver_first_name} {ride.driver_last_name}</p>
            <div className="flex items-center gap-1">
              {renderStars(ride.driver_rating)}
              {/* {ride.review_count} tips */}
              {/* This things are not available on the Database. */}
              {/* At first i have to add this things on Database then i can use it. */}
              <span className="text-xs text-gray-500 ml-1 font-normal">({ride.review_count} tips)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => alert(`Booking ride with ${ride.driver_first_name} ${ride.driver_last_name}`)}
            className="px-6 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Book Ride
          </button>
          <button
            onClick={() => alert(`Contacting ${ride.driver_first_name} ${ride.driver_last_name}`)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-black hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}