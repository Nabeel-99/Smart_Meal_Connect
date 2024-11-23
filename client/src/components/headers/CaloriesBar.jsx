import React from "react";

const CaloriesBar = ({
  caloriePercentage,
  calorieTargetTotal,
  caloriesConsumed,
}) => {
  return (
    <div className="flex flex-col xl:flex-row items-center w-full gap-3">
      <div className="font-semibold">Calories Target</div>
      <div className="border dark:border-[#1d1d1d] border-[#e0e0e0] px-1 w-full xl:w-96 h-10  flex items-center rounded-full">
        <div
          style={{ width: `${caloriePercentage}%` }}
          className="h-8 rounded-full bg-gradient-to-r from-red-500  via-orange-400 via-10%  to-green-600 to-90% flex items-center justify-center transition-all duration-500 ease-in-out"
        >
          <div className="text-sm font-bold w-full text-nowrap text-center">
            {calorieTargetTotal !== null && (
              <span>
                {" "}
                {caloriesConsumed.toFixed(0)}/{calorieTargetTotal.toFixed(0)}{" "}
                calories
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesBar;
