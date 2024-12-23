import mongoose from "mongoose";

const userDashboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    generatedMeals: {
      breakfast: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipe",
          },
        },
      ],
      lunch: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipe",
          },
        },
      ],
      dinner: [
        {
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recipe",
          },
        },
      ],
    },
    calorieTarget: {
      type: Number,
      default: null,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const UserDashboard = mongoose.model("user_dashboard", userDashboardSchema);

export default UserDashboard;
