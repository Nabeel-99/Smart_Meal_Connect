import React from "react";
import { dietPreferences } from "../../utils/variables";

const DietaryPreferences = ({
  handleCheckboxChange,
  selectedDietaryPreferences,
  className,
}) => {
  return (
    <div className="flex flex-col mt-4 items-start w-full gap-2 ">
      <p className="border-b pb-2 border-b-[#e0e0e0] dark:border-b-[#343333]  w-full">
        Dietary Preferences (optional)
      </p>
      {/* checkbox */}
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
            onChange={handleCheckboxChange}
          />
        </div>
      ))}
    </div>
  );
};

export default DietaryPreferences;
