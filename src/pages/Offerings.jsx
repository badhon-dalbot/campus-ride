import {
  Users,
  Car,
  Shield,
  Clock,
  DollarSign,
  MapPin,
  Smartphone,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Route
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const OfferingsPage = () => {
  const [activeService, setActiveService] = useState("shared");

  const services = [
    {
      id: "shared",
      name: "Campus Share",
      icon: Users,
      description: "Share rides with fellow students heading in the same direction",
      price: "From ৳50",
      features: ["Split costs with other riders", "Meet other students", "Eco-friendly option"]
    },
    {
      id: "direct",
      name: "Campus Direct",
      icon: Car,
      description: "Direct rides for when you need to get there fast",
      price: "From ৳120",
      features: ["No stops", "Fastest option", "Priority booking"]
    },
    {
      id: "scheduled",
      name: "Campus Schedule",
      icon: Calendar,
      description: "Book rides in advance for your regular trips",
      price: "From ৳80",
      features: ["Plan ahead", "Guaranteed rides", "Recurring trips"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Student Verified",
      description: "All riders and drivers are verified university students with valid student IDs"
    },
    {
      icon: Clock,
      title: "24/7 Campus Coverage",
      description: "Available around the clock for your campus transportation needs"
    },
    {
      icon: DollarSign,
      title: "Student-Friendly Pricing",
      description: "Affordable rates designed specifically for student budgets"
    },
    {
      icon: MapPin,
      title: "Campus-Optimized Routes",
      description: "Smart routing that knows all campus locations, dorms, and popular spots"
    },
    {
      icon: Smartphone,
      title: "Easy Web Platform",
      description: "Simple, intuitive website designed for quick booking between classes"
    },
    {
      icon: Star,
      title: "Community Ratings",
      description: "Rate and review system to maintain a trusted campus community"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Visit Our Website",
      description: "Go to Campus Ride and verify your student status"
    },
    {
      step: "2",
      title: "Choose Your Ride",
      description: "Select from shared, direct, or scheduled ride options"
    },
    {
      step: "3",
      title: "Get Matched",
      description: "We'll connect you with verified student drivers or riders"
    },
    {
      step: "4",
      title: "Ride & Rate",
      description: "Enjoy your safe ride and rate your experience"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Safe, Affordable Campus Transportation
          </h1>
          <p className="text-xl text-white mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of students who trust Campus Ride for their daily transportation needs. 
            Share rides, split costs, and build community on campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book a Ride
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              Become a Driver
            </button>
          </div>
        </div>
      </div>

      {/* Service Types */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Choose Your Ride Style
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className={`bg-white rounded-lg p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                    activeService === service.id ? 'ring-3 ring-teal-500' : ''
                  }`}
                  onClick={() => setActiveService(service.id)}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {service.name}
                      </h3>
                      <p className="text-teal-600 font-medium">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Why Students Choose Campus Ride
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                  <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
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

      {/* How It Works */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            How Campus Ride Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-teal-600 mx-auto mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Trusted by Your Campus Community
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-teal-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
              <p className="text-gray-700">Student Riders</p>
            </div>
            <div className="bg-teal-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">5K+</div>
              <p className="text-gray-700">Verified Drivers</p>
            </div>
            <div className="bg-teal-200 rounded-lg p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">4.8★</div>
              <p className="text-gray-700">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Riding?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Join your campus community and start sharing rides today. Sign up as a rider or register to drive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Sign Up as Rider
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                Register as Driver
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Access via web browser • Student verification required
            </p>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default OfferingsPage;