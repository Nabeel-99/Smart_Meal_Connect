import React from "react";
import { FaBookmark, FaYoutube } from "react-icons/fa6";
import ReactPlayer from "react-player";
import ModalComponent from "../popupCards/ModalComponent";

const RecipeHeaderInfo = ({
  recipeDetails,
  handleShowVideo,
  showVideo,
  setShowVideo,
  saveRecipe,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#0E0F10] w-full md:min-w-[200px] md:max-w-[400px] p-4 lg:min-w-[200px] lg:max-w-[500px] min-h-[100px] border border-[#1d1d1d] rounded-xl gap-4">
      <div className="text-xl text-center font-bold">
        {recipeDetails?.title}
      </div>
      {recipeDetails.category && (
        <div>
          <span className="pr-1 font-semibold">Meal type: </span>
          {recipeDetails.category.slice(0, 1).toUpperCase() +
            recipeDetails.category.slice(1).toLowerCase()}
        </div>
      )}
      {recipeDetails.prepTime && (
        <div>
          <span className="pr-1 font-semibold">Cooking time: </span>
          {recipeDetails.prepTime} minutes
        </div>
      )}

      <div className="flex items-center gap-6">
        {showVideo && recipeDetails?.videoLink && (
          <button
            onClick={handleShowVideo}
            className="flex items-center border px-3 py-1 rounded-md bg-[#dadada] text-black gap-2"
          >
            Watch Video
            <FaYoutube className="text-xl text-red-500" />
          </button>
        )}

        {showVideo && (
          <ModalComponent showModal={showVideo} setShowModal={setShowVideo}>
            <ReactPlayer
              url={recipeDetails.videoLink}
              controls
              width="100%"
              height="300px"
            />
          </ModalComponent>
        )}

        <button
          onClick={saveRecipe}
          className="flex py-1 items-center border px-3 rounded-md bg-[#dadada] hover:bg-[#ffffff] text-black gap-2"
        >
          Save Recipe
          <FaBookmark className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default RecipeHeaderInfo;
