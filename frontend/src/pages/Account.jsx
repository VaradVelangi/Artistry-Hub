import React from "react";
import { PinData } from "../context/PinContext";
import PinCard from "../components/PinCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { pins } = PinData();

  let userPins;

  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }

  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="flex flex-col items-center justify-center py-8">
        
        {/* Profile Section */}
        <div className="p-8 w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-5xl text-white font-bold shadow-lg">
        {user.name.slice(0, 1)}
        </div>
     </div>
      <div className="flex flex-col items-center text-center text-white">
      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">{user.name}</h1>
      <p className="text-lg text-gray-400 mb-4">{user.email}</p>
      <div className="w-full flex justify-center">
        <button
        onClick={logoutHandler}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
       >
        Logout
        </button>
      </div>
    </div>
    </div>


        {/* Pins Section */}
        <div className="mt-8 w-full">
  <div className="max-w-7xl mx-auto px-4">
    {userPins && userPins.length > 0 ? (
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {userPins.map((pin) => (
          <div 
            key={pin._id} 
            className="break-inside-avoid mb-6 bg-gray-800 rounded-lg overflow-hidden shadow-md"
          >
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-lg text-white py-12 bg-gray-800 rounded-lg">
        No pins yet
      </p>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default Account;
