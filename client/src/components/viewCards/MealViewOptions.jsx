import React from "react";
import CategoryHeader from "../headers/CategoryHeader";
import ViewOptions from "./ViewOptions";
import MobileViewOptions from "./MobileViewOptions";

const MealViewOptions = ({
  showLunch,
  showBreakfast,
  showDinner,
  anchorRef,
  showOptions,
  viewOptions,
  showGridView,
  showListView,
  uncheckAllRecipes,
  selectedRecipes,
  setViewOptions,
  breakfast,
  lunch,
  dinner,
}) => {
  return (
    <div className="flex flex-col w-full sticky top-[60px] lg:top-[40px]  z-20 dark:bg-[#0c0c0c] bg-[#F7F7F8] pb-3 lg:pb-5   gap-4">
      <div className="text-xl lg:text-3xl font-bold pt-6 lg:pt-10">
        Personalized Meal Suggestions Based on Your Metrics
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center  lg:justify-between">
        <CategoryHeader
          showBreakfast={showBreakfast}
          breakfast={breakfast}
          showLunch={showLunch}
          lunch={lunch}
          showDinner={showDinner}
          dinner={dinner}
          anchorRef={anchorRef}
          showOptions={showOptions}
          viewOptions={viewOptions}
          setViewOptions={setViewOptions}
          showGridView={showGridView}
          showListView={showListView}
        />

        <div className="flex items-center justify-between gap-10">
          {selectedRecipes.length > 0 && (
            <div className="text-sm  py-2 border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] dark:hover:bg-[#181818] hover:bg-[#bebdbd] border-[#e0e0e0] bg-[#dadada] font-semibold  px-4 rounded-md">
              <button onClick={uncheckAllRecipes}>Uncheck All</button>
            </div>
          )}
          <ViewOptions
            showGridView={showGridView}
            showListView={showListView}
          />
          <MobileViewOptions
            anchorRef={anchorRef}
            showOptions={showOptions}
            viewOptions={viewOptions}
            setViewOptions={setViewOptions}
            showGridView={showGridView}
            showListView={showListView}
          />
        </div>
      </div>
    </div>
  );
};

export default MealViewOptions;
