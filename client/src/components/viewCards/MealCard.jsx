import React, { useState } from "react";
import GridView from "./GridView";
import ListView from "./ListView";

const MealCard = ({
  meals,
  showInput = false,
  showTrash = false,
  showMissingIngredients = false,
  isGridView,
  isListView,
  openDialog,
  sourceType,
  handleChecboxChange,
  selectedRecipes,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log("meals", meals);
  return (
    <>
      {/* Grid view */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-4 gap-6 2xl:gap-10 ">
        {meals.map(
          (meal, index) =>
            isGridView && (
              <GridView
                key={index}
                meal={meal}
                currentImageIndex={currentImageIndex}
                showInput={showInput}
                selectedRecipes={selectedRecipes}
                handleChecboxChange={handleChecboxChange}
                showMissingIngredients={showMissingIngredients}
                showTrash={showTrash}
                sourceType={sourceType}
                openDialog={openDialog}
              />
            )
        )}
      </div>
      {/* List view */}
      <div className="flex flex-col gap-10">
        {meals.map(
          (meal, index) =>
            isListView && (
              <ListView
                key={index}
                meal={meal}
                sourceType={sourceType}
                showInput={showInput}
                selectedRecipes={selectedRecipes}
                handleChecboxChange={handleChecboxChange}
                openDialog={openDialog}
                showTrash={showTrash}
                currentImageIndex={currentImageIndex}
              />
            )
        )}
      </div>
    </>
  );
};

export default MealCard;
