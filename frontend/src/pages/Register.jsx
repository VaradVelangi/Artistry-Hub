import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "../components/Loading";
import { PinData } from "../context/PinContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { registerUser, btnLoading } = UserData();
  const navigate = useNavigate();
  const { fetchPins } = PinData();

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(name, email, password, navigate, fetchPins);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Assets/icon2.png" alt="Artistry Hub" className="h-12" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Register to ArtFlow
        </h2>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            {btnLoading ? <LoadingAnimation /> : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Login link */}
        <div className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
