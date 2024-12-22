import express from "express";
import { verifyUser } from "../controllers/authController.js";
import {
  createMetrics,
  createPantry,
  getUserMetrics,
  getUserPantry,
  updateMetrics,
  updatePantry,
} from "../controllers/preferenceController.js";
import {
  deleteComment,
  deletePost,
  getAllPosts,
  getLikedPosts,
  getUserPostCommenters,
  getUserPostNotificationLikers,
  getUserPosts,
  likePost,
  postComment,
  postRecipe,
  updateRecipePost,
} from "../controllers/postController.js";
import multer from "multer";

// storing images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/create-metrics", verifyUser, createMetrics);
router.get("/get-user-metrics", verifyUser, getUserMetrics);
router.patch("/update-metrics", verifyUser, updateMetrics);
router.post("/create-pantry", verifyUser, createPantry);
router.patch("/update-pantry", verifyUser, updatePantry);
router.get("/get-user-pantry", verifyUser, getUserPantry);

// post
router.post("/post", upload.array("images", 3), verifyUser, postRecipe);
router.patch(
  "/update/:id",
  upload.array("images", 3),
  verifyUser,
  updateRecipePost
);
router.post("/delete-post", verifyUser, deletePost);
router.get("/posts", verifyUser, getAllPosts);
router.post("/like", verifyUser, likePost);
router.get("/liked-posts", verifyUser, getLikedPosts);
router.get("/likers", verifyUser, getUserPostNotificationLikers);
router.get("/commenters", verifyUser, getUserPostCommenters);
router.post("/post-comment", verifyUser, postComment);
router.post("/delete-comment", verifyUser, deleteComment);
router.get("/profile", verifyUser, getUserPosts);
router.get("/profile/:id", verifyUser, getUserPosts);

export default router;
