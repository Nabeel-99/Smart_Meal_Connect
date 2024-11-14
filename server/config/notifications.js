import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import admin from "firebase-admin";
import UserPost from "../models/userPostModel.js";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };

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

export const sendLikesNotification = async (userId, postId) => {
  try {
    const post = await UserPost.findById(postId)
      .populate("userId", "fcmToken firstName")
      .populate("recipeId", "images");
    console.log("post", post);
    if (!post || !post.userId) {
      console.log("Post or user not found");
      return;
    }
    const liker = await User.findById(userId);
    console.log("liker", liker);
    if (!liker) {
      console.log("Liker not found");
      return;
    }
    if (liker._id.equals(post.userId._id)) {
      console.log("no notifications needed for post owner");
      return;
    }
    const fcmToken = post.userId.fcmToken;
    const imageUrl = post.recipeId.images?.[0];
    if (fcmToken) {
      const payload = {
        notification: {
          title: `${liker.firstName}`,
          body: "liked your post.",
        },
        android: {
          notification: {
            imageUrl:
              "https://images.unsplash.com/photo-1593642634367-d91a135587b5", // Image URL for Android
          },
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

export const sendNotifications = async (
  userId,
  postId,
  eventType,
  commentText
) => {
  try {
    const post = await UserPost.findById(postId)
      .populate("userId", "fcmToken firstName")
      .populate("recipeId", "images");
    console.log("post", post);
    if (!post || !post.userId) {
      console.log("Post or user not found");
      return;
    }
    const commenter = await User.findById(userId);
    console.log("commenter", commenter);
    if (!commenter) {
      console.log("commenter not found");
      return;
    }
    if (commenter._id.equals(post.userId._id)) {
      console.log("no notifications needed for post owner");
      return;
    }
    const fcmToken = post.userId.fcmToken;
    const imageUrl = post.recipeId.images?.[0];
    if (fcmToken) {
      const payload = {
        notification: {
          title: `${commenter.firstName}`,
          body: `commented: ${commentText}`,
        },
        android: {
          notification: {
            imageUrl:
              "https://images.unsplash.com/photo-1593642634367-d91a135587b5", // Image URL for Android
          },
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
