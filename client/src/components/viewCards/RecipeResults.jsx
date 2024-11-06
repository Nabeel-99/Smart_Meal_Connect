import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MealCard from "./MealCard";

const RecipeResults = ({
  cardRef,
  loading,
  fetchedRecipes,
  gridView,
  sourceType,
}) => {
  return (
    <div ref={cardRef} className="flex flex-col gap-3 items-center mt-24">
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <AiOutlineLoading3Quarters className="spin duration-2000 text-[3rem] animate-bounce" />
          <p className="animate-pulse text-3xl">
            Generating meal recommendations...
          </p>
        </div>
      ) : fetchedRecipes.length > 0 ? (
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
      ) : (
        <p className=""></p>
      )}
    </div>
  );
};

export default RecipeResults;
