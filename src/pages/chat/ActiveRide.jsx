import React, { useState } from 'react';
import { Phone, MessageCircle, Navigation, Share, Star, Car, Send, Copy } from 'lucide-react';

const ActiveRide = ({ ride, userRole, onSendMessage }) => {
  const [activeRidePanels, setActiveRidePanels] = useState({});
  const [message, setMessage] = useState('');

  // Quick message templates
  const quickMessages = [
    "I'm here at pickup",
    "Running 5 min late", 
    "Where are you?",
    "On my way",
    "Thank you!"
  ];

  // Function to send a message (either typed or quick message)
  const handleSendMessage = (messageText = message) => {
    if (messageText.trim()) {
      onSendMessage(ride.id, messageText);
      setMessage('');
    }
  };

  // Function to toggle panels for this ride
  const toggleRidePanel = (panelType) => {
    setActiveRidePanels(prev => ({
      ...prev,
      [panelType]: !prev[panelType],
      // Close other panels when opening a new one
      ...(panelType !== 'messages' && { messages: false }),
      ...(panelType !== 'callInfo' && { callInfo: false }),
      ...(panelType !== 'tracking' && { tracking: false }),
      ...(panelType !== 'shareTrip' && { shareTrip: false })
    }));
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Get appropriate text based on user role
  const getRoleSpecificText = () => {
    if (userRole === 'driver') {
      const waitingPassengers = ride.passengers?.filter(p => p.status === 'waiting').length || 0;
      const pickedUpPassengers = ride.passengers?.filter(p => p.status === 'picked_up').length || 0;
      
      return {
        statusTitle: waitingPassengers > 0 
          ? `${waitingPassengers} passenger${waitingPassengers > 1 ? 's' : ''} waiting for pickup`
          : `${pickedUpPassengers} passenger${pickedUpPassengers > 1 ? 's' : ''} on board`,
        statusSubtitle: `Next stop: ${ride.route.nextStop}`,
        sectionTitle: 'Passengers',
        callButtonText: 'Call Passenger',
        trackButtonText: 'Track Route',
        infoLabel: 'Passenger Information'
      };
    } else {
      return {
        statusTitle: 'Your Ride is Active',
        statusSubtitle: `Driver arriving in ${ride.route.eta}`,
        sectionTitle: 'Your Driver',
        callButtonText: 'Call Driver',
        trackButtonText: 'Track Driver',
        infoLabel: 'Driver Information'
      };
    }
  };

  const roleText = getRoleSpecificText();

  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm">
      {/* Active Ride Status Header */}
      <div className="text-white p-6 rounded-t-xl" style={{backgroundColor: '#17252A'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">{roleText.statusTitle}</h2>
              <p className="text-gray-200">{roleText.statusSubtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">৳{ride.route.fare}</div>
            <div className="text-gray-200 text-sm">{ride.id}</div>
          </div>
        </div>
      </div>

      {/* Trip and Contact Information */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          
          {/* Trip Route Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Trip Route</h3>
            <div className="space-y-4">
              {/* Current Location/Pickup */}
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: '#17252A'}}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{ride.route.from}</div>
                  <div className="text-sm text-gray-500">{ride.route.pickupTime}</div>
                </div>
                <div className="text-white px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#17252A'}}>
                  ETA: {ride.route.eta}
                </div>
              </div>
              {/* Destination */}
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{ride.route.to}</div>
                  <div className="text-sm text-gray-500">{ride.route.estimatedArrival}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{roleText.sectionTitle}</h3>
            
            {/* For Driver: Show all passengers */}
            {userRole === 'driver' && ride.passengers ? (
              <div className="space-y-3">
                {ride.passengers.map((passenger, index) => (
                  <div key={index} className="rounded-lg p-4" style={{backgroundColor: '#DEEEED'}}>
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={passenger.avatar}
                        alt={passenger.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{passenger.name}</div>
                        <div className="text-sm text-gray-600">{passenger.institution}</div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        passenger.status === 'picked_up' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {passenger.status === 'picked_up' ? 'On board' : 'Waiting'}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {passenger.pickupLocation} → {passenger.dropoffLocation}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* For Passenger: Show driver info */
              <div className="rounded-lg p-4" style={{backgroundColor: '#DEEEED'}}>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={ride.contact.avatar}
                    alt={ride.contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{ride.contact.name}</div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{ride.contact.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">{ride.contact.car}</div>
                    <div className="text-sm text-gray-500 font-mono">{ride.contact.licensePlate}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => toggleRidePanel('callInfo')}
            className="flex items-center justify-center gap-2 p-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{backgroundColor: '#17252A'}}
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">{roleText.callButtonText}</span>
          </button>
          <button
            onClick={() => toggleRidePanel('messages')}
            className="flex items-center justify-center gap-2 p-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{backgroundColor: '#17252A'}}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">Messages</span>
          </button>
          <button 
            onClick={() => toggleRidePanel('tracking')}
            className="flex items-center justify-center gap-2 p-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{backgroundColor: '#17252A'}}
          >
            <Navigation className="w-4 h-4" />
            <span className="font-medium">{roleText.trackButtonText}</span>
          </button>
          <button 
            onClick={() => toggleRidePanel('shareTrip')}
            className="flex items-center justify-center gap-2 p-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{backgroundColor: '#17252A'}}
          >
            <Share className="w-4 h-4" />
            <span className="font-medium">Share Trip</span>
          </button>
        </div>

        {/* Collapsible Panels */}
        {activeRidePanels.callInfo && (
          <div className="border-t border-gray-300 pt-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="space-y-3">
              {userRole === 'driver' && ride.passengers ? 
                ride.passengers.map((passenger, index) => (
                  <div key={index} className="rounded-lg p-4" style={{backgroundColor: '#DEEEED'}}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-gray-900">{passenger.name}</div>
                        <div className="text-sm text-gray-600">{passenger.institution}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: '#FFFAFA'}}>
                      <span className="font-mono text-lg">{passenger.phone}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(passenger.phone)}
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          title="Copy phone number"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(`tel:${passenger.phone}`)}
                          className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                          style={{backgroundColor: '#17252A'}}
                        >
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="rounded-lg p-4" style={{backgroundColor: '#DEEEED'}}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-gray-900">{ride.contact.name}</div>
                        <div className="text-sm text-gray-600">Driver</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{ride.contact.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: '#FFFAFA'}}>
                      <span className="font-mono text-lg">{ride.contact.phone}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(ride.contact.phone)}
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                          title="Copy phone number"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(`tel:${ride.contact.phone}`)}
                          className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                          style={{backgroundColor: '#17252A'}}
                        >
                          Call Now
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        )}

        {activeRidePanels.tracking && (
          <div className="border-t border-gray-300 pt-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Live Tracking</h4>
            <div className="rounded-lg p-6 text-center" style={{backgroundColor: '#DEEEED'}}>
              <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h5 className="font-medium text-gray-900 mb-2">Real-time Location</h5>
              <p className="text-sm text-gray-600 mb-4">
                {userRole === 'driver' 
                  ? 'Track your route and passenger locations'
                  : `Track your driver in real-time`
                }
              </p>
              <div className="rounded-lg p-8 mb-4" style={{backgroundColor: '#FFFAFA'}}>
                <div className="text-gray-500">Map integration will be added here</div>
                <div className="text-sm text-gray-600 mt-2">
                  Current ETA: {ride.route.eta}
                </div>
              </div>
              <button
                className="w-full p-3 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{backgroundColor: '#17252A'}}
              >
                Refresh Location
              </button>
            </div>
          </div>
        )}

        {activeRidePanels.shareTrip && (
          <div className="border-t border-gray-300 pt-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Share Trip Details</h4>
            <div className="rounded-lg p-4" style={{backgroundColor: '#DEEEED'}}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trip Link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`https://campusride.com/track/${ride.id}`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      style={{backgroundColor: '#FFFAFA'}}
                    />
                    <button
                      onClick={() => copyToClipboard(`https://campusride.com/track/${ride.id}`)}
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                      style={{backgroundColor: '#17252A'}}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="tel"
                    placeholder="Enter emergency contact number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    style={{backgroundColor: '#FFFAFA'}}
                  />
                </div>
                <button
                  className="w-full p-3 text-white rounded-lg hover:opacity-90 transition-colors"
                  style={{backgroundColor: '#17252A'}}
                >
                  Share Trip Details
                </button>
              </div>
            </div>
          </div>
        )}

        {activeRidePanels.messages && (
          <div className="border-t border-gray-300 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              Messages {userRole === 'driver' ? '(Group Chat)' : `with ${ride.contact.name}`}
            </h4>
            
            {/* Message History */}
            <div className="rounded-lg p-4 mb-4 max-h-40 overflow-y-auto" style={{backgroundColor: '#DEEEED'}}>
              <div className="space-y-3">
                {ride.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === userRole ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.sender === userRole
                        ? 'text-white'
                        : 'text-gray-900 border border-gray-200'
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

            {/* Quick Message Buttons */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Quick messages:</div>
              <div className="flex flex-wrap gap-2">
                {quickMessages.map((quickMsg, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(quickMsg)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:opacity-80 transition-colors"
                    style={{backgroundColor: '#FFFAFA'}}
                  >
                    {quickMsg}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                style={{backgroundColor: '#FFFAFA'}}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!message.trim()}
                className="p-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors"
                style={{backgroundColor: '#17252A'}}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveRide;