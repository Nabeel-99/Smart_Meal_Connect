import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MealCard from "./MealCard";

const RecipeResults = ({
  cardRef,
  loading,
  fetchedRecipes,
  gridView,
  sourceType,
  totalRecipes,
  currentPage,
  totalPages,
}) => {
  const recipesLength = fetchedRecipes.length;
  return (
    <div
      ref={cardRef}
      className={`flex rounded-xl ${
        recipesLength > 0 ? " border border-[#3b3b3b] " : ""
      } mb-20 p-4 gap-3 items-center mt-24`}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <AiOutlineLoading3Quarters className="spin duration-2000 text-[3rem] animate-bounce" />
          <p className="animate-pulse text-3xl">
            Generating meal recommendations...
          </p>
        </div>
      ) : fetchedRecipes.length > 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center">
          Recipe result: {totalRecipes} recipes
          <MealCard
            meals={[...fetchedRecipes].sort((a, b) => {
              if (sourceType === "metricsBased") {
                return a.calories - b.calories;
              } else if (sourceType === "ingredientsBased") {
                return a.missingIngredientsCount - b.missingIngredientsCount;
              }
            })}
            showInput={false}
            isGridView={gridView}
            showMissingIngredients={true}
            sourceType={sourceType}
          />
          <div>
            Page {currentPage} of {totalPages}
          </div>
        </div>
      ) : (
        <p className=""></p>
      )}
    </div>
  );
};

export default RecipeResults;
