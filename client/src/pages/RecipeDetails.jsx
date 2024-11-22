import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AutohideSnackbar from "../components/popupCards/AutoHideSnackbar";
import CloseButtonHeader from "../components/buttons/CloseButtonHeader";
import RecipeHeaderInfo from "../components/recipeDetailsCards/RecipeHeaderInfo";
import RecipeImageCarousel from "../components/recipeDetailsCards/RecipeImageCarousel";
import NutrientsCard from "../components/recipeDetailsCards/NutrientsCard";
import MissingIngredientsCard from "../components/recipeDetailsCards/MissingIngredientsCard";
import RecipeInstructionsCard from "../components/recipeDetailsCards/RecipeInstructionsCard";
import RecipeIngredientsCard from "../components/recipeDetailsCards/RecipeIngredientsCard";
import BASE_URL from "../../apiConfig";

const RecipeDetails = ({ userData }) => {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [displayMsg, setDisplayMsg] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [postOwner, setPostOwner] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const source = location.state?.source;
  // let currentUserId = userData._id || null;
  const handleShowVideo = () => setShowVideo(true);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const fetchRecipeDetails = async () => {
    if (source) {
      const storedRecipes = sessionStorage.getItem(source);
      const recipes = JSON.parse(storedRecipes);
      const foundRecipe = recipes.find(
        (r) => r.id.toString() === id.toString()
      );

      if (foundRecipe) {
        setRecipeDetails(foundRecipe);
        console.log("found Recipe", foundRecipe);
        return;
      } else {
        console.log("Recipe not found in local storage");
      }
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/api/recipes/get-recipe-details/${id}`
      );
      console.log("response,", response.data);
      if (response.status === 200) {
        console.log("response,", response.data.recipe);
        setRecipeDetails(response.data.recipe);
        setPostOwner(response.data.post.userId._id);
      }
    } catch (error) {
      console.error("Error fetching recipe from API", error);
    }
  };

  const saveRecipe = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/recipes/save-recipe`,
        {
          recipeDetails: recipeDetails,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMessage("Recipe saved successfully");
        setDisplayMsg(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setMessage("You’ve already saved this recipe.");
        setDisplayMsg(true);
      } else if (error.response && error.response.status === 401) {
        setMessage("You must be logged in to save a recipe.");
        setDisplayMsg(true);
      }
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  return (
    // <div>hey</div>
    <div className="flex flex-col gap-8 pt-10 pb-44 justify-center items-center  px-4">
      <CloseButtonHeader goBack={goBack} />

      <AutohideSnackbar
        openSnackbar={displayMsg}
        setSnackbar={setDisplayMsg}
        message={message}
      />

      <RecipeHeaderInfo
        recipeDetails={recipeDetails}
        handleShowVideo={handleShowVideo}
        showVideo={showVideo}
        setShowVideo={setShowVideo}
        saveRecipe={saveRecipe}
        postOwner={postOwner}
        // currentUserId={currentUserId}
      />
      <div className="flex flex-col lg:flex-row  gap-10 xl:gap-20">
        <div className="flex flex-col gap-10 xl:gap-20 justify-center w-full">
          <RecipeImageCarousel recipeDetails={recipeDetails} />
          <RecipeInstructionsCard recipeDetails={recipeDetails} />
        </div>
        <div className="flex flex-col gap-10 xl:gap-20 justify-start">
          <div className="flex flex-col w-full gap-6">
            <RecipeIngredientsCard recipeDetails={recipeDetails} />
            {recipeDetails.missingIngredients &&
              recipeDetails.missingIngredients?.length > 0 && (
                <MissingIngredientsCard recipeDetails={recipeDetails} />
              )}
          </div>
          <div className="w-full">
            {recipeDetails.nutrients && (
              <NutrientsCard recipeDetails={recipeDetails} />
            )}
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col w-full justify-center md:w-[600px] border lg:w-auto lg:flex-row gap-10">
        <RecipeImageCarousel recipeDetails={recipeDetails} />
        <div className="flex flex-col gap-4">
          <RecipeIngredientsCard recipeDetails={recipeDetails} />

          {recipeDetails.missingIngredients &&
            recipeDetails.missingIngredients?.length > 0 && (
              <MissingIngredientsCard recipeDetails={recipeDetails} />
            )}
        </div>
      </div>
      <div className="flex flex-col w-full justify-center md:w-[600px] border lg:w-auto lg:flex-row gap-10">
        <RecipeInstructionsCard recipeDetails={recipeDetails} />
        {recipeDetails.nutrients && (
          <NutrientsCard recipeDetails={recipeDetails} />
        )}
      </div> */}
    </div>
  );
};

export default RecipeDetails;
