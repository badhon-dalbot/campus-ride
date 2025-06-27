import {
  Plane,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Shield,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Luggage,
  Car,
  Route,
  Phone
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const AirportsPage = () => {
  const [selectedAirport, setSelectedAirport] = useState("dhaka");

  const airports = [
    {
      id: "dhaka",
      name: "Hazrat Shahjalal International Airport",
      code: "DAC",
      city: "Dhaka",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop"
    },
    {
      id: "chittagong",
      name: "Shah Amanat International Airport",
      code: "CGP",
      city: "Chittagong",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
    },
    {
      id: "sylhet",
      name: "Osmani International Airport",
      code: "ZYL",
      city: "Sylhet",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop"
    }
  ];

  const airportRoutes = {
    dhaka: [
      {
        route: "Dhaka University to DAC Airport",
        duration: "45-60 mins",
        price: "৳350-450",
        universities: ["Dhaka University", "BUET", "Dhaka Medical College"]
      },
      {
        route: "Uttara Universities to DAC Airport",
        duration: "25-35 mins",
        price: "৳250-350",
        universities: ["NSU", "AIUB", "United International University"]
      },
      {
        route: "Dhanmondi Universities to DAC Airport",
        duration: "50-65 mins",
        price: "৳400-500",
        universities: ["IUB", "Stamford University", "ASA University"]
      },
      {
        route: "Bashundhara Universities to DAC Airport",
        duration: "30-40 mins",
        price: "৳300-400",
        universities: ["East West University", "BRAC University"]
      }
    ],
    chittagong: [
      {
        route: "University of Chittagong to CGP Airport",
        duration: "35-45 mins",
        price: "৳280-380",
        universities: ["University of Chittagong", "CUET", "Chittagong Medical College"]
      },
      {
        route: "Port City Universities to CGP Airport",
        duration: "25-35 mins",
        price: "৳200-300",
        universities: ["Premier University", "International Islamic University"]
      },
      {
        route: "Agrabad Area to CGP Airport",
        duration: "30-40 mins",
        price: "৳250-350",
        universities: ["City University", "BGC Trust University"]
      }
    ],
    sylhet: [
      {
        route: "Sylhet MAG Osmani Medical College to ZYL Airport",
        duration: "20-30 mins",
        price: "৳180-250",
        universities: ["SOMCC", "Sylhet Agricultural University"]
      },
      {
        route: "Shahjalal University to ZYL Airport",
        duration: "25-35 mins",
        price: "৳200-280",
        universities: ["SUST", "Metropolitan University"]
      }
    ]
  };

  const features = [
    {
      icon: Clock,
      title: "24/7 Airport Service",
      description: "Available around the clock for early morning and late night flights"
    },
    {
      icon: Luggage,
      title: "Luggage Assistance",
      description: "Spacious vehicles with dedicated luggage space for international travelers"
    },
    {
      icon: Shield,
      title: "Flight Tracking",
      description: "Drivers monitor flight schedules for delayed or early arrivals"
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Clean, comfortable vehicles with professional, student-verified drivers"
    }
  ];

  const bookingSteps = [
    {
      step: "1",
      title: "Book in Advance",
      description: "Schedule your airport ride 24 hours before departure for guaranteed availability"
    },
    {
      step: "2",
      title: "Share Flight Details",
      description: "Provide your flight number and timing for accurate pickup scheduling"
    },
    {
      step: "3",
      title: "Meet Your Driver",
      description: "Driver will wait at designated pickup point with Campus Ride signage"
    },
    {
      step: "4",
      title: "Safe Journey",
      description: "Enjoy comfortable ride with real-time flight updates and traffic optimization"
    }
  ];

  const currentRoutes = airportRoutes[selectedAirport] || [];

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            Airport Transportation
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Reliable, affordable rides between universities and major airports across Bangladesh
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Airport Ride
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              View Schedules
            </button>
          </div>
        </div>
      </div>

      {/* Airport Selection */}
      <div className="bg-teal-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Select Your Airport
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {airports.map((airport) => (
              <div 
                key={airport.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                  selectedAirport === airport.id ? 'ring-3 ring-teal-500' : ''
                }`}
                onClick={() => setSelectedAirport(airport.id)}
              >
                <div className="h-32 bg-gray-200 overflow-hidden">
                  <img 
                    src={airport.image} 
                    alt={airport.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Plane className="w-5 h-5 text-teal-600 mr-2" />
                    <span className="text-lg font-bold text-gray-800">{airport.code}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{airport.name}</h3>
                  <p className="text-gray-600 text-sm">{airport.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Routes & Pricing */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Popular Routes to {airports.find(a => a.id === selectedAirport)?.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {currentRoutes.map((route, index) => (
              <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {route.route}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-teal-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-800">{route.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-teal-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Price Range</p>
                      <p className="font-semibold text-gray-800">{route.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Serving Universities:</p>
                  <div className="flex flex-wrap gap-2">
                    {route.universities.map((uni, idx) => (
                      <span key={idx} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                        {uni}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center">
                  Book This Route
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Campus Ride for Airport Transport
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

      {/* How to Book */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            How to Book Your Airport Ride
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white text-teal-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-teal-100 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Services */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Special Airport Services
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Group Bookings</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Special rates for 4+ students traveling together
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Large vehicles for study abroad groups
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Flexible timing for group coordination
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Services</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Meet & greet service at arrival gates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Priority booking for international flights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Real-time flight tracking and updates
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Request Special Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact for Airport Services */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-teal-200 rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Need Help with Airport Transport?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our airport specialists are available 24/7 to help with bookings, flight changes, and special requests.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Airport Booking Hotline</h3>
                <p className="text-teal-600 font-medium text-xl">+880 1800-AIRPORT</p>
                <p className="text-gray-600">Available 24/7</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
                <p className="text-teal-600 font-medium">airport@campusride.bd</p>
                <p className="text-gray-600">Response within 30 minutes</p>
              </div>
            </div>

            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mt-8">
              Book Airport Ride Now
            </button>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default AirportsPage;