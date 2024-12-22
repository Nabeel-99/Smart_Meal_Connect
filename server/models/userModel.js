import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bodyMetrics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "metrics",
      required: false,
    },
    userPantry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pantry",
      required: false,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    isNewUser: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    fcmToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
