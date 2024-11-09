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

const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [displayMsg, setDisplayMsg] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const source = location.state?.source;

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

        return;
      } else {
        console.log("Recipe not found in local storage");
      }
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/api/recipes/get-recipe-details/${id}`
      );
      if (response.status === 200) {
        setRecipeDetails(response.data);
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
      }
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  return (
    // <div>hey</div>
    <div className="flex flex-col gap-8 pt-10 pb-44 justify-center items-center px-4">
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
      />
      <div className="flex flex-col w-full justify-center md:w-[600px] lg:w-auto lg:flex-row gap-10">
        <RecipeImageCarousel recipeDetails={recipeDetails} />
        <div className="flex flex-col gap-4">
          {recipeDetails.nutrients && (
            <NutrientsCard recipeDetails={recipeDetails} />
          )}

          {recipeDetails.missingIngredients &&
            recipeDetails.missingIngredients?.length > 0 && (
              <MissingIngredientsCard recipeDetails={recipeDetails} />
            )}
        </div>
      </div>
      <div className="flex flex-col w-full md:w-[600px] lg:w-auto justify-center lg:flex-row gap-10">
        <RecipeInstructionsCard recipeDetails={recipeDetails} />
        <RecipeIngredientsCard recipeDetails={recipeDetails} />
      </div>
    </div>
  );
};

export default RecipeDetails;
