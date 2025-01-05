import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();

  return (
    <div className="bg-gray-700 min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Headline and Subheading */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 tracking-wide leading-snug">
              Welcome to Artistry Hub
            </h1>
            <p className="mt-4 text-xl text-white max-w-2xl mx-auto">
              A platform for creators to share, inspire, and connect. Showcase your art, discover new creators, and engage with a vibrant community.
            </p>
          </div>

          <div className="bg-gray-700 rounded-lg shadow-sm p-6">
  {pins && pins.length > 0 ? (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {pins.map((pin, index) => (
        <div
          key={index}
          className="break-inside-avoid mb-4 bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <PinCard pin={pin} />
          </div>
         ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
             <p className=" italic text-white text-6xl font-medium mb-3">No Pins Yet</p>
              <p className="italic mt-2 text-white text-4xl">Start creating pins to see them here</p>
           </div>
        )}
        </div>

        </div>
      )}
    </div>
  );
};

export default Home;
