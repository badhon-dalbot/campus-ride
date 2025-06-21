import axios from "axios";
import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "./images/logo.png";
export default function CampusRideHeader() {
  const { isLoggedIn, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true, // Ensure cookies are sent with the request
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

  return (
    <header className="bg-[#17252A] text-[#FEFFFF] px-8 py-2 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div>
          <img src={logo} alt="CampusRide Logo" className="w-55 h-16" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            Services
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            Ride
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            Drive
          </a>
          <a
            href="/aboutus"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            About Us
          </a>
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white text-2xl focus:outline-none"
              >
                <FaUserCircle />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-[#17252A] rounded-lg shadow-lg z-50">
                  <Link
                    href="/studentprofile"
                    className="block px-4 py-2 hover:bg-gray-100 font-medium"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="hover:text-gray-300 transition-colors font-medium"
              >
                Log in
              </a>

              <button className="bg-white text-[#17252A] px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                Sign up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
