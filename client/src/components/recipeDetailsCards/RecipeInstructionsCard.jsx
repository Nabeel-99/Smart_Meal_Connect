import React from "react";

const RecipeInstructionsCard = ({ recipeDetails }) => {
  const instructions = Array.isArray(recipeDetails.instructions)
    ? recipeDetails.instructions
    : recipeDetails.instructions
        ?.split("\n")
        .filter((line) => line.trim() !== "") || [];
  return (
    <div className="flex flex-col bg-[#f0f0f0] border-[#e3e3e3] dark:bg-[#0E0F10] overflow-y-scroll hide-scrollbar gap-1 w-full  max-h-[480px] md:w-[600px] md:h-[400px] md:max-h-[400px] lg:w-[500px] lg:h-[400px] xl:w-[700px] xl:max-h-[500px] border order-1 lg:order-none dark:border-[#1d1d1d] rounded-2xl">
      <div className="dark:bg-[#181818] bg-[#e0e0e0] border-b border-b-[#e3e3e3] rounded-t-2xl dark:border-b-[#343333]">
        <h2 className="px-6 py-2 font-semibold">Steps to Prepare</h2>
      </div>
      <div className="px-6 overflow-y-scroll hide-scrollbar pt-4">
        {instructions.length > 0 ? (
          <ul className="list-disc">
            {instructions.map((instruction, index) => (
              <li key={index} className="pb-2">
                {instruction}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No instructions available
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeInstructionsCard;
