import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AutoCompleteComponent from "../formInputs/AutoCompleteComponent";

const PantrySelection = ({
  pantryItems,
  selectedItems,
  handleCheckboxChange,
  selectAllPantry,
  allSelected,
  loading,
  updatePantry,
  addToPantry,
  setAutocompleteValue,
  autocompleteValue,
  setItem,
  theme,
  ingredientsData,
  showSkip = false,
  save = false,
  skipToDashboard,
  savePantryItems,
}) => {
  return (
    <div className="flex flex-col order-2 lg:order-none items-center w-full  pb-24   gap-2">
      <div className="flex flex-col mt-4 items-start  xl:justify-start gap-4 w-full">
        <div className="flex items-center   gap-2">
          Select All
          <input
            type="checkbox"
            onChange={selectAllPantry}
            checked={allSelected}
          />
        </div>

        <div className=" gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 items-center xl:items-start justify-center xl:justify-start w-full xl:w-[400px]">
          {pantryItems.pantry.map((pantry, index) => (
            <div className="flex  items-center" key={pantry}>
              <label className="w-32 ">
                {" "}
                {pantry.charAt(0).toUpperCase() + pantry.slice(1).toLowerCase()}
              </label>
              <input
                value={pantry}
                type="checkbox"
                className="transform "
                onChange={handleCheckboxChange}
                checked={selectedItems.includes(pantry)}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col lg:flex-row items-center w-full gap-4">
          <AutoCompleteComponent
            label={"Add more pantry Items"}
            theme={theme}
            setItem={setItem}
            setAutocompleteValue={setAutocompleteValue}
            autocompleteValue={autocompleteValue}
            ingredientsData={ingredientsData}
          />
          <button
            onClick={addToPantry}
            className="bg-[#199224] mb-2 hover:bg-[#1ead2a] text-white py-2 text-center px-6 rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="flex items-center justify-center lg:justify-start mt-6 gap-3 w-full h-full">
          <button
            onClick={save ? savePantryItems : updatePantry}
            disabled={loading}
            className="bg-[#B678F0] py-1 text-center w-44 flex items-center justify-center text-white rounded-md"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="spin text-2xl" />
            ) : (
              "Save"
            )}
          </button>
          {showSkip && (
            <div className="mt-3 h-full flex items-end justify-end w-full">
              <button
                onClick={skipToDashboard}
                className="text-[#A3A3A3] hover:text-[#cacaca]"
              >
                Skip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PantrySelection;
