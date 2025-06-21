// components/ProfileEditForm.jsx
import React, { useState, useRef } from 'react';
import { ChevronLeft, Upload, X } from 'lucide-react';

export default function ProfileEditForm({ 
  profileData, 
  bio, 
  onBioChange, 
  onProfileInputChange, 
  onSaveProfile, 
  onCancelEdit 
}) {
  const [profileImage, setProfileImage] = useState(null);
  const [studentIdImage, setStudentIdImage] = useState(null);
  const profileFileInputRef = useRef(null);
  const idFileInputRef = useRef(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentIdImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    if (profileFileInputRef.current) {
      profileFileInputRef.current.value = '';
    }
  };

  const removeIdImage = () => {
    setStudentIdImage(null);
    if (idFileInputRef.current) {
      idFileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="mb-6">
        <button 
          onClick={onCancelEdit}
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
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-gray-400">👤</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 text-white rounded-full w-6 h-6 flex items-center justify-center" style={{backgroundColor: '#17252A'}}>
                <span className="text-xs">✓</span>
              </div>
            </div>
            <div>
              <button 
                type="button"
                onClick={() => profileFileInputRef.current?.click()}
                className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mr-3 flex items-center gap-2" 
                style={{backgroundColor: '#17252A'}}
              >
                <Upload className="w-4 h-4" />
                Upload New Photo
              </button>
              {profileImage && (
                <button 
                  type="button"
                  onClick={removeProfileImage}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              )}
              <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
              <input
                ref={profileFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Student ID Upload Section */}
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student ID Verification</h3>
          <p className="text-sm text-gray-600 mb-4">Upload a clear photo of your student ID to verify your student status.</p>
          
          {studentIdImage ? (
            <div className="relative inline-block">
              <img 
                src={studentIdImage} 
                alt="Student ID" 
                className="w-48 h-32 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={removeIdImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => idFileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload your student ID</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 5MB.</p>
            </div>
          )}
          
          <input
            ref={idFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleIdImageChange}
            className="hidden"
          />
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
                onChange={(e) => onProfileInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => onProfileInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => onProfileInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
              <input
                type="text"
                value={profileData.university}
                onChange={(e) => onProfileInputChange('university', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                value={profileData.studentId}
                onChange={(e) => onProfileInputChange('studentId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
              <input
                type="text"
                value={profileData.major}
                onChange={(e) => onProfileInputChange('major', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
              <input
                type="text"
                value={profileData.graduationYear}
                onChange={(e) => onProfileInputChange('graduationYear', e.target.value)}
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
                onChange={(e) => onProfileInputChange('dormBuilding', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
              <input
                type="text"
                value={profileData.roomNumber}
                onChange={(e) => onProfileInputChange('roomNumber', e.target.value)}
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
                onChange={(e) => onProfileInputChange('emergencyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., John Doe (Father)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
              <input
                type="tel"
                value={profileData.emergencyContact}
                onChange={(e) => onProfileInputChange('emergencyContact', e.target.value)}
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
            onChange={(e) => onBioChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell drivers about yourself..."
          />
        </div>

        {/* Save/Cancel Buttons */}
        <div className="flex gap-4 pt-4">
          <button 
            onClick={onSaveProfile}
            className="flex-1 text-white py-3 rounded-lg text-sm font-medium transition-colors"
            style={{backgroundColor: '#17252A'}}
          >
            Save Changes
          </button>
          <button 
            onClick={onCancelEdit}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}