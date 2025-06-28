import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Image,
  Mail,
  Newspaper,
  Play,
  Users,
  Award,
  TrendingUp,
  Globe
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const NewsroomPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const newsCategories = [
    { id: "all", name: "All News" },
    { id: "company", name: "Company Updates" },
    { id: "partnership", name: "Partnerships" },
    { id: "safety", name: "Safety & Security" },
    { id: "expansion", name: "Campus Expansion" }
  ];

  const featuredNews = [
    {
      id: 1,
      title: "Campus Ride Expands to 15 Universities Across Bangladesh",
      excerpt: "Our student ridesharing platform now serves over 50,000 verified students across major universities in Dhaka, Chittagong, and Sylhet.",
      date: "June 20, 2025",
      category: "expansion",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "New Safety Features: Real-time GPS Tracking & Emergency Button",
      excerpt: "Enhanced safety measures include live location sharing with trusted contacts and instant emergency response system.",
      date: "June 15, 2025",
      category: "safety",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
      featured: true
    }
  ];

  const recentNews = [
    {
      id: 3,
      title: "Partnership with Student Housing Providers for Better Connectivity",
      excerpt: "Campus Ride partners with major student housing companies to provide seamless transportation between dormitories and campus.",
      date: "June 10, 2025",
      category: "partnership"
    },
    {
      id: 4,
      title: "Campus Ride Wins 'Best Student Innovation' Award at TechSummit Dhaka",
      excerpt: "Recognition for our contribution to sustainable transportation and student community building.",
      date: "June 5, 2025",
      category: "company"
    },
    {
      id: 5,
      title: "Monthly Impact Report: 200,000+ Shared Rides Completed",
      excerpt: "Students have saved over ৳2 million in transportation costs while reducing carbon emissions by 15 tons.",
      date: "June 1, 2025",
      category: "company"
    },
    {
      id: 6,
      title: "Enhanced Driver Verification Process Launched",
      excerpt: "New multi-step verification including background checks and driving record verification for all student drivers.",
      date: "May 28, 2025",
      category: "safety"
    },
    {
      id: 7,
      title: "Campus Ride Launches at Rajshahi University",
      excerpt: "Expanding our network to serve students in northern Bangladesh with our trusted ridesharing platform.",
      date: "May 25, 2025",
      category: "expansion"
    },
    {
      id: 8,
      title: "Student Driver Success Stories: Earning While Learning",
      excerpt: "Meet the student drivers who are funding their education by providing safe rides to their fellow students.",
      date: "May 20, 2025",
      category: "company"
    }
  ];

  const mediaKit = [
    {
      title: "Company Logos",
      description: "High-resolution Campus Ride logos in various formats",
      icon: Image,
      downloadLink: "#"
    },
    {
      title: "Press Release Template",
      description: "Latest press releases and company announcements",
      icon: FileText,
      downloadLink: "#"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and company information",
      icon: Newspaper,
      downloadLink: "#"
    },
    {
      title: "Leadership Photos",
      description: "Professional photos of Campus Ride leadership team",
      icon: Users,
      downloadLink: "#"
    }
  ];

  const filteredNews = activeCategory === "all" 
    ? [...featuredNews, ...recentNews]
    : [...featuredNews, ...recentNews].filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            Campus Ride Newsroom
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Stay updated with the latest news, announcements, and milestones from Campus Ride
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Media Inquiries
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Press Kit
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-teal-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Campus Ride by the Numbers
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">15</div>
              <p className="text-gray-700">University Partners</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">50K+</div>
              <p className="text-gray-700">Active Students</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">200K+</div>
              <p className="text-gray-700">Rides Completed</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-teal-600 mb-2">৳2M+</div>
              <p className="text-gray-700">Student Savings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured News */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Featured Stories
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {news.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {news.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {news.excerpt}
                  </p>
                  <button className="text-teal-600 font-medium hover:text-teal-700 flex items-center">
                    Read More
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News Categories & List */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Latest News & Updates
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {newsCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNews
              .filter(news => activeCategory === "all" || news.category === activeCategory)
              .map((news) => (
              <div key={news.id} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-3">
                  <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {news.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {news.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {news.excerpt}
                </p>
                <button className="text-teal-600 font-medium hover:text-teal-700 flex items-center">
                  Read More
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Media Resources
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {mediaKit.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Media Inquiries
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              For press inquiries, interviews, or additional information, please contact our media team.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Press Contact</h3>
                <p className="text-gray-600 mb-1">Sarah Rahman</p>
                <p className="text-gray-600 mb-1">Communications Manager</p>
                <p className="text-teal-600 font-medium">press@campusride.bd</p>
                <p className="text-gray-600">+880 1700-000000</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Partnership Inquiries</h3>
                <p className="text-gray-600 mb-1">Ahmed Hassan</p>
                <p className="text-gray-600 mb-1">Business Development</p>
                <p className="text-teal-600 font-medium">partnerships@campusride.bd</p>
                <p className="text-gray-600">+880 1800-000000</p>
              </div>
            </div>

            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mt-8">
              Send Media Inquiry
            </button>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default NewsroomPage;