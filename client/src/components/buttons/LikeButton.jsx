import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const LikeButton = ({ post, isLiked, likeRecipe }) => {
  return (
    <button onClick={() => likeRecipe(post.postId)}>
      {" "}
      {isLiked ? (
        <FaHeart className="text-xl  text-red-500" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
    </button>
  );
};

export default LikeButton;
