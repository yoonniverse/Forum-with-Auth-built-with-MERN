import express from "express";
import {
  readPosts,
  createPost,
  updatePost,
  deletePost,
  readPost,
} from "../controllers/postControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(readPosts).post(protect, createPost);
router
  .route("/:id")
  .get(readPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

export default router;
