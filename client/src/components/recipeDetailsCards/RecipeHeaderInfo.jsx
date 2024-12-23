import React from "react";
import { FaBookmark, FaPencil, FaYoutube } from "react-icons/fa6";
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
    <div className="flex flex-col items-center justify-center bg-[#e0e0e0] border-[#c6c6c6] dark:bg-[#0E0F10] w-full md:min-w-[200px] md:max-w-[400px] p-4 lg:min-w-[200px] lg:max-w-[500px] min-h-[100px] border dark:border-[#1d1d1d] rounded-xl gap-4">
      <div className="text-xl text-center font-bold">
        {recipeDetails?.title}
      </div>
      {recipeDetails.category && (
        <div>
          <span className="pr-1 font-semibold">Meal type: </span>
          {recipeDetails?.category.slice(0, 1).toUpperCase() +
            recipeDetails?.category.slice(1).toLowerCase()}
        </div>
      )}
      {recipeDetails.mealType && (
        <div>
          <span className="pr-1 font-semibold">Meal type: </span>
          {recipeDetails?.mealType[0] || "dinner"}
        </div>
      )}
      {recipeDetails?.prepTime > 0 && (
        <div>
          <span className="pr-1 font-semibold">Cooking time: </span>
          {recipeDetails.prepTime} minutes
        </div>
      )}

      <div className="flex flex-col xl:flex-row items-center gap-6">
        {recipeDetails?.videoLink && (
          <button
            onClick={handleShowVideo}
            className="flex py-1 items-center border bg-[#1a1a1a] hover:bg-black text-white px-3 rounded-md dark:bg-[#dadada] dark:hover:bg-[#ffffff] dark:text-black gap-2"
          >
            Watch Video
            <FaYoutube className="text-xl text-red-500" />
          </button>
        )}

        <button
          onClick={saveRecipe}
          className="flex py-1 items-center border bg-[#1a1a1a] hover:bg-black text-white px-3 rounded-md dark:bg-[#dadada] dark:hover:bg-[#ffffff] dark:text-black gap-2"
        >
          Save Recipe
          <FaBookmark className="text-xl text-[#e8e8e8] dark:text-black" />
        </button>
      </div>
      <ModalComponent showModal={showVideo} setShowModal={setShowVideo}>
        <ReactPlayer
          url={recipeDetails.videoLink}
          controls
          width="100%"
          height="500px"
        />
      </ModalComponent>
    </div>
  );
};

export default RecipeHeaderInfo;
