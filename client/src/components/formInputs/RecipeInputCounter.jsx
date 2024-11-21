import React from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import TextInput from "./TextInput";

const RecipeInputCounter = ({
  decrementCount,
  incrementCount,
  isLoggedIn,
  ingredientCount,
  setIngredientCount,
}) => {
  return (
    <div className="flex items-center gap-4">
      <button onClick={decrementCount} type="button" className="md:hidden">
        <BiSolidLeftArrow className="text-2xl" />
      </button>
      <TextInput
        label={"Specify number of recipes"}
        type={"number"}
        min={0}
        max={30}
        disabled={!isLoggedIn}
        value={ingredientCount}
        onChange={(e) => setIngredientCount(e.target.value)}
        className={`md:w-44 px-3 ${isLoggedIn ? "" : "cursor-not-allowed"}`}
      />
      <button onClick={incrementCount} type="button" className="md:hidden">
        <BiSolidRightArrow className="text-2xl" />
      </button>
    </div>
  );
};

export default RecipeInputCounter;
