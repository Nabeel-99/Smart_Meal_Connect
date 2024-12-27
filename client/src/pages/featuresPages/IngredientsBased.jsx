import React, { useEffect, useRef, useState } from "react";
import IngredientsForm from "../../components/forms/IngredientsForm";
import IngredientsBasedToggle from "../../components/formInputs/IngredientsBasedToggle";
import IngredientsHeader from "../../components/headers/IngredientsHeader";
import GetStartedSection from "../../components/ui/GetStartedSection";
import RecipeResultsContainer from "../../components/recipeDetailsCards/RecipeResultsContainer";
import usePagination from "../../components/hooks/usePagination";
import useIngredients from "../../components/hooks/useIngredients";
import useFetchRecipes from "../../components/hooks/useFetchRecipes";

const IngredientsBased = ({ userData, theme }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("ingredientsCurrentPage")) || 1
  );
  const cardRef = useRef(null);
  let gridView = true;

  const {
    ingredients,
    setItem,
    selectedDietaryPreferences,
    addIngredient,
    removeIngredient,
    handleCheckboxChange,
    setIngredients,
  } = useIngredients();

  const {
    loading,
    error,
    resultError,
    fetchRecipes,
    setFetchedRecipes,
    setTotalRecipes,
    fetchedRecipes,
    totalRecipes,
  } = useFetchRecipes(
    ingredients,
    selectedDietaryPreferences,
    isConnected,
    isLoggedIn,
    setCurrentPage
  );

  const { paginatedRecipes, handleNextPage, handlePreviousPage, totalPages } =
    usePagination(
      "ingredientsCurrentPage",
      "ingredientsBased",
      currentPage,
      setCurrentPage,
      setFetchedRecipes,
      fetchedRecipes,
      setTotalRecipes,
      ingredients,
      setIngredients
    );

  const handleToggle = () => {
    setIsConnected(!isConnected);
  };

  useEffect(() => {
    const savedToggleState = sessionStorage.getItem("isConnected");
    if (savedToggleState) {
      setIsConnected(JSON.parse(savedToggleState));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

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
              fetchRecipes={fetchRecipes}
              setAutocompleteValue={setAutocompleteValue}
              setItem={setItem}
              autocompleteValue={autocompleteValue}
              addIngredient={addIngredient}
              ingredients={ingredients}
              removeIngredient={removeIngredient}
              handleCheckboxChange={handleCheckboxChange}
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
