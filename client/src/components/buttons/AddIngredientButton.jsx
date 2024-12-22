import React from "react";

const AddIngredientButton = ({ addIngredient }) => {
  return (
    <button
      onClick={addIngredient}
      type="button"
      className="dark:bg-[#D9D9D9] bg-[#08090a] text-white dark:text-black  px-6 h-10 rounded-xl "
    >
      Add
    </button>
  );
};

export default AddIngredientButton;
