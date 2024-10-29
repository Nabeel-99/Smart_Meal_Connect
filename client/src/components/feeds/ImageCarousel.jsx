import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ImageCarousel = ({ post, likeRecipe, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (post) => {
    if (currentImageIndex < post.posts.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  const isLastImage = currentImageIndex === post.posts.images.length - 1;
  const isFirstImage = currentImageIndex === 0;
  return (
    <div className="relative bg-[#0c0c0c] border border-[#e0e0e0] dark:border-[#171717] rounded-lg">
      <span>
        <Tooltip title="previous">
          <span>
            <button
              className={`absolute flex  backdrop-blur-md dark:hover:bg-[#484848] hover:bg-[#dadada]  p-2  rounded-full items-center justify-center top-[50%] ${
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
      {images.length > 0 && (
        <img
          src={`http://localhost:8000/${images[currentImageIndex]}`}
          onDoubleClick={() => likeRecipe(post.postId)}
          className="w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-md object-contain "
        />
      )}
      <span>
        <Tooltip title="next">
          <span>
            <button
              className={`absolute flex  backdrop-blur-md dark:hover:bg-[#484848] hover:bg-[#dadada]  p-2  rounded-full right-0 items-center justify-center top-[50%] ${
                isLastImage ? "hidden" : ""
              }`}
              type="button"
              onClick={() => handleNextImage(post)}
              disabled={isLastImage}
            >
              <FaChevronRight className="" />
            </button>
          </span>
        </Tooltip>
      </span>
    </div>
  );
};

export default ImageCarousel;
