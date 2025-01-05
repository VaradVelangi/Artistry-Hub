import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, FolderIcon, UserIcon, PencilIcon } from '@heroicons/react/outline'


const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-700/60">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex justify-between items-center">
      {/* Logo and Title */}
      <Link
        to="/"
        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
      >
        <img
          src="/Assets/icon2.png"
          title="image processing icons"
          alt="Artistry Hub"
          className="h-10 w-auto"
        />
        <span className="text-white text-2xl font-bold">Artistry Hub</span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-white p-2 rounded-md hover:bg-gray-800 transition-all"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span
            className={`h-0.5 bg-white rounded-sm transition-transform duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`h-0.5 bg-white rounded-sm transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`h-0.5 bg-white rounded-sm transition-transform duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </div>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link
          to="/"
          className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors"
        >
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/AboutProject"
          className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors"
        >
          <FolderIcon className="h-5 w-5" />
          <span>About Project</span>
        </Link>
        <Link
          to="/AboutDev"
          className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors"
        >
          <UserIcon className="h-5 w-5" />
          <span>Developer</span>
        </Link>
        <Link
          to="/create"
          className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors"
        >
          <PencilIcon className="h-5 w-5" />
          <span>Create</span>
        </Link>
        <Link
          to="/account"
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-lg text-white font-medium shadow-lg hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          {user.name.slice(0, 1).toUpperCase()}
        </Link>
      </div>
    </div>

    {/* Mobile Navigation Menu */}
    <div
      className={`lg:hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}
    >
      <nav className="mt-4 space-y-3">
        <Link
          to="/"
          className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/AboutProject"
          className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <FolderIcon className="h-5 w-5" />
          <span>About Project</span>
        </Link>
        <Link
          to="/AboutDev"
          className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <UserIcon className="h-5 w-5" />
          <span>Developer</span>
        </Link>
        <Link
          to="/create"
          className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <PencilIcon className="h-5 w-5" />
          <span>Create</span>
        </Link>
        <div className="flex items-center px-4 py-2 space-x-3">
          <Link
            to="/account"
            className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full text-lg text-white font-medium shadow-lg hover:bg-purple-700 transition-all"
            onClick={() => setIsMenuOpen(false)}
          >
            {user.name.slice(0, 1).toUpperCase()}
          </Link>
          <span className="text-white font-medium">{user.name}</span>
        </div>
      </nav>
    </div>
  </div>
</div>
  );
};

export default Navbar;