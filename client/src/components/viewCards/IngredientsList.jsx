import React from "react";
import { FaXmark } from "react-icons/fa6";

const IngredientsList = ({ removeIngredient, ingredient, className }) => {
  return (
    <div
      className={`${
        className
          ? className
          : "dark:bg-[#2d2d2d] bg-[#c4c4c4] border-[#dadada] border dark:border-[#444544] dark:text-white"
      }  px-3 py-2 rounded-xl  flex items-center w-full justify-between`}
    >
      <p className="pr-4">{ingredient}</p>
      <button
        type="button"
        onClick={() => removeIngredient(ingredient)}
        className="border border-[#7a7a7a] bg-[#535252] rounded-full p-1 hover:text-white hover:bg-[#34343d]"
      >
        <FaXmark className="text-gray-400 hover:text-white " />
      </button>
    </div>
  );
};

export default IngredientsList;
