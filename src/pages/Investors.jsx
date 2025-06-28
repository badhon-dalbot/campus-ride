import {
  TrendingUp,
  FileText,
  Users,
  Building,
  Calendar,
  Download,
  Mail,
  Phone,
  BarChart3,
  Target,
  Globe,
  Shield,
  DollarSign,
  ChevronDown,
  ExternalLink,
  Presentation
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const InvestorsPage = () => {
  const [activeYear, setActiveYear] = useState("2024");

  const keyMetrics = [
    {
      title: "Total Revenue",
      value: "৳85M",
      growth: "+127%",
      period: "FY 2024"
    },
    {
      title: "Active Students",
      value: "50,000+",
      growth: "+89%",
      period: "Q2 2025"
    },
    {
      title: "University Partners",
      value: "15",
      growth: "+200%",
      period: "Current"
    },
    {
      title: "Monthly Rides",
      value: "180K",
      growth: "+156%",
      period: "June 2025"
    }
  ];

  const financialHighlights = [
    {
      metric: "Gross Merchandise Value",
      fy2024: "৳420M",
      fy2023: "৳185M",
      growth: "+127%"
    },
    {
      metric: "Net Revenue",
      fy2024: "৳85M",
      fy2023: "৳37M",
      growth: "+130%"
    },
    {
      metric: "Gross Margin",
      fy2024: "68%",
      fy2023: "62%",
      growth: "+6pp"
    },
    {
      metric: "Customer Acquisition Cost",
      fy2024: "৳125",
      fy2023: "৳180",
      growth: "-31%"
    }
  ];

  const investorResources = [
    {
      title: "Annual Report 2024",
      description: "Comprehensive overview of our financial performance and strategic initiatives",
      icon: FileText,
      date: "March 2025",
      downloadLink: "#"
    },
    {
      title: "Q2 2025 Earnings Presentation",
      description: "Latest quarterly results and business outlook",
      icon: Presentation,
      date: "June 2025",
      downloadLink: "#"
    },
    {
      title: "Corporate Governance Report",
      description: "Our commitment to transparency and ethical business practices",
      icon: Shield,
      date: "March 2025",
      downloadLink: "#"
    },
    {
      title: "ESG Impact Report",
      description: "Environmental, social, and governance initiatives and metrics",
      icon: Globe,
      date: "April 2025",
      downloadLink: "#"
    }
  ];

  const upcomingEvents = [
    {
      date: "July 15, 2025",
      event: "Q2 2025 Earnings Call",
      time: "10:00 AM BDT",
      type: "Virtual"
    },
    {
      date: "August 22, 2025",
      event: "Bangladesh Tech Investor Conference",
      time: "2:00 PM BDT",
      type: "Dhaka, BD"
    },
    {
      date: "September 10, 2025",
      event: "University Partnership Summit",
      time: "9:00 AM BDT",
      type: "Virtual"
    }
  ];

  const leadership = [
    {
      name: "Rafiq Ahmed",
      position: "Chief Executive Officer",
      experience: "Former VP of Operations at Pathao, 8+ years in mobility"
    },
    {
      name: "Fatima Khan",
      position: "Chief Financial Officer",
      experience: "Ex-Finance Director at bKash, CPA with 10+ years experience"
    },
    {
      name: "Dr. Mahmud Hassan",
      position: "Chief Technology Officer",
      experience: "Former Lead Engineer at Grameenphone, PhD Computer Science"
    },
    {
      name: "Nasir Rahman",
      position: "Chief Operating Officer",
      experience: "Former Operations Head at Foodpanda BD, MBA from IBA-DU"
    }
  ];

  const investmentThesis = [
    {
      icon: Target,
      title: "Massive Addressable Market",
      description: "2.5M+ university students across Bangladesh with growing mobility needs"
    },
    {
      icon: TrendingUp,
      title: "Proven Growth Model",
      description: "127% revenue growth with expanding margins and strong unit economics"
    },
    {
      icon: Shield,
      title: "Defensible Platform",
      description: "Network effects, university partnerships, and regulatory compliance create moats"
    },
    {
      icon: Globe,
      title: "Expansion Opportunity",
      description: "Scalable model ready for regional expansion across South Asia"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-5">
            Investor Relations
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Driving sustainable growth in Bangladesh's student mobility market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Latest Earnings
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              IR Contact
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Key Performance Indicators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                <h3 className="text-3xl font-bold text-teal-600 mb-2">
                  {metric.value}
                </h3>
                <p className="text-gray-800 font-semibold mb-1">{metric.title}</p>
                <div className="flex items-center justify-center">
                  <span className="text-green-600 font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {metric.growth}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">{metric.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Thesis */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Investment Opportunity
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {investmentThesis.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Financial Highlights */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Financial Highlights
          </h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-teal-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">Metric</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">FY 2024</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">FY 2023</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {financialHighlights.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-800">{item.metric}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.fy2024}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.fy2023}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-600 font-medium">{item.growth}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Leadership Team
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <Users className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {leader.name}
                    </h3>
                    <p className="text-teal-600 font-medium">{leader.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {leader.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investor Resources */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Investor Resources
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {investorResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {resource.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{resource.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    {resource.description}
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

      {/* Upcoming Events */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Upcoming Events
          </h2>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-teal-200 rounded-lg p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-2 md:mb-0">
                    <div className="bg-teal-100 p-2 rounded-lg mr-4">
                      <Calendar className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{event.event}</h3>
                      <p className="text-gray-600 text-sm">{event.date} • {event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm mr-3">
                      {event.type}
                    </span>
                    <button className="text-teal-600 font-medium hover:text-teal-700 flex items-center">
                      Register
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Investor Relations Contact
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              For investor inquiries, financial information, or to schedule meetings with management.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Investor Relations</h3>
                <p className="text-gray-600 mb-1">Fatima Khan</p>
                <p className="text-gray-600 mb-1">Chief Financial Officer</p>
                <p className="text-teal-600 font-medium">investors@campusride.bd</p>
                <p className="text-gray-600">+880 1900-000000</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Media Relations</h3>
                <p className="text-gray-600 mb-1">Sarah Rahman</p>
                <p className="text-gray-600 mb-1">Communications Manager</p>
                <p className="text-teal-600 font-medium">media@campusride.bd</p>
                <p className="text-gray-600">+880 1700-000000</p>
              </div>
            </div>

            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mt-8">
              Schedule Investor Meeting
            </button>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default InvestorsPage;