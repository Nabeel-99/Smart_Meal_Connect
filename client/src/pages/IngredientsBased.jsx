import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import IngredientsForm from "../components/forms/IngredientsForm";
import IngredientsBasedToggle from "../components/formInputs/IngredientsBasedToggle";
import IngredientsHeader from "../components/headers/IngredientsHeader";
import RecipeResults from "../components/viewCards/RecipeResults";
import GetStartedSection from "../components/GetStartedSection";
import ShowMoreButton from "../components/buttons/ShowMoreButton";

const IngredientsBased = ({ userData }) => {
  const [item, setItem] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [showMore, setShowMore] = useState(6);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");
  const [tryCount, setTryCount] = useState(
    () => parseInt(localStorage.getItem("tryCountIngredients")) || 0
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const cardRef = useRef(null);
  let gridView = true;
  const TRY_LIMIT = 1;

  const loadMore = () => {
    setShowMore((prev) => prev + 6);
  };
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
      setError("Please create an account to continue using this feature.");
      setTimeout(() => {
        setError("");
      }, 10000);
      return;
    }
    setLoading(true);
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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/recipes/get-ingredients-recipes",
        {
          ingredients: ingredients,
          dietaryPreferences: selectedDietaryPreferences,
          isConnected: isConnected,
        },
        { withCredentials: true }
      );
      console.log("response,", response.data);
      if (response.status === 200) {
        const recipes = response.data.recipes;
        const validRecipes = recipes.filter(
          (recipe) =>
            recipe &&
            Array.isArray(recipe.userUsedIngredients) &&
            recipe.userUsedIngredients.length > 0
        );

        sessionStorage.setItem(
          "ingredientsBased",
          JSON.stringify(validRecipes)
        );
        setIngredients([]);
        setItem([]);
        localStorage.setItem("tryCountIngredients", tryCount + 1);
        setTryCount((prevCount) => prevCount + 1);
        setFetchedRecipes(validRecipes);
        cardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error(error);
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
    if (storedRecipes) {
      setFetchedRecipes(JSON.parse(storedRecipes));
    }
  }, []);
  return (
    <div className="overflow-hidden flex flex-col gap-8 pt-16 justify-center items-center">
      <IngredientsHeader />
      <div className="flex flex-col gap-6 items-center   w-full px-2 lg:px-44">
        <IngredientsBasedToggle
          isConnected={isConnected}
          isLoggedIn={isLoggedIn}
          handleToggle={handleToggle}
        />
        <div className=" border border-[#1d1d1d] w-96  md:w-2/3 rounded-xl py-2 px-2 bg-[#0E0F10] min-h-[700px] h-full  ">
          <IngredientsForm
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
        <div className="relative ">
          <RecipeResults
            cardRef={cardRef}
            loading={loading}
            fetchedRecipes={fetchedRecipes.slice(0, showMore)}
            gridView={gridView}
            sourceType={"ingredientsBased"}
          />
        </div>
        <ShowMoreButton
          loadMore={loadMore}
          loading={loading}
          fetchedRecipes={fetchedRecipes}
          showMore={showMore}
        />
      </div>
      {!isLoggedIn && <GetStartedSection />}
    </div>
  );
};

export default IngredientsBased;
