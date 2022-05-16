import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/:id").patch(protect, updateUser).delete(protect, deleteUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getMe);

export default router;
