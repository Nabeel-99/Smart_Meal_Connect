import axios from "axios";
import { extractRecipeData } from "./helper.js";

// api links
const spoonacularAPI = "https://api.spoonacular.com/recipes";
const edamamAPI = "https://api.edamam.com/api/recipes/v2?&type=public";
const tastyAPI = "https://tasty.p.rapidapi.com/recipes/list";
//     code: 402,
const spoonacularAPIkeys = [
  process.env.SPOONACULAR_API_KEY1,
  process.env.SPOONACULAR_API_KEY2,
  process.env.SPOONACULAR_API_KEY3,
];
const edamamAPIKeys = [
  { appId: process.env.EDAMAM_APP_ID1, appKey: process.env.EDAMAM_APP_KEY1 },
  { appId: process.env.EDAMAM_APP_ID2, appKey: process.env.EDAMAM_APP_KEY2 },
  { appId: process.env.EDAMAM_APP_ID3, appKey: process.env.EDAMAM_APP_KEY3 },
];

const tastyAPIKeys = [
  process.env.RAPID_APIKEY,
  process.env.RAPID_APIKEY2,
  process.env.RAPID_APIKEY3,
];

export const getSpoonacularRecipes = async (
  mealType = [],
  goal = null,
  dietaryPreferences = []
) => {
  if (!Array.isArray(mealType)) {
    mealType = [mealType];
  }
  const calorieRanges = {
    muscle_gain: {
      minCalories: 300,
      maxCalories: 750,
    },
    weight_loss: {
      minCalories: 200,
      maxCalories: 400,
    },
    maintenance: {
      minCalories: 200,
      maxCalories: 500,
    },
  };
  const { minCalories, maxCalories } = goal ? calorieRanges[goal] : {};
  const dietaryPref =
    dietaryPreferences.length > 0 ? dietaryPreferences[0] : null;
  for (const key of spoonacularAPIkeys) {
    try {
      const response = await axios.get(`${spoonacularAPI}/complexSearch`, {
        params: {
          number: 60,
          addRecipeInformation: true,
          addRecipeInstructions: true,
          addRecipeNutrition: true,
          fillIngredients: true,
          ...(mealType.length > 0 && { type: mealType.join(",") }),
          ...(goal && { minCalories: minCalories }),
          ...(goal && { maxCalories: maxCalories }),
          ...(dietaryPref && { diet: dietaryPref }),
          apiKey: key,
        },
      });

      return response.data.results.map((recipe) => extractRecipeData(recipe));
    } catch (error) {
      if (error.response && error.response.status === 402) {
        console.log(`API key ${key} has reached its limit, trying second one`);
        continue;
      }
      console.log("error fetching from spoonaclular", error);
      throw error;
    }
  }
  throw new Error("All  spoonacular API keys reached their limit.");
};

// spoonacular findByIngredietns
export const findByIngredients = async (ingredients = []) => {
  for (const key of spoonacularAPIkeys) {
    try {
      const response = await axios.get(`${spoonacularAPI}/findByIngredients`, {
        params: {
          ingredients: ingredients.join(","),
          apiKey: key,
          ranking: 2,
          number: 50,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 402) {
        console.log(`API Key ${key} reached its limit. Trying next key...`);
        continue;
      }
      console.log("Error fetching from findByIngredients", error);
      throw error;
    }
  }
  throw new Error("All spoonacular API keys reached their limit.");
};

// spoonacular find by id
export const findById = async (id) => {
  for (const key of spoonacularAPIkeys) {
    try {
      const response = await axios.get(`${spoonacularAPI}/${id}/information`, {
        params: {
          apiKey: key,
          includeNutrition: true,
        },
      });
      return extractRecipeData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 402) {
        console.log(`API Key ${key} reached its limit. Trying next key...`);
        continue;
      }
      console.log("Error fetching by id", error);
      throw error;
    }
  }
  throw new Error("All spoonacular API keys reached their limit.");
};

// spooncaular findRecipesByIngredients
export const findRecipesByIngredients = async (ingredients = []) => {
  try {
    const ingredientRecipes = await findByIngredients(ingredients);
    const recipeIds = ingredientRecipes.map((recipe) => recipe.id);
    const recipeDetails = await Promise.all(
      recipeIds.map((id) => findById(id))
    );

    return recipeDetails;
  } catch (error) {
    console.log("Error fetching detais", error);
    throw error;
  }
};

// edamam recipes
export const getEdamamRecipes = async (
  ingredients = [],
  type = null,
  goal = null,
  dietaryPreferences = []
) => {
  const calorieRanges = {
    muscle_gain: "300-750",
    weight_loss: "200-400",
    maintenance: "200-500",
  };
  const calorieRange = goal ? calorieRanges[goal] : {};
  const query = ingredients.length > 0 ? ingredients.join(",") : "recipe";
  const healthLabel =
    dietaryPreferences.length > 0 ? dietaryPreferences[0] : undefined;

  for (const { appId, appKey } of edamamAPIKeys) {
    try {
      const response = await axios.get(`${edamamAPI}`, {
        params: {
          q: query,
          app_id: appId,
          app_key: appKey,
          from: 0,
          to: 20,
          ...(type && { mealType: type }),
          ...(goal && { calories: calorieRange }),
          ...(healthLabel && { health: healthLabel }),
        },
      });
      return response.data.hits.map((recipe) => extractRecipeData(recipe));
    } catch (error) {
      if (error.response && error.response.status === 402) {
        console.log(
          `Edamam API key (App ID: ${appId}) limit reached. Trying next key...`
        );
        continue;
      }
      console.log("Error fetching from Edamam", error);
      throw error;
    }
  }
  throw new Error("All Edamam API keys reached their limit.");
};

// get tastyAPI recipes
export const getTastyAPIRecipes = async (ingredients = []) => {
  const query = ingredients.length > 0 ? ingredients.join(",") : null;

  for (const key of tastyAPIKeys) {
    try {
      const response = await axios.get(`${tastyAPI}`, {
        params: {
          from: 0,
          size: 20,
          tags: "under_30_minutes",
          q: query,
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "tasty.p.rapidapi.com",
        },
      });
      return response.data.results.map((recipe) => extractRecipeData(recipe));
    } catch (error) {
      if (error.response && error.response.status === 402) {
        console.log(`Tasty API key ${key} limit reached. Trying next key...`);
        continue;
      }
      console.error("Error occurred with Tasty API", error);
      throw error;
    }
  }
  throw new Error("All Tasty API keys reached their limit.");
};
