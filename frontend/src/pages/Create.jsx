import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const { addPin } = PinData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const addPinHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);

    addPin(formData, setFilePrev, setFile, setTitle, setPin, navigate);
  };
  return (
  <div className="min-h-screen bg-gray-700 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 tracking-wide   leading-tight">Create A New Post </h1>
      </div>
       <div className="max-w-8xl mx-auto px-4">
       <div className="flex flex-wrap justify-center gap-8">
      {/* Image Upload Section */}
      <div className="w-1/3">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            {filePrev ? (
              <div className="relative group">
                <img 
                  src={filePrev} 
                  alt="Pin preview" 
                  className="w-full h-[450px] object-cover rounded-lg"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleClick}
                >
                  <p className="text-white font-medium">Change Image</p>
                </div>
              </div>
            ) : (
              <div
                onClick={handleClick}
                className="h-[450px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={changeFileHandler}
                />
                <div className="w-14 h-14 mb-4 flex items-center justify-center bg-blue-50 rounded-full text-purple-500 hover:bg-purple-200 transition-colors">
                  <FaPlus className="w-6 h-6" />
                </div>
                <p className="text-gray-700 font-medium">Choose an Image</p>
                <p className="mt-2 text-sm text-gray-500 text-center px-4">
                  JPG file recommended<br />(max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-1/2">
        <form
          className="bg-white rounded-xl shadow-sm p-8"
          onSubmit={addPinHandler}
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-black mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Give your Post a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-black mb-2"
              >
                Description
              </label>
              <textarea
                id="pin"
                 className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all    outline-none resize-none"
                  placeholder="Tell everyone what your Post is about"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                required
                />

            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};

export default Create;
