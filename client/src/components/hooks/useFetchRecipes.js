import { useState } from "react";
import { axiosInstance } from "../../../apiConfig";

const useFetchRecipes = (
  ingredients,
  selectedDietaryPreferences,
  isConnected,
  isLoggedIn
) => {
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [error, setError] = useState("");
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultError, setResultError] = useState("");
  const [tryCount, setTryCount] = useState(
    () => parseInt(localStorage.getItem("tryCountIngredients")) || 0
  );
  const TRY_LIMIT = 1;
  const fetchRecipes = async (e) => {
    e.preventDefault();

    if (!isLoggedIn && tryCount >= TRY_LIMIT) {
      setError(
        "Please create an account or login to continue using this feature."
      );
      setTimeout(() => {
        setError("");
      }, 10000);
      return;
    }
    setLoading(true);
    if (loading) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
    sessionStorage.removeItem("ingredientsBased");
    setFetchedRecipes([]);
    sessionStorage.setItem("isToggled", JSON.stringify(isConnected));
    if (ingredients.length <= 0) {
      setError("Ingredients are required");
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false);
      return;
    }
    sessionStorage.setItem("ingredientsInput", JSON.stringify(ingredients));
    try {
      const response = await axiosInstance.post(
        `/api/recipes/get-ingredients-recipes`,
        {
          ingredients: ingredients,
          dietaryPreferences: selectedDietaryPreferences,
          isConnected: isConnected,
        }
      );

      if (response.status === 200) {
        const recipes = response.data.recipes;
        const validRecipes = recipes.filter(
          (recipe) =>
            recipe &&
            Array.isArray(recipe.ingredients) &&
            recipe.ingredients.length > 0
        );

        sessionStorage.setItem(
          "ingredientsBased",
          JSON.stringify(validRecipes)
        );

        // setIngredients([]);
        // setItem([]);
        if (!isLoggedIn) {
          localStorage.setItem("tryCountIngredients", tryCount + 1);
          setTryCount((prevCount) => prevCount + 1);
        }

        setFetchedRecipes(validRecipes);
        setTotalRecipes(validRecipes.length);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 429) {
        setResultError(
          "Oops! It looks like we’re getting a lot of requests right now. Please try again in a few moments."
        );
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    resultError,
    setTotalRecipes,
    fetchRecipes,
    totalRecipes,
    fetchedRecipes,
    setFetchedRecipes,
    error,
  };
};

export default useFetchRecipes;
