import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import { UserData } from "../context/UserContext";

const UserProfile = ({ user: loggedInUser }) => {
  const params = useParams();
  const [user, setUser] = useState([]);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [isFollow, setIsFollow] = useState(false);

  const { followUser } = UserData();

  const followHander = () => {
    setIsFollow(!isFollow);
    followUser(user._id, fetchUser);
  };

  const followers = user.followers;

  useEffect(() => {
    if (followers && followers.includes(loggedInUser._id)) setIsFollow(true);
  }, [user]);

  const { pins } = PinData();

  let userPins;

  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="bg-gray-700">
      {user && (
        <div className="flex flex-col items-center justify-center bg-gray-700">
          <div className="p-6 w-full">
          <div className="p-8 w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
  <div className="flex items-center justify-center mb-6">
    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-5xl text-white font-bold shadow-lg">
      {user.name && user.name.slice(0, 1)}
    </div>
  </div>
  <h1 className="text-center text-4xl font-extrabold text-white tracking-tight mb-2">{user.name}</h1>
  <p className="text-center text-lg text-gray-400 mb-4">{user.email}</p>
  <div className="flex justify-center items-center text-center gap-4 text-gray-400">
    {user.followers && <span>{user.followers.length} Followers</span>}
    {user.following && <span>{user.following.length} Following</span>}
  </div>
</div>

            {user && user._id === loggedInUser._id ? (
              ""
            ) : (
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={followHander}
                  className="bg-pink-800 text-white px-4 py-2 rounded"
                >
                  {isFollow ? "Unfollow" : " Follow"}
                </button>
              </div>
            )}
            <div className="container mx-auto px-4 py-8">
  {userPins && userPins.length > 0 ? (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
      {userPins.map((pin) => (
        <div 
          key={pin._id} 
          className="break-inside-avoid mb-6 bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <PinCard pin={pin} />
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center text-lg text-white py-12 bg-gray-800 rounded-lg">
      No Pin Yet
    </div>
  )}
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
