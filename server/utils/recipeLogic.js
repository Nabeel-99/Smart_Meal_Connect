import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
// api links
const spoonacularAPI = "https://api.spoonacular.com/recipes/complexSearch";
const edamamAPI = "https://api.edamam.com/api/recipes/v2?&type=public";
// common ingredients / condiments
const commonIngredients = ["salt", "pepper", "spices", "water", "oil"];

// BMR Mifflin formulas
export const calculateBMR = (gender, weight, height, age) => {
  let BMR;
  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return BMR;
};

// TDEE(Total Daily Energy Expenditure)
export const calculateTDEE = (BMR, exerciseLevel) => {
  const activityFactor = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };
  return BMR * activityFactor[exerciseLevel];
};

// total calorie recommendation for user
export const getCalorieIntake = (goal, tdee) => {
  switch (goal) {
    case "maintenance":
      return tdee;
    case "muscle_gain":
      return tdee + 500;
    case "weight_loss":
      return tdee - 500;
    default:
      throw new Error("Invalid goal");
  }
};

// spoonacular recipes
const getSpoonacularRecipes = async (
  mealType = null,
  goal = null,
  dietaryPreferences = []
) => {
  const calorieRanges = {
    muscle_gain: {
      minCalories: 200,
      maxCalories: 750,
    },
    weight_loss: {
      minCalories: 200,
      maxCalories: 500,
    },
    maintenance: {
      minCalories: 200,
      maxCalories: 600,
    },
  };
  const { minCalories, maxCalories } = goal ? calorieRanges[goal] : {};
  const dietaryPref =
    dietaryPreferences.length > 0 ? dietaryPreferences[0] : null;

  try {
    const response = await axios.get(`${spoonacularAPI}`, {
      params: {
        number: 15,
        addRecipeInformation: true,
        addRecipeInstructions: true,
        fillIngredients: true,
        ...(mealType && { type: mealType }),
        ...(goal && { minCalories: minCalories }),
        ...(goal && { maxCalories: maxCalories }),
        ...(dietaryPref && { diet: dietaryPref }),
        apiKey: process.env.SPOONACULAR_API_KEY4,
      },
    });

    return response.data.results;
  } catch (error) {
    console.log("error fetching from spoonaclular", error);
    throw error;
  }
};
// edamam recipes
const getEdamamRecipes = async (
  ingredients = [],
  mealType = null,
  goal = null,
  dietaryPreferences = []
) => {
  try {
    const calorieRanges = {
      muscle_gain: "200-750",
      weight_loss: "200-500",
      maintenance: "200-600",
    };
    const calorieRange = calorieRanges[goal] || null;
    const query = ingredients.length > 0 ? ingredients.join(",") : "recipe";

    const healthLabel =
      dietaryPreferences.length > 0 ? dietaryPreferences[0] : undefined;
    const response = await axios.get(`${edamamAPI}`, {
      params: {
        q: query,
        app_id: process.env.EDAMAM_APP_ID_QUERY,
        app_key: process.env.EDAMAM_APP_KEY_RECIPE_ID,
        from: 0,
        to: 15,
        ...(mealType && { type: mealType }),
        ...(calorieRange && { calories: calorieRange }),
        ...(healthLabel && { health: healthLabel }),
      },
    });
    return response.data.hits;
  } catch (error) {
    console.log("error fetching from edamam", error);
    throw error;
  }
};

// fetch dashboard specific recipes
export const fetchDashboardRecipes = async (goal, dietaryPreferences) => {
  try {
    const randomCalories = goal || null;
    // fetching recipes
    const [spoonacularBreakfast, spoonacularLunch, spoonacularDinner] =
      await Promise.all([
        getSpoonacularRecipes("breakfast", randomCalories, dietaryPreferences),
        getSpoonacularRecipes("lunch", randomCalories, dietaryPreferences),
        getSpoonacularRecipes("dinner", randomCalories, dietaryPreferences),
      ]);

    const breakfastRecipes = [...spoonacularBreakfast];
    const lunchRecipes = [...spoonacularLunch];
    const dinnerRecipes = [...spoonacularDinner];

    const allRecipes = [...breakfastRecipes, ...lunchRecipes, ...dinnerRecipes];
    return allRecipes;
  } catch (error) {
    console.log("Error fetching Recipes from APIS", error);
    throw error;
  }
};

// fetch API combinaton recipes
export const fetchAPIRecipes = async (goal, dietaryPreferences) => {
  try {
    // fetching recipes
    const [
      spoonacularBreakfast,
      edamamBreakfast,
      spoonacularLunch,
      edamamLunch,
      spoonacularDinner,
      edamamDinner,
    ] = await Promise.all([
      getSpoonacularRecipes("breakfast", goal, dietaryPreferences),
      getEdamamRecipes([], "breakfast", goal, dietaryPreferences),
      getSpoonacularRecipes("lunch", goal, dietaryPreferences),
      getEdamamRecipes([], "lunch", goal, dietaryPreferences),
      getSpoonacularRecipes("dinner", goal, dietaryPreferences),
      getEdamamRecipes([], "dinner", goal, dietaryPreferences),
    ]);

    const breakfastRecipes = [...spoonacularBreakfast, ...edamamBreakfast];
    const lunchRecipes = [...spoonacularLunch, ...edamamLunch];
    const dinnerRecipes = [...spoonacularDinner, ...edamamDinner];

    const allRecipes = [...breakfastRecipes, ...lunchRecipes, ...dinnerRecipes];
    return allRecipes;
  } catch (error) {
    console.log("Error fetching Recipes from APIS", error);
    throw error;
  }
};

const generateInstructionsForEdamam = async (title, ingredients) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `title: ${title}
  ingredients: ${ingredients}
  generate purely instructions using only the provided ingredients and title, with numbered steps, without headers or extra commentary.
  `;

  const result = await model.generateContent(prompt);
  return [result.response.text()];
};

// filter and rank recipes
export const categorizeRecipes = async (recipes) => {
  const categories = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  for (const recipe of recipes) {
    let calories,
      title,
      ingredients,
      instructions,
      mealType = [],
      dietaryPreferences = [],
      videoLink,
      sourceUrl,
      image;

    const isSpoonacular = recipe.spoonacularSourceUrl;
    const isEdamam = recipe.shareAs;

    if (isSpoonacular) {
      calories = recipe.nutrition?.nutrients.find(
        (nutrient) => nutrient.name === "Calories"
      )?.amount;
      title = recipe.title;
      ingredients = recipe.extendedIngredients
        ? recipe.extendedIngredients.map((ingredient) => ingredient.name)
        : [];
      instructions =
        recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
          ? recipe.analyzedInstructions.flatMap((instruction) =>
              instruction.steps.map((step) => step.step)
            )
          : [];
      mealType = recipe.dishTypes;
      dietaryPreferences = [
        recipe.vegetarian ? "Vegetarian" : "",
        recipe.vegan ? "Vegan" : "",
        recipe.glutenFree ? "Gluten-Free" : "",
        recipe.dairyFree ? "Dairy-Free" : "",
      ].filter(Boolean);
      sourceUrl = recipe.spoonacularSourceUrl;
      image = recipe.image;
      videoLink = "will come back to this";
    } else if (isEdamam) {
      calories = recipe.calories;
      title = recipe.label;
      ingredients = recipe.ingredients
        ? recipe.ingredients.map((ingredient) => ingredient.food)
        : [];
      instructions = await generateInstructionsForEdamam(title, ingredients);
      mealType = recipe.mealType || [];
      dietaryPreferences = recipe.healthLabels || [];
      image = recipe.image;
      sourceUrl = recipe.shareAs;
      videoLink = "will come back to this";
    }

    // Handle category assignment based on mealType
    let category = [];
    if (Array.isArray(mealType)) {
      if (
        mealType.includes("morning meal") ||
        mealType.includes("morning meals")
      ) {
        category.push("breakfast");
      }
      if (mealType.includes("lunch") || mealType.includes("lunch/dinner")) {
        category.push("lunch");
      }
      if (mealType.includes("dinner") || mealType.includes("lunch/dinner")) {
        category.push("dinner");
      }
    }

    // Ensure category array exists
    category.forEach((cat) => {
      if (!categories[cat]) {
        categories[cat] = [];
      }
      categories[cat].push({
        title,
        ingredients,
        instructions,
        image,
        category: cat,
        dietaryPreferences,
        videoLink,
        calories,
        sourceUrl,
      });
    });
  }

  const limit = 12;

  // Limit results by ingredient if needed
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

export const fetchBasedOnIngredients = async (
  userIngredients,
  dietaryPreferences
) => {
  try {
    const recipes = await getEdamamRecipes(
      userIngredients,
      null,
      null,
      dietaryPreferences
    );
    return recipes;
  } catch (error) {
    console.log("error fetching recipes from edamam", error);
    throw error;
  }
};

export const fetchBasedOnMetrics = async (goal, dietaryPreferences) => {
  try {
    const [spoonacularRecipes, edamamRecipes] = await Promise.all([
      getSpoonacularRecipes(null, goal, dietaryPreferences),
      getEdamamRecipes([], null, goal, dietaryPreferences),
    ]);

    const allRecipes = [...spoonacularRecipes, ...edamamRecipes];
    return allRecipes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const rankRecipes = async (recipes) => {
  const meals = [];
  for (const recipe of recipes) {
    let calories,
      title,
      ingredients,
      instructions,
      mealType = [],
      dietaryPreferences,
      videoLink,
      sourceUrl,
      image;

    const isSpoonacular = recipe.spoonacularSourceUrl;
    const isEdamam = recipe.shareAs;

    if (isSpoonacular) {
      calories = recipe.nutrition?.nutrients.find(
        (nutrient) => nutrient.name === "Calories"
      )?.amount;
      title = recipe.title;
      ingredients = recipe.extendedIngredients
        ? recipe.extendedIngredients.map((ingredient) => ingredient.name)
        : [];
      instructions =
        recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
          ? recipe.analyzedInstructions.flatMap((instruction) =>
              instruction.steps.map((step) => step.step)
            )
          : [];
      if (instructions.length === 0) return;
      mealType = recipe.dishTypes;
      dietaryPreferences = [
        recipe.vegetarian ? "Vegetarian" : "",
        recipe.vegan ? "Vegan" : "",
        recipe.glutenFree ? "Gluten-Free" : "",
        recipe.dairyFree ? "Dairy-Free" : "",
      ].filter(Boolean);
      sourceUrl = recipe.spoonacularSourceUrl;
      image = recipe.image;
      videoLink = "will come back to this";
    } else if (isEdamam) {
      calories = recipe.calories;
      title = recipe.label;
      ingredients = recipe.ingredients
        ? recipe.ingredients.map((ingredient) => ingredient.food)
        : [];
      instructions = await generateInstructionsForEdamam(title, ingredients);
      mealType = recipe.mealType || [];
      dietaryPreferences = recipe.healthLabels;
      image = recipe.image;
      sourceUrl = recipe.shareAs;
      videoLink = "will come back to this";
    }

    meals.push({
      title,
      ingredients,
      instructions,
      mealType,
      dietaryPreferences,
      calories,
      image,
      sourceUrl,
      videoLink,
    });
  }
  const limit = 9;

  const topRecipes = {
    meals: meals.slice(0, limit),
  };

  return topRecipes;
};
export const getBestMatchingRecipe = async (recipes, userIngredients) => {
  const meals = [];
  for (const recipe of recipes) {
    let calories,
      title,
      ingredients = [],
      instructions,
      mealType = [],
      dietaryPreferences,
      videoLink,
      sourceUrl,
      image;

    const isEdamam = recipe.shareAs;
    if (isEdamam) {
      calories = recipe.calories / recipe.yield;
      title = recipe.label;
      ingredients = recipe.ingredients
        ? recipe.ingredients.map((ingredient) => ingredient.food)
        : [];
      instructions = await generateInstructionsForEdamam(title, ingredients);
      mealType = recipe.mealType || [];
      dietaryPreferences = recipe.healthLabels;
      image = recipe.image;
      sourceUrl = recipe.shareAs;
      videoLink = "will come back to this";
    }
    const filteredIngredients = ingredients.filter(
      (ingredient) => !commonIngredients.includes(ingredient)
    );
    const missingIngredients = filteredIngredients.filter(
      (ingredient) => !userIngredients.includes(ingredient)
    );
    if (missingIngredients.length <= 2) {
      meals.push({
        title,
        calories,
        ingredients,
        instructions,
        mealType,
        dietaryPreferences,
        videoLink,
        sourceUrl,
        image,
      });
    }
  }

  return meals;
};

// const testFunc = async () => {
//   try {
//     const testInput = {
//       goal: "weight_loss", // Example user ingredients
//       dietaryPreferences: ["vegan"], // Example dietary preference (optional)
//     };

//     const recipes = await fetchBasedOnMetrics(
//       testInput.goal,
//       testInput.dietaryPreferences
//     );
//     const top9 = await rankRecipes(recipes);
//     console.log("recipes", top9);
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

// testFunc();

const limitResultsByMainIngredient = (
  recipes,
  num = 12,
  maxPerIngredient = 3
) => {
  const mainIngredientMap = {};
  const getMainIngredient = (ingredients) => {
    const commonIngredients = ["rice", "chicken", "pasta", "potato"];
    for (let ingredient of ingredients) {
      for (let common of commonIngredients) {
        if (ingredient.toLowerCase().includes(common)) {
          return common;
        }
      }
    }
    return "other";
  };

  const uniqueRecipes = [];
  recipes.forEach((recipe) => {
    const mainIngredient = getMainIngredient(recipe.ingredients);
    if (!mainIngredientMap[mainIngredient]) {
      mainIngredientMap[mainIngredient] = [];
    }
    if (mainIngredientMap[mainIngredient].length < maxPerIngredient) {
      mainIngredientMap[mainIngredient].push(recipe);
      uniqueRecipes.push(recipe);
    }
  });

  return uniqueRecipes.slice(0, num);
};

// spoonacular
// spoonacular
// const getSpoonacularRecipes = async (
//   mealTypes,
//   goal,
//   dietaryPreferences = []
// ) => {
//   const calorieRanges = {
//     muscle_gain: {
//       minCalories: 500,
//       maxCalories: 700,
//     },
//     weight_loss: {
//       minCalories: 300,
//       maxCalories: 500,
//     },
//     maintenance: {
//       minCalories: 500,
//       maxCalories: 600,
//     },
//   };
//   const { minCalories, maxCalories } = calorieRanges[goal];
//   const dietaryPref =
//     dietaryPreferences.length > 0 ? dietaryPreferences[0] : null;

//   try {
//     let allRecipes = [];
//     for (const mealType of mealTypes) {
//       const response = await axios.get(`${spoonacularAPI}`, {
//         params: {
//           number: 20,
//           type: mealType,
//           addRecipeInformation: true,
//           addRecipeInstructions: true,
//           fillIngredients: true,
//           minCalories: minCalories,
//           maxCalories: maxCalories,
//           ...(dietaryPref ? { diet: dietaryPref } : {}),
//           apiKey: process.env.SPOONACULAR_API_KEY4,
//         },
//       });

//       allRecipes = [...allRecipes, ...response.data.results];
//     }

//     return allRecipes;
//   } catch (error) {
//     console.log("Error fetching from spoonacular", error);
//     throw error;
//   }
// };

// edamama
// const getEdamamRecipes = async (mealType, goal, dietaryPreferences = []) => {
//   try {
//     const calorieRanges = {
//       muscle_gain: "500-700",
//       weight_loss: "300-500",
//       maintenance: "500-600",
//     };
//     const calorieRange = calorieRanges[goal];
//     const healthLabel =
//       dietaryPreferences.length > 0 ? dietaryPreferences[0] : undefined;
//     const response = await axios.get(`${edamamAPI}`, {
//       params: {
//         app_id: process.env.EDAMAM_APP_ID_QUERY,
//         app_key: process.env.EDAMAM_APP_KEY_RECIPE_ID,
//         from: 0,
//         to: 15,
//         mealType: mealType,
//         ...(healthLabel && { health: healthLabel }),
//         calories: calorieRange,
//       },
//     });
//     return response.data.hits;
//   } catch (error) {
//     console.log("error fetching from edamam", error);
//     throw error;
//   }
// };

// export const fetchDashboardRecipes = async (goal, dietaryPreferences) => {
//   try {
//     const mealTypes = ["breakfast", "brunch", "morning meal"];
//     // fetching recipes
//     const [spoonacularBreakfast, spoonacularLunch, spoonacularDinner] =
//       await Promise.all([
//         getSpoonacularRecipes(mealTypes, goal, dietaryPreferences),
//         getSpoonacularRecipes("lunch", goal, dietaryPreferences),
//         getSpoonacularRecipes("dinner", goal, dietaryPreferences),
//       ]);

//     const breakfastRecipes = [...spoonacularBreakfast];
//     const lunchRecipes = [...spoonacularLunch];
//     const dinnerRecipes = [...spoonacularDinner];

//     const allRecipes = [...breakfastRecipes, ...lunchRecipes, ...dinnerRecipes];
//     return allRecipes;
//   } catch (error) {
//     console.log("Error fetching Recipes from APIS", error);
//     throw error;
//   }
// };

// filter and rank recipes
// export const filterAndRankRecipes = (recipes) => {
//   const categories = {
//     breakfast: [],
//     lunch: [],
//     dinner: [],
//   };

//   recipes.forEach((recipe) => {
//     let calories,
//       title,
//       ingredients,
//       instructions,
//       mealType = [],
//       dietaryPreferences,
//       videoLink,
//       sourceUrl,
//       image;

//     const isSpoonacular = recipe.spoonacularSourceUrl;
//     const isEdamam = recipe.shareAs;

//     if (isSpoonacular) {
//       calories = recipe.nutrition?.nutrients.find(
//         (nutrient) => nutrient.name === "Calories"
//       )?.amount;
//       title = recipe.title;
//       ingredients = recipe.extendedIngredients
//         ? recipe.extendedIngredients.map((ingredient) => ingredient.name)
//         : [];
//       instructions =
//         recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
//           ? recipe.analyzedInstructions.flatMap((instruction) =>
//               instruction.steps.map((step) => step.step)
//             )
//           : [];
//       if (instructions.length === 0) return;
//       mealType = recipe.dishTypes;
//       dietaryPreferences = [
//         recipe.vegetarian ? "Vegetarian" : "",
//         recipe.vegan ? "Vegan" : "",
//         recipe.glutenFree ? "Gluten-Free" : "",
//         recipe.dairyFree ? "Dairy-Free" : "",
//       ].filter(Boolean);
//       sourceUrl = recipe.spoonacularSourceUrl;
//       image = recipe.image;
//       videoLink = "will come back to this";
//     } else if (isEdamam) {
//       calories = recipe.calories / recipe.yield;
//       title = recipe.label;
//       ingredients = recipe.ingredients
//         ? recipe.ingredients.map((ingredient) => ingredient.food)
//         : [];
//       instructions = ["no instructions for edamam"];
//       mealType = recipe.mealType || [];
//       dietaryPreferences = recipe.healthLabels;
//       image = recipe.image;
//       sourceUrl = recipe.shareAs;
//       videoLink = "will come back to this";
//     }

//     // Handle category assignment based on mealType
//     let category = [];
//     if (Array.isArray(mealType)) {
//       if (
//         mealType.includes("breakfast") ||
//         mealType.includes("brunch") ||
//         mealType.includes("morning meal")
//       ) {
//         category.push("breakfast");
//       }
//       if (mealType.includes("lunch") || mealType.includes("lunch/dinner")) {
//         category.push("lunch");
//       }
//       if (mealType.includes("dinner") || mealType.includes("lunch/dinner")) {
//         category.push("dinner");
//       }
//     }

//     // Ensure category array exists and prevent duplicates
//     category.forEach((cat) => {
//       if (!categories[cat]) {
//         categories[cat] = [];
//       }
//       if (
//         !categories[cat].some(
//           (existingRecipe) => existingRecipe.title === title
//         )
//       ) {
//         categories[cat].push({
//           title,
//           ingredients,
//           instructions,
//           image,
//           category: cat,
//           dietaryPreferences,
//           videoLink,
//           calories,
//           sourceUrl,
//         });
//       }
//     });
//   });

//   const limit = 12;
//   const topRecipes = {
//     breakfast: categories.breakfast.slice(0, limit),
//     lunch: categories.lunch.slice(0, limit),
//     dinner: categories.dinner.slice(0, limit),
//   };

//   return {
//     breakfast: topRecipes.breakfast,
//     lunch: topRecipes.lunch,
//     dinner: topRecipes.dinner,
//   };
// };
