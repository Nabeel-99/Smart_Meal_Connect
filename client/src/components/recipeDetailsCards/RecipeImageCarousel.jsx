import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import BASE_URL from "../../../apiConfig";

const RecipeImageCarousel = ({ recipeDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleNextImage = () => {
    if (currentImageIndex < recipeDetails.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const isLastImage =
    recipeDetails.images &&
    currentImageIndex === recipeDetails.images.length - 1;
  const isFirstImage = currentImageIndex === 0;
  return (
    <div className="relative">
      <span>
        <Tooltip title="previous">
          <span>
            <button
              className={`absolute flex  backdrop-blur-md dark:hover:bg-[#484848] hover:bg-[#dadada]   p-2  rounded-full  items-center justify-center top-[50%] ${
                isFirstImage ? "hidden" : ""
              }`}
              onClick={handlePreviousImage}
              type="button"
              disabled={isFirstImage}
            >
              <FaChevronLeft />
            </button>
          </span>
        </Tooltip>
      </span>
      <img
        src={
          recipeDetails?.images?.[currentImageIndex]
            ? recipeDetails.images[currentImageIndex].startsWith("http")
              ? recipeDetails.images[currentImageIndex]
              : `${BASE_URL}/${recipeDetails.images[currentImageIndex]}`
            : "default"
        }
        alt=""
        className="w-full h-[280px] md:w-[600px] md:h-[400px] lg:w-[500px] lg:h-[400px] xl:w-[700px] xl:h-[500px] object-cover border border-[#e0e0e0] dark:border-[#1d1d1d] rounded-2xl"
      />
      <span>
        <Tooltip title="next">
          <span>
            <button
              className={`absolute flex  backdrop-blur-md dark:hover:bg-[#484848] hover:bg-[#dadada]  p-2  rounded-full right-0 items-center justify-center top-[50%] ${
                isLastImage ? "hidden" : ""
              }`}
              type="button"
              onClick={handleNextImage}
              disabled={isLastImage}
            >
              <FaChevronRight />
            </button>
          </span>
        </Tooltip>
      </span>
    </div>
  );
};

export default RecipeImageCarousel;
