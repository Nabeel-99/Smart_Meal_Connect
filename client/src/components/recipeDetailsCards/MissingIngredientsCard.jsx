import React from "react";

const MissingIngredientsCard = ({ recipeDetails }) => {
  return (
    <div className="flex flex-col bg-[#f0f0f0] border-[#e3e3e3] dark:bg-[#0E0F10] gap-1 overflow-y-scroll hide-scrollbar min-w-80 lg:max-w-96 border dark:border-[#1d1d1d] h-[175px] max-h-[200px] rounded-2xl">
      <div className="bg-[#e0e0e0] dark:bg-[#181818] border-b border-b-[#e3e3e3] rounded-t-2xl dark:border-b-[#343333]">
        <h2 className="px-6 py-2 font-semibold">Missing Ingredients</h2>
      </div>
      <div className="px-6 overflow-y-scroll hide-scrollbar pt-4  ">
        <ul className="list-disc">
          {recipeDetails?.missingIngredients?.map((item, index) => (
            <li
              key={index}
              className="pb-2 text-red-700 font-bold dark:font-normal dark:text-red-500 flex items-center w-full"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MissingIngredientsCard;
