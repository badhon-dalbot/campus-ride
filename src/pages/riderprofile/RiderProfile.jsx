// RiderProfilePage.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import StudentInfoCard from './RiderInfoCard';
import TabNavigation from './TabNavigation';
import OverviewTab from './OverviewTab';
import RideHistoryTab from './RideHistoryTab';
import SettingsTab from './SettingsTab';
import ProfileEditForm from './ProfileEditForm';
import PaymentProfileSection from './PaymentProfileSection';
import CampusRideFooter from "../../components/CampusRideFooter";
import CampusRideHeader from "../../components/CampusRideHeader";

export default function StudentProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bio, setBio] = useState(
    "Computer Science major who loves exploring the city! Always up for sharing rides and meeting new people. Environmentally conscious and budget-friendly student."
  );
  const [preferences, setPreferences] = useState({
    musicAllowed: true,
    quietRides: false,
    friendlyChat: true,
    earlyPickup: false,
    flexibleTiming: true,
  });
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    studentId: "",
    major: "",
    graduationYear: "",
    dormBuilding: "",
    roomNumber: "",
    emergencyContact: "",
    emergencyName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tabs = ["Overview", "Ride History", "Payments", "Settings"];

  const togglePreference = (key) => {
    const updated = {
      ...preferences,
      [key]: !preferences[key],
    };
    setPreferences(updated);

    const user = JSON.parse(sessionStorage.getItem("user"));
    fetch(`http://localhost:3000/api/rider/${user.id}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated),
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update preferences");
        // Optionally show a success message
      })
      .catch((err) => {
        // Optionally handle error
      });
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
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const rideHistory = [
    {
      id: 1,
      date: "Jan 15, 2025",
      route: "Campus → Downtown Mall",
      driver: "Alex Rodriguez",
      cost: "$12.00",
      status: "Completed",
      rating: 5,
    },
    {
      id: 2,
      date: "Jan 12, 2025",
      route: "Dorms → Airport",
      driver: "Mike Johnson",
      cost: "$25.00",
      status: "Completed",
      rating: 5,
    },
    {
      id: 3,
      date: "Jan 8, 2025",
      route: "Campus → Train Station",
      driver: "Sarah Davis",
      cost: "$8.00",
      status: "Completed",
      rating: 4,
    },
    {
      id: 4,
      date: "Jan 5, 2025",
      route: "Dorms → Shopping Center",
      driver: "Tom Wilson",
      cost: "$15.00",
      status: "Completed",
      rating: 5,
    },
    {
      id: 5,
      date: "Jan 2, 2025",
      route: "Campus → Home (Holiday)",
      driver: "Lisa Anderson",
      cost: "$45.00",
      status: "Completed",
      rating: 4,
    },
  ];

  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user?.id);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user?.id) return;

    setLoading(true);

    // Fetch profile
    fetch(`http://localhost:3000/api/rider/${user.id}/profile`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rider profile");
        return res.json();
      })
      .then((data) => {
        console.log('Fetched rider profile:', data);
        setProfileData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          since: data.created_at,
          status: data.account_status,
          about: data.about || '',
          university: data.university || '',
          studentId: data.studentId || '',
          major: data.major || '',
          graduationYear: data.graduationYear || '',
          emergencyContact: data.emergencyContact || '',
          emergencyName: data.emergencyName || ''
        });
        setBio(data.about || "");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Fetch preferences
    fetch(`http://localhost:3000/api/rider/${user.id}/preferences`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch preferences");
        return res.json();
      })
      .then((prefs) => {
        setPreferences({
          musicAllowed: !!prefs.musicAllowed,
          quietRides: !!prefs.quietRides,
          friendlyChat: !!prefs.friendlyChat,
          earlyPickup: !!prefs.earlyPickup,
          flexibleTiming: !!prefs.flexibleTiming,
        });
      })
      .catch((err) => {
        // Optionally handle error
      });

  }, []);

  const handleSaveBio = async (newBio) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await fetch(`http://localhost:3000/api/rider/${user.id}/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ about: newBio }),
        credentials: 'include', // if you use cookies/session
      });
      if (!res.ok) throw new Error('Failed to update bio');
      setBio(newBio); // update local state
      // Optionally show a success message here
    } catch (err) {
      alert("Failed to update bio: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <CampusRideHeader />

      <div className="flex-1 p-6" style={{ backgroundColor: '#EBF5F5' }}>
        <div className="max-w-6xl mx-auto">
          {!isEditingProfile ? (
            <>
              {/* Back Button and Title */}
              <div className="mb-6">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4" onClick={() => navigate(-1)}>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-medium">Back</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                  Rider Profile
                </h1>
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
                      onSaveBio={handleSaveBio}
                    />
                  )}

                  {activeTab === "Ride History" && (
                    <RideHistoryTab rideHistory={rideHistory} />
                  )}

                  {activeTab === "Payments" && <PaymentProfileSection />}

                  {activeTab === "Settings" && <SettingsTab />}
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
