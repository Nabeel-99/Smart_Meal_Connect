import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCamera,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa6";
import { HiOutlineSquare2Stack, HiSquare2Stack } from "react-icons/hi2";
import BASE_URL, { isNative } from "../../../apiConfig";
import { Capacitor } from "@capacitor/core";

const PreviewCard = ({
  imagePreviews,
  images,
  setImages,
  handleImageUpload = null,
  theme,
  setImagePreviews,
  setDeletedImages,
}) => {
  console.log("preview card", imagePreviews);
  console.log("images", images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleNextImage = () => {
    if (currentImageIndex < imagePreviews.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  const removeImage = (imageToRemove) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((i) => i !== imageToRemove);
      setImagePreviews((prevPreviews) => {
        const updatedPreviews = prevPreviews.filter(
          (preview) => preview !== imageToRemove
        );
        if (updatedImages.length === 0) {
          setCurrentImageIndex(0);
        } else if (currentImageIndex >= updatedImages.length) {
          setCurrentImageIndex(updatedImages.length - 1);
        }
        return updatedPreviews;
      });

      setDeletedImages((prevDeleted) => [...prevDeleted, imageToRemove]);
      return updatedImages;
    });
  };

  const isLastImage = currentImageIndex === imagePreviews.length - 1;
  const isFirstImage = currentImageIndex === 0;
  console.log(
    "type of iamge preview and image",
    typeof imagePreviews,
    typeof images
  );
  return (
    <div className="flex h-full ">
      <span>
        <Tooltip title="previous">
          <span>
            <button
              className={`absolute flex dark:text-black dark:hover:text-white dark:bg-white bg-[#c2c2c2]   backdrop-blur-md dark:hover:bg-[#484848] hover:bg-[#dadada]   p-2  rounded-full  items-center justify-center top-[50%] ${
                isFirstImage ? "hidden" : ""
              }`}
              onClick={handlePreviousImage}
              type="button"
              disabled={isFirstImage}
            >
              <FaChevronLeft className="" />
            </button>
          </span>
        </Tooltip>
      </span>

      <div className="absolute flex  items-center gap-2  w-full justify-end bottom-2  right-2 ">
        <span>
          <Tooltip title="delete">
            <span>
              <button
                type="button"
                onClick={() => removeImage(images[currentImageIndex])}
                className="flex border hover:bg-[#dadada] bg-white dark:hover:bg-[#484848] dark:border-[#676767] p-2 dark:bg-[#1d1d1d] rounded-full items-center  justify-center  "
              >
                <FaTrash className="" />
              </button>
            </span>
          </Tooltip>
        </span>
        {images.length < 3 && (
          <span>
            <Tooltip title="Add images">
              <span>
                <label
                  type="button"
                  htmlFor="file-upload"
                  className="flex flex-col cursor-pointer bg-white hover:bg-[#dadada] border dark:hover:bg-[#484848] dark:border-[#676767] p-2 dark:bg-[#1d1d1d]  rounded-full items-center  justify-center  "
                >
                  {isNative ? (
                    theme === "dark" ? (
                      <HiOutlineSquare2Stack
                        onClick={handleImageUpload}
                        className="dark:text-white"
                      />
                    ) : (
                      <HiSquare2Stack
                        onClick={handleImageUpload}
                        className="dark:text-white"
                      />
                    )
                  ) : theme === "dark" ? (
                    <HiOutlineSquare2Stack className="dark:text-white" />
                  ) : (
                    <HiSquare2Stack className="dark:text-white" />
                  )}
                </label>
                {!isNative && (
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                    multiple
                    onChange={handleImageUpload}
                  />
                )}
              </span>
            </Tooltip>
          </span>
        )}
      </div>

      <img
        src={
          typeof imagePreviews[currentImageIndex] === "string" &&
          imagePreviews[currentImageIndex].startsWith("uploads/")
            ? `${BASE_URL}/${imagePreviews[currentImageIndex]}`
            : imagePreviews[currentImageIndex]
        }
        alt={`uploaded image - ${currentImageIndex + 1}`}
        className="rounded-md w-full h-[16rem] md:h-[20rem] lg:w-full lg:h-full xl:w-full xl:h-full object-contain"
      />
      <span>
        <Tooltip title="next">
          <span>
            <button
              className={`absolute flex  backdrop-blur-md dark:text-black dark:hover:text-white dark:bg-white bg-[#c2c2c2] dark:hover:bg-[#484848] hover:bg-[#dadada]  p-2  rounded-full right-0 items-center justify-center top-[50%] ${
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

export default PreviewCard;
