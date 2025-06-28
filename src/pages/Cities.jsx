import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Car,
  Route,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Fuel,
  Shield,
  Coffee,
  Wifi
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const CitiesPage = () => {
  const [selectedRoute, setSelectedRoute] = useState("dhaka-chittagong");

  const cityRoutes = [
    {
      id: "dhaka-chittagong",
      from: "Dhaka",
      to: "Chittagong",
      distance: "244 km",
      duration: "4-5 hours",
      price: "৳600-800",
      image: "https://images.unsplash.com/photo-1533150940625-70ba96913b39?w=800&h=300&fit=crop",
      dailyTrips: "6 trips daily"
    },
    {
      id: "dhaka-sylhet",
      from: "Dhaka",
      to: "Sylhet",
      distance: "232 km",
      duration: "4-5 hours",
      price: "৳550-750",
      image: "https://images.unsplash.com/photo-1566552881672-1d916a2a0d68?w=800&h=300&fit=crop",
      dailyTrips: "4 trips daily"
    },
    {
      id: "dhaka-rajshahi",
      from: "Dhaka",
      to: "Rajshahi",
      distance: "256 km",
      duration: "4.5-5.5 hours",
      price: "৳650-850",
      image: "https://images.unsplash.com/photo-1578991622985-a35e01ddcdb3?w=800&h=300&fit=crop",
      dailyTrips: "3 trips daily"
    },
    {
      id: "chittagong-sylhet",
      from: "Chittagong",
      to: "Sylhet",
      distance: "198 km",
      duration: "3.5-4.5 hours",
      price: "৳500-700",
      image: "https://images.unsplash.com/photo-1571846324681-906c7d8c26b2?w=800&h=300&fit=crop",
      dailyTrips: "2 trips daily"
    }
  ];

  const departureSchedules = {
    "dhaka-chittagong": [
      { time: "6:00 AM", pickup: "Dhaka University Area", arrival: "11:00 AM", price: "৳650" },
      { time: "8:30 AM", pickup: "Uttara/Gulshan Area", arrival: "1:30 PM", price: "৳700" },
      { time: "12:00 PM", pickup: "Dhanmondi/Mirpur Area", arrival: "5:00 PM", price: "৳650" },
      { time: "3:00 PM", pickup: "BUET/TSC Area", arrival: "8:00 PM", price: "৳700" },
      { time: "6:00 PM", pickup: "Bashundhara Area", arrival: "11:00 PM", price: "৳750" },
      { time: "9:00 PM", pickup: "Dhaka University Area", arrival: "2:00 AM", price: "৳800" }
    ],
    "dhaka-sylhet": [
      { time: "7:00 AM", pickup: "Dhaka University Area", arrival: "12:00 PM", price: "৳600" },
      { time: "11:00 AM", pickup: "Uttara/Gulshan Area", arrival: "4:00 PM", price: "৳650" },
      { time: "3:00 PM", pickup: "Dhanmondi Area", arrival: "8:00 PM", price: "৳600" },
      { time: "7:00 PM", pickup: "BUET/TSC Area", arrival: "12:00 AM", price: "৳700" }
    ],
    "dhaka-rajshahi": [
      { time: "6:30 AM", pickup: "Dhaka University Area", arrival: "12:00 PM", price: "৳700" },
      { time: "1:00 PM", pickup: "Uttara Area", arrival: "6:30 PM", price: "৳750" },
      { time: "8:00 PM", pickup: "Mirpur/Dhanmondi", arrival: "1:30 AM", price: "৳800" }
    ],
    "chittagong-sylhet": [
      { time: "8:00 AM", pickup: "University of Chittagong", arrival: "12:30 PM", price: "৳550" },
      { time: "2:00 PM", pickup: "CUET/Port Area", arrival: "6:30 PM", price: "৳600" }
    ]
  };

  const features = [
    {
      icon: Car,
      title: "Comfortable Vehicles",
      description: "AC buses and cars with reclining seats for long-distance comfort"
    },
    {
      icon: Shield,
      title: "Safety Verified",
      description: "All drivers undergo background checks and vehicle safety inspections"
    },
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "Stay connected during your journey with complimentary internet"
    },
    {
      icon: Coffee,
      title: "Rest Stops",
      description: "Scheduled breaks at student-friendly restaurants and rest areas"
    }
  ];

  const popularDestinations = [
    {
      city: "Dhaka",
      universities: "50+ Universities",
      description: "Capital hub with DU, BUET, NSU, BRAC, and many more",
      connections: "Connected to all major cities"
    },
    {
      city: "Chittagong",
      universities: "15+ Universities", 
      description: "Port city with University of Chittagong, CUET, Premier University",
      connections: "Direct routes to Dhaka, Sylhet"
    },
    {
      city: "Sylhet",
      universities: "10+ Universities",
      description: "Educational center with SUST, MAG Osmani Medical College",
      connections: "Routes to Dhaka, Chittagong"
    },
    {
      city: "Rajshahi",
      universities: "12+ Universities",
      description: "Academic city with Rajshahi University, RUET, RMC",
      connections: "Connected to Dhaka and northern regions"
    }
  ];

  const currentSchedules = departureSchedules[selectedRoute] || [];
  const currentRouteInfo = cityRoutes.find(route => route.id === selectedRoute);

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            Inter-City Student Travel
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Safe, affordable transportation connecting university students across Bangladesh
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              View Schedules
            </button>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Popular Routes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {cityRoutes.map((route) => (
              <div 
                key={route.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                  selectedRoute === route.id ? 'ring-3 ring-teal-500' : ''
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="h-32 bg-gray-200 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {route.from} → {route.to}
                    </h3>
                    <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
                      {route.dailyTrips}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <Route className="w-4 h-4 text-teal-600 mr-1" />
                      <span className="text-gray-600">{route.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-teal-600 mr-1" />
                      <span className="text-gray-600">{route.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-teal-600 mr-1" />
                      <span className="text-gray-600">{route.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Details */}
      {currentRouteInfo && (
        <div className="bg-teal-600 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              {currentRouteInfo.from} to {currentRouteInfo.to} Schedule
            </h2>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-teal-100 p-4">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="font-bold text-gray-800">{currentRouteInfo.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-bold text-gray-800">{currentRouteInfo.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price Range</p>
                    <p className="font-bold text-gray-800">{currentRouteInfo.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Daily Trips</p>
                    <p className="font-bold text-gray-800">{currentRouteInfo.dailyTrips}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {currentSchedules.map((schedule, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="text-sm text-gray-600">Departure</p>
                          <p className="font-bold text-teal-600 text-lg">{schedule.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Pickup Location</p>
                          <p className="font-medium text-gray-800">{schedule.pickup}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Arrival</p>
                          <p className="font-medium text-gray-800">{schedule.arrival}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Price</p>
                            <p className="font-bold text-gray-800">{schedule.price}</p>
                          </div>
                          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Campus Ride for Long Distance
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Destinations */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            University Cities We Connect
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-teal-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">{destination.city}</h3>
                </div>
                <p className="text-teal-600 font-semibold text-sm mb-2">{destination.universities}</p>
                <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                <p className="text-gray-700 text-xs">{destination.connections}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Information */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Inter-City Travel Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Guidelines</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Book at least 24 hours in advance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Student ID required for verification
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Free cancellation up to 12 hours before
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Group discounts available for 4+ students
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Included</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Air-conditioned comfortable seating
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Free WiFi and charging ports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Refreshment breaks every 2 hours
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Insurance coverage during travel
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Start Booking Process
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default CitiesPage;