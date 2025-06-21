// StudentProfilePage.jsx
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import CampusRideHeader from '../../assets/CampusRideHeader';
import CampusRideFooter from '../../assets/CampusRideFooter';
import StudentInfoCard from './RiderInfoCard';
import TabNavigation from './TabNavigation';
import OverviewTab from './OverviewTab';
import RideHistoryTab from './RideHistoryTab';
import SettingsTab from './SettingsTab';
import ProfileEditForm from './ProfileEditForm';
import PaymentProfileSection from './PaymentProfileSection';

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
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

  const tabs = ['Overview', 'Ride History', 'Payments', 'Settings'];

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

  return (
    <div className="min-h-screen flex flex-col">
      <CampusRideHeader />
      
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
                  <StudentInfoCard 
                    profileData={profileData}
                    onEditProfile={handleEditProfile}
                  />
                </div>

                {/* Right Column - Tabs Content */}
                <div className="lg:col-span-2 space-y-6">
                  <TabNavigation 
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />

                  {/* Tab Content */}
                  {activeTab === 'Overview' && (
                    <OverviewTab 
                      bio={bio}
                      preferences={preferences}
                      onTogglePreference={togglePreference}
                    />
                  )}

                  {activeTab === 'Ride History' && (
                    <RideHistoryTab rideHistory={rideHistory} />
                  )}

                  {activeTab === 'Payments' && (
                    <PaymentProfileSection />
                  )}

                  {activeTab === 'Settings' && (
                    <SettingsTab />
                  )}
                </div>
              </div>
            </>
          ) : (
            <ProfileEditForm
              profileData={profileData}
              bio={bio}
              onBioChange={setBio}
              onProfileInputChange={handleProfileInputChange}
              onSaveProfile={handleSaveProfile}
              onCancelEdit={handleCancelProfileEdit}
            />
          )}
        </div>
      </div>
      
      <CampusRideFooter />
    </div>
  );
}