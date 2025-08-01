import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const { addPin } = PinData();
  const navigate = useNavigate();

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(selectedFile);
    };
  };

  const addPinHandler = async (e) => {
    e.preventDefault();
    if (!title || !pin || !file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);
    formData.append("tags", tags);

    setLoading(true);
    await addPin(formData, setFilePrev, setFile, setTitle, setPin, setTags, navigate);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-8 tracking-wide leading-tight">
          Create A New Pin
        </h1>
      </div>

      <div className="max-w-8xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          
          {/* Image upload section */}
          <div className="w-full md:w-1/3">
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
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={handleClick}
                    >
                      <p className="text-white font-medium">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={handleClick}
                    className="h-[450px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
                  >
                    <div className="w-14 h-14 mb-4 flex items-center justify-center bg-blue-50 rounded-full text-purple-500 hover:bg-purple-200 transition-colors">
                      <FaPlus className="w-6 h-6" />
                    </div>
                    <p className="text-gray-700 font-medium">Choose an Image</p>
                    <p className="mt-2 text-sm text-gray-500 text-center px-4">
                      JPG file recommended<br /> (max 10MB)
                    </p>
                  </div>
                )}

                {/* ✅ always render hidden input */}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={changeFileHandler}
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2">
            <form
              className="bg-white rounded-xl shadow-sm p-8 space-y-6"
              onSubmit={addPinHandler}
            >
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-black mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="Give your Post a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-black mb-2">
                  Description
                </label>
                <textarea
                  id="pin"
                  className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all"
                  placeholder="Tell everyone what your Post is about"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-black mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="e.g., travel, art, photography"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                {tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.split(",").map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!title || !pin || !file || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
