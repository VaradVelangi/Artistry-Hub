import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  myProfile,
  userProfile,
  followAndUnfollowUser,
  getUserStats,
  engagementOverTime,
  topPerformingPins,
  topPinsByComments    // <-- add this import
} from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logOutUser);

// Profile
router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);

// Follow
router.post("/follow/:id", isAuth, followAndUnfollowUser);

// 📊 Stats & dashboard
router.get("/stats/me", isAuth, getUserStats);
router.get("/stats/engagement", isAuth, engagementOverTime);
router.get("/stats/top-pins", isAuth, topPerformingPins);
router.get("/stats/top-pins-comments", isAuth, topPinsByComments);  // <-- NEW route

export default router;
