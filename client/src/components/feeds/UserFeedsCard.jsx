import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotificationCard from "../notificationCards/NotificationCard";
import EmptyPosts from "./EmptyPosts";
import PostCard from "./PostCard";
import AutoHideSnackbar from "../popupCards/AutoHideSnackbar";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";
import MobileNotificationCard from "../notificationCards/MobileNotificationCard";
import PopperComponent from "../popupCards/PopperComponent";

const UserFeedsCard = ({
  loading,
  posts,
  likeRecipe,
  openModal,
  showPostModal,
  likedPosts,
  fetchAllPosts,
}) => {
  return (
    <div className="flex w-full  ">
      {/* post cards */}
      {loading ? (
        <div className="flex  flex-col gap-4 items-center justify-center h-full w-full">
          <PostCardSkeleton />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center  pb-20 w-full">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              const images = post.posts.images || [];
              const isLiked = likedPosts[post.postId];

              return (
                <PostCard
                  key={index}
                  post={post}
                  likeRecipe={likeRecipe}
                  isLiked={isLiked}
                  images={images}
                  openModal={openModal}
                  fetchAllPosts={fetchAllPosts}
                />
              );
            })
          ) : (
            <EmptyPosts showPostModal={showPostModal} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserFeedsCard;
