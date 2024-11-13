import React from "react";

const MissingIngredientsCard = ({ recipeDetails }) => {
  return (
    <div className="flex flex-col bg-[#0E0F10] gap-1 overflow-y-scroll hide-scrollbar min-w-80 lg:max-w-96 border border-[#1d1d1d] max-h-[200px] rounded-2xl">
      <div className="bg-[#181818] border-b rounded-t-2xl border-b-[#343333]">
        <h2 className="px-6 py-2">Missing Ingredients</h2>
      </div>
      <div className="px-6 overflow-y-scroll hide-scrollbar pt-4  ">
        <ul className="list-disc">
          {recipeDetails?.missingIngredients?.map((item, index) => (
            <li key={index} className="pb-2 flex items-center w-full">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MissingIngredientsCard;
