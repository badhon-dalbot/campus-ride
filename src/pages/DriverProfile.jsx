import React, { useState } from 'react';
import { ChevronLeft, Star, Mail, Phone, Calendar, Car, DollarSign, Leaf, Edit3, Bell, MessageSquare, CreditCard, Shield, Eye, Trash2 } from 'lucide-react';

import CampusRideFooter from '../assets/CampusRideFooter.jsx';
import CampusRideHeader from '../assets/CampusRideHeader.jsx';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bio, setBio] = useState('Computer Science student at University. Love carpooling to save money and meet new people!');
  const [preferences, setPreferences] = useState({
    musicAllowed: true,
    petsAllowed: false,
    quietRides: false
  });
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    university: 'University of Technology',
    studentId: 'UT2021001',
    emergencyContact: '+1 (555) 987-6543',
    emergencyName: 'John Johnson (Father)'
  });

  const tabs = ['Overview', 'Reviews', 'Payment', 'Settings'];

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
    setBio('Computer Science student at University. Love carpooling to save money and meet new people!');
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
    // Reset to original data
    setProfileData({
      name: 'Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      phone: '+1 (555) 123-4567',
      university: 'University of Technology',
      studentId: 'UT2021001',
      emergencyContact: '+1 (555) 987-6543',
      emergencyName: 'John Johnson (Father)'
    });
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
      reviewer: "Mike Chen",
      rating: 5,
      comment: "Sarah is an excellent driver! Very punctual and friendly. The car was clean and the ride was smooth.",
      date: "2 days ago"
    },
    {
      id: 2,
      reviewer: "Emily Davis",
      rating: 4,
      comment: "Great conversation and safe driving. Would definitely ride with Sarah again!",
      date: "1 week ago"
    },
    {
      id: 3,
      reviewer: "Alex Johnson",
      rating: 5,
      comment: "Perfect pickup time and very accommodating. Highly recommend!",
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Full width, no margins */}
      <CampusRideHeader />
      
      {/* Main Content - With page margins */}
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
                <h1 className="text-2xl font-bold text-gray-900 text-center">My Profile</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="text-center">
                  {/* Profile Picture */}
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-gray-400">👤</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                  
                  {/* Name and Verification */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{profileData.name}</h2>
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium mb-3">
                    ✓ Verified
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-gray-500 text-sm">(47 trips)</span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">Member since March 2023</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 border-t pt-4">
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
                    <span>Joined March 2023</span>
                  </div>
                </div>

                <button 
                  onClick={handleEditProfile}
                  className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Total Trips</span>
                    </div>
                    <span className="font-semibold text-gray-900">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Money Saved</span>
                    </div>
                    <span className="font-semibold text-gray-900">$235</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Leaf className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">CO₂ Saved</span>
                    </div>
                    <span className="font-semibold text-gray-900">12.5 kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tabs Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="grid grid-cols-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                        activeTab === tab
                          ? 'bg-gray-100 border-gray-900 text-gray-900'
                          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
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
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
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
                          placeholder="Tell people about yourself..."
                        />
                        <div className="flex gap-2 mt-3">
                          <button 
                            onClick={handleSaveBio}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
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
                      <p className="text-gray-600 leading-relaxed">{bio}</p>
                    )}
                  </div>

                  {/* Ride Preferences Block */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🎵 Music allowed</span>
                        <button
                          onClick={() => togglePreference('musicAllowed')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            preferences.musicAllowed
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {preferences.musicAllowed ? 'Yes' : 'No'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🐕 Pets allowed</span>
                        <button
                          onClick={() => togglePreference('petsAllowed')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            preferences.petsAllowed
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {preferences.petsAllowed ? 'Yes' : 'No'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🤫 Quiet rides preferred</span>
                        <button
                          onClick={() => togglePreference('quietRides')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            preferences.quietRides
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {preferences.quietRides ? 'Yes' : 'No'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews & Ratings</h3>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">4.8</div>
                        <div className="flex items-center justify-center">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">47 reviews</div>
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
                                  style={{width: rating === 5 ? '70%' : rating === 4 ? '20%' : '5%'}}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500 w-8">{rating === 5 ? '33' : rating === 4 ? '10' : '2'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
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
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Payment' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">**** **** **** 4532</div>
                            <div className="text-sm text-gray-500">Expires 12/26</div>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Primary</span>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">**** **** **** 8901</div>
                            <div className="text-sm text-gray-500">Expires 08/27</div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                      + Add New Payment Method
                    </button>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Payment History</h4>
                    <div className="text-sm text-blue-700">
                      <div className="flex justify-between mb-1">
                        <span>Last payment:</span>
                        <span>$15.00 - Jan 10, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total spent:</span>
                        <span>$485.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Settings' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Privacy & Security</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700">Two-factor authentication</span>
                          </div>
                          <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            Enabled
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Eye className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700">Profile visibility</span>
                          </div>
                          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            Public
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Notifications</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Email notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">SMS notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700">Marketing emails</span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
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
            <h1 className="text-2xl font-bold text-gray-900 text-center">Edit Profile</h1>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Picture Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-400">👤</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors mr-3">
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
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
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
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
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
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell people about yourself..."
              />
            </div>

            {/* Ride Preferences */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">🎵 Music allowed</span>
                  <button
                    onClick={() => togglePreference('musicAllowed')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      preferences.musicAllowed
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {preferences.musicAllowed ? 'Yes' : 'No'}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">🐕 Pets allowed</span>
                  <button
                    onClick={() => togglePreference('petsAllowed')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      preferences.petsAllowed
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {preferences.petsAllowed ? 'Yes' : 'No'}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">🤫 Quiet rides preferred</span>
                  <button
                    onClick={() => togglePreference('quietRides')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      preferences.quietRides
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {preferences.quietRides ? 'Yes' : 'No'}
                  </button>
                </div>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleSaveProfile}
                className="flex-1 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
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
      
      {/* Footer - Full width, no margins */}
      <CampusRideFooter />
    </div>
  );
}