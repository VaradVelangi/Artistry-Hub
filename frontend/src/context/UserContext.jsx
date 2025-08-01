import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function registerUser(name, email, password, navigate, fetchPins) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", { name, email, password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
      fetchPins();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
    setBtnLoading(false);
  }

  async function loginUser(email, password, navigate, fetchPins) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
      fetchPins();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
    setBtnLoading(false);
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function followUser(id, fetchUser) {
    try {
      const { data } = await axios.post("/api/user/follow/" + id);
      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to follow");
    }
  }

  // ✅ NEW: fetch user stats
  async function fetchUserStats() {
    try {
      const { data } = await axios.get("/api/user/stats/me");
      return data;
    } catch (error) {
      toast.error("Failed to load stats");
      return null;
    }
  }

  // ✅ NEW: fetch engagement over time
  async function fetchEngagement() {
    try {
      const { data } = await axios.get("/api/user/stats/engagement");
      return data;
    } catch (error) {
      toast.error("Failed to load engagement data");
      return [];
    }
  }

  // ✅ NEW: fetch top performing pins by likes
  async function fetchTopPins() {
    try {
      const { data } = await axios.get("/api/user/stats/top-pins");
      return data;
    } catch (error) {
      toast.error("Failed to load top pins");
      return [];
    }
  }

  // ✅ NEW: fetch top performing pins by comments
  async function fetchTopPinsByComments() {
    try {
      const { data } = await axios.get("/api/user/stats/top-pins-comments");
      return data;
    } catch (error) {
      toast.error("Failed to load top pins by comments");
      return [];
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuth,
        btnLoading,
        loading,
        registerUser,
        loginUser,
        setUser,
        setIsAuth,
        followUser,
        fetchUserStats,
        fetchEngagement,
        fetchTopPins,
        fetchTopPinsByComments,   // ✅ added
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
