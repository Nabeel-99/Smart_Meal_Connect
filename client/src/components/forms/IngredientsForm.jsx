import React from "react";
import AutoCompleteComponent from "../formInputs/AutoCompleteComponent";
import { dietPreferences } from "../../../../server/utils/helper";
import AddIngredientButton from "../buttons/AddIngredientButton";
import DietaryPreferences from "../DietaryPreferences";
import SubmitButton from "../buttons/SubmitButton";
import { FaXmark } from "react-icons/fa6";
import IngredientsList from "../viewCards/IngredientsList";
import ErrorText from "../ErrorText";

const IngredientsForm = ({
  onSubmit,
  setAutocompleteValue,
  setItem,
  autocompleteValue,
  addIngredient,
  error,
  ingredients,
  removeIngredient,
  handleChecboxChange,
  loading,
  selectedDietaryPreferences,
  theme,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8 p-8 items-center justify-center "
    >
      <div className="text-center text-xl">Enter the ingredients you have</div>
      <div className="flex flex-col lg:flex-row items-center justify-evenly w-full ">
        <div className="flex flex-col lg:flex-row order-1 lg:order-none items-center gap-6 w-full">
          <AutoCompleteComponent
            theme={theme}
            setItem={setItem}
            setAutocompleteValue={setAutocompleteValue}
            autocompleteValue={autocompleteValue}
            id="ingredients-autocomplete"
            placeholder={"e.g chicken, rice, beans..."}
          />

          <AddIngredientButton addIngredient={addIngredient} />
        </div>
      </div>
      <ErrorText error={error} />
      <div
        className={`grid md:grid-cols-2 xl:grid-cols-3 gap-4  hide-scrollbar ${
          ingredients.length > 0 ? "border" : ""
        }  p-3 rounded border-[#a0a0a0] dark:border-[#3d3d3d] w-full px-6 max-h-44 overflow-auto`}
      >
        {ingredients.length > 0 &&
          ingredients.map((ingredient, index) => (
            <IngredientsList
              key={index}
              ingredient={ingredient}
              removeIngredient={removeIngredient}
              // className={"bg-[#2d2d2d] border-[#444544]"}
            />
          ))}
      </div>
      {ingredients.length === 0 && (
        <div className="h-44 border  w-full xl:w-96 xl:p-4  text-center flex items-center justify-center rounded-xl border-[#3d3d3d]">
          Ingredients will appear here
        </div>
      )}
      <DietaryPreferences
        handleChecboxChange={handleChecboxChange}
        selectedDietaryPreferences={selectedDietaryPreferences}
      />
      <div className="pt-10">
        <SubmitButton loading={loading} />
      </div>
    </form>
  );
};

export default IngredientsForm;
