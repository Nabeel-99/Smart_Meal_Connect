import React from "react";
import AutoCompleteComponent from "../formInputs/AutoCompleteComponent";
import AddIngredientButton from "../buttons/AddIngredientButton";
import DietaryPreferences from "../forms/DietaryPreferences";
import SubmitButton from "../buttons/SubmitButton";
import { FaXmark } from "react-icons/fa6";
import IngredientsList from "../viewCards/IngredientsList";
import ErrorText from "../stateManagement/ErrorText";

const IngredientsForm = ({
  fetchRecipes,
  setAutocompleteValue,
  setItem,
  autocompleteValue,
  addIngredient,
  error,
  ingredients,
  removeIngredient,
  handleCheckboxChange,
  loading,
  selectedDietaryPreferences,
  theme,
}) => {
  return (
    <form
      onSubmit={fetchRecipes}
      className="flex flex-col gap- p-8 items-center justify-center "
    >
      <div className="flex flex-col  lg:flex-row items-center  w-full ">
        <div className="flex  flex-col lg:flex-row order-1 lg:order-none items-center gap-6 w-full">
          <AutoCompleteComponent
            theme={theme}
            customStyles={{
              width: {
                xs: "350px",
                sm: "400px",
                md: "450px",
                lg: "700px",
                xl: "700px",
              },
              borderRadius: "50px",
            }}
            label={"Enter your available ingredients"}
            setItem={setItem}
            setAutocompleteValue={setAutocompleteValue}
            autocompleteValue={autocompleteValue}
            id="ingredients-autocomplete"
            placeholder={"e.g pasta, chicken, cheese..."}
          />

          <AddIngredientButton addIngredient={addIngredient} />
        </div>
      </div>
      <ErrorText error={error} />
      <div
        className={`grid md:grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4 gap-4  hide-scrollbar
     ${ingredients.length > 0 ? "border" : ""}
         pt-4 max-h-64 rounded border-[#e0e0e0] dark:border-[#1e1e1e] w-full   overflow-auto`}
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
        <div className=" border  w-full font-bold  xl:text-2xl p-4  text-center flex items-center justify-center rounded-xl border-[#E0E0E0] dark:border-[#1d1d1d]">
          Ingredients will appear here
        </div>
      )}
      <DietaryPreferences
        handleCheckboxChange={handleCheckboxChange}
        selectedDietaryPreferences={selectedDietaryPreferences}
      />
      <div className="pt-10">
        <SubmitButton loading={loading} />
      </div>
    </form>
  );
};

export default IngredientsForm;
