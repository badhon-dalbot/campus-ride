import React from 'react';

const PastRidesList = ({ pastRides, selectedPastRide, onSelectPastRide }) => {
  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Ride Communications</h3>
        <div className="space-y-3">
          {pastRides.map((ride) => (
            <div 
              key={ride.id} 
              onClick={() => onSelectPastRide(ride)}
              className={`flex items-center justify-between p-3 border rounded-lg hover:opacity-80 transition-colors cursor-pointer ${
                selectedPastRide?.id === ride.id ? 'border-gray-600' : 'border-gray-300'
              }`}
              style={{backgroundColor: selectedPastRide?.id === ride.id ? '#DEEEED' : '#FFFAFA'}}
            >
              {/* Contact Avatar and Info */}
              <div className="flex items-center gap-3">
                <img
                  src={ride.contact.avatar}
                  alt={ride.contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{ride.contact.name}</div>
                  <div className="text-sm text-gray-600">
                    {ride.contact.role === 'passenger' ? ride.contact.institution : ride.contact.name}
                  </div>
                  <div className="text-sm text-gray-500">{ride.route.from} → {ride.route.to}</div>
                </div>
              </div>
              {/* Date and Status */}
              <div className="text-right">
                <div className="text-sm text-gray-500">{ride.date}</div>
                <div className="text-xs text-gray-400">{ride.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastRidesList;