import axios from "axios";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "../components/AuthContext";

export default function CampusRideHeader() {
  const { isLoggedIn, user, logout } = useAuth(); // Get user from context
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      logout();
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get profile path based on user role from context
  let profilePath = "/riderProfile";
  let userRole = null;

  // Debug: Print user information from context
  console.log("Header - User from context:", user);

  // Use user data from context instead of localStorage
  if (user?.user?.role) {
    userRole = user.user.role;
  } else if (user?.role) {
    userRole = user.role;
  }

  console.log("Header - User role:", userRole);

  if (userRole === "driver") profilePath = "/driverProfile";
  else if (userRole === "rider") profilePath = "/riderProfile";
  else if (userRole === "admin") profilePath = "/admindash";

  return (
    <header className="bg-[#17252A] text-white  py-2 shadow-md">
      <div className="flex items-center justify-between w-container mx-auto">
        {/* Logo Section */}
        <div>
          <Link to="/">
            <img src={logo} alt="CampusRide Logo" className="w-55 h-16" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            Home
          </Link>
          {/* Show Ride button only if user is not a driver or not logged in */}
          {(!isLoggedIn || userRole !== "driver") && (
            <Link
              to="/findride"
              className="hover:text-gray-300 transition-colors font-medium"
            >
              Ride
            </Link>
          )}
          {/* Show Drive button only if user is not a rider or not logged in */}
          {(!isLoggedIn || userRole !== "rider") && (
            <Link
              to="/driverdash"
              className="hover:text-gray-300 transition-colors font-medium"
            >
              Drive
            </Link>
          )}
          <Link
            to="/aboutus"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            About Us
          </Link>
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white text-3xl focus:outline-none hover:text-gray-300 transition-colors"
              >
                <FaUserCircle />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-[#17252A] rounded-lg shadow-lg z-50">
                  <Link
                    to={profilePath}
                    className="block px-4 py-2 hover:bg-black hover:text-white rounded-lg font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-700 hover:text-white rounded-lg font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors font-medium"
              >
                Log in
              </Link>
              <Link to="/signup">
                <button className="bg-white text-[#17252A] px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
