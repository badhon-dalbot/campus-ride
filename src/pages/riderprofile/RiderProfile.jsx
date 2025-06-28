// RiderProfilePage.jsx
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import CampusRideFooter from "../../components/CampusRideFooter";
import CampusRideHeader from "../../components/CampusRideHeader";
import OverviewTab from "./OverviewTab";
import PaymentProfileSection from "./PaymentProfileSection";
import ProfileEditForm from "./ProfileEditForm";
import RideHistoryTab from "./RideHistoryTab";
import StudentInfoCard from "./RiderInfoCard";
import SettingsTab from "./SettingsTab";
import TabNavigation from "./TabNavigation";

export default function StudentProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from context instead of localStorage
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bio, setBio] = useState(
    "Computer Science major who loves exploring the city! Always up for sharing rides and meeting new people. Environmentally conscious and budget-friendly student."
  );
  const [preferences, setPreferences] = useState({
    musicAllowed: "Yes",
    quietRides: "No",
    friendlyChat: "Yes",
    earlyPickup: "No",
    flexibleTiming: "Yes",
  });
  const [profileData, setProfileData] = useState({
    fullName: "",
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

  const togglePreference = async (key) => {
    const updated = {
      ...preferences,
      [key]: !preferences[key],
    };

    setPreferences(updated);

    const numericPrefs = {
      musicAllowed: updated.musicAllowed ? 1 : 0,
      quietRides: updated.quietRides ? 1 : 0,
      friendlyChat: updated.friendlyChat ? 1 : 0,
      earlyPickup: updated.earlyPickup ? 1 : 0,
      flexibleTiming: updated.flexibleTiming ? 1 : 0,
    };

    try {
      await axios.patch(
        `http://localhost:3000/api/rider/${user?.user?.id}/preferences`,
        numericPrefs,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Preferences updated successfully");
      // Optionally: show a toast or success message
    } catch (error) {
      console.error("Failed to update preferences:", error);
      // Optionally: rollback UI update or show error message
    }
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

  console.log(user?.user?.id);

  useEffect(() => {
    if (!user?.user?.id) {
      console.log("No user ID found in context:", user);
      return;
    }

    console.log("Loading profile for user:", user?.user?.id);
    setLoading(true);

    // Fetch profile
    fetch(`http://localhost:3000/api/rider/${user?.user?.id}/profile`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rider profile");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched rider profile:", data);
        setProfileData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          since: data.created_at,
          status: data.status,
          about: data.about || "",
          university: data.university || "",
          studentId: data.studentId || "",
          major: data.major || "",
          graduationYear: data.graduationYear || "",
          emergencyContact: data.emergencyContact || "",
          emergencyName: data.emergencyName || "",
        });
        setBio(data.about || "");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Fetch preferences
  }, [user]); // Add user as dependency

  const loadPreferences = async () => {
    if (!user?.user?.id) {
      console.log("No user ID for preferences:", user);
      return;
    }
    
    try {
      const res = await axios.get(
        `http://localhost:3000/api/rider/${user?.user?.id}/preferences`,
        {
          withCredentials: true, // Include cookies if your backend uses them
        }
      );

      const prefs = res.data;

      console.log(prefs);

      setPreferences({
        musicAllowed: !!prefs.musicAllowed,
        quietRides: !!prefs.quietRides,
        friendlyChat: !!prefs.friendlyChat,
        earlyPickup: !!prefs.earlyPickup,
        flexibleTiming: !!prefs.flexibleTiming,
      });
    } catch (err) {
      console.error("Failed to fetch preferences:", err);
      // Optionally handle error (e.g., show a toast)
    }
  };
  
  useEffect(() => {
    loadPreferences();
  }, [user]); // Add user as dependency

  const handleSaveBio = async (newBio) => {
    if (!user?.user?.id) {
      alert("User not found. Please try logging in again.");
      return;
    }
    
    try {
      const res = await fetch(
        `http://localhost:3000/api/rider/${user.user.id}/bio`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ about: newBio }),
          credentials: "include", // if you use cookies/session
        }
      );
      if (!res.ok) throw new Error("Failed to update bio");
      setBio(newBio); // update local state
      // Optionally show a success message here
    } catch (err) {
      alert("Failed to update bio: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  
  // Show loading if user data is not available yet
  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CampusRideHeader />

      <div className="flex-1 p-6" style={{ backgroundColor: "#EBF5F5" }}>
        <div className="max-w-6xl mx-auto">
          {!isEditingProfile ? (
            <>
              {/* Back Button and Title */}
              <div className="mb-6">
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                  onClick={() => navigate(-1)}
                >
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

                  {activeTab === "Overview" && (
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
