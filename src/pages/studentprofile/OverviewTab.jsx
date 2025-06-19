// components/OverviewTab.jsx
import React from 'react';
import { Shield, GraduationCap, Phone, Mail } from 'lucide-react';

export default function OverviewTab({ bio, preferences, onTogglePreference }) {
  return (
    <div className="space-y-6">
      {/* About Me Block */}
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
        <p className="text-gray-700 leading-relaxed">{bio}</p>
      </div>

      {/* Passenger Preferences Block */}
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">🎵 Enjoys music during rides</span>
            <button
              onClick={() => onTogglePreference('musicAllowed')}
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
              onClick={() => onTogglePreference('quietRides')}
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
              onClick={() => onTogglePreference('friendlyChat')}
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
              onClick={() => onTogglePreference('flexibleTiming')}
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
              onClick={() => onTogglePreference('earlyPickup')}
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
  );
}