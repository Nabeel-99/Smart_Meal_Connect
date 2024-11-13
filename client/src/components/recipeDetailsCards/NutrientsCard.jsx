import React from "react";

const NutrientsCard = ({ recipeDetails }) => {
  return (
    <div className="flex flex-col bg-[#0E0F10] gap-1 overflow-y-scroll hide-scrollbar min-w-80 lg:max-w-96 border border-[#1d1d1d] max-h-[300px] rounded-2xl">
      <div className="bg-[#181818] border-b rounded-t-2xl border-b-[#343333]">
        <h2 className="px-6 py-2">Nutritional Information</h2>
      </div>
      <div className="px-6 overflow-y-scroll hide-scrollbar pt-4  ">
        <ul className="list-disc">
          {(Array.isArray(recipeDetails?.nutrients)
            ? recipeDetails.nutrients
            : Object.entries(recipeDetails?.nutrients || {})
          ).map((nutrient, index) => (
            <li key={index} className="pb-2 flex items-center w-full">
              {Array.isArray(recipeDetails?.nutrients) ? (
                <>
                  <span className="w-52">{nutrient.name}:</span>
                  <span>
                    {nutrient.amount.toFixed(0)}
                    <span className="pl-1">{nutrient.unit}</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="w-32">{nutrient[0]}:</span>
                  <span>{nutrient[1]}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutrientsCard;
