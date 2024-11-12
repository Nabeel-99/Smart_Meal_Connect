import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    isFake: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const UserPost = mongoose.model("user_post", userPostSchema);

export default UserPost;
