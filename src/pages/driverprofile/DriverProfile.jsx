import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, Mail, Phone, Calendar, Car, DollarSign, Leaf, Edit3, Bell, MessageSquare, CreditCard, Shield, Eye, Trash2, Award, FileText, Wrench, Users, Clock, MapPin, Camera } from 'lucide-react';

// Mock components for demonstration
const CampusRideHeader = () => (
  <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#17252A' }}>
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
  <div className="w-full text-white px-6 py-8 mt-12" style={{ backgroundColor: '#17252A' }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center text-sm text-gray-400">
        <p>&copy; 2025 CampusRide. All rights reserved.</p>
      </div>
    </div>
  </div>
);

export default function DriverProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bio, setBio] = useState('Experienced driver with 5+ years of safe driving. Engineering student who loves meeting new people and sharing rides to reduce costs and environmental impact!');
  const [preferences, setPreferences] = useState({
    musicAllowed: true,
    petsAllowed: false,
    smokingAllowed: false,
    quietRides: false,
    maxPassengers: 3
  });
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    studentId: '',
    since: '--',
    emergencyContact: '',
    emergencyName: '',
    licenseNumber: '',
    licenseExpiry: '',
    insuranceProvider: '',
    insurancePolicy: '',
    insuranceExpiry: '',
    rating: 0,
    review_count: 0
  });

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    seats: '',
    fuelType: '',
    lastMaintenance: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ['Overview', 'Vehicle', 'Reviews', 'Earnings', 'Settings'];

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
    setBio('Experienced driver with 5+ years of safe driving. Engineering student who loves meeting new people and sharing rides to reduce costs and environmental impact!');
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

  const handleVehicleInputChange = (field, value) => {
    setVehicleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const reviews = [
    {
      id: 1,
      reviewer: "Sarah Chen",
      rating: 5,
      comment: "Alex is an amazing driver! Very safe, punctual, and the car is always clean. Great conversation too!",
      date: "2 days ago",
      route: "Campus to Downtown"
    },
    {
      id: 2,
      reviewer: "Mike Johnson",
      rating: 5,
      comment: "Reliable and professional. Alex helped me get to my internship on time every day for a month!",
      date: "1 week ago",
      route: "Dorms to Tech Park"
    },
    {
      id: 3,
      reviewer: "Emma Davis",
      rating: 4,
      comment: "Good driver, safe ride. Car was comfortable and Alex was very accommodating with pickup times.",
      date: "2 weeks ago",
      route: "Campus to Airport"
    }
  ];

  const earnings = [
    { month: 'December 2024', rides: 28, earnings: 420.50, tips: 45.00 },
    { month: 'November 2024', rides: 32, earnings: 485.75, tips: 52.25 },
    { month: 'October 2024', rides: 25, earnings: 375.00, tips: 38.50 },
    { month: 'September 2024', rides: 30, earnings: 450.25, tips: 41.75 }
  ];
  // Assuming user data is stored in sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user?.id);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    fetch(`http://localhost:3000/api/driver/${user.id}/profile`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch driver profile");
        return res.json();
      })
      .then((data) => {
        console.log("Driver profile data from backend:", data);
        // Set your profileData and vehicleData here based on API response
        setProfileData({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          since: data.created_at,
          university: data.university || '',
          studentId: data.studentId || '',
          emergencyContact: data.emergencyContact || '',
          emergencyName: data.emergencyName || '',
          licenseNumber: data.license_no || '',
          licenseExpiry: data.license_expiry || '',
          insuranceProvider: data.insurance_provider || '',
          insurancePolicy: data.insurance_policy || '',
          insuranceExpiry: data.insurance_expiry || '',
          rating: data.rating || 0,
          review_count: data.review_count || 0
        });
        setVehicleData({
          make: data.make || '',
          model: data.model || '',
          year: data.year || '',
          color: data.color || '',
          licensePlate: data.license_no || '',
          seats: data.seats || '',
          fuelType: data.fuel_type || '',
          lastMaintenance: data.last_maintenance || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user?.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <CampusRideHeader />

      {/* Main Content */}
      <div className="flex-1 p-6" style={{ backgroundColor: '#EBF5F5' }}>
        <div className="max-w-6xl mx-auto">
          {!isEditingProfile ? (
            <>
              {/* Back Button and Title */}
              <div className="mb-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Back</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 text-center">Driver Profile</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Driver Info */}
                <div className="space-y-6">
                  {/* Driver Profile Card */}
                  <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                    <div className="text-center">
                      {/* Profile Picture */}
                      <div className="relative inline-block mb-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-2xl text-gray-400">👤</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 text-white rounded-full w-6 h-6 flex items-center justify-center" style={{ backgroundColor: '#17252A' }}>
                          <span className="text-xs">✓</span>
                        </div>
                      </div>

                      {/* Name and Verification */}
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{profileData.name}</h2>
                      <div className="inline-flex items-center gap-1 text-white px-3 py-1 rounded-full text-xs font-medium mb-2" style={{ backgroundColor: '#17252A' }}>
                        <Award className="w-3 h-3" />
                        Verified Driver
                      </div>

                      {/* Driver Rating */}
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{profileData.rating ?? 'N/A'}</span>
                        <span className="text-gray-500 text-sm">({profileData.review_count})</span>
                      </div>
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
                        <Calendar className="w-4 h-4" />
                        <span>Driver since {profileData.since ? new Date(profileData.since).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleEditProfile}
                      className="w-full mt-4 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#17252A' }}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>

                  {/* Driver Stats */}
                  <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Car className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Total Trips</span>
                        </div>
                        <span className="font-semibold text-gray-900">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Passengers Served</span>
                        </div>
                        <span className="font-semibold text-gray-900">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Total Earned</span>
                        </div>
                        <span className="font-semibold text-gray-900">$1,890</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Leaf className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">CO₂ Saved</span>
                        </div>
                        <span className="font-semibold text-gray-900">45.2 kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">On-Time Rate</span>
                        </div>
                        <span className="font-semibold text-gray-900">96%</span>
                      </div>
                    </div>
                  </div>

                  {/* Current Vehicle */}
                  <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Vehicle</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">{vehicleData.year} {vehicleData.make} {vehicleData.model}</div>
                          <div className="text-sm text-gray-600">{vehicleData.color} • {vehicleData.seats} seats • {vehicleData.fuelType}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>License Plate: {vehicleData.licensePlate}</div>
                        <div>Last Maintenance: {vehicleData.lastMaintenance ? new Date(vehicleData.lastMaintenance).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit'}) : ''}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Tabs Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Tabs */}
                  <div className="rounded-lg border border-gray-200 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                    <div className="grid grid-cols-5">
                      {tabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === tab
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-600 hover:text-gray-800'
                            }`}
                          style={activeTab === tab ? { backgroundColor: '#EBF5F5' } : {}}
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
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
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
                              placeholder="Tell passengers about your driving experience..."
                            />
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={handleSaveBio}
                                className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                style={{ backgroundColor: '#17252A' }}
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

                      {/* Driver Preferences Block */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">🎵 Music allowed</span>
                            <button
                              onClick={() => togglePreference('musicAllowed')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${preferences.musicAllowed
                                ? 'text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                              style={preferences.musicAllowed ? { backgroundColor: '#17252A' } : {}}
                            >
                              {preferences.musicAllowed ? 'Yes' : 'No'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">🐕 Pets allowed</span>
                            <button
                              onClick={() => togglePreference('petsAllowed')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${preferences.petsAllowed
                                ? 'text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                              style={preferences.petsAllowed ? { backgroundColor: '#17252A' } : {}}
                            >
                              {preferences.petsAllowed ? 'Yes' : 'No'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">🚭 No smoking</span>
                            <button
                              onClick={() => togglePreference('smokingAllowed')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!preferences.smokingAllowed
                                ? 'text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                              style={!preferences.smokingAllowed ? { backgroundColor: '#17252A' } : {}}
                            >
                              {!preferences.smokingAllowed ? 'No Smoking' : 'Allowed'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">🤫 Quiet rides available</span>
                            <button
                              onClick={() => togglePreference('quietRides')}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${preferences.quietRides
                                ? 'text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                              style={preferences.quietRides ? { backgroundColor: '#17252A' } : {}}
                            >
                              {preferences.quietRides ? 'Yes' : 'No'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">👥 Max passengers</span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#17252A' }}>
                              {preferences.maxPassengers}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Verification Status */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
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
                              <FileText className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">Driver's License</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Car className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">Vehicle Registration</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Shield className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">Insurance</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Vehicle' && (
                    <div className="space-y-6">
                      {/* Vehicle Details */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Vehicle Information</h3>
                          <button className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1">
                            <Edit3 className="w-4 h-4" />
                            Edit Vehicle
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Make & Model</label>
                            <div className="text-gray-900">{vehicleData.year} {vehicleData.make} {vehicleData.model}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                            <div className="text-gray-900">{vehicleData.color}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                            <div className="text-gray-900">{vehicleData.licensePlate}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                            <div className="text-gray-900">{vehicleData.seats} seats</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                            <div className="text-gray-900">{vehicleData.fuelType}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
                            <div className="text-gray-900">{vehicleData.lastMaintenance ? new Date(vehicleData.lastMaintenance).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit'}) : ''}</div>
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Photos */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Photos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                              <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" style={{ backgroundColor: '#17252A' }}>
                          <Camera className="w-4 h-4" />
                          Add Photos
                        </button>
                      </div>

                      {/* Maintenance Records */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance History</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2 border-b border-gray-300">
                            <div className="flex items-center gap-3">
                              <Wrench className="w-4 h-4 text-gray-600" />
                              <div>
                                <div className="font-medium text-gray-900">Oil Change & Filter</div>
                                <div className="text-sm text-gray-600">Nov 15, 2024</div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">$65.00</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-300">
                            <div className="flex items-center gap-3">
                              <Wrench className="w-4 h-4 text-gray-600" />
                              <div>
                                <div className="font-medium text-gray-900">Tire Rotation</div>
                                <div className="text-sm text-gray-600">Sep 20, 2024</div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">$45.00</span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <Wrench className="w-4 h-4 text-gray-600" />
                              <div>
                                <div className="font-medium text-gray-900">Brake Inspection</div>
                                <div className="text-sm text-gray-600">Aug 10, 2024</div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">$120.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Reviews' && (
                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Reviews & Ratings</h3>
                      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#EBF5F5' }}>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">{profileData.rating}</div>
                            <div className="flex items-center justify-center">
                              {[1, 2, 3, 4, 5].map(i => {
                                const fill =
                                  profileData.rating >= i
                                    ? 100
                                    : profileData.rating >= i - 1
                                      ? Math.round(
                                        Math.max(
                                          0,
                                          Math.min(1, profileData.rating - (i - 1))
                                        ) * 100
                                      )
                                      : 0;
                                return (
                                  <span key={i} style={{ position: 'relative', display: 'inline-block', width: 16, height: 16 }}>
                                    <Star className="w-4 h-4 text-gray-300" />
                                    {fill > 0 && (
                                      <Star
                                        className="w-4 h-4 text-yellow-400 fill-current"
                                        style={{
                                          position: 'absolute',
                                          left: 0,
                                          top: 0,
                                          width: '100%',
                                          overflow: 'hidden',
                                          clipPath: `inset(0 ${100 - fill}% 0 0)`
                                        }}
                                      />
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{profileData.review_count} reviews</div>
                          </div>
                          <div className="flex-1">
                            <div className="space-y-1">
                              {[5, 4, 3, 2, 1].map(rating => (
                                <div key={rating} className="flex items-center gap-2">
                                  <span className="text-sm w-4">{rating}</span>
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-yellow-400 h-2 rounded-full"
                                      style={{ width: rating === 5 ? '85%' : rating === 4 ? '12%' : '2%' }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-500 w-8">{rating === 5 ? '76' : rating === 4 ? '11' : '2'}</span>
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
                                    {[1, 2, 3, 4, 5].map(i => (
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

                  {activeTab === 'Earnings' && (
                    <div className="space-y-6">
                      {/* Earnings Summary */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">$1,890</div>
                            <div className="text-sm text-gray-600">Total Earned</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">$177</div>
                            <div className="text-sm text-gray-600">Total Tips</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">89</div>
                            <div className="text-sm text-gray-600">Total Trips</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">$21</div>
                            <div className="text-sm text-gray-600">Avg per Trip</div>
                          </div>
                        </div>
                      </div>

                      {/* Monthly Breakdown */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
                        <div className="space-y-3">
                          {earnings.map((month, index) => (
                            <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: '#EBF5F5' }}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">{month.month}</span>
                                <span className="text-lg font-bold text-gray-900">${month.earnings.toFixed(2)}</span>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Rides: </span>
                                  <span className="font-medium">{month.rides}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Tips: </span>
                                  <span className="font-medium">${month.tips.toFixed(2)}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Avg/Trip: </span>
                                  <span className="font-medium">${(month.earnings / month.rides).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payout Method</h3>
                        <div className="space-y-4">
                          <div className="border border-gray-300 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-gray-600" />
                                <div>
                                  <div className="font-medium text-gray-900">Bank Account ****4532</div>
                                  <div className="text-sm text-gray-600">Wells Fargo</div>
                                </div>
                              </div>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Primary</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Settings' && (
                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Settings</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Available for rides</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Weekend availability</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" />
                              <span className="text-gray-700">Late night rides (10PM-6AM)</span>
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Driver Notifications</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Ride requests</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">Payment confirmations</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="mr-3" defaultChecked />
                              <span className="text-gray-700">New reviews</span>
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
                                Drivers Only
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-300">
                          <button className="text-red-600 hover:text-red-700 font-medium">
                            Deactivate Driver Account
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
                <h1 className="text-2xl font-bold text-gray-900 text-center">Edit Driver Profile</h1>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Profile Picture Section */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-gray-400">👤</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 text-white rounded-full w-6 h-6 flex items-center justify-center" style={{ backgroundColor: '#17252A' }}>
                        <span className="text-xs">✓</span>
                      </div>
                    </div>
                    <div>
                      <button className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mr-3" style={{ backgroundColor: '#17252A' }}>
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
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
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
                  </div>
                </div>

                {/* Driver License Information */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver License Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                      <input
                        type="text"
                        value={profileData.licenseNumber}
                        onChange={(e) => handleProfileInputChange('licenseNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Expiry</label>
                      <input
                        type="date"
                        value={profileData.licenseExpiry}
                        onChange={(e) => handleProfileInputChange('licenseExpiry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Insurance Information */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                      <input
                        type="text"
                        value={profileData.insuranceProvider}
                        onChange={(e) => handleProfileInputChange('insuranceProvider', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                      <input
                        type="text"
                        value={profileData.insurancePolicy}
                        onChange={(e) => handleProfileInputChange('insurancePolicy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Expiry</label>
                      <input
                        type="date"
                        value={profileData.insuranceExpiry}
                        onChange={(e) => handleProfileInputChange('insuranceExpiry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
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
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{ backgroundColor: '#D7E5E5' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell passengers about your driving experience..."
                  />
                </div>

                {/* Save/Cancel Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 text-white py-3 rounded-lg text-sm font-medium transition-colors"
                    style={{ backgroundColor: '#17252A' }}
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