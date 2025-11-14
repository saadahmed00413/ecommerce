// routes/userRoutes.js
import express from "express";
import { protect, authorize, checkPermission } from "../middleware/auth.js";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  register,
  login,
  getMe,
  logout,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes - require authentication
// router.get("/profile", protect, getProfile);

// Protected routes
// router.get("/me", protect, getMe);
// router.post("/logout", protect, logout);
// router.put("/updatepassword", protect, updatePassword);

// Admin only routes
router.get("/users", protect, authorize("admin"), getUsers);

// Multiple roles allowed
router.get("/users/:id", protect, authorize("admin", "moderator"), getUser);

// Permission-based access
router.put(
  "/users/:id",
  protect,
  checkPermission("update", "manage_users"),
  updateUser
);

// Combined role and permission check
router.delete(
  "/users/:id",
  protect,
  authorize("admin"),
  checkPermission("delete"),
  deleteUser
);

export default router;
