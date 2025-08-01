import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import { UserData } from "../context/UserContext";

const UserProfile = ({ user: loggedInUser }) => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollow, setIsFollow] = useState(false);

  const { followUser } = UserData();
  const { pins } = PinData();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.followers?.includes(loggedInUser._id)) {
      setIsFollow(true);
    }
  }, [user, loggedInUser._id]);

  async function fetchUser() {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  }

  const followHandler = () => {
    setIsFollow(!isFollow);
    followUser(user._id, fetchUser);
  };

  const userPins = pins ? pins.filter((pin) => pin.owner === user?._id) : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-white text-lg">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center py-8">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-5xl text-white font-bold shadow-md">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
          <h1 className="text-3xl text-center font-extrabold text-white mb-1">
            {user?.name || "Unknown User"}
          </h1>
          <p className="text-center text-gray-400 mb-2">
            {user?.email || "No email provided"}
          </p>
          {/* optional bio / placeholder */}
          {/* <p className="text-center text-gray-500 italic mb-4">This user hasn't added a bio yet.</p> */}
          <div className="flex justify-center gap-6 text-gray-400 mb-4">
            <span>{user?.followers?.length || 0} Followers</span>
            <span>{user?.following?.length || 0} Following</span>
            <span>{userPins?.length || 0} Pins</span>
          </div>
          {user?._id !== loggedInUser._id && (
            <div className="flex justify-center">
              <button
                onClick={followHandler}
                className={`px-4 py-2 rounded font-medium transition-all ${
                  isFollow
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {isFollow ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}
        </div>

        <div className="w-full max-w-7xl px-4 py-8">
          {userPins && userPins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userPins.map((pin) => (
                <div
                  key={pin._id}
                  className="bg-gray-500 rounded-lg overflow-hidden shadow-md"
                >
                  <PinCard pin={pin} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No Pins Yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
