import React from "react";

const RecipeIngredientsCard = ({ recipeDetails }) => {
  return (
    <div className="flex flex-col bg-[#0E0F10] overflow-y-scroll hide-scrollbar  gap-1 min-w-80 w-full lg:max-w-96 border border-[#1d1d1d] rounded-2xl">
      <div className="bg-[#181818] border-b rounded-t-2xl border-b-[#343333]">
        <h2 className="px-6 py-2">Ingredients</h2>
      </div>
      <div className="px-6 overflow-y-scroll hide-scrollbar pt-4">
        <ul className="list-disc">
          {recipeDetails.ingredients &&
            recipeDetails.ingredients.map((ingredient, index) => (
              <li key={index} className="pb-2">
                {ingredient}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeIngredientsCard;
