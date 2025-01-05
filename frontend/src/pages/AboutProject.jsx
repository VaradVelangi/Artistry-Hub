import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export const AboutProject = () => {
  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 tracking-wide leading-tight">
            About the Project
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            Welcome to <span className="font-semibold text-white">Artistry Hub</span>, an innovative image-sharing platform designed to bring creative minds together. Built using the robust MERN stack (MongoDB, Express, React, and Node.js), Artistry Hub is a space where users can showcase their artistic creations, connect with like-minded individuals, and explore a world of inspiration. Whether you’re a photographer, designer, or art enthusiast, our platform is tailored to provide a seamless and engaging experience.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            Artistry Hub empowers users with a variety of features to enhance their creative journey. Registered users can easily upload images accompanied by titles and detailed descriptions, providing context and storytelling to their visuals. Our follow/unfollow functionality enables users to build a personalized network of creators and collaborators. Additionally, we offer the flexibility to modify uploaded posts, ensuring that your work reflects your vision perfectly.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mb-12">
            Join <span className="font-semibold text-white">Artistry Hub</span> today and be part of a growing community that celebrates creativity and collaboration. Whether you're sharing your art or discovering others’, Artistry Hub is your gateway to an inspiring visual experience.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 bg-gray-800 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-semibold text-center text-white mb-6">Contact Me</h2>
        <p className="text-lg text-center text-gray-300 mb-10">
          If you would like to get in touch or collaborate on a project, feel free to reach out!
        </p>
        <ul className="flex justify-center gap-16">
          <li className="flex items-center gap-6 text-xl hover:text-blue-400 transition-all">
            <FaEnvelope className="w-7 h-7 text-white" />
            <a href="mailto:velangivarad@gmail.com" className="text-white hover:text-blue-400 transition-all">
              velangivarad@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-6 text-xl hover:text-blue-400 transition-all">
            <FaLinkedin className="w-7 h-7 text-white" />
            <a href="https://www.linkedin.com/in/varadvelangi" className="text-white hover:text-blue-400 transition-all">
              linkedin.com/in/varadvelangi
            </a>
          </li>
          <li className="flex items-center gap-6 text-xl hover:text-blue-400 transition-all">
            <FaGithub className="w-7 h-7 text-white" />
            <a href="https://github.com/varadvelangi" className="text-white hover:text-blue-400 transition-all">
              github.com/varadvelangi
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
