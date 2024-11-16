import React from "react";
import { FaTrash } from "react-icons/fa6";
import { HiSquare2Stack } from "react-icons/hi2";
import { Link } from "react-router-dom";
import BASE_URL from "../../../apiConfig";

const GridView = ({
  meal,
  currentImageIndex,
  showInput,
  selectedRecipes,
  handleChecboxChange,
  showMissingIngredients,
  showTrash,
  sourceType,
  openDialog,
}) => {
  return (
    <div className="">
      <Link
        to={`/recipe-details/${meal._id || meal.id}`}
        state={{ source: sourceType }}
      >
        <div className="pb-2 relative">
          <img
            src={
              meal.images[currentImageIndex]
                ? meal.images[currentImageIndex].startsWith("http")
                  ? meal.images[currentImageIndex]
                  : `${BASE_URL}/${meal.images[currentImageIndex]}`
                : "default"
            }
            alt=""
            className="w-full  xl:h-[200px] h-[250px] lg:h-[200px] 2xl:w-[550px] 2xl:h-[300px] object-cover rounded-xl"
          />
          {meal.images.length > 1 && (
            <div className="absolute right-2 top-2 text-xl font-bold">
              <HiSquare2Stack className="text-white" />
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex flex-col gap-2 text-sm">
            {meal.title.length > 15
              ? meal.title.slice(0, 10).concat("...")
              : meal.title}
          </div>
          {showInput && (
            <input
              type="checkbox"
              checked={selectedRecipes.includes(meal._id)}
              onChange={() => handleChecboxChange(meal)}
            />
          )}
        </div>
        <div className="text-sm ">
          {meal.calories && <span>{meal.calories.toFixed(0)} calories</span>}
        </div>
      </div>
      {showMissingIngredients && (
        <p className="text-sm">
          Missing Ingredients: {meal.missingIngredientsCount}
        </p>
      )}
      {showTrash && (
        <button
          onClick={() => openDialog(meal._id)}
          className="hover:text-red-500  text-gray-500 transition-all duration-200"
        >
          <FaTrash className="" />
        </button>
      )}
    </div>
  );
};

export default GridView;
