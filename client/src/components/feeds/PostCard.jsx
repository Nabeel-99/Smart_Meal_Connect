import React, { useState } from "react";
import moment from "moment";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBookmark,
  FaChevronRight,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import axios from "axios";
import UserLink from "./UserLink";
import ImageCarousel from "./ImageCarousel";
import LikeButton from "../buttons/LikeButton";
import CommentButton from "../buttons/CommentButton";
import SaveButton from "../buttons/SaveButton";
import PostBottomSection from "./PostBottomSection";
import AutoHideSnackbar from "../popupCards/AutoHideSnackbar";
import BASE_URL, { axiosInstance } from "../../../apiConfig";

const PostCard = ({
  post,
  likeRecipe,
  isLiked,
  openModal,
  images,
  fetchAllPosts,
}) => {
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const saveRecipe = async (post) => {
    try {
      const response = await axiosInstance.post(`/api/recipes/save-recipe`, {
        recipeDetails: post.posts,
      });
      setIsSaved(true);
      post.isSaved = true;

      if (response.status === 200) {
        setSnackbarMessage("Post saved Successfully");
        setShowSnackbar(true);
      } else {
        setSnackbarMessage("Failed to save recipe");
        setShowSnackbar(true);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        console.log("already saved");
        const newResponse = await axiosInstance.post(
          `/api/recipes/delete-recipe`,
          {
            id: post.posts._id,
          }
        );
        console.log(newResponse.data);
        setIsSaved(false);
        post.isSaved = false;

        if (newResponse.status === 200) {
          setSnackbarMessage("Post removed from saved collection");
          setShowSnackbar(true);
        } else {
          setSnackbarMessage("Failed to delete recipe");
          setShowSnackbar(true);
        }
      }
    }
  };

  return (
    <div className="flex pt-8 lg:px-10 flex-col w-full lg:w-[550px] gap-3">
      <div className="flex items-center justify-between">
        <UserLink
          userId={post.userId}
          firstName={post.firstName}
          lastName={post.lastName}
          postDate={post.posts.updatedAt || post.posts.createdAt}
        />
        <Link
          to={`/recipe-details/${post.posts._id}`}
          className="text-sm text-nowrap text-gray-600 hover:text-black dark:hover:text-white"
        >
          View full details
        </Link>
      </div>

      <ImageCarousel post={post} likeRecipe={likeRecipe} images={images} />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <LikeButton post={post} isLiked={isLiked} likeRecipe={likeRecipe} />
          <CommentButton openModal={() => openModal(post)} />
        </div>
        <SaveButton post={post} saveRecipe={saveRecipe} isSaved={isSaved} />
      </div>
      <PostBottomSection openModal={() => openModal(post)} post={post} />
      <AutoHideSnackbar
        openSnackbar={showSnackbar}
        setSnackbar={setShowSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default PostCard;
