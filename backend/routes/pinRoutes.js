import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import {
  createPin,
  getAllPins,
  getSinglePin,
  updatePin,
  deletePin,
  commentOnPin,
  deleteComment,
  toggleLike,
  addTags,
  getFollowingPins    // ✅ new
} from "../controllers/pinControllers.js";

const router = express.Router();

// Pin CRUD
router.post("/new", isAuth, uploadFile, createPin);
router.get("/all", isAuth, getAllPins);
router.get("/following-pins", isAuth, getFollowingPins);   // ✅ new route
router.get("/:id", isAuth, getSinglePin);
router.put("/:id", isAuth, updatePin);
router.delete("/:id", isAuth, deletePin);

// Comments
router.post("/comment/:id", isAuth, commentOnPin);
router.delete("/comment/:id", isAuth, deleteComment);

// Likes
router.post("/like/:id", isAuth, toggleLike);

// Tags
router.put("/tags/:id", isAuth, addTags);   // ✅ replace all tags

export default router;
