import { User } from "../models/userModel.js";
import { Pin } from "../models/pinModel.js";
import bcrypt from 'bcrypt';
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";

// ===================
// Auth & Profile
// ===================

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 8)
    return res.status(400).json({ message: "Password must be at least 8 characters long" });

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Already have an account with this email" });

  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashPassword });

  generateToken(user._id, res);
  res.status(201).json({ user, message: "User Registered" });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "No user with this mail" });

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) return res.status(400).json({ message: "Wrong password" });

  generateToken(user._id, res);
  res.json({ user, message: "Logged in" });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
});

export const userProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

export const followAndUnfollowUser = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user._id);

  if (!user) return res.status(400).json({ message: "No user with this id" });
  if (user._id.equals(loggedInUser._id))
    return res.status(400).json({ message: "You can't follow yourself" });

  if (user.followers.includes(loggedInUser._id)) {
    // Unfollow
    user.followers.pull(loggedInUser._id);
    loggedInUser.following.pull(user._id);
    await user.save();
    await loggedInUser.save();
    res.json({ message: "User Unfollowed" });
  } else {
    // Follow
    user.followers.push(loggedInUser._id);
    loggedInUser.following.push(user._id);
    await user.save();
    await loggedInUser.save();
    res.json({ message: "User followed" });
  }
});

export const logOutUser = TryCatch(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "Logged Out Successfully" });
});

// ===================
// 📊 Stats & Analytics
// ===================

// ✅ Basic stats
// ✅ User overall stats summary with extra fields
export const getUserStats = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const totalPins = await Pin.countDocuments({ owner: userId });

  const totalLikes = await Pin.aggregate([
    { $match: { owner: userId } },
    { $project: { likesCount: { $size: "$likes" } } },
    { $group: { _id: null, total: { $sum: "$likesCount" }, avg: { $avg: "$likesCount" } } }
  ]);

  const totalComments = await Pin.aggregate([
    { $match: { owner: userId } },
    { $project: { commentsCount: { $size: "$comments" } } },
    { $group: { _id: null, total: { $sum: "$commentsCount" }, avg: { $avg: "$commentsCount" } } }
  ]);

  // Find most recent and oldest pin dates
  const recentPin = await Pin.findOne({ owner: userId }).sort({ createdAt: -1 }).select("createdAt");
  const oldestPin = await Pin.findOne({ owner: userId }).sort({ createdAt: 1 }).select("createdAt");

  res.json({
    totalPins,
    totalLikes: totalLikes[0]?.total || 0,
    avgLikes: Number((totalLikes[0]?.avg || 0).toFixed(2)),
    totalComments: totalComments[0]?.total || 0,
    avgComments: Number((totalComments[0]?.avg || 0).toFixed(2)),
    recentPinDate: recentPin?.createdAt,
    oldestPinDate: oldestPin?.createdAt,
  });
});


// ✅ Engagement over time
export const engagementOverTime = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const data = await Pin.aggregate([
    { $match: { owner: userId } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        pins: { $sum: 1 },
        likes: { $sum: { $size: "$likes" } },
        comments: { $sum: { $size: "$comments" } }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  res.json(data);
});

// ✅ Top performing pins by likes
export const topPerformingPins = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const pins = await Pin.find({ owner: userId })
    .sort({ "likes.length": -1, createdAt: -1 })
    .limit(3)
    .select("title likes comments image createdAt");

  res.json(pins);
});

// ✅ Top performing pins by comments
export const topPinsByComments = TryCatch(async (req, res) => {
  const userId = req.user._id;

  const pins = await Pin.find({ owner: userId })
    .sort({ "comments.length": -1, createdAt: -1 })
    .limit(3)
    .select("title likes comments image createdAt");

  res.json(pins);
});
