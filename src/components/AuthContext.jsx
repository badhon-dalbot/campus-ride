import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Add user state
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        console.log("Auth check response:", res);
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data); // Update user state
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false); // <-- done loading regardless of result
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    console.log("Login called with userData:", userData);
    setUser(userData); // Set user data when logging in
    setIsLoggedIn(true);
  };
  
  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("user");
    setUser(null); // Clear user data
    setIsLoggedIn(false);
  };

  // While checking auth, render loading or null to avoid flicker
  if (loading) {
    return <div>Loading...</div>; // or null, or spinner
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default AuthContext;

export { AuthProvider, useAuth };
