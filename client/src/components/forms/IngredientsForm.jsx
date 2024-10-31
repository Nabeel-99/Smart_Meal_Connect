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
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8 p-8 items-center justify-center "
    >
      <div className="text-center text-xl">Enter the ingredients you have</div>
      <div className="flex flex-col lg:flex-row items-center justify-evenly w-full ">
        <div className="flex flex-col lg:flex-row order-1 lg:order-none items-center gap-6">
          <AutoCompleteComponent
            customStyles={{
              width: 350,
              "& .MuiInputBase-root": {
                backgroundColor: "#171717",
                border: "1px solid #343333",
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#343333",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#ffffff",
              },
              "& .MuiAutocomplete-groupLabel": {
                color: "#08090a",
              },
              "& .MuiAutocomplete-clearIndicator": {
                color: "#ffffff",
              },
            }}
            label={"e.g, rice, chicken, beans, ..."}
            setAutocompleteValue={setAutocompleteValue}
            setItem={setItem}
            autocompleteValue={autocompleteValue}
          />
          <AddIngredientButton addIngredient={addIngredient} />
        </div>
      </div>
      <ErrorText error={error} />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4  max-h-44 overflow-auto">
        {ingredients.length > 0 &&
          ingredients.map((ingredient, index) => (
            <IngredientsList
              key={index}
              ingredient={ingredient}
              removeIngredient={removeIngredient}
              className={"bg-[#2d2d2d] border-[#444544]"}
            />
          ))}
      </div>
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
