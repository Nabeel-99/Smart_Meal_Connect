import axios from "axios";
import {
  findRecipesByIngredients,
  getEdamamRecipes,
  getSpoonacularRecipes,
  getTastyAPIRecipes,
} from "./api.js";
import {
  filterRecipeCalories,
  generateInstructionsForEdamam,
} from "./helper.js";
import { readFileSync } from "fs";

const defaultPantry = JSON.parse(
  readFileSync(new URL("./pantry.json", import.meta.url))
);
// fetch dashboard specific recipes
export const fetchDashboardRecipes = async (goal, dietaryPreferences) => {
  try {
    const calories = goal || null;
    const lunchQueries = ["side dish", "snack"];
    const dinnerQueries = ["dessert", "main course", "soup"];
    // fetching recipes
    const apiResults = await Promise.allSettled([
      getSpoonacularRecipes(["breakfast"], calories, dietaryPreferences),
      getSpoonacularRecipes(lunchQueries, calories, dietaryPreferences),
      getSpoonacularRecipes(dinnerQueries, calories, dietaryPreferences),
      getEdamamRecipes([], null, calories, dietaryPreferences),
      getTastyAPIRecipes([]),
    ]);

    const successfulResults = apiResults
      .filter(
        (result) => result.status === "fulfilled" && result.value.length > 0
      )
      .map((result) => result.value);

    const allRecipes = successfulResults.flat();

    const shuffleRecipes = allRecipes.sort(() => Math.random() - 0.5);
    return shuffleRecipes;
  } catch (error) {
    console.log("Error fetching Recipes from APIS", error);
    throw error;
  }
};

// fetch API combinaton recipes
export const fetchAPIRecipes = async (query = [], goal, dietaryPreferences) => {
  try {
    const calories = goal || null;

    // Fetching recipes from all sources
    const apiResults = await Promise.allSettled([
      findRecipesByIngredients(query), // Spoonacular
      getEdamamRecipes(query, null, calories, dietaryPreferences),
      getTastyAPIRecipes(query),
    ]);

    const successfulResults = apiResults
      .filter(
        (result) => result.status === "fulfilled" && result.value.length > 0
      )
      .map((result) => result.value);

    if (successfulResults.length === 0) {
      console.log("No valid results from any API.");
      return [];
    }

    const allRecipes = successfulResults.flat();

    const shuffleRecipes = allRecipes.sort(() => Math.random() - 0.5);

    return shuffleRecipes;
  } catch (error) {
    console.log("Error fetching Recipes from APIs", error);
    throw error;
  }
};

export const fetchBasedOnIngredients = async (
  userIngredients,
  userGoal = null,
  dietaryPreferences = [],
  userPantry = { items: [] }
) => {
  try {
    const recipes = await fetchAPIRecipes(
      userIngredients,
      userGoal,
      dietaryPreferences
    );
    const topRanked = await filterAndRankRecipes(
      recipes,
      userIngredients,
      userPantry
    );

    return topRanked;
  } catch (error) {
    console.log("error fetching", error);
    throw error;
  }
};

export const fetchBasedOnMetrics = async (goal, dietaryPreferences) => {
  try {
    const calories = goal || null;
    const apiResults = await Promise.allSettled([
      getSpoonacularRecipes([], calories, dietaryPreferences),
      getEdamamRecipes([], null, calories, dietaryPreferences),
      getTastyAPIRecipes([]),
    ]);
    const successfulResults = apiResults
      .filter(
        (result) => result.status === "fulfilled" && result.value.length > 0
      )
      .map((result) => result.value);

    if (successfulResults.length === 0) {
      console.log("No valid results from any API.");
      return [];
    }
    const allRecipes = successfulResults.flat();
    const shuffledRecipes = allRecipes.sort(() => Math.random() - 0.5);

    const filteredRecipes = filterRecipeCalories(shuffledRecipes, calories);

    return filteredRecipes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const filterAndRankRecipes = async (
  recipes,
  userIngredients,
  userPantry
) => {
  const meals = [];
  const pantryToUse =
    userPantry && userPantry.length > 0 ? userPantry : defaultPantry.pantry;

  const recipePromises = recipes.map(async (recipe) => {
    const {
      id,
      calories,
      title,
      ingredients,
      instructions,
      mealType,
      dietaryPreferences,
      videoLink,
      sourceUrl,
      images,
      prepTime,
      nutrients,
    } = recipe;

    const recipeIngredients = ingredients.map((item) => item.toLowerCase());
    const userIngredientsLowercase = userIngredients.map((ingredient) =>
      ingredient.toLowerCase()
    );

    // Filtering out partially matched ingredients
    const filteredIngredients = recipeIngredients.filter((ingredient) => {
      return !pantryToUse.some((pantryItem) => {
        return (
          pantryItem.toLowerCase() === ingredient.toLowerCase() ||
          ingredient.toLowerCase().includes(pantryItem.toLowerCase()) ||
          pantryItem.toLowerCase().includes(ingredient.toLowerCase())
        );
      });
    });

    const missingIngredients = filteredIngredients.filter((ingredient) => {
      return !userIngredientsLowercase.some(
        (userIngredient) =>
          userIngredient &&
          (ingredient.includes(userIngredient) ||
            userIngredient.includes(ingredient))
      );
    });

    const userUsedIngredients = ingredients.filter((ingredient) => {
      return userIngredientsLowercase.some(
        (userIngredient) =>
          userIngredient &&
          (ingredient.includes(userIngredient) ||
            userIngredient.includes(ingredient))
      );
    });

    let finalInstructions = instructions;
    console.log(instructions);
    if (missingIngredients.length <= 3) {
      if (
        Array.isArray(instructions) &&
        instructions.includes("no instructions for edamam")
      ) {
        try {
          finalInstructions = await generateInstructionsForEdamam(
            title,
            ingredients
          );
        } catch (error) {
          console.log("error generating instructions", error);
          finalInstructions = ["instructions could not be generated"];
        }
      }

      meals.push({
        id,
        title,
        calories,
        mealType,
        instructions: finalInstructions,
        dietaryPreferences,
        videoLink,
        sourceUrl,
        images,
        prepTime,
        nutrients,
        ingredients,
        userUsedIngredients,
        missingIngredients,
        filteredIngredients,
        missingIngredientsCount: missingIngredients.length,
      });
    }
  });

  //
  await Promise.all(recipePromises);

  return meals;
};

export const categorizeRecipes = async (recipes) => {
  const categories = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };
  const existingRecipes = new Set();

  for (const recipe of recipes) {
    const {
      id,
      calories,
      title,
      ingredients,
      instructions,
      mealType,
      dietaryPreferences,
      videoLink,
      sourceUrl,
      images,
      prepTime,
      nutrients,
    } = recipe;
    if (existingRecipes.has(title)) continue;

    let assigned = false;

    if (Array.isArray(mealType)) {
      if (
        (mealType.includes("morning meal") || mealType.includes("breakfast")) &&
        !assigned
      ) {
        categories.breakfast.push({
          id,
          title,
          ingredients,
          instructions,
          images,
          category: "breakfast",
          dietaryPreferences,
          videoLink,
          calories,
          sourceUrl,
          prepTime,
          nutrients,
        });
        existingRecipes.add(title);
        assigned = true;
      }

      if (
        mealType.includes("side dish") ||
        (mealType.includes("snack") && !assigned)
      ) {
        categories.lunch.push({
          id,
          title,
          ingredients,
          instructions,
          images,
          category: "lunch",
          dietaryPreferences,
          videoLink,
          calories,
          sourceUrl,
          prepTime,
          nutrients,
        });
        existingRecipes.add(title);
        assigned = true;
      }

      if (
        mealType.includes("dessert") ||
        mealType.includes("main course") ||
        (mealType.includes("soup") && !assigned)
      ) {
        categories.dinner.push({
          id,
          title,
          ingredients,
          instructions,
          images,
          category: "dinner",
          dietaryPreferences,
          videoLink,
          calories,
          sourceUrl,
          prepTime,
          nutrients,
        });
        existingRecipes.add(title);
        assigned = true;
      }
    }
  }

  const limit = 20;
  const topRecipes = {
    breakfast: categories.breakfast.slice(0, limit),
    lunch: categories.lunch.slice(0, limit),
    dinner: categories.dinner.slice(0, limit),
  };
  return {
    breakfast: topRecipes.breakfast,
    lunch: topRecipes.lunch,
    dinner: topRecipes.dinner,
  };
};
