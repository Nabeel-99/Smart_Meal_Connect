import React from "react";
import TextInput from "../formInputs/TextInput";
import SelectInput from "../formInputs/SelectInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  dietPreferences,
  exerciseOptions,
  genderOptions,
  goalOptions,
} from "../../utils/variables";

const PreferenceForm = ({
  handleSubmit,
  age,
  setAge,
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  exerciseLevel,
  setExerciseLevel,
  goal,
  setGoal,
  handleDietaryPreferenceChange,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid  lg:grid-cols-2 lg:gap-10">
        <TextInput
          label={"Age"}
          type={"number"}
          min={0}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
        <SelectInput
          label={"Gender"}
          id={"gender"}
          options={genderOptions}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
          applyDarkMode={true}
        />
        <TextInput
          label={"Height (cm)"}
          type={"number"}
          min={0}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
        <SelectInput
          label={"Goal"}
          id={"goal"}
          options={goalOptions}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
          applyDarkMode={true}
        />

        <TextInput
          label={"Weight (kg)"}
          min={0}
          type={"number"}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />

        <SelectInput
          label={"Exercise Level"}
          id={"exercise-level"}
          options={exerciseOptions}
          value={exerciseLevel}
          onChange={(e) => setExerciseLevel(e.target.value)}
          applyDarkMode={true}
          bgColor="bg-[#171717]"
          borderColor="border-[#343333]"
        />
      </div>
      <div className=" flex flex-col gap-3">
        <div>Dietary Preferences (optional)</div>
        {dietPreferences.map((pref) => (
          <div className="flex gap-4 items-center" key={pref.id}>
            <label className="text-lg lg:text-sm  w-32" htmlFor={pref.id}>
              {pref.name}
            </label>
            <input
              type="checkbox"
              className="transform scale-150 "
              id={pref.id}
              name={pref.id}
              onChange={handleDietaryPreferenceChange}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-10 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#B678F0] py-2 text-center flex items-center justify-center w-full  rounded-md"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="spin text-2xl" />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default PreferenceForm;
