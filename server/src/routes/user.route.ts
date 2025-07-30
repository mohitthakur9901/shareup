import express from "express";
import {
  syncUser,
  getCurrentUser,
  getUserProfile,
  updateUser,
} from "../controllers/user.controller";
import upload from "../middlewares/upload.middleware";
import { protectRoute } from "../middlewares/auth.middleware.";

const router = express.Router();
// public route
router.get("/getUserProfile/:username", getUserProfile);

// protected route
router.post("/syncUser", syncUser);
router.get("/getCurrentUser", protectRoute, getCurrentUser);

router.post(
  "/updateUser",
  protectRoute,
  upload.single("profilePicture"),
  updateUser
);

export default router;
