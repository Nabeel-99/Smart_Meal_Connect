import path from "path";
import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";
import UserPost from "../models/userPostModel.js";
import * as fs from "node:fs/promises";
import { validatePost, validateUpdatePost } from "../utils/validation.js";
import { sendNotifications } from "../config/notifications.js";

const __dirname = path.resolve();

//post recipe
export const postRecipe = async (req, res) => {
  try {
    const { userId } = req;
    const { title, ingredients, instructions, category, prepTime } = req.body;
    const images = req.files;
    if (!title || !instructions || !prepTime || !ingredients || !category) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }
    if (!images || images.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (images.length > 3) {
      return res.status(400).json({ message: "Maximum 3 images allowed" });
    }
    const formattedIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    const formattedInstructions = instructions
      .split(/\r?\n/)
      .map((instruction) => instruction.trim());
    const imagePaths = images.map((image) => image.path);
    const newRecipe = new Recipe({
      title,
      ingredients: formattedIngredients,
      instructions: formattedInstructions,
      images: imagePaths,
      category,
      prepTime,
    });

    await newRecipe.save();

    const savedPost = new UserPost({
      userId,
      recipeId: newRecipe._id,
    });
    await savedPost.save();
    return res
      .status(201)
      .json({ message: "Recipe posted successfully", newRecipe });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// edit post
export const updateRecipePost = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { title, ingredients, instructions, category, prepTime } = req.body;
    const images = req.files || [];
    const deletedImages = JSON.parse(req.body.deletedImages || "[]");
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const formattedIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());
    const formattedInstructions = instructions
      .split(/\r?\n/)
      .map((instruction) => instruction.trim());

    const updatedData = {
      ...(title && { title }),
      ...(ingredients && { ingredients: formattedIngredients }),
      ...(instructions && { instructions: formattedInstructions }),
      ...(category && { category }),
      ...(prepTime && { prepTime }),
    };

    const existingImages = recipe.images || [];
    // Update images only if there are new ones
    if (images.length > 0) {
      if (images.length > 3) {
        return res.status(400).json({ message: "Maximum 3 images allowed" });
      }
      const imagePaths = [
        ...existingImages,
        ...images.map((image) => image.path),
      ];
      updatedData.images = [...new Set(imagePaths)];
    } else {
      updatedData.images = existingImages;
    }

    // Remove deleted images from the file system and update recipe
    deletedImages.forEach((img) => {
      const imagePath = path.join(__dirname, "uploads", path.basename(img));

      if (existingImages.includes(img)) {
        // Check if the file exists before trying to unlink it
        fs.access(imagePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.log(`File not found: ${imagePath}`);
          } else {
            fs.unlink(imagePath, (err) => {
              if (err) {
                console.log("Failed to delete image", err);
              } else {
                console.log(`Successfully deleted: ${imagePath}`);
              }
            });
          }
        });
      }
    });

    updatedData.images = updatedData.images.filter(
      (img) => !deletedImages.includes(img)
    );
    const updatedPost = await Recipe.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Update was successful", updatedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const { userId } = req;
    const { page = 1, limit = 10 } = req.query;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const posts = await UserPost.find()
      .populate("recipeId")
      .populate("userId", "firstName lastName")
      .populate({
        path: "comments.userId",
        select: "firstName lastName",
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const allPosts = posts.map((post) => ({
      postId: post._id,
      userId: post.userId._id,
      firstName: post.userId.firstName,
      lastName: post.userId.lastName,
      posts: post.recipeId,
      likes: post.likes,
      likesCount: post.likes.size,
      comments: post.comments,
      commentsCount: post.comments.length,
    }));

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// like post
export const likePost = async (req, res) => {
  try {
    const { userId } = req;
    const { postId } = req.body;
    const currentDate = new Date();
    const post = await UserPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const hasLiked = post.likes.get(userId);
    if (hasLiked) {
      post.likes.delete(userId); //unlike
    } else {
      post.likes.set(userId, true); //like
      post.likesTimestamp.set(userId, currentDate);
      if (userId.toString() !== post.userId.toString()) {
        await sendNotifications(userId, postId, "like");
      }
    }
    await post.save();
    const likers = await User.find({
      _id: { $in: Array.from(post.likes.keys()) },
    }).select("firstName");
    return res
      .status(200)
      .json({ likes: post.likes, likesCount: post.likes.size, likers: likers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPostNotificationLikers = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userPosts = await UserPost.find({ userId }).populate(
      "recipeId",
      "images"
    );

    const notifications = userPosts.flatMap((post) => {
      return Array.from(post.likes.keys())
        .filter((likerId) => likerId.toString() !== userId.toString())
        .map((likerId) => ({
          userId: likerId,
          postId: post._id,
          type: "like",
          image: post.recipeId.images ? post.recipeId.images[0] : null,
          timestamp: post.likesTimestamp.get(likerId),
        }));
    });

    const likers = await User.find({
      _id: { $in: notifications.map((n) => n.userId) },
    }).select("firstName");

    const notificationsWithNames = notifications.map((notif) => {
      const user = likers.find(
        (u) => u._id.toString() === notif.userId.toString()
      );
      return {
        ...notif,
        firstName: user ? user.firstName : "Unknown",
      };
    });
    return res.status(200).json({ notificationsWithNames });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPostCommenters = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userPosts = await UserPost.find({ userId }).populate(
      "recipeId",
      "images"
    );

    const notifications = userPosts.flatMap((post) =>
      post.comments
        .filter((comment) => comment.userId.toString() !== userId.toString())
        .map((comment) => ({
          userId: comment.userId,
          postId: post._id,
          text: comment.text,
          type: "comment",
          image: post.recipeId.images ? post.recipeId.images[0] : null,
          timestamp: comment.timestamp,
        }))
    );
    const commenters = await User.find({
      _id: { $in: notifications.map((n) => n.userId) },
    }).select("firstName");

    const notificationsWithNames = notifications.map((notif) => {
      const user = commenters.find(
        (u) => u._id.toString() === notif.userId.toString()
      );
      return {
        ...notif,
        firstName: user ? user.firstName : "Unknown",
      };
    });
    return res.status(200).json({ notificationsWithNames });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get liked stated
export const getLikedPosts = async (req, res) => {
  try {
    const { userId } = req;
    const likedPosts = await UserPost.find({ [`likes.${userId}`]: true })
      .select("_id") //[post id]
      .lean();

    const likedPostIds = likedPosts.map((post) => post._id.toString());

    return res.status(200).json({ likedPostIds });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// comment on post
export const postComment = async (req, res) => {
  try {
    const { userId } = req;
    const { postId, comment } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!postId) {
      return res.status(400).json({ message: "Post id is required" });
    }

    const post = await UserPost.findById(postId);
    if (post) {
      const newComment = { userId, text: comment };
      post.comments.push(newComment);
      await post.save();

      const updatedPost = await UserPost.findById(postId).populate(
        "comments.userId",
        "firstName lastName"
      );
      if (userId.toString() !== post.userId.toString()) {
        await sendNotifications(userId, postId, "comment", {
          text: comment,
        });
      }
      return res
        .status(200)
        .json({ message: "comment posted", comment: updatedPost });
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const { userId } = req;
    const { postId, commentId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await UserPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }
    post.comments.pull(commentId);
    await post.save();

    return res.status(200).json({ message: "comment deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get user posts
export const getUserPosts = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const currentUserId = req.userId;
    const queryUserId = userId || currentUserId;

    if (!queryUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userProfile = await User.findById(queryUserId).select(
      "firstName lastName"
    );
    const posts = await UserPost.find({ userId: queryUserId }).populate(
      "recipeId"
    );
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    let totalLikes = 0;

    const userPosts = posts.map((post) => {
      const likes = post.likes.size;
      totalLikes += likes;
      return {
        postId: post._id,
        userId: post.userId._id,
        posts: post.recipeId,
        likes: post.likes,
        likesCount: post.likes.size,
        comments: post.comments,
        commentsCount: post.comments.length,
      };
    });
    return res.status(200).json({
      userProfile,
      userPosts,
      totalLikes: totalLikes,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete user post
export const deletePost = async (req, res) => {
  try {
    const { userId } = req;
    const { postId, recipeId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await UserPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (!post.userId.equals(userId)) {
      return res
        .status(401)
        .json({ message: "Unauthorized to delete this post" });
    }
    if (recipe && recipe.images) {
      for (const image of recipe.images) {
        const filePath = path.join(__dirname, "uploads", path.basename(image));
        try {
          await fs.unlink(filePath);
          console.log(`Successfully deleted image: ${image}`);
        } catch (error) {
          console.log(`error deleting image: ${image}}`, error);
        }
      }
    }

    await recipe.deleteOne();
    await post.deleteOne();

    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
