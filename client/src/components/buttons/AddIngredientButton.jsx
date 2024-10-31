import React from "react";

const AddIngredientButton = ({ addIngredient }) => {
  return (
    <button
      onClick={addIngredient}
      type="button"
      className="bg-[#D9D9D9]  px-6 h-10 rounded-xl text-black"
    >
      Add
    </button>
  );
};

export default AddIngredientButton;
