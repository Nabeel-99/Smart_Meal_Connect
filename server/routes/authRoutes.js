import express from "express";
import {
  getUserEmailNotificationPreference,
  requestResetPassword,
  resendVerificationEmail,
  resetPassword,
  unsubscribeToEmailNotifications,
  updateEmailNotifications,
  verifyEmail,
  verifyEmailToken,
  verifyUser,
} from "../controllers/authController.js";
import User from "../models/userModel.js";
import {
  createUser,
  deleteUser,
  getUserData,
  loginUser,
  logout,
  saveNotificationToken,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.patch("/update", verifyUser, updateUser);
router.delete("/delete-user", verifyUser, deleteUser);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.get("/", verifyUser, getUserData);
router.post("/save-notification-token", verifyUser, saveNotificationToken);
router.patch(
  "/update-email-notifications",
  verifyUser,
  updateEmailNotifications
);
router.get(
  "/get-email-notifications",
  verifyUser,
  getUserEmailNotificationPreference
);
router.post(
  "/unsubscribe-email-notifications",
  verifyUser,
  unsubscribeToEmailNotifications
);

export default router;
