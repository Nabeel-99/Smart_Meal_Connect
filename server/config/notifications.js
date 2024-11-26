import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import admin from "firebase-admin";
import UserPost from "../models/userPostModel.js";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccount.json", import.meta.url))
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.GMAIL,
    to,
    subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};

export const sendNotifications = async (userId, postId, eventType, comment) => {
  try {
    const post = await UserPost.findById(postId)
      .populate("userId", "fcmToken firstName")
      .populate("recipeId", "images");
    console.log("post", post);
    if (!post || !post.userId) {
      console.log("Post or user not found");
      return;
    }
    const user = await User.findById(userId);
    console.log("user", user);
    if (!user) {
      console.log("user not found");
      return;
    }
    if (user._id.equals(post.userId._id)) {
      console.log("no notifications needed for post owner");
      return;
    }
    const fcmToken = post.userId.fcmToken;
    if (fcmToken) {
      let notificationMessage;
      if (eventType === "like") {
        notificationMessage = `liked your post.`;
      } else if (eventType === "comment") {
        notificationMessage = `commented: ${comment.text}`;
      }
      const payload = {
        notification: {
          title: `${user.firstName}`,
          body: notificationMessage,
        },
        token: fcmToken,
      };
      console.log("image", payload.notification.image);
      try {
        await admin.messaging().send(payload);
        console.log("notification sent successfully");
      } catch (error) {
        console.log("error sending notification", error);
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};
