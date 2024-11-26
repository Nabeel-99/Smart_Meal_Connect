import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import IngredientsForm from "../../components/forms/IngredientsForm";
import IngredientsBasedToggle from "../../components/formInputs/IngredientsBasedToggle";
import IngredientsHeader from "../../components/headers/IngredientsHeader";
import RecipeResults from "../../components/viewCards/RecipeResults";
import GetStartedSection from "../../components/ui/GetStartedSection";
import ShowMoreButton from "../../components/buttons/ShowMoreButton";
import BASE_URL, { axiosInstance } from "../../../apiConfig";
import { FaAngleLeft, FaAngleRight, FaCaretLeft } from "react-icons/fa6";
import RecipeResultsContainer from "../../components/recipeDetailsCards/RecipeResultsContainer";

const IngredientsBased = ({ userData, theme }) => {
  const [item, setItem] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [resultError, setResultError] = useState("");
  const [error, setError] = useState("");
  const [tryCount, setTryCount] = useState(
    () => parseInt(localStorage.getItem("tryCountIngredients")) || 0
  );
  const [totalRecipes, setTotalRecipes] = useState();
  const cardRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const totalPages = Math.ceil(fetchedRecipes.length / recipesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      if (window.matchMedia("(max-width: 768px)").matches) {
        cardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      if (window.matchMedia("(max-width: 768px)").matches) {
        cardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const paginatedRecipes = fetchedRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );
  let gridView = true;
  const TRY_LIMIT = 1;
  const handleToggle = () => {
    setIsConnected(!isConnected);
  };
  const addIngredient = () => {
    if (item && !ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
      setItem("");
    }
  };
  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleChecboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDietaryPreferences((prev) =>
      checked ? [...prev, id] : prev.filter((pref) => pref !== id)
    );
  };

  const onSubmit = async (e) => {
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
      console.log("response,", response.data);

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

  useEffect(() => {
    const savedToggleState = sessionStorage.getItem("isConnected");
    if (savedToggleState) {
      setIsConnected(JSON.parse(savedToggleState));
    }
  }, []);
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  useEffect(() => {
    const storedRecipes = sessionStorage.getItem("ingredientsBased");
    const storedIngredientInput = sessionStorage.getItem("ingredientsInput");

    if (storedRecipes && fetchedRecipes.length === 0) {
      const parsedRecipes = JSON.parse(storedRecipes);
      setFetchedRecipes(parsedRecipes);
      setTotalRecipes(parsedRecipes.length);
    }

    if (storedIngredientInput && ingredients.length === 0) {
      const ingredientsInput = JSON.parse(storedIngredientInput);
      setIngredients(ingredientsInput);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto overflow-x-hidden flex flex-col gap- pt-16 justify-center items-center">
        <IngredientsHeader />
        <div className="flex flex-col gap-6 items-center   w-full px-2 ">
          <IngredientsBasedToggle
            isConnected={isConnected}
            isLoggedIn={isLoggedIn}
            handleToggle={handleToggle}
          />
          <div className=" flex items-center justify-center  dark:border-[#1d1d1d]   h-full  ">
            <IngredientsForm
              theme={theme}
              onSubmit={onSubmit}
              setAutocompleteValue={setAutocompleteValue}
              setItem={setItem}
              autocompleteValue={autocompleteValue}
              addIngredient={addIngredient}
              ingredients={ingredients}
              removeIngredient={removeIngredient}
              handleChecboxChange={handleChecboxChange}
              loading={loading}
              error={error}
              selectedDietaryPreferences={selectedDietaryPreferences}
            />
          </div>
          {/* showing results */}
          <RecipeResultsContainer
            fetchedRecipes={fetchedRecipes}
            resultError={resultError}
            handlePreviousPage={handlePreviousPage}
            currentPage={currentPage}
            cardRef={cardRef}
            loading={loading}
            paginatedRecipes={paginatedRecipes}
            gridView={gridView}
            sourceType={"ingredientsBased"}
            totalRecipes={totalRecipes}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
          />
        </div>
      </div>
      {!isLoggedIn && <GetStartedSection />}
    </>
  );
};

export default IngredientsBased;
