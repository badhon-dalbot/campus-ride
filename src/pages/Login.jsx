import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

import LoginHeader from '../assets/LoginHeader.jsx';
import LoginFooter from '../assets/LoginFooter.jsx';

export default function CampusRideLogin() {
  const [activeTab, setActiveTab] = useState("ride");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const inputStyle = {
    backgroundColor: '#364045',
    borderColor: '#DEF2F1',
    color: '#DEF2F1',
    border: '1px solid #DEF2F1'
  };

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
    setErrorMessage('');
    setFormData({ email: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
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
    console.log("Login submitted:", formData);
    // Proceed with backend authentication
  };

  const handleSignupClick = () => {
    window.location.href = '/signup';
  };

  return (
    <div>
      <LoginHeader />

      <div className="flex flex-col items-center pt-40 px-4 min-h-screen" style={{ backgroundColor: '#364045' }}>
        <h1 className="text-xl font-medium mb-6" style={{ color: '#DEF2F1' }}>Login to CampusRide</h1>

        {/* Tabs */}
        <div className="flex w-full max-w-md mb-4 border-b" style={{ borderColor: '#DEF2F1' }}>
          <button
            className={`py-2 px-4 ${activeTab === "ride" ? "border-b-2" : ""}`}
            style={{
              color: activeTab === "ride" ? '#DEF2F1' : 'rgba(222, 242, 241, 0.6)',
              borderColor: activeTab === "ride" ? '#DEF2F1' : 'transparent'
            }}
            onClick={() => handleTabChange("ride")}
          >
            Login to ride
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "drive" ? "border-b-2" : ""}`}
            style={{
              color: activeTab === "drive" ? '#DEF2F1' : 'rgba(222, 242, 241, 0.6)',
              borderColor: activeTab === "drive" ? '#DEF2F1' : 'transparent'
            }}
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
            className="w-full rounded p-2"
            style={inputStyle}
          />

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
              style={{ color: '#DEF2F1' }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded transition-colors"
            style={{ backgroundColor: '#17252A', color: '#DEF2F1' }}
          >
            Login Now
          </button>
        </form>

        <p className="mt-4 text-sm" style={{ color: '#DEF2F1' }}>
          Forgot Password? <span className="cursor-pointer underline" onClick={handleSignupClick}>Click here</span>
        </p>
        
        <p className="mt-4 text-sm" style={{ color: '#DEF2F1' }}>
          Don't have an account? <span className="cursor-pointer underline" onClick={handleSignupClick}>Sign Up</span>
        </p>
      </div>

      <LoginFooter />
    </div>
  );
}
