import React from "react";
import { FaTrash } from "react-icons/fa6";
import { HiSquare2Stack } from "react-icons/hi2";
import { Link } from "react-router-dom";
import BASE_URL from "../../../apiConfig";

const ListView = ({
  meal,
  sourceType,
  showInput,
  selectedRecipes,
  handleChecboxChange,
  openDialog,
  showTrash,
  currentImageIndex,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between w-full">
        <div className="flex w-full gap-4">
          <Link
            to={{
              pathname: `/recipe-details/${meal._id || meal.id}`,
              state: { source: sourceType },
            }}
            className="relative"
          >
            <img
              src={
                meal.images[currentImageIndex]
                  ? meal.images[currentImageIndex].startsWith("http")
                    ? meal.images[currentImageIndex]
                    : `${BASE_URL}/${meal.images[currentImageIndex]}`
                  : "default"
              }
              alt=""
              className={`h-32 w-44 xl:h-44 object-cover  xl:w-full md:w-96  lg:w-72 rounded-md  border `}
            />
            {meal.images.length > 1 && (
              <div className="absolute right-2 top-2 text-xl font-bold">
                <HiSquare2Stack className="text-white" />
              </div>
            )}
          </Link>
          <div className="flex flex-col gap-2 w-full">
            <p>{meal.title}</p>
            <div className="text-sm ">
              {meal.calories && (
                <span>{meal.calories.toFixed(0)} calories</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {showInput && (
            <input
              type="checkbox"
              checked={selectedRecipes.includes(meal._id)}
              onChange={() => handleChecboxChange(meal)}
            />
          )}

          {showTrash && (
            <button
              onClick={() => openDialog(meal._id)}
              className="hover:text-red-500  text-gray-500  transition-all duration-200"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListView;
