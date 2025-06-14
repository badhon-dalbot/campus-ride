import axios from "axios";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import LoginFooter from "../assets/LoginFooter.jsx";
import LoginHeader from "../assets/LoginHeader.jsx";

export default function CampusRideLogin() {
  const [activeTab, setActiveTab] = useState("ride");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage("");
    setFormData({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setErrorMessage("");
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      // Handle successful login
      console.log("Login successful:", response.data);

      const { accessToken, refreshToken, user } = response.data;

      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Navigate based on user type
      if (activeTab === "ride") {
        navigate("/rider-dashboard");
      } else {
        navigate("/driver-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <div>
      <LoginHeader />

      <div className="bg-gray-700 text-white flex flex-col items-center pt-40 px-8 min-h-screen">
        <h1 className="text-xl font-medium mb-6">Login to CampusRide</h1>

        {/* Tabs */}
        <div className="flex w-full max-w-md mb-4 border-b border-gray-600">
          <button
            className={`py-2 px-4 ${
              activeTab === "ride"
                ? "border-b-2 border-teal-400 text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleTabChange("ride")}
          >
            Login to ride
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "drive"
                ? "border-b-2 border-teal-400 text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleTabChange("drive")}
          >
            Login to drive
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          {errorMessage && (
            <div className="text-red-400 text-sm mb-2">{errorMessage}</div>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
          />

          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
          />

          <button
            type="submit"
            className="w-full py-2 rounded transition-colors"
            style={{ backgroundColor: '#17252A', color: '#DEF2F1' }}
          >
            Login Now
          </button>
          <Link to="/signup" className="hover:underline text-sm">
            Create an account
          </Link>
        </form>

        {/* <p className="mt-4 text-sm" style={{ color: '#DEF2F1' }}>
          Forgot Password? <span className="cursor-pointer underline" onClick={handleSignupClick}>Click here</span>
        </p>
        
        <p className="mt-4 text-sm" style={{ color: '#DEF2F1' }}>
          Don't have an account? <span className="cursor-pointer underline" onClick={handleSignupClick}>Sign Up</span>
        </p> */}
      </div>

      <LoginFooter />
    </div>
  );
}
