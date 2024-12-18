import React from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import AutoCompleteComponent from "./AutoCompleteComponent";
import IngredientsList from "../viewCards/IngredientsList";
import TextAreaInput from "./TextAreaInput";

import { isNative } from "../../../apiConfig";
import { mealCategories } from "../../variables";

const InputArea = ({
  error,
  title,
  setTitle,
  prepTime,
  setPrepTime,
  category,
  setCategory,
  theme,
  setItem,
  setAutocompleteValue,
  autocompleteValue,
  addIngredient,
  ingredients,
  removeIngredient,
  instructions,
  setInstructions,
  selectedPost,
}) => {
  return (
    <div className="flex flex-col  pt-8 gap-3  w-full lg:px-4 l lg:w-[200rem] xl:w-[230rem] h-full lg:overflow-scroll hide-scrollbar">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <TextInput
        label={"Title"}
        bgColor="dark:bg-[#0c0c0c] bg-[#e9e9e9]"
        className=""
        type={"text"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
        <TextInput
          label={"Cooking time"}
          className="w-full"
          type={"number"}
          min={0}
          bgColor="dark:bg-[#0c0c0c] bg-[#e9e9e9]"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />
        <SelectInput
          label={"Category"}
          options={mealCategories}
          id={"category"}
          bgColor="dark:bg-[#0c0c0c] bg-[#e9e9e9]"
          applyDarkMode={true}
          className=" w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col  items-start w-full gap-2">
          <label htmlFor="ingredients-autocomplete" className="text-sm ">
            Ingredients
          </label>
          <div className="flex items-center justify-between w-full gap-2">
            <AutoCompleteComponent
              theme={theme}
              setItem={setItem}
              setAutocompleteValue={setAutocompleteValue}
              autocompleteValue={autocompleteValue}
              id="ingredients-autocomplete"
              placeholder={"e.g chicken, rice, beans..."}
            />

            <button
              onClick={addIngredient}
              type="button"
              className="bg-[#B678F0] hover:bg-[#813ebf] text-white px-6 h-10 rounded-xl"
            >
              Add
            </button>
          </div>
        </div>
        <div className=" rounded-md dark:bg-[#0c0c0c] bg-[#e9e9e9] border dark:border-[#1d1d1d] border-[#e0e0e0] h-44 max-h-44 w-full p-8  overflow-auto  ">
          {" "}
          <div className="grid  gap-2">
            {ingredients.length > 0 &&
              ingredients.map((ingredient, index) => (
                <IngredientsList
                  key={index}
                  removeIngredient={removeIngredient}
                  ingredient={ingredient}
                />
              ))}
          </div>
          {ingredients.length <= 0 && (
            <div className="flex items-center justify-center text-sm h-full">
              <p>Ingredients added will appear here.</p>
            </div>
          )}
        </div>
      </div>

      <div
        className={`text-sm flex  lg:pb-0 flex-col gap-2 ${
          isNative ? "pb-32 " : "pb-4"
        }`}
      >
        <TextAreaInput
          instructions={instructions}
          setInstructions={setInstructions}
        />
      </div>
      <div
        className={`${
          isNative
            ? "fixed bottom-0 right-0 left-0 pt-3 dark:bg-[#0c0c0c] bg-white z-10"
            : ""
        }  px-4  w-full lg:hidden pb-12`}
      >
        <button
          type="submit"
          className=" bg-blue-600  text-white p-2 w-full rounded-md font-semibold hover:bg-blue-700"
        >
          {selectedPost ? "Update Post" : "Create post"}
        </button>
      </div>
    </div>
  );
};

export default InputArea;
