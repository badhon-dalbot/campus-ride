import React, { useState } from 'react';
import { ChevronLeft, Star, Mail, Phone, Calendar, Car, DollarSign, Leaf, Edit3, Bell, MessageSquare, CreditCard, Shield, Eye, Trash2, GraduationCap, BookOpen, MapPin, Clock, Users, Home, Building } from 'lucide-react';

// Mock components for demonstration
const CampusRideHeader = () => (
  <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#17252A'}}>
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">CampusRide</h1>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-gray-900 font-medium">Find Rides</button>
        <button className="text-gray-600 hover:text-gray-900 font-medium">Offer a Ride</button>
        <button className="text-gray-600 hover:text-gray-900 font-medium">My Rides</button>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
        </button>
        <button>
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  </div>
);

const CampusRideFooter = () => (
  <div className="w-full text-white px-6 py-8 mt-12" style={{backgroundColor: '#17252A'}}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center text-sm text-gray-400">
        <p>&copy; 2025 CampusRide. All rights reserved.</p>
      </div>
    </div>
  </div>
);

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bio, setBio] = useState('Computer Science major who loves exploring the city! Always up for sharing rides and meeting new people. Environmentally conscious and budget-friendly student.');
  const [preferences, setPreferences] = useState({
    musicAllowed: true,
    quietRides: false,
    friendlyChat: true,
    earlyPickup: false,
    flexibleTiming: true
  });
  const [profileData, setProfileData] = useState({
    name: 'Emma Chen',
    email: 'emma.chen@university.edu',
    phone: '+1 (555) 234-5678',
    university: 'University of Technology',
    studentId: 'UT2022003',
    major: 'Computer Science',
    graduationYear: '2026',
    dormBuilding: 'North Hall',
    roomNumber: '304',
    emergencyContact: '+1 (555) 876-5432',
    emergencyName: 'Linda Chen (Mother)'
  });

  const tabs = ['Overview', 'Ride History', 'Reviews', 'Payments', 'Settings'];

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    setIsEditingBio(false);
  };

  const handleCancelEdit = () => {
    setIsEditingBio(false);
    setBio('Computer Science major who loves exploring the city! Always up for sharing rides and meeting new people. Environmentally conscious and budget-friendly student.');
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
  };

  const handleProfileInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const reviews = [
    {
      id: 1,
      reviewer: "Alex Rodriguez",
      rating: 5,
      comment: "Emma is a wonderful passenger! Always on time, respectful, and great company during the ride.",
      date: "3 days ago",
      route: "Campus to Downtown Mall"
    },
    {
      id: 2,
      reviewer: "Mike Johnson",
      rating: 5,
      comment: "Very reliable and friendly. Easy to communicate with and always ready at pickup time.",
      date: "1 week ago",
      route: "Dorms to Airport"
    },
    {
      id: 3,
      reviewer: "Sarah Davis",
      rating: 4,
      comment: "Pleasant passenger, good conversation. Would definitely offer rides again!",
      date: "2 weeks ago",
      route: "Campus to Train Station"
    }
  ];

  const rideHistory = [
    {
      id: 1,
      date: 'Jan 15, 2025',
      route: 'Campus → Downtown Mall',
      driver: 'Alex Rodriguez',
      cost: '$12.00',
      status: 'Completed',
      rating: 5
    },
    {
      id: 2,
      date: 'Jan 12, 2025',
      route: 'Dorms → Airport',
      driver: 'Mike Johnson',
      cost: '$25.00',
      status: 'Completed',
      rating: 5
    },
    {
      id: 3,
      date: 'Jan 8, 2025',
      route: 'Campus → Train Station',
      driver: 'Sarah Davis',
      cost: '$8.00',
      status: 'Completed',
      rating: 4
    },
    {
      id: 4,
      date: 'Jan 5, 2025',
      route: 'Dorms → Shopping Center',
      driver: 'Tom Wilson',
      cost: '$15.00',
      status: 'Completed',
      rating: 5
    },
    {
      id: 5,
      date: 'Jan 2, 2025',
      route: 'Campus → Home (Holiday)',
      driver: 'Lisa Anderson',
      cost: '$45.00',
      status: 'Completed',
      rating: 4
    }
  ];

  const favoriteRoutes = [
    { route: 'Campus → Downtown Mall', frequency: 12, avgCost: '$12.00' },
    { route: 'Dorms → Airport', frequency: 8, avgCost: '$25.00' },
    { route: 'Campus → Train Station', frequency: 6, avgCost: '$8.00' },
    { route: 'Dorms → Shopping Center', frequency: 5, avgCost: '$15.00' }
  ];

  const upcomingSchedule = [
    { time: '9:00 AM', event: 'Data Structures (CS 201)', location: 'Engineering Building' },
    { time: '11:00 AM', event: 'Calculus III', location: 'Math Building' },
    { time: '2:00 PM', event: 'Study Group - Algorithms', location: 'Library' },
    { time: '4:00 PM', event: 'Part-time Job', location: 'Campus Bookstore' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <CampusRideHeader />
      
      {/* Main Content */}
      <div className="flex-1 p-6" style={{backgroundColor: '#EBF5F5'}}>
        <div className="max-w-6xl mx-auto">
          {!isEditingProfile ? (
            <>
              {/* Back Button and Title */}
              <div className="mb-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Back</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 text-center">Student Profile</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Student Info */}
                <div className="space-y-6">
                  {/* Student Profile Card */}
                  <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                    <div className="text-center">
                      {/* Profile Picture */}
                      <div className="relative inline-block mb-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl text-gray-400">👤</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 text-white rounded-full w-6 h-6 flex items-center justify-center" style={{backgroundColor: '#17252A'}}>
                          <span className="text-xs">✓</span>
                        </div>
                      </div>
                      
                      {/* Name and Verification */}
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{profileData.name}</h2>
                      <div className="inline-flex items-center gap-1 text-white px-3 py-1 rounded-full text-xs font-medium mb-2" style={{backgroundColor: '#17252A'}}>
                        <GraduationCap className="w-3 h-3" />
                        Verified Student
                      </div>
                      
                      {/* Student Info */}
                      <div className="text-sm text-gray-600 mb-2">
                        <div>{profileData.major}</div>
                        <div>Class of {profileData.graduationYear}</div>
                      </div>
                      
                      {/* Passenger Rating */}
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">4.8</span>
                        <span className="text-gray-500 text-sm">(32 rides)</span>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-4">Member since September 2022</p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 border-t border-gray-300 pt-4">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        <span>{profileData.dormBuilding} - Room {profileData.roomNumber}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleEditProfile}
                      className="w-full mt-4 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      style={{backgroundColor: '#17252A'}}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>

                  {/* Student Stats */}
                  <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">My Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Car className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Total Rides</span>
                        </div>
                        <span className="font-semibold text-gray-900">32</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Money Saved</span>
                        </div>
                        <span className="font-semibold text-gray-900">$485</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Leaf className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">CO₂ Reduced</span>
                        </div>
                        <span className="font-semibold text-gray-900">18.6 kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">On-Time Rate</span>
                        </div>
                        <span className="font-semibold text-gray-900">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Drivers Met</span>
                        </div>
                        <span className="font-semibold text-gray-900">28</span>
                      </div>
                    </div>
                  </div>

                  {/* Today's Schedule */}
                  <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
                    <div className="space-y-3">
                      {upcomingSchedule.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="text-xs font-medium text-gray-600 w-16 mt-1">{item.time}</div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{item.event}</div>
                            <div className="text-xs text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Tabs Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Tabs */}
                  <div className="rounded-lg border border-gray-200 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                    <div className="grid grid-cols-5">
                      {tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                            activeTab === tab
                              ? 'border-gray-900 text-gray-900'
                              : 'border-transparent text-gray-600 hover:text-gray-800'
                          }`}
                          style={activeTab === tab ? {backgroundColor: '#EBF5F5'} : {}}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'Overview' && (
                    <div className="space-y-6">
                      {/* About Me Block */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
                          {!isEditingBio && (
                            <button 
                              onClick={handleEditBio}
                              className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit Bio
                            </button>
                          )}
                        </div>
                        {isEditingBio ? (
                          <div>
                            <textarea
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Tell drivers about yourself..."
                            />
                            <div className="flex gap-2 mt-3">
                              <button 
                                onClick={handleSaveBio}
                                className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                style={{backgroundColor: '#17252A'}}
                              >
                                Save
                              </button>
                              <button 
                                onClick={handleCancelEdit}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{bio}</p>
                        )}
                      </div>

                      {/* Passenger Preferences Block */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">🎵 Enjoys music during rides</span>
                            <button
                              onClick={() => togglePreference('musicAllowed')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                preferences.musicAllowed
                                  ? 'text-white'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                              style={preferences.musicAllowed ? {backgroundColor: '#17252A'} : {}}
                            >
                              {preferences.musicAllowed ? 'Yes' : 'No'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">🤫 Prefers quiet rides</span>
                            <button
                              onClick={() => togglePreference('quietRides')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                preferences.quietRides
                                  ? 'text-white'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                              style={preferences.quietRides ? {backgroundColor: '#17252A'} : {}}
                            >
                              {preferences.quietRides ? 'Yes' : 'No'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">😊 Enjoys friendly conversation</span>
                            <button
                              onClick={() => togglePreference('friendlyChat')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                preferences.friendlyChat
                                  ? 'text-white'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                              style={preferences.friendlyChat ? {backgroundColor: '#17252A'} : {}}
                            >
                              {preferences.friendlyChat ? 'Yes' : 'No'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">⏰ Flexible with timing</span>
                            <button
                              onClick={() => togglePreference('flexibleTiming')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                preferences.flexibleTiming
                                  ? 'text-white'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                              style={preferences.flexibleTiming ? {backgroundColor: '#17252A'} : {}}
                            >
                              {preferences.flexibleTiming ? 'Yes' : 'No'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">🌅 Available for early pickups</span>
                            <button
                              onClick={() => togglePreference('earlyPickup')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                preferences.earlyPickup
                                  ? 'text-white'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                              style={preferences.earlyPickup ? {backgroundColor: '#17252A'} : {}}
                            >
                              {preferences.earlyPickup ? 'Yes' : 'No'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Favorite Routes */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Routes</h3>
                        <div className="space-y-3">
                          {favoriteRoutes.map((route, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-300 last:border-b-0">
                              <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-gray-600" />
                                <div>
                                  <div className="font-medium text-gray-900">{route.route}</div>
                                  <div className="text-sm text-gray-600">{route.frequency} rides • Avg: {route.avgCost}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Verification Status */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Shield className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">Identity Verified</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <GraduationCap className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">Student Status</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">Phone Number</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">University Email</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Ride History' && (
                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Rides</h3>
                      <div className="space-y-4">
                        {rideHistory.map(ride => (
                          <div key={ride.id} className="p-4 rounded-lg border border-gray-300" style={{backgroundColor: '#EBF5F5'}}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-gray-600" />
                                <div>
                                  <div className="font-medium text-gray-900">{ride.route}</div>
                                  <div className="text-sm text-gray-600">{ride.date} • Driver: {ride.driver}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900">{ride.cost}</div>
                                <div className="flex items-center gap-1">
                                  {[1,2,3,4,5].map(i => (
                                    <Star 
                                      key={i} 
                                      className={`w-3 h-3 ${i <= ride.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                {ride.status}
                              </span>
                              <button className="text-gray-600 hover:text-gray-800 text-sm">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 text-white py-2 rounded-lg text-sm font-medium transition-colors" style={{backgroundColor: '#17252A'}}>
                        View All Rides
                      </button>
                    </div>
                  )}

                  {activeTab === 'Reviews' && (
                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews from Drivers</h3>
                      <div className="mb-6 p-4 rounded-lg" style={{backgroundColor: '#EBF5F5'}}>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">4.8</div>
                            <div className="flex items-center justify-center">
                              {[1,2,3,4,5].map(i => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">32 reviews</div>
                          </div>
                          <div className="flex-1">
                            <div className="space-y-1">
                              {[5,4,3,2,1].map(rating => (
                                <div key={rating} className="flex items-center gap-2">
                                  <span className="text-sm w-4">{rating}</span>
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-yellow-400 h-2 rounded-full" 
                                      style={{width: rating === 5 ? '75%' : rating === 4 ? '20%' : '3%'}}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-500 w-8">{rating === 5 ? '24' : rating === 4 ? '6' : '2'}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {reviews.map(review => (
                          <div key={review.id} className="border-b border-gray-300 pb-4 last:border-b-0">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">{review.reviewer.charAt(0)}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900">{review.reviewer}</span>
                                  <div className="flex">
                                    {[1,2,3,4,5].map(i => (
                                      <Star 
                                        key={i} 
                                        className={`w-3 h-3 ${i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                  <MapPin className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{review.route}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'Payments' && (
                    <div className="space-y-6">
                      {/* Payment Methods */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                        <div className="space-y-4">
                          <div className="border border-gray-300 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-gray-600" />
                                <div>
                                  <div className="font-medium text-gray-900">**** **** **** 1234</div>
                                  <div className="text-sm text-gray-600">Expires 08/26</div>
                                </div>
                              </div>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Primary</span>
                            </div>
                          </div>
                          <div className="border border-gray-300 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-gray-600" />
                                <div>
                                  <div className="font-medium text-gray-900">**** **** **** 5678</div>
                                  <div className="text-sm text-gray-600">Expires 12/27</div>
                                </div>
                              </div>
                              <button className="text-gray-400 hover:text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <button className="w-full border-2 border-dashed border-gray-400 rounded-lg p-4 text-gray-600 hover:border-gray-500 hover:text-gray-700 transition-colors">
                            + Add New Payment Method
                          </button>
                        </div>
                      </div>

                      {/* Payment History */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
                        <div className="space-y-3">
                          {rideHistory.slice(0, 5).map(ride => (
                            <div key={ride.id} className="flex items-center justify-between py-2 border-b border-gray-300 last:border-b-0">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-4 h-4 text-gray-600" />
                                <div>
                                  <div className="font-medium text-gray-900">{ride.route}</div>
                                  <div className="text-sm text-gray-600">{ride.date}</div>
                                </div>
                              </div>
                              <span className="font-medium text-gray-900">{ride.cost}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 rounded-lg" style={{backgroundColor: '#EBF5F5'}}>
                          <div className="text-sm text-gray-700">
                            <div className="flex justify-between mb-1">
                              <span>Total spent this month:</span>
                              <span className="font-medium">$85.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total lifetime spending:</span>
                              <span className="font-medium">$485.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Settings' && (
                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Ride Preferences</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Receive ride suggestions</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Auto-accept rides from trusted drivers</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" />
                              <span className="text-gray-700">Share location with emergency contacts during rides</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Notifications</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Ride confirmations</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Driver arrival notifications</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">New driver reviews</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" />
                              <span className="text-gray-700">Promotional offers</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Privacy & Security</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-700">Two-factor authentication</span>
                              </div>
                              <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                Enabled
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Eye className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-700">Profile visibility</span>
                              </div>
                              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                Students Only
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-300">
                          <button className="text-red-600 hover:text-red-700 font-medium">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Edit Profile Page */
            <>
              <div className="mb-6">
                <button 
                  onClick={handleCancelProfileEdit}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Profile</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 text-center">Edit Student Profile</h1>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Profile Picture Section */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-gray-400">👤</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 text-white rounded-full w-6 h-6 flex items-center justify-center" style={{backgroundColor: '#17252A'}}>
                        <span className="text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <button className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mr-3" style={{backgroundColor: '#17252A'}}>
                        Upload New Photo
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                        Remove
                      </button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleProfileInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                      <input
                        type="text"
                        value={profileData.university}
                        onChange={(e) => handleProfileInputChange('university', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                      <input
                        type="text"
                        value={profileData.studentId}
                        onChange={(e) => handleProfileInputChange('studentId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                      <input
                        type="text"
                        value={profileData.major}
                        onChange={(e) => handleProfileInputChange('major', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                      <input
                        type="text"
                        value={profileData.graduationYear}
                        onChange={(e) => handleProfileInputChange('graduationYear', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Housing Information */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Housing Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dorm Building</label>
                      <input
                        type="text"
                        value={profileData.dormBuilding}
                        onChange={(e) => handleProfileInputChange('dormBuilding', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                      <input
                        type="text"
                        value={profileData.roomNumber}
                        onChange={(e) => handleProfileInputChange('roomNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                      <input
                        type="text"
                        value={profileData.emergencyName}
                        onChange={(e) => handleProfileInputChange('emergencyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., John Doe (Father)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
                      <input
                        type="tel"
                        value={profileData.emergencyContact}
                        onChange={(e) => handleProfileInputChange('emergencyContact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell drivers about yourself..."
                  />
                </div>

                {/* Save/Cancel Buttons */}
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={handleSaveProfile}
                    className="flex-1 text-white py-3 rounded-lg text-sm font-medium transition-colors"
                    style={{backgroundColor: '#17252A'}}
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={handleCancelProfileEdit}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <CampusRideFooter />
    </div>
  );
}