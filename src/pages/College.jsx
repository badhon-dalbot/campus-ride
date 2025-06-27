import {
  BookOpen,
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
  GraduationCap,
  Search,
  School
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const CollegesPage = () => {
  const [selectedCity, setSelectedCity] = useState("dhaka");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = [
    { id: "dhaka", name: "Dhaka", count: "200+ Colleges" },
    { id: "chittagong", name: "Chittagong", count: "80+ Colleges" },
    { id: "sylhet", name: "Sylhet", count: "45+ Colleges" },
    { id: "rajshahi", name: "Rajshahi", count: "60+ Colleges" }
  ];

  const collegeTypes = [
    { id: "all", name: "All Colleges" },
    { id: "medical", name: "Medical" },
    { id: "engineering", name: "Engineering" },
    { id: "business", name: "Business" },
    { id: "arts", name: "Arts & Science" }
  ];

  const colleges = {
    dhaka: [
      {
        name: "Dhaka Medical College",
        shortName: "DMC",
        type: "medical",
        area: "Ramna",
        students: "4,500+",
        rides: "3K+ monthly",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        routes: ["Dhaka University", "Shahbagh", "Dhanmondi", "Uttara"],
        avgPrice: "৳35-70"
      },
      {
        name: "Dhaka Commerce College",
        shortName: "DCC",
        type: "business",
        area: "Mirpur",
        students: "8,000+",
        rides: "4K+ monthly",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        routes: ["Mirpur", "Dhanmondi", "Uttara", "Gulshan"],
        avgPrice: "৳30-60"
      },
      {
        name: "Notre Dame College",
        shortName: "NDC",
        type: "arts",
        area: "Motijheel",
        students: "6,000+",
        rides: "2.5K+ monthly",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["Dhaka University", "Dhanmondi", "Uttara", "Gulshan"],
        avgPrice: "৳40-75"
      },
      {
        name: "Dhaka Polytechnic Institute",
        shortName: "DPI",
        type: "engineering",
        area: "Tejgaon",
        students: "5,500+",
        rides: "3.5K+ monthly",
        rating: "4.4",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
        routes: ["Tejgaon", "Farmgate", "Uttara", "Mirpur"],
        avgPrice: "৳25-55"
      },
      {
        name: "Holy Cross College",
        shortName: "HCC",
        type: "arts",
        area: "Tejgaon",
        students: "4,000+",
        rides: "2K+ monthly",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["Farmgate", "Dhanmondi", "Uttara", "Gulshan"],
        avgPrice: "৳30-65"
      },
      {
        name: "Adamjee Cantonment College",
        shortName: "ACC",
        type: "arts",
        area: "Dhaka Cantonment",
        students: "3,500+",
        rides: "1.8K+ monthly",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["Cantonment", "Uttara", "Gulshan", "Tejgaon"],
        avgPrice: "৳35-70"
      }
    ],
    chittagong: [
      {
        name: "Chittagong Medical College",
        shortName: "CMC",
        type: "medical",
        area: "Panchlaish",
        students: "3,500+",
        rides: "2K+ monthly",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        routes: ["GEC Circle", "Agrabad", "Port Area", "University Area"],
        avgPrice: "৳30-60"
      },
      {
        name: "Chittagong College",
        shortName: "CC",
        type: "arts",
        area: "College Road",
        students: "6,000+",
        rides: "2.5K+ monthly",
        rating: "4.4",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["GEC Circle", "New Market", "Station Road", "Port Area"],
        avgPrice: "৳25-50"
      },
      {
        name: "Chittagong Polytechnic Institute",
        shortName: "CPI",
        type: "engineering",
        area: "Nasirabad",
        students: "4,000+",
        rides: "1.8K+ monthly",
        rating: "4.3",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
        routes: ["Nasirabad", "GEC Circle", "Agrabad", "Port Area"],
        avgPrice: "৳20-45"
      }
    ],
    sylhet: [
      {
        name: "Sylhet MAG Osmani Medical College",
        shortName: "SOMCC",
        type: "medical",
        area: "Sylhet",
        students: "3,000+",
        rides: "1.5K+ monthly",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        routes: ["Zindabazar", "Bandarbazar", "Amberkhana", "Airport"],
        avgPrice: "৳25-50"
      },
      {
        name: "MC College",
        shortName: "MCC",
        type: "arts",
        area: "Sylhet",
        students: "5,000+",
        rides: "2K+ monthly",
        rating: "4.4",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["Zindabazar", "Chowhatta", "Lamabazar", "SUST"],
        avgPrice: "৳20-40"
      },
      {
        name: "Sylhet Polytechnic Institute",
        shortName: "SPI",
        type: "engineering",
        area: "Sylhet",
        students: "2,500+",
        rides: "1.2K+ monthly",
        rating: "4.2",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
        routes: ["Medical Road", "Zindabazar", "Chowhatta", "SUST"],
        avgPrice: "৳15-35"
      }
    ],
    rajshahi: [
      {
        name: "Rajshahi Medical College",
        shortName: "RMC",
        type: "medical",
        area: "Rajshahi",
        students: "2,800+",
        rides: "1.8K+ monthly",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        routes: ["Medical More", "New Market", "University Area", "Station Road"],
        avgPrice: "৳25-50"
      },
      {
        name: "Rajshahi College",
        shortName: "RC",
        type: "arts",
        area: "Rajshahi",
        students: "4,500+",
        rides: "2.2K+ monthly",
        rating: "4.3",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
        routes: ["College Para", "New Market", "University Area", "City Center"],
        avgPrice: "৳20-40"
      },
      {
        name: "Rajshahi Polytechnic Institute",
        shortName: "RPI",
        type: "engineering",
        area: "Rajshahi",
        students: "3,000+",
        rides: "1.5K+ monthly",
        rating: "4.2",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
        routes: ["Polytechnic Area", "New Market", "University Area", "RUET"],
        avgPrice: "৳18-38"
      }
    ]
  };

  const services = [
    {
      icon: School,
      title: "College Shuttle",
      description: "Regular transportation between college campuses and city centers"
    },
    {
      icon: BookOpen,
      title: "Exam Special",
      description: "Priority booking and extended hours during examination periods"
    },
    {
      icon: Coffee,
      title: "Student Events",
      description: "Group transportation for college cultural programs and sports events"
    },
    {
      icon: Shield,
      title: "Safe Commute",
      description: "Verified drivers and real-time tracking for secure college commutes"
    }
  ];

  const filteredColleges = colleges[selectedCity]?.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || college.type === selectedType;
    return matchesSearch && matchesType;
  }) || [];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'medical': return '🏥';
      case 'engineering': return '⚙️';
      case 'business': return '💼';
      case 'arts': return '🎨';
      default: return '🏫';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            College Transportation
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Connecting students across 300+ colleges with affordable, reliable transportation
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for your college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-teal-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Find My College
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              View All Routes
            </button>
          </div>
        </div>
      </div>

      {/* City & Type Selection */}
      <div className="bg-teal-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Find Your College
          </h2>
          
          {/* City Selection */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
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

          {/* Type Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {collegeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedType === type.id
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Colleges in {cities.find(c => c.id === selectedCity)?.name}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img 
                    src={college.image} 
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getTypeIcon(college.type)}</span>
                      <h3 className="text-lg font-bold text-gray-800">
                        {college.shortName}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-600">{college.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{college.name}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {college.area}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {college.students}
                    </div>
                    <div className="flex items-center">
                      <Car className="w-3 h-3 mr-1" />
                      {college.rides}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {college.avgPrice}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-2">Popular Routes:</p>
                    <div className="flex flex-wrap gap-1">
                      {college.routes.slice(0, 3).map((route, idx) => (
                        <span key={idx} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                          {route}
                        </span>
                      ))}
                      {college.routes.length > 3 && (
                        <span className="text-teal-600 text-xs">+{college.routes.length - 3} more</span>
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

          {filteredColleges.length === 0 && (
            <div className="text-center text-white">
              <p className="text-xl mb-4">No colleges found matching your criteria</p>
              <p className="opacity-80">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Services */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            College Transportation Services
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

      {/* Popular Routes by Type */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Popular College Routes by Type
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                🏥 Medical Colleges
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex justify-between">
                  <span>DMC ↔ Shahbagh</span>
                  <span className="font-medium">৳35-60</span>
                </li>
                <li className="flex justify-between">
                  <span>CMC ↔ GEC Circle</span>
                  <span className="font-medium">৳30-55</span>
                </li>
                <li className="flex justify-between">
                  <span>RMC ↔ Medical More</span>
                  <span className="font-medium">৳25-45</span>
                </li>
                <li className="flex justify-between">
                  <span>SOMCC ↔ Zindabazar</span>
                  <span className="font-medium">৳20-40</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                ⚙️ Engineering Colleges
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex justify-between">
                  <span>DPI ↔ Tejgaon</span>
                  <span className="font-medium">৳25-50</span>
                </li>
                <li className="flex justify-between">
                  <span>CPI ↔ Nasirabad</span>
                  <span className="font-medium">৳20-40</span>
                </li>
                <li className="flex justify-between">
                  <span>RPI ↔ University Area</span>
                  <span className="font-medium">৳18-35</span>
                </li>
                <li className="flex justify-between">
                  <span>SPI ↔ Medical Road</span>
                  <span className="font-medium">৳15-30</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                🎨 Arts & Science
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex justify-between">
                  <span>NDC ↔ Motijheel</span>
                  <span className="font-medium">৳40-70</span>
                </li>
                <li className="flex justify-between">
                  <span>HCC ↔ Farmgate</span>
                  <span className="font-medium">৳30-60</span>
                </li>
                <li className="flex justify-between">
                  <span>CC ↔ College Road</span>
                  <span className="font-medium">৳25-45</span>
                </li>
                <li className="flex justify-between">
                  <span>MCC ↔ Zindabazar</span>
                  <span className="font-medium">৳20-35</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                💼 Business Colleges
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex justify-between">
                  <span>DCC ↔ Mirpur</span>
                  <span className="font-medium">৳30-55</span>
                </li>
                <li className="flex justify-between">
                  <span>Business Hub ↔ Dhanmondi</span>
                  <span className="font-medium">৳35-60</span>
                </li>
                <li className="flex justify-between">
                  <span>Commerce ↔ New Market</span>
                  <span className="font-medium">৳25-45</span>
                </li>
                <li className="flex justify-between">
                  <span>Management ↔ Gulshan</span>
                  <span className="font-medium">৳40-70</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* College Partnership Information */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              College Transportation Programs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">For Colleges</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Customized transportation solutions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Student verification systems
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Special event transportation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Monthly usage analytics
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">For Students</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    College ID-based discounts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Verified student community
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Exam period priority booking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                    Group ride coordinación
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mr-4">
                Register Your College
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                Student Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default CollegesPage;