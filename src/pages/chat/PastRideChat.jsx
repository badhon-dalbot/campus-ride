import React from 'react';
import { Star, MapPin } from 'lucide-react';

const PastRideChat = ({ selectedPastRide, userRole, onClose }) => {
  if (!selectedPastRide) return null;

  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm">
      
      {/* Past Ride Chat Header */}
      <div className="p-6 border-b border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Ride Conversation</h3>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        
        {/* Selected Ride Details */}
        <div className="rounded-lg p-4" style={{backgroundColor: '#DEEEED'}}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={selectedPastRide.contact.avatar}
                alt={selectedPastRide.contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">{selectedPastRide.contact.name}</div>
                <div className="text-sm text-gray-600">
                  {selectedPastRide.contact.role === 'passenger' 
                    ? selectedPastRide.contact.institution 
                    : 'Driver'
                  }
                </div>
                {selectedPastRide.contact.role === 'driver' && selectedPastRide.contact.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs">{selectedPastRide.contact.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">{selectedPastRide.route.date}</div>
              <div className="text-sm font-medium text-gray-900">৳{selectedPastRide.route.fare}</div>
            </div>
          </div>
          
          {/* Route Information */}
          <div className="text-sm text-gray-700">
            <MapPin className="w-4 h-4 inline mr-1" />
            {selectedPastRide.route.from} → {selectedPastRide.route.to}
          </div>
          
          {/* Car Details (only if contact was driver) */}
          {selectedPastRide.contact.role === 'driver' && selectedPastRide.route.car && (
            <div className="text-sm text-gray-600 mt-1">
              {selectedPastRide.route.car} • {selectedPastRide.route.licensePlate}
            </div>
          )}
        </div>
      </div>

      {/* Past Ride Messages */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {selectedPastRide.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === userRole ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-3 rounded-lg ${
                msg.sender === userRole
                  ? 'text-white'
                  : 'text-gray-900 border border-gray-300'
              }`} style={msg.sender === userRole ? {backgroundColor: '#17252A'} : {backgroundColor: '#FFFAFA'}}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === userRole ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Ride Footer - Read Only Notice */}
      <div className="p-6 border-t border-gray-300 text-center rounded-b-xl" style={{backgroundColor: '#FFFAFA'}}>
        <div className="text-sm text-gray-600">This ride has been completed</div>
        <div className="text-xs text-gray-500 mt-1">Message history is read-only</div>
      </div>
    </div>
  );
};

export default PastRideChat;