import React from "react";
import { Link } from "react-router-dom";

const PinCard = ({ pin }) => {
  // Optional: if using Cloudinary, dynamically resize images to width 400
  const resizedImageUrl = pin.image.url.includes("/upload/")
    ? pin.image.url.replace("/upload/", "/upload/w_400/")
    : pin.image.url;

  return (
    <div className="p-4 w-full sm:1/2 md:1/3 lg:1/4">
      <div className="relative pb-[125%] overflow-hidden rounded-lg shadow group cursor-pointer transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        <img
          src={resizedImageUrl}
          loading="lazy"
          alt={pin.title || "Pin"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/pin/${pin._id}`}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg"
          >
            View Post
          </Link>
        </div>
      </div>
      {pin.title && (
        <div className="text-center text-white mt-2 text-sm truncate">
          {pin.title}
        </div>
      )}
    </div>
  );
};

export default PinCard;
