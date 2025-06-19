import { useState, useEffect } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import LoginHeader from '../assets/LoginHeader.jsx';
import LoginFooter from '../assets/LoginFooter.jsx';

export default function CampusRideSignup() {
  const [activeTab, setActiveTab] = useState("ride");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    file: null,
  });

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input::placeholder {
        color: #bbb !important;
        opacity: 1;
      }
      .signup-tab-active {
        background: #fff !important;
        color: #000 !important;
      }
      .signup-tab-inactive {
        background: transparent !important;
        color: #fff !important;
        border: 1px solid #fff !important;
      }
      .signup-tab {
        transition: background 0.2s, color 0.2s;
      }
      .signup-btn:active {
        background: #222 !important;
        color: #fff !important;
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
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, password, confirmPassword } = formData;
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
    window.location.href = '/login';
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      flexDirection: "column"
    }}>
      <LoginHeader />

      <div className="flex flex-col items-center justify-center flex-1" style={{ flex: 1 }}>
        <div
          className="signup-card shadow-2xl"
          style={{
            background: "#111",
            borderRadius: "32px",
            padding: "2.5rem 2rem",
            maxWidth: 440,
            width: "100%",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.35)",
            margin: "2.5rem",
            border: "2px solid #fff"
          }}
        >
          <h1
            className="text-3xl font-extrabold mb-8 text-center"
            style={{
              color: "#fff",
              letterSpacing: "2px",
              fontFamily: "UberMove, sans-serif"
            }}
          >
            Create Your Account
          </h1>

          {/* Tabs */}
          <div className="flex justify-center mb-8 gap-2">
            <button
              className={`signup-tab px-7 py-2 text-lg font-bold rounded-full ${activeTab === "ride"
                ? "signup-tab-active"
                : "signup-tab-inactive"}`}
              style={{
                border: "none",
                outline: "none",
                cursor: "pointer"
              }}
              onClick={() => handleTabChange("ride")}
            >
              Ride
            </button>
            <button
              className={`signup-tab px-7 py-2 text-lg font-bold rounded-full ${activeTab === "drive"
                ? "signup-tab-active"
                : "signup-tab-inactive"}`}
              style={{
                border: "none",
                outline: "none",
                cursor: "pointer"
              }}
              onClick={() => handleTabChange("drive")}
            >
              Drive
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="rounded-xl px-4 py-3 text-base bg-[#181818] border-2 border-[#222] text-white focus:border-white transition"
                style={{ outline: "none" }}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="rounded-xl px-4 py-3 text-base bg-[#181818] border-2 border-[#222] text-white focus:border-white transition"
                style={{ outline: "none" }}
              />
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full rounded-xl px-4 py-3 text-base bg-[#181818] border-2 border-[#222] text-white focus:border-white transition"
              style={{ outline: "none" }}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-xl px-4 py-3 text-base bg-[#181818] border-2 border-[#222] text-white focus:border-white transition"
              style={{ outline: "none" }}
            />

            <div className="flex items-center">
              <label className="text-white text-base font-semibold tracking-wide mr-4">
                {activeTab === "ride" ? "University ID" : "Driving License"}
              </label>
              <label
                className="rounded-xl px-4 py-2 text-base cursor-pointer bg-[#181818] border-2 border-[#222] text-white hover:border-white transition"
                style={{ outline: "none", marginBottom: 0 }}
              >
                Choose file
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {selectedFile && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 ml-2">
                  <Check size={16} className="text-white" />
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-xl px-4 py-3 text-base bg-[#181818] border-2 border-[#222] text-white pr-12 focus:border-white transition"
                style={{ outline: "none" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "transparent",
                  border: "none",
                  position: "absolute",
                  right: "1.25rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                  zIndex: 2,
                  lineHeight: 0
                }}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={22} color="#fff" /> : <Eye size={22} color="#fff" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-type Password"
                className="w-full rounded-xl px-4 py-3 text-base bg-[#181818] border-2 border-[#222] text-white pr-12 focus:border-white transition"
                style={{ outline: "none" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  background: "transparent",
                  border: "none",
                  position: "absolute",
                  right: "1.25rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                  zIndex: 2,
                  lineHeight: 0
                }}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={22} color="#fff" /> : <Eye size={22} color="#fff" />}
              </button>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="signup-btn w-full py-3 rounded-full font-bold text-xl transition-colors"
              style={{
                background: "#fff",
                color: "#000",
                letterSpacing: "1px",
                boxShadow: "0 2px 8px 0 rgba(255,255,255,0.10)"
              }}
            >
              Sign Up Now
            </button>
          </form>

          <p className="mt-6 text-base text-center" style={{ color: "#bbb" }}>
            Already have an account?{" "}
            <span className="cursor-pointer underline" onClick={handleLoginClick}>
              Login
            </span>
          </p>
        </div>
      </div>

      <LoginFooter />
    </div>
  );
}