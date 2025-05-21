import axios from "axios";
import { useEffect, useState } from "react";
import CampusRideFooter from "../assets/CampusRideFooter.jsx";
import LoginHeader from "../assets/LoginHeader.jsx";

export default function CampusRideSignup() {
  const [activeTab, setActiveTab] = useState("ride");

  // Form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ride",
    file: null,
  });
  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: activeTab }));
  }, [activeTab]);

  const [message, setMessage] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      file,
      role,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword ||
      !file
    ) {
      alert("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email address.");
      return;
    }

    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    
    if (!passwordRegex.test(password)) {
      console.error(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special Character."
      );
      return setMessage(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return setMessage("Passwords do not match.");
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("firstName", firstName);
      formDataToSubmit.append("lastName", lastName);
      formDataToSubmit.append("phone", phone);
      formDataToSubmit.append("email", email);
      formDataToSubmit.append("password", password);
      formDataToSubmit.append("confirmPassword", confirmPassword);
      formDataToSubmit.append("role", role);
      formDataToSubmit.append("document", file);
      console.log("Form data to submit:", formDataToSubmit);

      const res = await axios.post(
        "http://localhost:3000/auth/register",
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setMessage(res.data.message);
    } catch (error) {
      console.error("Error during signup:", error.message);
      setMessage(error.response?.data?.message || "Registration failed.");
    }

    // console.log("Form submitted successfully:", formData);
  };

  return (
    <>
      <LoginHeader />

      <div className="bg-gray-700 text-white flex flex-col items-center py-8 px-4 min-h-screen">
        <h1 className="text-xl font-medium mb-6">Sign Up To CampusRide</h1>

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
            Sign up to ride
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "drive"
                ? "border-b-2 border-teal-400 text-white"
                : "text-gray-400"
            }`}
            onClick={() => handleTabChange("drive")}
          >
            Sign up to drive
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
          />

          <div className="flex items-center">
            <label className="w-32 text-sm">
              {activeTab === "ride" ? "University ID" : "Driving License"}
            </label>
            <label className="ml-auto bg-gray-700 border border-gray-600 rounded p-2 text-white text-sm cursor-pointer">
              Choose file
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-type Password"
            className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
          />

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition-colors"
          >
            Sign Up Now
          </button>
        </form>
      </div>

      <CampusRideFooter />
    </>
  );
}
