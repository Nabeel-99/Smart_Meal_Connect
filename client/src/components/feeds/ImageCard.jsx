import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import BASE_URL, { isNative } from "../../../apiConfig";

const ImageCard = ({ selectedPost }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleNextImage = () => {
    if (currentImageIndex < selectedPost.posts.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  const isLastImage =
    currentImageIndex === selectedPost.posts.images.length - 1;
  const isFirstImage = currentImageIndex === 0;
  return (
    <div
      className={`relative ${
        isNative ? "w-full" : " w-[20rem] lg:w-[200rem] xl:w-[230rem]"
      }   border dark:border-[#2a2a2a]  border-[#e0e0e0] rounded-md`}
    >
      <span>
        <Tooltip title="previous">
          <span>
            <button
              className={`absolute flex  backdrop-blur-md dark:hover:bg-[#484848] hover:bg-[#dadada] border bg-[#dadada] dark:border-white p-2  rounded-full  items-center justify-center top-[50%] ${
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
        src={`${BASE_URL}/${selectedPost.posts.images[currentImageIndex]}`}
        className="rounded-md w-full h-72 md:h-64 lg:w-full lg:h-full xl:w-full   object-contain"
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

export default ImageCard;
