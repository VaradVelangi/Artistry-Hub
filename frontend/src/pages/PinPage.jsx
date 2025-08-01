import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaHeart, FaShare, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const PinPage = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
    toggleLike,
  } = PinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [comment, setComment] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPin(params.id);
    window.scrollTo(0, 0);
  }, [params.id]);

  useEffect(() => {
    if (pin?.likes) {
      setLikesCount(pin.likes.length);
      setLiked(pin.likes.includes(user._id));
    }
  }, [pin, user._id]);

  const likeHandler = async () => {
    await toggleLike(pin._id);
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const shareHandler = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/pin/${pin._id}`)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Copy failed"));
  };

  const updateHandler = () => updatePin(pin._id, title, pinValue, setEdit);

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-start py-8 px-4 relative">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg max-w-5xl w-full overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 w-full relative group bg-gray-700">
            {pin.image && (
              <>
                <img
                  src={pin.image.url}
                  alt={pin.title}
                  className="object-cover w-full h-full md:rounded-l-2xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                  >
                    View Fullscreen
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="md:w-1/2 w-full p-6 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              {edit ? (
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-1 rounded outline-none"
                  placeholder="Enter title"
                />
              ) : (
                <h2 className="text-2xl font-bold">{pin.title}</h2>
              )}
              {pin.owner?._id === user._id && (
                <div className="flex gap-2">
                  <button onClick={() => setEdit(!edit)}>
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deletePin(pin._id, navigate)}
                    className="text-red-500"
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>

            {edit ? (
              <textarea
                value={pinValue}
                onChange={(e) => setPinValue(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded outline-none resize-none"
                placeholder="Enter description"
              />
            ) : (
              <p className="text-gray-300">{pin.pin}</p>
            )}

            {pin.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {pin.tags.map((tag, idx) => (
                  <span key={idx} className="bg-purple-600 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {edit && (
              <button
                onClick={updateHandler}
                className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded"
              >
                Save
              </button>
            )}

            {/* Owner + Like / Share */}
            <div className="flex justify-between items-center border-t border-gray-700 pt-4">
              <Link to={`/user/${pin.owner?._id}`} className="flex items-center">
                <div className="bg-purple-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold">
                  {pin.owner?.name?.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{pin.owner?.name}</p>
                  <p className="text-xs text-gray-400">
                    {pin.owner?.followers?.length || 0} followers
                  </p>
                </div>
              </Link>
              <div className="flex gap-3">
                <button onClick={likeHandler} className="flex items-center">
                  <FaHeart color={liked ? "red" : "gray"} />{" "}
                  <span className="ml-1">{likesCount}</span>
                </button>
                <button onClick={shareHandler} className="flex items-center">
                  <FaShare /> <span className="ml-1">Share</span>
                </button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-purple-500 font-medium mt-2"
              >
                Comments ({pin.comments?.length || 0}) {showComments ? "▲" : "▼"}
              </button>
              {showComments && (
                <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                  {pin.comments?.map((c) => (
                    <div key={c._id} className="bg-gray-700 rounded p-2">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{c.name}</p>
                        {c.user === user._id && (
                          <button
                            onClick={() => deleteComment(pin._id, c._id)}
                            className="text-red-400"
                          >
                            <MdDelete size={14} />
                          </button>
                        )}
                      </div>
                      <p className="text-sm">{c.comment}</p>
                    </div>
                  ))}
                  {pin.comments?.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No comments yet.</p>
                  )}
                </div>
              )}

              {/* Add comment */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(pin._id, comment, setComment);
                }}
                className="flex mt-2"
              >
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-700 px-3 py-1 rounded outline-none"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 bg-purple-600 px-3 rounded text-white"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2"
            >
              <FaTimes size={18} />
            </button>
            <img
              src={pin.image.url}
              alt={pin.title}
              className="max-h-[80vh] max-w-[90vw] rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PinPage;
