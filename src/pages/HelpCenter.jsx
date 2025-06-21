import {
  Car,
  ChevronDown,
  CreditCard,
  MessageCircle,
  Phone,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("rider");
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const riderFAQs = [
    "How do I request a ride?",
    "What if I left something in my ride?",
    "How do I update my payment method?",
    "How do I report a safety incident?",
  ];

  const driverFAQs = [
    "How do I become a driver?",
    "What are the vehicle requirements?",
    "How do I get paid?",
    "How do I report an issue with a rider?",
  ];

  const currentFAQs = activeTab === "rider" ? riderFAQs : driverFAQs;

  return (
    <div className="min-h-screen bg-white">
      <CampusRideHeader />

      {/* Hero Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-5">
            How can we help you today?
          </h1>
          <p className="text-xl text-white mb-8 opacity-90">
            Find answers to your questions and get the support you need
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto border-3 border-white bg-teal-500 rounded-lg shadow-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search for the article..."
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 placeholder-teal-200 focus:outline-none focus:ring-3 focus:ring-teal-300"
            />
          </div>
        </div>
      </div>

      {/* Popular Help Topics */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center  mb-12">
            Popular Help Topics
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Account Issues */}
            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <User className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Account Issues
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Help with login problems, account verification, and profile
                updates.
              </p>
              <button className="text-teal-600 font-medium hover:text-teal-700">
                View articles →
              </button>
            </div>

            {/* Ride Issues */}
            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Car className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Ride Issues
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Help with current or past rides, maps, and driver communication.
              </p>
              <button className="text-teal-600 font-medium hover:text-teal-700">
                View articles →
              </button>
            </div>

            {/* Payment Issues */}
            <div className="bg-teal-200 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <CreditCard className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Payment Issues
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Help with payment methods, receipts, refunds, and promotions.
              </p>
              <button className="text-teal-600 font-medium hover:text-teal-700">
                View articles →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-teal-400 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>

          {/* FAQ Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab("rider")}
                className={`px-8 py-3 rounded-md font-medium transition-colors ${
                  activeTab === "rider"
                    ? "bg-teal-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Rider FAQ
              </button>
              <button
                onClick={() => setActiveTab("driver")}
                className={`px-8 py-3 rounded-md font-medium transition-colors ${
                  activeTab === "driver"
                    ? "bg-teal-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Driver FAQ
              </button>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {currentFAQs.map((question, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-800">{question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    <p>
                      This is where the answer to "{question}" would appear. You
                      can add the actual FAQ content here.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Still Need Help Section */}
      <div className="bg-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-teal-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Still need help?
            </h2>
            <p className="text-gray-700 mb-8">
              Can't find what you're looking for? Our support team is here to
              help you with any questions or issues.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Payment Issues */}
              <div className="text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Payment Issues
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get help from our support team through live chat.
                </p>
                <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Start Chat
                </button>
              </div>

              {/* Call Support */}
              <div className="text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Call Support
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak directly with our support team.
                </p>
                <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Start Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CampusRideFooter />
    </div>
  );
};

export default HelpPage;
