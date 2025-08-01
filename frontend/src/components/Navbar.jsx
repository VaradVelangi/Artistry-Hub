import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, FolderIcon, UserIcon, PencilIcon } from '@heroicons/react/outline';

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleTopScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-700/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Logo & Title */}
        <Link
          to="/"
          onClick={handleTopScroll}
          className="flex items-center space-x-3 hover:opacity-80 hover:scale-105 transition-transform"
        >
          <img src="/Assets/icon2.png" alt="ArtFlow" className="h-10 w-auto" />
          <span className="text-white text-2xl font-bold">ArtFlow</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link to="/" onClick={handleTopScroll} className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors">
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/create" onClick={handleTopScroll} className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors">
            <PencilIcon className="h-5 w-5" />
            <span>Create</span>
          </Link>
          <Link to="/AboutProject" onClick={handleTopScroll} className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors">
            <FolderIcon className="h-5 w-5" />
            <span>About Project</span>
          </Link>
          <Link to="/AboutDev" onClick={handleTopScroll} className="flex items-center space-x-2 text-white text-lg font-medium hover:text-purple-400 transition-colors">
            <UserIcon className="h-5 w-5" />
            <span>Developer</span>
          </Link>
          <Link
            to="/account"
            onClick={handleTopScroll}
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-lg text-white font-medium shadow-lg hover:scale-105 hover:ring-2 hover:ring-purple-500 transition-all"
          >
            {user?.name?.slice(0, 1).toUpperCase() || "U"}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2 rounded-md hover:bg-gray-800 transition-all"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 bg-white rounded transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 bg-white rounded transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-white rounded transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="flex flex-col items-start px-4 pb-4 space-y-3">
          <Link to="/" onClick={handleNavClick} className="text-white text-lg font-medium hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link to="/create" onClick={handleNavClick} className="text-white text-lg font-medium hover:text-purple-400 transition-colors">
            Create
          </Link>
          <Link to="/AboutProject" onClick={handleNavClick} className="text-white text-lg font-medium hover:text-purple-400 transition-colors">
            About Project
          </Link>
          <Link to="/AboutDev" onClick={handleNavClick} className="text-white text-lg font-medium hover:text-purple-400 transition-colors">
            Developer
          </Link>
          <Link
            to="/account"
            onClick={handleNavClick}
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-lg text-white font-medium shadow-lg hover:scale-105 hover:ring-2 hover:ring-purple-500 transition-all"
          >
            {user?.name?.slice(0, 1).toUpperCase() || "U"}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
