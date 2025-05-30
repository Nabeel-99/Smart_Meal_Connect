import {
  fetchBasedOnIngredients,
  fetchBasedOnMetrics,
} from "../utils/recipeLogic.js";
import Recipe from "../models/recipeModel.js";
import {
  calculateBMR,
  calculateTDEE,
  generateInstructionsForEdamam,
  getCalorieIntake,
  getUserMetricsData,
  getUserPantryData,
} from "../utils/helper.js";
import SavedRecipe from "../models/savedRecipeModel.js";
import UserPost from "../models/userPostModel.js";

export const generateIngredientsBasedRecipes = async (req, res) => {
  try {
    let userPantry = [];
    let metrics = {};

    const userId = req.userId;
    const { ingredients, dietaryPreferences, isConnected } = req.body;
    if (!ingredients) {
      return res.status(400).json({ message: "Ingredients are required" });
    }

    if (isConnected && userId) {
      // get user pantry and goal from metrics
      const userPantryData = await getUserPantryData(userId);
      const userMetricsData = await getUserMetricsData(userId);

      if (userPantryData.success) {
        userPantry = userPantryData.userPantry.items || [];
      }

      if (userMetricsData.success) {
        metrics = userMetricsData.metrics;
      }
    }

    const recipes = await fetchBasedOnIngredients(
      ingredients,
      metrics.goal || null,
      dietaryPreferences,
      userPantry
    );
    return res
      .status(200)
      .json({ message: "recipes fetched successfully", recipes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching recipes" });
  }
};

export const generateMetricsBasedRecipes = async (req, res) => {
  try {
    const {
      gender,
      age,
      height,
      weight,
      goal,
      exerciseLevel,
      dietaryPreferences,
      numberOfRecipes,
    } = req.body;

    if (!gender || !age || !height || !weight || !goal || !exerciseLevel) {
      return res.status(400).json({ message: "fields are required" });
    }
    const BMR = calculateBMR(gender, weight, height, age);
    const TDEE = calculateTDEE(BMR, exerciseLevel);
    const calorieTarget = getCalorieIntake(goal, TDEE);

    const allRecipes = await fetchBasedOnMetrics(goal, dietaryPreferences);
    const slicedRecipes = allRecipes.slice(0, numberOfRecipes);
    const finalRecipes = await Promise.all(
      slicedRecipes.map(async (recipe) => {
        let finalInstructions = recipe.instructions;
        if (
          Array.isArray(finalInstructions) &&
          finalInstructions.length === 0
        ) {
          try {
            finalInstructions = await generateInstructionsForEdamam(
              recipe.title,
              recipe.ingredients
            );
          } catch (error) {
            console.log("Error generating instructions:", error);
            finalInstructions = ["Instructions could not be generated"];
          }
        }

        return {
          ...recipe,
          instructions: finalInstructions,
        };
      })
    );

    return res.status(200).json({
      recipes: finalRecipes,
      message: "recipes fetched successfully",
      calorieTarget: calorieTarget,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error fetching recipes" });
  }
};

export const getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const foundRecipe = await Recipe.findById(id);
    if (!foundRecipe) {
      return res.status(404).json({ message: "recipe not found" });
    }
    const foundPost = await UserPost.findOne({ recipeId: id }).populate(
      "userId",
      "firstName"
    );

    const recipeDetails = {
      recipe: foundRecipe,
      post: foundPost || null,
    };
    return res.status(200).json(recipeDetails);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// save recipe
export const saveRecipe = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { recipeDetails } = req.body;

    let savedRecipe = await SavedRecipe.findOne({
      userId,
      recipeId: recipeDetails._id,
    });

    if (savedRecipe) {
      return res.status(400).json({ message: "Recipe already saved" });
    }
    let exisitingRecipe = await Recipe.findOne({ title: recipeDetails.title });
    if (!exisitingRecipe) {
      const newRecipe = new Recipe({
        ...recipeDetails,
      });
      exisitingRecipe = await newRecipe.save();
    }

    const newSavedRecipe = new SavedRecipe({
      userId,
      recipeId: exisitingRecipe._id,
    });
    await newSavedRecipe.save();

    return res.status(200).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const savedRecipeEntries = await SavedRecipe.find({ userId: userId });
    if (!savedRecipeEntries) {
      return res.status(404).json({ message: "No saved recipes found" });
    }
    const savedRecipeIds = savedRecipeEntries.map((entry) => entry.recipeId);
    const savedRecipes = await Recipe.find({ _id: { $in: savedRecipeIds } });
    return res.status(200).json(savedRecipes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const recipeId = await SavedRecipe.findOneAndDelete({
      recipeId: id,
      userId: userId,
    });
    if (!recipeId) {
      return res
        .status(404)
        .json({ message: "Recipe not found in SavedRecipe model" });
    }

    return res.status(200).json({ message: "Recipe deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
