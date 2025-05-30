import { useState, useEffect } from "react";
import { Eye, EyeOff, Check } from "lucide-react";

import LoginHeader from '../assets/LoginHeader.jsx';
import LoginFooter from '../assets/LoginFooter.jsx';

export default function CampusRideSignup() {
  const [activeTab, setActiveTab] = useState("ride");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    file: null,
  });

  // Add CSS for placeholder styling
  const inputStyle = {
    backgroundColor: '#364045', 
    borderColor: '#DEF2F1', 
    color: '#DEF2F1', 
    border: '1px solid #DEF2F1'
  };

  // Create a style element for placeholder colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input::placeholder {
        color: #DEF2F1 !important;
        opacity: 0.7;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'file' && files && files[0]) {
      setSelectedFile(files[0]);
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      console.log("File selected:", files[0].name);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    const { firstName, lastName, phone, email, password, confirmPassword, file } = formData;

    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword || !selectedFile) {
      alert("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    console.log("Form submitted successfully:", formData);
  };

  const handleLoginClick = () => {
    // Navigate to login page - you can modify this path as needed
    window.location.href = '/login'; // Replace with your actual login page path
  };

  return (
    <div>
      <LoginHeader />

      <div className="flex flex-col items-center py-8 px-4 min-h-screen" style={{backgroundColor: '#364045'}}>
        <h1 className="text-xl font-medium mb-6" style={{color: '#DEF2F1'}}>Sign Up To CampusRide</h1>

        {/* Tabs */}
        <div className="flex w-full max-w-md mb-4 border-b" style={{borderColor: '#DEF2F1'}}>
          <button 
            className={`py-2 px-4 ${activeTab === "ride" ? "border-b-2" : ""}`}
            style={{
              color: activeTab === "ride" ? '#DEF2F1' : 'rgba(222, 242, 241, 0.6)',
              borderColor: activeTab === "ride" ? '#DEF2F1' : 'transparent'
            }}
            onClick={() => handleTabChange("ride")}
          >
            Sign up to ride
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === "drive" ? "border-b-2" : ""}`}
            style={{
              color: activeTab === "drive" ? '#DEF2F1' : 'rgba(222, 242, 241, 0.6)',
              borderColor: activeTab === "drive" ? '#DEF2F1' : 'transparent'
            }}
            onClick={() => handleTabChange("drive")}
          >
            Sign up to drive
          </button>
        </div>

        {/* Form */}
        <div className="w-full max-w-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name" 
              className="rounded p-2"
              style={inputStyle}
            />
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name" 
              className="rounded p-2"
              style={inputStyle}
            />
          </div>

          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone" 
            className="w-full rounded p-2"
            style={inputStyle}
          />

          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            className="w-full rounded p-2"
            style={inputStyle}
          />

          <div className="flex items-center">
            <label className="w-32 text-sm" style={{color: '#DEF2F1'}}>
              {activeTab === "ride" ? "University ID" : "Driving License"}
            </label>
            <div className="ml-auto flex items-center gap-2">
              <label className="rounded p-2 text-sm cursor-pointer" style={{backgroundColor: '#364045', borderColor: '#DEF2F1', color: '#DEF2F1', border: '1px solid #DEF2F1'}}>
                Choose file
                <input 
                  type="file" 
                  name="file"
                  onChange={handleChange}
                  className="hidden" 
                />
              </label>
              {selectedFile && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              className="w-full rounded p-2 pr-12"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{color: '#DEF2F1'}}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-type Password" 
              className="w-full rounded p-2 pr-12"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{color: '#DEF2F1'}}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button 
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 rounded transition-colors"
            style={{backgroundColor: '#17252A', color: '#DEF2F1'}}
          >
            Sign Up Now
          </button>
        </div>

        {/* Already have an account link */}
        <p className="mt-4 text-sm" style={{color: '#DEF2F1'}}>
          Already have an account? <span className="cursor-pointer underline" onClick={handleLoginClick}>Login</span>
        </p>
      </div>

      <LoginFooter/>
    </div>
  );
}