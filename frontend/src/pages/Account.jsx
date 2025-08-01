import React, { useState } from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const {
    setIsAuth,
    setUser,
    fetchUserStats,
    fetchEngagement,
    fetchTopPins,
    fetchTopPinsByComments,
  } = UserData();
  const { pins } = PinData();

  const [view, setView] = useState("account");
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState(null);
  const [engagement, setEngagement] = useState([]);
  const [topPins, setTopPins] = useState([]);
  const [topCommentPins, setTopCommentPins] = useState([]);

  const userPins = pins?.filter((pin) => pin.owner === user._id);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      setIsAuth(false);
      setUser([]);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const fetchAllStats = async () => {
    setLoadingStats(true);
    try {
      const [
        statsData,
        engagementData,
        topPinsData,
        topPinsByComments,
      ] = await Promise.all([
        fetchUserStats(),
        fetchEngagement(),
        fetchTopPins(),
        fetchTopPinsByComments(),
      ]);

      setStats(statsData);
      setEngagement(
        engagementData.map((item) => ({
          label: new Date(
            item._id.year,
            item._id.month - 1
          ).toLocaleString("default", { month: "short", year: "numeric" }),
          pins: item.pins,
          comments: item.comments,
          likes: item.likes,
        }))
      );
      setTopPins(topPinsData);
      setTopCommentPins(topPinsByComments);
      setView("engagement");
    } catch (error) {
      toast.error("Failed to load engagement data");
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      {view === "account" && (
        <>
          {/* 🌟 Profile Card */}
          <div className="w-full max-w-md bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-8 text-center hover:scale-105 transition">
            <div className="w-28 h-28 mx-auto rounded-full bg-white text-purple-700 text-4xl font-bold flex items-center justify-center mb-4 shadow-inner">
              {user.name?.slice(0, 1)}
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-1">{user.name}</h1>
            <p className="text-gray-200 mb-6 text-sm">{user.email}</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={logoutHandler}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
              >
                Logout
              </button>
              <button
                onClick={fetchAllStats}
                disabled={loadingStats}
                className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black px-4 py-2 rounded-full shadow-md hover:scale-105 transition disabled:opacity-50"
              >
                {loadingStats ? "Loading..." : "View Analytics"}
              </button>
            </div>
          </div>

          {/* 📌 Pins */}
          <div className="mt-10 w-full max-w-7xl">
            <h2 className="text-2xl text-white font-semibold mb-4 text-center">Your Pins</h2>
            {userPins?.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
                {userPins.map((pin) => (
                  <div
                    key={pin._id}
                    className="break-inside-avoid mb-5 bg-gray-500 rounded-xl shadow"
                  >
                    <PinCard pin={pin} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-12 bg-gray-800 rounded-lg">No pins yet</p>
            )}
          </div>
        </>
      )}

      {view === "engagement" && stats && (
        <>
          <button
            onClick={() => setView("account")}
            className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
          >
            Back to Profile
          </button>

          {/* 📊 Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mb-6">
            {[
              { label: "Total Pins", value: stats.totalPins, color: "bg-purple-700" },
              { label: "Total Likes", value: stats.totalLikes, color: "bg-pink-700" },
              { label: "Total Comments", value: stats.totalComments, color: "bg-green-700" },
              { label: "Avg Likes/Pin", value: stats.avgLikes, color: "bg-gray-800" },
              { label: "Avg Comments/Pin", value: stats.avgComments, color: "bg-gray-800" },
              {
                label: "Most Recent Pin",
                value: stats.recentPinDate
                  ? new Date(stats.recentPinDate).toLocaleDateString()
                  : "-",
                color: "bg-gray-800",
              },
              {
                label: "Oldest Pin",
                value: stats.oldestPinDate
                  ? new Date(stats.oldestPinDate).toLocaleDateString()
                  : "-",
                color: "bg-gray-800",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${item.color} text-white p-4 rounded-xl text-center shadow`}
              >
                <h3 className="text-sm font-medium">{item.label}</h3>
                <p className="text-xl font-semibold mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          {/* 📊 Engagement Chart */}
          <div className="w-full max-w-5xl bg-gray-800 rounded-xl shadow p-4 mb-6">
            <h2 className="text-white text-lg mb-4">Monthly Pin & Comment Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagement} barCategoryGap={30}>
                <CartesianGrid stroke="#555" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ background: "#333", borderRadius: "8px", color: "#fff" }} />
                <Bar dataKey="pins" fill="#8884d8" name="Pins Created" barSize={20} />
                <Bar dataKey="comments" fill="#82ca9d" name="Comments" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🏆 Most liked pin highlight */}
          {topPins?.length > 0 && (
            <div className="bg-purple-800 text-white p-4 rounded-xl shadow mb-6 w-full max-w-3xl">
              <h3 className="text-lg font-semibold mb-2">🥇 Most liked pin</h3>
              <div className="max-w-xs mx-auto">
                <PinCard pin={topPins[0]} />
              </div>
            </div>
          )}

          {/* 🏆 Top Pins by Likes */}
          {topPins?.length > 0 && (
            <div className="bg-gray-800 rounded-xl shadow p-4 w-full max-w-5xl mb-6">
              <h2 className="text-white text-lg mb-4">Top Pins by Likes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {topPins.map((pin) => (
                  <PinCard key={pin._id} pin={pin} />
                ))}
              </div>
            </div>
          )}

          {/* 🏆 Top Pins by Comments */}
          {topCommentPins?.length > 0 && (
            <div className="bg-gray-800 rounded-xl shadow p-4 w-full max-w-5xl mb-6">
              <h2 className="text-white text-lg mb-4">Top Pins by Comments</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {topCommentPins.map((pin) => (
                  <PinCard key={pin._id} pin={pin} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Account;
