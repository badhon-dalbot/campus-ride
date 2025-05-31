import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampusRideFooter from "../assets/CampusRideFooter.jsx";
import LoginHeader from "../assets/LoginHeader.jsx";

export default function CampusRideLogin() {
  const [activeTab, setActiveTab] = useState("ride");

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

    // Basic validation
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
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("data:", res.data);
      const user = res.data.user;
      console.log("User logged in:", user);

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Login error:", error.response.data);
        setErrorMessage(
          error.response.data.error || "An error occurred. Please try again."
        );
      } else {
        console.error("Login error:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition-colors"
          >
            Login Now
          </button>
        </form>
      </div>

      <CampusRideFooter />
    </>
  );
}
