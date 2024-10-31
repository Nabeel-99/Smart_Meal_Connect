import React from "react";
import SelectInput from "../formInputs/SelectInput";
import TextInput from "../formInputs/TextInput";
import {
  exerciseOptions,
  genderOptions,
  goalOptions,
} from "../../../../server/utils/helper";
import DietaryPreferences from "../DietaryPreferences";
import SubmitButton from "../buttons/SubmitButton";
import ErrorText from "../ErrorText";
import RecipeInputCounter from "../formInputs/RecipeInputCounter";

const MetricsForm = ({
  onSubmit,
  gender,
  setGender,
  goal,
  setGoal,
  age,
  setAge,
  height,
  setHeight,
  weight,
  setWeight,
  exerciseLevel,
  setExerciseLevel,
  selectedDietaryPreferences,
  decrementCount,
  incrementCount,
  ingredientCount,
  setIngredientCount,
  isLoggedIn,
  error,
  loading,
  handleChecboxChange,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8 p-8 lg:px-14 items-start justify-center "
    >
      <div className="text-center text-xl">Enter your Body Metrics</div>
      <div className="text-sm border-b pb-2 border-b-[#343333] w-full">
        Personal Information
      </div>
      <div className="flex flex-col text-sm lg:flex-row  gap-8 ">
        <SelectInput
          label={"Gender"}
          id={"gender"}
          options={genderOptions}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-72 cursor-pointer"
          applyDarkMode={true}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
        <TextInput
          label={"Age"}
          id={"age"}
          htmlFor={"age"}
          type={"number"}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-72 cursor-pointer"
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
      </div>
      <div className="text-sm border-b pb-2 border-b-[#343333] w-full">
        Body Measurements / Fitness Goals
      </div>
      <div className="grid lg:grid-cols-2 gap-8 gap-y-4 ">
        <TextInput
          label={"Height(cm)"}
          id={"height"}
          min={0}
          htmlFor={"height"}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          type={"number"}
          className="w-72 cursor-pointer"
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
        <TextInput
          label={"Weight(kg)"}
          id={"weight"}
          min={0}
          htmlFor={"weight"}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          type={"number"}
          className="w-72 cursor-pointer"
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
        <SelectInput
          label={"Goal"}
          id={"goal"}
          options={goalOptions}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-72 cursor-pointer"
          applyDarkMode={true}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
        <SelectInput
          label={"Exercise Level"}
          id={"exercise-level"}
          options={exerciseOptions}
          value={exerciseLevel}
          onChange={(e) => setExerciseLevel(e.target.value)}
          className="w-72 cursor-pointer"
          applyDarkMode={true}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
      </div>
      <DietaryPreferences
        handleChecboxChange={handleChecboxChange}
        selectedDietaryPreferences={selectedDietaryPreferences}
      />

      <div className="pt-4 border-t border-t-[#343333] w-full">
        <RecipeInputCounter
          decrementCount={decrementCount}
          incrementCount={incrementCount}
          isLoggedIn={isLoggedIn}
          ingredientCount={ingredientCount}
          setIngredientCount={setIngredientCount}
        />
        {!isLoggedIn && (
          <div className="text-sm text-[#A3A3A3]">
            Create an account to increase the number of recipes.
          </div>
        )}
      </div>
      <ErrorText error={error} />
      <div className="pt-10 flex items-center w-full ">
        <SubmitButton loading={loading} />
      </div>
    </form>
  );
};

export default MetricsForm;
