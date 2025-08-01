import { Pin } from "../models/pinModel.js";
import { User } from "../models/userModel.js"; // add this to get following list
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

// ✅ Create new pin (with tags)
export const createPin = TryCatch(async (req, res) => {
  const { title, pin, tags } = req.body;
  const file = req.file;
  const fileUrl = getDataUrl(file);

  const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  const tagsArray = tags
    ? tags.split(",").map(tag => tag.trim()).filter(Boolean)
    : [];

  await Pin.create({
    title,
    pin,
    tags: tagsArray,
    image: {
      id: cloud.public_id,
      url: cloud.secure_url,
    },
    owner: req.user._id,
  });

  res.json({ message: "Pin Created" });
});

// ✅ Get all pins (for explore)
export const getAllPins = TryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const [pins, total] = await Promise.all([
    Pin.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Pin.countDocuments()
  ]);

  res.json({
    pins,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
});

// ✅ Get pins from people I follow
export const getFollowingPins = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const followingIds = user.following;
  const pins = await Pin.find({ owner: { $in: followingIds } }).sort({ createdAt: -1 });

  res.json({ pins });
});

// ✅ Get single pin
export const getSinglePin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id).populate("owner", "-password");
  res.json(pin);
});

// ✅ Add comment
export const commentOnPin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);
  if (!pin) return res.status(400).json({ message: "No Pin with this id" });

  pin.comments.push({
    user: req.user._id,
    name: req.user.name,
    comment: req.body.comment,
  });

  await pin.save();
  res.json({ message: "Comment Added" });
});

// ✅ Delete comment
export const deleteComment = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);
  if (!pin) return res.status(400).json({ message: "No Pin with this id" });

  const commentId = req.query.commentId;
  if (!commentId) return res.status(400).json({ message: "Please provide commentId" });

  const index = pin.comments.findIndex(c => c._id.toString() === commentId);
  if (index === -1) return res.status(404).json({ message: "Comment not found" });

  if (pin.comments[index].user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  pin.comments.splice(index, 1);
  await pin.save();
  res.json({ message: "Comment Deleted" });
});

// ✅ Toggle like
export const toggleLike = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);
  if (!pin) return res.status(404).json({ message: "Pin not found" });

  const userId = req.user._id.toString();
  const index = pin.likes.findIndex(id => id.toString() === userId);

  if (index === -1) {
    pin.likes.push(userId);
  } else {
    pin.likes.splice(index, 1);
  }

  await pin.save();
  res.json({ message: "Like status updated", likesCount: pin.likes.length });
});

// ✅ Add / replace tags
export const addTags = TryCatch(async (req, res) => {
  const { tags } = req.body;
  if (!tags || !Array.isArray(tags))
    return res.status(400).json({ message: "Tags must be an array" });

  const pin = await Pin.findById(req.params.id);
  if (!pin) return res.status(404).json({ message: "Pin not found" });

  pin.tags = tags;
  await pin.save();
  res.json({ message: "Tags updated" });
});

// ✅ Update pin title & description
export const updatePin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);
  if (!pin) return res.status(400).json({ message: "No Pin with this id" });

  if (pin.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  pin.title = req.body.title;
  pin.pin = req.body.pin;

  await pin.save();
  res.json({ message: "Pin updated" });
});

// ✅ Delete pin
export const deletePin = TryCatch(async (req, res) => {
  const pin = await Pin.findById(req.params.id);
  if (!pin) return res.status(400).json({ message: "No Pin with this id" });

  if (pin.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await cloudinary.v2.uploader.destroy(pin.image.id);
  await pin.deleteOne();

  res.json({ message: "Pin Deleted" });
});
