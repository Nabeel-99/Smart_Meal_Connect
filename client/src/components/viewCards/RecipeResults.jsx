import React, { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MealCard from "./MealCard";
import { SiGreasyfork } from "react-icons/si";

const RecipeResults = ({
  cardRef,
  loading,
  fetchedRecipes = [],
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
      className={`flex items-center justify-center rounded-xl ${
        recipesLength > 0
          ? " border border-[#e0e0e0] dark:border-[#3b3b3b] xl:w-3/4 xl:h-3/4 min-h-3/4 "
          : ""
      } mb-20 p-4 gap-3 items-center  mt-24`}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <SiGreasyfork className="loading-icon duration-2000 text-[3rem] animate-bounce" />
          <p className="animate-pulse text-center xl:text-3xl">
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
            showMissingIngredients={
              sourceType === "metricsBased" ? false : true
            }
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
