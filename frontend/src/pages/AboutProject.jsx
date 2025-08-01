import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaLink } from 'react-icons/fa';

export const AboutProject = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 tracking-wide leading-tight">
            About the Project
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            <span className="font-semibold text-white">ArtFlow</span> is a creative image-sharing platform built with the MERN stack (MongoDB, Express, React, Node.js). Designed to bring artists, designers, and photographers together, it provides a space to showcase artwork, share stories, and discover inspiration from creators worldwide.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            Users can upload high-quality images along with titles, detailed descriptions, and tags to make their posts more discoverable. With features like follow/unfollow, you can build a personalized feed of your favorite creators. Engage through likes, comments, and real-time interactions that help build meaningful connections in the community.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            Behind the scenes, ArtFlow uses JWT-based authentication for secure user access, Cloudinary for optimized image storage, and an intuitive infinite scrolling experience. Our responsive design ensures a seamless browsing experience across devices.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mb-12">
            Join <span className="font-semibold text-white">ArtFlow</span> and explore a platform where creativity thrives — whether you’re sharing your own work, connecting with fellow artists, or simply looking for inspiration.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 bg-gray-800 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-semibold text-center text-white mb-6">Contact Me</h2>
        <p className="text-lg text-center text-gray-300 mb-10">
          If you'd like to get in touch or collaborate on a project, feel free to reach out!
        </p>
        <ul className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
          <li className="flex items-center gap-4 text-xl hover:text-blue-400 transition-all">
            <FaEnvelope className="w-6 h-6 text-white" />
            <a href="mailto:velangivarad@gmail.com" className="text-white hover:text-blue-400 transition-all">
              velangivarad@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-4 text-xl hover:text-blue-400 transition-all">
            <FaLinkedin className="w-6 h-6 text-white" />
            <a href="https://www.linkedin.com/in/varadvelangi" className="text-white hover:text-blue-400 transition-all">
              linkedin.com/in/varadvelangi
            </a>
          </li>
          <li className="flex items-center gap-4 text-xl hover:text-blue-400 transition-all">
            <FaGithub className="w-6 h-6 text-white" />
            <a href="https://github.com/varadvelangi" className="text-white hover:text-blue-400 transition-all">
              github.com/varadvelangi
            </a>
          </li>
          <li className="flex items-center gap-4 text-xl hover:text-blue-400 transition-all">
            <FaLink className="w-6 h-6 text-white" />
            <a href="https://linktr.ee/VaradVelangi" className="text-white hover:text-blue-400 transition-all">
              linktr.ee/VaradVelangi
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
