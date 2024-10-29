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

const PostCard = ({ post, likeRecipe, isLiked, openModal, images }) => {
  const saveRecipe = async (post) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/recipes/save-recipe",
        {
          recipeDetails: post.posts,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex pt-8 lg:px-10 flex-col w-full lg:w-[650px] gap-3">
      <div className="flex items-center justify-between">
        <UserLink
          userId={post.userId}
          firstName={post.firstName}
          lastName={post.lastName}
          postDate={post.posts.updatedAt || post.posts.createdAt}
        />
        <Link
          to={`/recipe-details/${post.posts._id}`}
          className="text-sm text-nowrap text-gray-400 hover:text-black dark:hover:text-white"
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
        <SaveButton post={post} saveRecipe={() => saveRecipe(post)} />
      </div>
      <PostBottomSection openModal={() => openModal(post)} post={post} />
    </div>
  );
};

export default PostCard;
