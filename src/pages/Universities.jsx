import {
  GraduationCap,
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
  Building,
  Shield,
  Coffee,
  BookOpen,
  Search
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const UniversitiesPage = () => {
  const [selectedCity, setSelectedCity] = useState("dhaka");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = [
    { id: "dhaka", name: "Dhaka", count: "50+ Universities" },
    { id: "chittagong", name: "Chittagong", count: "15+ Universities" },
    { id: "sylhet", name: "Sylhet", count: "10+ Universities" },
    { id: "rajshahi", name: "Rajshahi", count: "12+ Universities" }
  ];

  const universities = {
    dhaka: [
      {
        name: "University of Dhaka",
        shortName: "DU",
        area: "Shahbagh",
        students: "45,000+",
        rides: "15K+ monthly",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["Airport", "Uttara", "Dhanmondi", "Mirpur", "Gulshan"],
        avgPrice: "৳45-80"
      },
      {
        name: "Bangladesh University of Engineering and Technology",
        shortName: "BUET",
        area: "Palashi",
        students: "12,000+",
        rides: "8K+ monthly",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop",
        routes: ["Airport", "Uttara", "Dhanmondi", "Bashundhara"],
        avgPrice: "৳40-75"
      },
      {
        name: "North South University",
        shortName: "NSU",
        area: "Bashundhara",
        students: "20,000+",
        rides: "12K+ monthly",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop",
        routes: ["Airport", "Dhaka University", "Gulshan", "Uttara"],
        avgPrice: "৳50-90"
      },
      {
        name: "BRAC University",
        shortName: "BRACU",
        area: "Mohakhali",
        students: "18,000+",
        rides: "10K+ monthly",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=200&fit=crop",
        routes: ["Airport", "Bashundhara", "Dhanmondi", "Uttara"],
        avgPrice: "৳45-85"
      },
      {
        name: "Independent University Bangladesh",
        shortName: "IUB",
        area: "Bashundhara",
        students: "8,000+",
        rides: "5K+ monthly",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=300&h=200&fit=crop",
        routes: ["Airport", "Dhaka University", "Gulshan", "Dhanmondi"],
        avgPrice: "৳40-80"
      },
      {
        name: "American International University-Bangladesh",
        shortName: "AIUB",
        area: "Uttara",
        students: "15,000+",
        rides: "9K+ monthly",
        rating: "4.4",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
        routes: ["Airport", "Dhaka University", "Gulshan", "Mirpur"],
        avgPrice: "৳35-70"
      }
    ],
    chittagong: [
      {
        name: "University of Chittagong",
        shortName: "CU",
        area: "Hathazari",
        students: "35,000+",
        rides: "8K+ monthly",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["Airport", "Port Area", "Agrabad", "GEC Circle"],
        avgPrice: "৳40-75"
      },
      {
        name: "Chittagong University of Engineering & Technology",
        shortName: "CUET",
        area: "Raozan",
        students: "8,000+",
        rides: "4K+ monthly",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop",
        routes: ["Airport", "University of Chittagong", "Port Area"],
        avgPrice: "৳45-80"
      },
      {
        name: "Premier University",
        shortName: "PU",
        area: "Chittagong",
        students: "12,000+",
        rides: "6K+ monthly",
        rating: "4.3",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop",
        routes: ["Airport", "GEC Circle", "Agrabad", "Port Area"],
        avgPrice: "৳35-65"
      }
    ],
    sylhet: [
      {
        name: "Shahjalal University of Science and Technology",
        shortName: "SUST",
        area: "Kumargaon",
        students: "12,000+",
        rides: "5K+ monthly",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["Airport", "Sylhet City", "Medical College", "Zindabazar"],
        avgPrice: "৳30-60"
      },
      {
        name: "Sylhet MAG Osmani Medical College",
        shortName: "SOMCC",
        area: "Sylhet",
        students: "3,000+",
        rides: "2K+ monthly",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        routes: ["Airport", "SUST", "Sylhet City", "Zindabazar"],
        avgPrice: "৳25-50"
      }
    ],
    rajshahi: [
      {
        name: "University of Rajshahi",
        shortName: "RU",
        area: "Motihar",
        students: "40,000+",
        rides: "7K+ monthly",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["City Center", "Medical College", "RUET", "Station Road"],
        avgPrice: "৳35-65"
      },
      {
        name: "Rajshahi University of Engineering & Technology",
        shortName: "RUET",
        area: "Kazla",
        students: "6,000+",
        rides: "3K+ monthly",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop",
        routes: ["University of Rajshahi", "City Center", "Medical College"],
        avgPrice: "৳30-55"
      }
    ]
  };

  const services = [
    {
      icon: Car,
      title: "Campus Shuttle",
      description: "Regular shuttles between dorms, academic buildings, and campus gates"
    },
    {
      icon: Building,
      title: "Inter-Campus Connect",
      description: "Direct routes connecting different university campuses in the same city"
    },
    {
      icon: Coffee,
      title: "Event Transportation",
      description: "Special transport for university events, seminars, and cultural programs"
    },
    {
      icon: Shield,
      title: "Late Night Service",
      description: "Safe transportation for students during late library hours and study sessions"
    }
  ];

  const filteredUniversities = universities[selectedCity]?.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            University Transportation
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Connecting students across 50+ universities with safe, reliable transportation
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for your university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-teal-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Find My University
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              View All Routes
            </button>
          </div>
        </div>
      </div>

      {/* City Selection */}
      <div className="bg-teal-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Select Your City
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`p-4 rounded-lg font-medium transition-colors ${
                  selectedCity === city.id
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <h3 className="font-bold text-lg">{city.name}</h3>
                <p className="text-sm opacity-80">{city.count}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Universities in {cities.find(c => c.id === selectedCity)?.name}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((university, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img 
                    src={university.image} 
                    alt={university.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800">
                      {university.shortName}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-600">{university.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{university.name}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {university.area}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {university.students}
                    </div>
                    <div className="flex items-center">
                      <Car className="w-3 h-3 mr-1" />
                      {university.rides}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {university.avgPrice}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-2">Popular Routes:</p>
                    <div className="flex flex-wrap gap-1">
                      {university.routes.slice(0, 3).map((route, idx) => (
                        <span key={idx} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                          {route}
                        </span>
                      ))}
                      {university.routes.length > 3 && (
                        <span className="text-teal-600 text-xs">+{university.routes.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center">
                    View Routes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            University Transportation Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="bg-teal-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Routes by Category */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Most Popular University Routes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Commutes</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>DU ↔ Uttara</span>
                  <span className="font-medium">৳45-65</span>
                </li>
                <li className="flex justify-between">
                  <span>BUET ↔ Dhanmondi</span>
                  <span className="font-medium">৳40-60</span>
                </li>
                <li className="flex justify-between">
                  <span>NSU ↔ Gulshan</span>
                  <span className="font-medium">৳35-55</span>
                </li>
                <li className="flex justify-between">
                  <span>BRACU ↔ Bashundhara</span>
                  <span className="font-medium">৳30-50</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Airport Connections</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>DU ↔ Airport</span>
                  <span className="font-medium">৳350-450</span>
                </li>
                <li className="flex justify-between">
                  <span>NSU ↔ Airport</span>
                  <span className="font-medium">৳300-400</span>
                </li>
                <li className="flex justify-between">
                  <span>CUET ↔ CGP Airport</span>
                  <span className="font-medium">৳280-380</span>
                </li>
                <li className="flex justify-between">
                  <span>SUST ↔ ZYL Airport</span>
                  <span className="font-medium">৳200-280</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Inter-University</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>DU ↔ BUET</span>
                  <span className="font-medium">৳25-40</span>
                </li>
                <li className="flex justify-between">
                  <span>NSU ↔ BRACU</span>
                  <span className="font-medium">৳30-45</span>
                </li>
                <li className="flex justify-between">
                  <span>CU ↔ CUET</span>
                  <span className="font-medium">৳45-65</span>
                </li>
                <li className="flex justify-between">
                  <span>RU ↔ RUET</span>
                  <span className="font-medium">৳35-50</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Information */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              University Partnerships
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">For Universities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Dedicated campus transportation solutions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Student discount programs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Event transportation arrangements
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Monthly usage reports and analytics
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">For Students</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Verified student-only rides
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    University ID-based discounts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Priority booking during exams
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    24/7 campus safety support
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mr-4">
                Partner With Us
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                Student Registration
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default UniversitiesPage;