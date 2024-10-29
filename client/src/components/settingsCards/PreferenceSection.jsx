import React, { useState } from "react";
import TextInput from "../formInputs/TextInput";
import SelectInput from "../formInputs/SelectInput";
import {
  dietPreferences,
  exerciseOptions,
  genderOptions,
  goalOptions,
} from "../../../../server/utils/helper";
import axios from "axios";

const PreferenceSection = ({
  userMetrics,
  refreshSideMenu,
  setIsPreferences,
  setIsAccount,
}) => {
  const [isChangingPreferences, setIsChangingPreferences] = useState(false);
  const [gender, setGender] = useState(userMetrics.gender || "");
  const [age, setAge] = useState(userMetrics.age || "");
  const [weight, setWeight] = useState(userMetrics.weight || "");
  const [height, setHeight] = useState(userMetrics.height || "");
  const [exerciseLevel, setExerciseLevel] = useState(
    userMetrics.exerciseLevel || "moderately_active"
  );
  const [goal, setGoal] = useState(userMetrics.goal || "maintenance");
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    userMetrics.dietaryPreferences || []
  );
  const [preferenceSuccess, setPreferenceSuccess] = useState("");
  const [preferenceError, setPreferenceError] = useState("");
  const [showPreferenceSuccess, setShowPreferenceSuccess] = useState("");
  const [showPreferenceError, setShowPreferenceError] = useState("");
  const [loading, setLoading] = useState(false);
  const toggleEditPreferences = () =>
    setIsChangingPreferences(!isChangingPreferences);

  const handleDietaryPreferenceChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDietaryPreferences((prev) =>
      checked ? [...prev, id] : prev.filter((pref) => pref !== id)
    );
  };

  const updatePreferences = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updateData = {};
    if (age) updateData.age = age;
    if (gender) updateData.gender = gender;
    if (height) updateData.height = height;
    if (weight) updateData.weight = weight;
    if (goal) updateData.goal = goal;
    if (exerciseLevel) updateData.exerciseLevel = exerciseLevel;
    if (selectedDietaryPreferences)
      updateData.dietaryPreferences = selectedDietaryPreferences;
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/users/update-metrics",
        updateData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        setIsChangingPreferences(false);
        setIsPreferences(true);
        setIsAccount(false);
        setPreferenceSuccess("Preferences updated successfully.");
        setShowPreferenceSuccess(true);
        setTimeout(() => {
          setShowPreferenceSuccess(false);
          setPreferenceSuccess("");
        }, 3000);
        await refreshSideMenu();
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 404 &&
        error.response.status <= 500
      ) {
        setPreferenceError("Error updating preferences.");
        setShowPreferenceError(true);
        setTimeout(() => {
          setShowPreferenceError(false);
          setPreferenceSuccess("");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <button
        onClick={toggleEditPreferences}
        className="dark:text-blue-400 text-blue-700 "
      >
        {isChangingPreferences ? "Cancel" : "Edit preferences"}
      </button>
      <form onSubmit={updatePreferences} className="w-full">
        {showPreferenceError && (
          <div
            className={`text-red-500 text-sm mt-1 pb-2 transition-opacity ease-in-out  duration-1000 ${
              showPreferenceError ? "opacity-100" : "opacity-0"
            }`}
          >
            {preferenceError}
          </div>
        )}
        <div className="grid lg:grid-cols-2 lg:gap-6 lg:w-[500px]">
          <TextInput
            label={"Age"}
            type={"number"}
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={!isChangingPreferences}
            className={`${
              isChangingPreferences ? "" : "cursor-not-allowed w-full lg:w-52 "
            }`}
            applyDarkMode={true}
          />
          <SelectInput
            label={"Gender"}
            id={"gender"}
            options={genderOptions}
            className={`${
              isChangingPreferences
                ? "cursor-pointer"
                : "cursor-not-allowed lg:w-52"
            }`}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={!isChangingPreferences}
            applyDarkMode={true}
          />
          <TextInput
            label={"Height (cm)"}
            type={"number"}
            min={0}
            disabled={!isChangingPreferences}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`${
              isChangingPreferences ? "" : "cursor-not-allowed lg:w-52"
            }`}
            applyDarkMode={true}
          />
          <SelectInput
            label={"Goal"}
            id={"goal"}
            options={goalOptions}
            className={`${
              isChangingPreferences
                ? "cursor-pointer"
                : "cursor-not-allowed lg:w-52"
            }`}
            disabled={!isChangingPreferences}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            applyDarkMode={true}
          />

          <TextInput
            label={"Weight (kg)"}
            type={"number"}
            value={weight}
            min={0}
            disabled={!isChangingPreferences}
            className={`${
              isChangingPreferences ? "" : "cursor-not-allowed lg:w-52"
            }`}
            onChange={(e) => setWeight(e.target.value)}
            applyDarkMode={true}
          />

          <SelectInput
            label={"Exercise Level"}
            id={"exercise-level"}
            options={exerciseOptions}
            className={`${
              isChangingPreferences
                ? "cursor-pointer"
                : "cursor-not-allowed lg:w-52"
            }`}
            disabled={!isChangingPreferences}
            value={exerciseLevel}
            onChange={(e) => setExerciseLevel(e.target.value)}
            applyDarkMode={true}
          />
        </div>
        <div className=" flex flex-col gap-3">
          <div>Dietary Preferences</div>
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
                checked={selectedDietaryPreferences.includes(pref.id)}
                onChange={handleDietaryPreferenceChange}
                disabled={!isChangingPreferences}
              />
            </div>
          ))}
        </div>
        {showPreferenceSuccess && (
          <div
            className={`text-green-500 text-sm mt-6 transition-opacity ease-in-out  duration-1000 ${
              showPreferenceSuccess ? "opacity-100" : "opacity-0"
            }`}
          >
            {preferenceSuccess}
          </div>
        )}
        {isChangingPreferences && (
          <div className="flex items-center mt-10 gap-6">
            <button
              onClick={toggleEditPreferences}
              type="button"
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-green-600 text-white hover:bg-green-500 rounded-md"
            >
              Update
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PreferenceSection;
