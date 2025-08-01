import React, { useEffect, useState } from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const {
    pins,
    loading,
    page,
    totalPages,
    fetchPins,
    fetchFollowingPins,
  } = PinData();

  const [activeTab, setActiveTab] = useState("explore"); // default to Explore

  // Load correct pins on tab change
  useEffect(() => {
    if (activeTab === "following") {
      fetchFollowingPins();
    } else {
      fetchPins(1);
    }
  }, [activeTab]);

  // Load more pins for explore
  const loadMorePins = () => {
    if (page < totalPages) {
      fetchPins(page + 1);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {loading && pins.length === 0 ? (
        <Loading />
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-white mb-6 tracking-wide leading-snug">
              Welcome to ArtFlow
            </h1>
            <p className="mt-4 text-xl text-white max-w-2xl mx-auto">
              A platform for creators to share, inspire, and connect. Showcase your art, discover new creators, and engage with a vibrant community.
            </p>
          </div>

          {/* ✅ Toggle: Explore first, wider buttons */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveTab("explore")}
              className={`px-6 py-3 rounded-l-full font-medium text-lg ${
                activeTab === "explore"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`px-6 py-3 rounded-r-full font-medium text-lg ${
                activeTab === "following"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } transition`}
            >
              Following
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            {pins && pins.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {pins.map((pin, index) => (
                    <div
                      key={index}
                      className="bg-gray-500 rounded-lg overflow-hidden shadow-md"
                    >
                      <PinCard pin={pin} />
                    </div>
                  ))}
                </div>

                {/* Load more button only in explore mode */}
                {activeTab === "explore" && page < totalPages && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={loadMorePins}
                      disabled={loading}
                      className="px-5 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <p className="italic text-white text-4xl font-medium mb-3">
                  {activeTab === "following"
                    ? "You don’t follow anyone yet !!!"
                    : "No posts found."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
