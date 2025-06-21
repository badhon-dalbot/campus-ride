// components/StudentInfoCard.jsx
import React from 'react';
import { Mail, Phone, Edit3, GraduationCap, Building, Car, DollarSign, Leaf, Clock } from 'lucide-react';

export default function StudentInfoCard({ profileData, onEditProfile }) {
  return (
    <>
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
          onClick={onEditProfile}
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
        </div>
      </div>
    </>
  );
}