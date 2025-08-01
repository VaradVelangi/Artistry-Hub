import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState([]);
  const [page, setPage] = useState(1);                 // current page
  const [totalPages, setTotalPages] = useState(1);     // total pages

  // ✅ Fetch all pins with pagination (for explore page)
  async function fetchPins(pageNumber = 1) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/pin/all?page=${pageNumber}&limit=12`);
      if (pageNumber === 1) {
        setPins(data.pins);
      } else {
        setPins((prev) => [...prev, ...data.pins]);
      }
      setPage(data.page);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch pins");
      setLoading(false);
    }
  }

  // ✅ Fetch pins only from users I follow (for home page)
  async function fetchFollowingPins() {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/pin/following-pins`);
      setPins(data.pins);
      setLoading(false);
    } catch (error) {
      console.error(error);
      //toast.error("Failed to fetch following pins");
      setLoading(false);
    }
  }

  // ✅ Fetch single pin
  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/" + id);
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  // ✅ Update pin title & description
  async function updatePin(id, title, pin, setEdit) {
    try {
      const { data } = await axios.put("/api/pin/" + id, { title, pin });
      toast.success(data.message);
      fetchPin(id);
      setEdit(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  }

  // ✅ Add comment
  async function addComment(id, comment, setComment) {
    try {
      const { data } = await axios.post("/api/pin/comment/" + id, { comment });
      toast.success(data.message);
      fetchPin(id);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  }

  // ✅ Delete comment
  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(`/api/pin/comment/${id}?commentId=${commentId}`);
      toast.success(data.message);
      fetchPin(id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  }

  // ✅ Delete pin
  async function deletePin(id, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/pin/${id}`);
      toast.success(data.message);
      navigate("/");
      fetchPins(1); // refresh list
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      setLoading(false);
    }
  }

  // ✅ Add new pin
  async function addPin(formData, setFilePrev, setFile, setTitle, setPin, setTags, navigate) {
    try {
      const { data } = await axios.post("/api/pin/new", formData);
      toast.success(data.message);
      setFile([]); setFilePrev(""); setPin(""); setTitle(""); setTags([]);
      fetchPins(1); // refresh list
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add pin");
    }
  }

  // ✅ Toggle like
  async function toggleLike(id) {
    try {
      const { data } = await axios.post(`/api/pin/like/${id}`);
      toast.success(data.message);
      fetchPin(id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error toggling like");
    }
  }

  // ✅ Add or replace tags
  async function addTags(pinId, tags) {
    try {
      const { data } = await axios.put(`/api/pin/tags/${pinId}`, { tags });
      toast.success(data.message);
      fetchPin(pinId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding tags");
    }
  }

  // ✅ Fetch following pins on first load (for home page)
  useEffect(() => {
    fetchFollowingPins();
  }, []);

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        page,
        totalPages,
        fetchPins,            // explore
        fetchFollowingPins,   // home
        pin,
        fetchPin,
        updatePin,
        addComment,
        deleteComment,
        deletePin,
        addPin,
        toggleLike,
        addTags,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
