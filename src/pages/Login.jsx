import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext.jsx";
import LoginFooter from "../components/LoginFooter.jsx";
import LoginHeader from "../components/LoginHeader.jsx";

export default function CampusRideLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("ride");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      input::placeholder {
        color: #bbb !important;
        opacity: 1;
      }
      .login-card input:focus {
        border-color: #fff !important;
      }
      .login-tab-active {
        background: #fff !important;
        color: #000 !important;
      }
      .login-tab-inactive {
        background: transparent !important;
        color: #fff !important;
        border: 1px solid #fff !important;
      }
      .login-tab {
        transition: background 0.2s, color 0.2s;
      }
      .login-btn:active {
        background: #222 !important;
        color: #fff !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        login(data); // Pass the complete response data to login
        sessionStorage.setItem("user", JSON.stringify(data.user));
        const userRole = data.user.role;

        let redirectPath = "/";
        if (userRole === "admin") {
          redirectPath = "/admindash";
        } else if (userRole === "driver") {
          redirectPath = "/driver/dashboard";
        } else if (userRole === "rider") {
          redirectPath = "/findride";
        } else {
          alert("Unknown role. Please contact support.");
          return;
        }

        navigate(redirectPath, { replace: true });
        return;
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    }
  };

  const handleSignupClick = () => {
    window.location.href = "/signup";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoginHeader />

      <div
        className="flex flex-col items-center justify-center flex-1"
        style={{ flex: 1 }}
      >
        <div
          className="login-card shadow-2xl"
          style={{
            background: "#111",
            borderRadius: "32px",
            padding: "3rem 2.5rem",
            maxWidth: 400,
            width: "100%",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.35)",
            margin: "3rem",
            border: "2px solid #fff",
          }}
        >
          <h1
            className="text-4xl font-extrabold mb-10 text-center"
            style={{
              color: "#fff",
              letterSpacing: "2px",
              fontFamily: "UberMove, sans-serif",
            }}
          >
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            {errorMessage && (
              <div className="text-red-400 text-center text-base mb-2">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block mb-2 text-white text-base font-semibold tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl px-5 py-4 text-lg bg-[#181818] border-2 border-[#222] text-white focus:border-white transition"
                style={{
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-white text-base font-semibold tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl px-5 py-4 text-lg bg-[#181818] border-2 border-[#222] text-white pr-12 focus:border-white transition"
                  style={{
                    outline: "none",
                  }}
                  autoComplete="current-password"
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
                    lineHeight: 0,
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={24} color="#fff" />
                  ) : (
                    <Eye size={24} color="#fff" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-btn w-full py-3 rounded-full font-bold text-xl transition-colors"
              style={{
                background: "#fff",
                color: "#000",
                letterSpacing: "1px",
                boxShadow: "0 2px 8px 0 rgba(255,255,255,0.10)",
              }}
            >
              Login
            </button>
          </form>

          <div className="flex justify-between mt-8 text-base font-medium">
            <span
              className="cursor-pointer underline"
              style={{ color: "#bbb" }}
              onClick={handleSignupClick}
            >
              Forgot Password?
            </span>
            <span
              className="cursor-pointer underline"
              style={{ color: "#bbb" }}
              onClick={handleSignupClick}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>

      <LoginFooter />
    </div>
  );
}
