import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Import all components from the chatting folder
import CampusRideHeader from '../../assets/CampusRideHeader';
import CampusRideFooter from '../../assets/CampusRideFooter';
import ActiveRide from './ActiveRide';
import PastRidesList from './PastRidesList';
import PastRideChat from './PastRideChat';
import SafetyGuidelines from './SafetyGuidelines';

export default function RideTracker() {
  // State for selected past ride to show in right panel (null means no panel shown)
  const [selectedPastRide, setSelectedPastRide] = useState(null);
  
  // User role - 'driver' or 'passenger'
  const [userRole] = useState('driver'); // Change to 'driver' to test driver view

  // Current active rides data - can have multiple active rides
  const activeRides = [
    {
      id: 'RIDE-2025-001',
      status: 'active',
      // If user is driver, this contains passenger info. If user is passenger, this contains driver info.
      contact: userRole === 'driver' ? {
        role: 'driver',
        name: 'Ahmed Rahman',
        rating: 4.8,
        phone: '+880 1712-345678',
        car: 'Red Honda Civic',
        licensePlate: 'DHK-1234',
        avatar: 'https://i.pravatar.cc/150?img=1'
      } : {
        role: 'passenger',
        name: 'Sarah Khan',
        institution: 'UIU',
        phone: '+880 1812-345678',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      // For drivers: list of passengers with their stops
      // For passengers: just their own journey
      passengers: userRole === 'driver' ? [
        {
          name: 'Sarah Khan',
          institution: 'UIU',
          phone: '+880 1812-345678',
          avatar: 'https://i.pravatar.cc/150?img=2',
          pickupLocation: 'UIU Main Gate',
          dropoffLocation: 'Dhanmondi 27',
          pickupTime: '3:00 PM',
          status: 'picked_up'
        },
        {
          name: 'Rashid Ahmed',
          institution: 'NSU',
          phone: '+880 1712-987654',
          avatar: 'https://i.pravatar.cc/150?img=3',
          pickupLocation: 'NSU Campus',
          dropoffLocation: 'Farmgate',
          pickupTime: '3:15 PM',
          status: 'waiting'
        }
      ] : null,
      // Trip route information
      route: {
        from: userRole === 'driver' ? 'UIU Main Gate' : 'UIU Main Gate',
        to: userRole === 'driver' ? 'Multiple Stops' : 'Dhanmondi 27',
        pickupTime: '3:00 PM',
        estimatedArrival: userRole === 'driver' ? '4:00 PM' : '3:45 PM',
        distance: '15.2 km',
        fare: userRole === 'driver' ? 500 : 250, // Total fare for driver, individual fare for passenger
        eta: '3 mins',
        nextStop: userRole === 'driver' ? 'UIU Main Gate (Sarah pickup)' : null
      },
      // Chat messages for this ride
      messages: [
        {
          id: 1,
          sender: userRole === 'passenger' ? 'driver' : 'passenger',
          content: userRole === 'passenger' 
            ? "I'm Ahmed, your driver. Red Honda Civic, arriving in 3 minutes."
            : "Hi! I'm Sarah from UIU. I'll be ready at the main gate entrance.",
          time: '2:57 PM'
        },
        {
          id: 2,
          sender: userRole === 'passenger' ? 'passenger' : 'driver',
          content: userRole === 'passenger'
            ? "Great! I'm Sarah from UIU, standing by the main gate entrance."
            : "Perfect! I'll be there in my Red Honda Civic in 3 minutes.",
          time: '2:58 PM'
        }
      ]
    },
    // Second active ride (only for driver to show multiple rides)
    ...(userRole === 'driver' ? [{
      id: 'RIDE-2025-002',
      status: 'active',
      contact: {
        role: 'driver',
        name: 'Karim Hassan',
        rating: 4.9,
        phone: '+880 1512-345678',
        car: 'Blue Toyota Corolla',
        licensePlate: 'DHK-5678',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      passengers: [
        {
          name: 'Fatima Ali',
          institution: 'BRAC University',
          phone: '+880 1612-111222',
          avatar: 'https://i.pravatar.cc/150?img=5',
          pickupLocation: 'BRAC University',
          dropoffLocation: 'Gulshan 2',
          pickupTime: '4:00 PM',
          status: 'waiting'
        }
      ],
      route: {
        from: 'BRAC University',
        to: 'Gulshan 2',
        pickupTime: '4:00 PM',
        estimatedArrival: '4:30 PM',
        distance: '8.5 km',
        fare: 300,
        eta: '15 mins',
        nextStop: 'BRAC University (Fatima pickup)'
      },
      messages: [
        {
          id: 1,
          sender: 'passenger',
          content: "Hi! I'm Fatima from BRAC University. Ready for pickup at the main entrance.",
          time: '3:55 PM'
        }
      ]
    }] : [])
  ];

  // Past rides data with full conversation history
  const pastRides = [
    {
      id: 'RIDE-2025-003',
      contact: userRole === 'passenger' ? {
        name: 'Sarah Khan',
        role: 'driver',
        avatar: 'https://i.pravatar.cc/150?img=2',
        rating: 4.9,
        phone: '+880 1812-345678'
      } : {
        name: 'Mike Rahman',
        role: 'passenger',
        institution: 'NSU',
        avatar: 'https://i.pravatar.cc/150?img=3',
        phone: '+880 1712-987654'
      },
      route: {
        from: 'NSU Campus',
        to: 'Farmgate',
        date: '2025-01-14',
        time: '4:30 PM',
        fare: 180,
        car: userRole === 'passenger' ? 'Blue Toyota Corolla' : null,
        licensePlate: userRole === 'passenger' ? 'DHK-5678' : null
      },
      date: 'Yesterday',
      status: 'completed',
      messages: [
        {
          id: 1,
          sender: userRole === 'passenger' ? 'passenger' : 'driver',
          content: userRole === 'passenger' 
            ? 'Hi! Ready for pickup at NSU main gate'
            : 'Hi! I\'m Mike from NSU. Ready for pickup at the main gate.',
          time: '4:25 PM'
        },
        {
          id: 2,
          sender: userRole === 'passenger' ? 'driver' : 'passenger',
          content: userRole === 'passenger'
            ? 'Great! Blue Toyota coming your way. See you in 2 minutes.'
            : 'Perfect! I\'ll be waiting right at the entrance.',
          time: '4:28 PM'
        },
        {
          id: 3,
          sender: userRole === 'passenger' ? 'passenger' : 'driver',
          content: 'Thanks for the ride! 5 stars ⭐',
          time: '5:16 PM'
        }
      ]
    }
  ];

  // Function to send a message (either typed or quick message)
  const handleSendMessage = (rideId, messageText) => {
    console.log('Sending message for ride:', rideId, messageText);
  };

  // Function to select a past ride and show it in right panel
  const handleSelectPastRide = (ride) => {
    setSelectedPastRide(ride);
  };

  // Function to close past ride chat
  const handleClosePastRideChat = () => {
    setSelectedPastRide(null);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#EBF5F5'}}>
      {/* Header */}
      <CampusRideHeader />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">My Rides</span>
          </button>

          {/* Dynamic Layout: Single column when no past ride selected, two columns when selected */}
          <div className={`grid gap-6 ${selectedPastRide ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            
            {/* Main Column */}
            <div className="space-y-6">
              
              {/* Active Rides - Show all active rides */}
              {activeRides.map((ride) => (
                <ActiveRide
                  key={ride.id}
                  ride={ride}
                  userRole={userRole}
                  onSendMessage={handleSendMessage}
                />
              ))}

              {/* Recent Ride Communications List */}
              <PastRidesList
                pastRides={pastRides}
                selectedPastRide={selectedPastRide}
                onSelectPastRide={handleSelectPastRide}
              />
            </div>

            {/* Right Column - Past Ride Chat (Only appears when a past ride is selected) */}
            <PastRideChat
              selectedPastRide={selectedPastRide}
              userRole={userRole}
              onClose={handleClosePastRideChat}
            />
          </div>

          {/* Safety Guidelines */}
          <SafetyGuidelines />
        </div>
      </div>
      
      {/* Footer */}
      <CampusRideFooter/>
    </div>
  );
}