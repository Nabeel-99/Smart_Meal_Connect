import React from "react";

const RecipeInstructionsCard = ({ recipeDetails }) => {
  return (
    <div className="flex flex-col bg-[#0E0F10] overflow-y-scroll hide-scrollbar gap-1 w-full h-[380px] md:w-[600px] md:h-[400px] lg:w-[500px] lg:h-[400px] xl:w-[700px] xl:h-[500px] border order-1 lg:order-none border-[#1d1d1d] rounded-2xl">
      <div className="bg-[#181818] border-b rounded-t-2xl border-b-[#343333]">
        <h2 className="px-6 py-2">Steps to Prepare</h2>
      </div>
      <div className="px-6 overflow-y-scroll hide-scrollbar pt-4">
        <ul className="list-disc">
          {recipeDetails.instructions &&
            recipeDetails.instructions.map((instruction, index) => (
              <li key={index} className="pb-2">
                {instruction}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeInstructionsCard;
