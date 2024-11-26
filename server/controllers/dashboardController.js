import path from "path";
import Metrics from "../models/metricsModel.js";
import Recipe from "../models/recipeModel.js";
import UserDashboard from "../models/userDashboardModel.js";
import User from "../models/userModel.js";
import {
  calculateBMR,
  calculateTDEE,
  getCalorieIntake,
} from "../utils/helper.js";
import {
  categorizeRecipes,
  fetchDashboardRecipes,
} from "../utils/recipeLogic.js";
import { sendEmail } from "../config/notifications.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { readFileSync } from "fs";
const fallbackMeals = JSON.parse(
  readFileSync(new URL("../utils/fallbackmeals.json", import.meta.url))
);
//file helper
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prepareRecipesForInsertion = (recipes) => {
  return recipes.map((recipe) => ({
    title: recipe.title || "Untitled",
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || [],
    images: Array.isArray(recipe.images)
      ? recipe.images
      : [recipe.images || "no image"],
    category: recipe.category || "uncategorized",
    dietaryPreferences: recipe.dietaryPreferences || [],
    videoLink: recipe.videoLink || "",
    sourceUrl: recipe.sourceUrl || "",
    calories: recipe.calories || 0,
    nutrients: recipe.nutrients || [],
    prepTime: recipe.prepTime || 0,
  }));
};

const generateDashboardRecipes = async (req) => {
  try {
    const userId = req.userId;
    const user = await Metrics.findOne({ userId: userId });
    if (!user) {
      return {
        error: true,
        message: "User not found",
        statusCode: 404,
      };
    }

    const {
      gender = null,
      age = null,
      weight = null,
      height = null,
      exerciseLevel = "moderately_active",
      goal = null,
      dietaryPreferences = [],
      defaultMetrics = false,
    } = user;

    let BMR = null;
    let TDEE = null;
    let calorieTarget = null;

    if (!defaultMetrics && gender && weight && height && age) {
      BMR = calculateBMR(gender, weight, height, age);
      TDEE = calculateTDEE(BMR, exerciseLevel);
      calorieTarget = getCalorieIntake(goal, TDEE);
    }

    try {
      const allRecipes = await fetchDashboardRecipes(goal, dietaryPreferences);
      const filteredAndRankedRecipes = await categorizeRecipes(allRecipes);

      //empty meals
      const isEmpty =
        !filteredAndRankedRecipes.breakfast.length &&
        !filteredAndRankedRecipes.lunch.length &&
        !filteredAndRankedRecipes.dinner.length;

      if (isEmpty) {
        console.warn(
          "No recipes found from the API. Falling back to local meals."
        );
        return {
          error: false,
          message: "No recipes found, using fallback meals",
          calorieTarget: calorieTarget || null,
          recipes: fallbackMeals,
        };
      }

      return {
        error: false,
        message: "Dashboard recipes fetched successfully",
        calorieTarget: calorieTarget || null,
        recipes: filteredAndRankedRecipes,
      };
    } catch (apiError) {
      if (
        apiError.response &&
        apiError.response.status >= 400 &&
        apiError.response.status <= 500
      ) {
        // Fallback to local fallbackMeals
        return {
          error: false,
          message: "API quota reached, using fallback meals",
          calorieTarget: calorieTarget || null,
          recipes: fallbackMeals,
        };
      }

      console.error(apiError);
      return {
        error: true,
        message: "Error fetching dashboard recipes",
        statusCode: 500,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "Error processing dashboard data",
      statusCode: 500,
    };
  }
};

export const manageDashboardRecipes = async (req, res) => {
  try {
    const userId = req.userId;
    let userDashboard = await UserDashboard.findOne({
      userId: userId,
    }).populate({
      path: "generatedMeals.breakfast.recipeId generatedMeals.lunch.recipeId generatedMeals.dinner.recipeId",
      model: "recipe",
    });

    const currentTime = new Date();
    if (userDashboard) {
      if (userDashboard.expiresAt > currentTime) {
        // Dashboard still valid
        const existingRecipes = {
          breakfast: userDashboard.generatedMeals.breakfast.map(
            (meal) => meal.recipeId
          ),
          lunch: userDashboard.generatedMeals.lunch.map(
            (meal) => meal.recipeId
          ),
          dinner: userDashboard.generatedMeals.dinner.map(
            (meal) => meal.recipeId
          ),
        };

        return res.status(200).json({
          message: "Dashboard already exists.",
          recipes: existingRecipes,
          calorieTarget: userDashboard.calorieTarget || null,
        });
      } else {
        // Dashboard expired deleting user dashbaord
        await UserDashboard.deleteOne({ userId: userId });

        // deleting recipes associated with the dashboard
        await Recipe.deleteMany({
          _id: {
            $in: userDashboard.generatedMeals.breakfast
              .concat(
                userDashboard.generatedMeals.lunch,
                userDashboard.generatedMeals.dinner
              )
              .map((meal) => meal.recipeId),
          },
        });
      }
    }

    const dashboardResponse = await generateDashboardRecipes(req);

    // Handle error response from generateDashboardRecipes
    if (dashboardResponse.error) {
      return res
        .status(dashboardResponse.statusCode)
        .json({ message: dashboardResponse.message });
    }

    const { recipes: filteredAndRankedRecipes, calorieTarget } =
      dashboardResponse;

    const recipesToSave = prepareRecipesForInsertion([
      ...filteredAndRankedRecipes.breakfast,
      ...filteredAndRankedRecipes.lunch,
      ...filteredAndRankedRecipes.dinner,
    ]);

    const savedRecipes = await Recipe.insertMany(recipesToSave);

    const breakfastIds = savedRecipes
      .filter((recipe) => recipe.category === "breakfast")
      .map((r) => r._id);
    const lunchIds = savedRecipes
      .filter((recipe) => recipe.category === "lunch")
      .map((r) => r._id);
    const dinnerIds = savedRecipes
      .filter((recipe) => recipe.category === "dinner")
      .map((r) => r._id);

    const newMeals = {
      breakfast: breakfastIds.map((id) => ({
        recipeId: id,
        isSelected: false,
      })),
      lunch: lunchIds.map((id) => ({ recipeId: id, isSelected: false })),
      dinner: dinnerIds.map((id) => ({
        recipeId: id,
        isSelected: false,
      })),
    };

    const newUserDashboard = new UserDashboard({
      userId: userId,
      generatedMeals: newMeals,
      calorieTarget: calorieTarget || null,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await newUserDashboard.save();

    const newRecipes = {
      breakfast: newMeals.breakfast.map((meal) =>
        savedRecipes.find((r) => r._id.equals(meal.recipeId))
      ),
      lunch: newMeals.lunch.map((meal) =>
        savedRecipes.find((r) => r._id.equals(meal.recipeId))
      ),
      dinner: newMeals.dinner.map((meal) =>
        savedRecipes.find((r) => r._id.equals(meal.recipeId))
      ),
    };
    let htmlContent;
    const user = await User.findById(userId);
    if (user && user.email) {
      const templatePath = path.join(
        __dirname,
        "../emailTemplates/dashboard-ready.html"
      );
      try {
        htmlContent = fs.readFileSync(templatePath, "utf-8");
      } catch (error) {
        console.log(error);
      }
      htmlContent = htmlContent
        .replace("{{firstName}}", user.firstName)
        .replace("{{APP_NAME}}", process.env.APP_NAME);
      await sendEmail(
        user.email,
        "Your new Dashboard meals are Ready!",
        htmlContent
      );
    }
    return res.status(200).json({
      message: "Dashboard prepared successfully",
      recipes: newRecipes,
      calorieTarget: calorieTarget || null,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Dashboard already exists for this user." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
