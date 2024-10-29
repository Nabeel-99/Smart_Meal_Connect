import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotificationCard from "../notificationCards/NotificationCard";
import EmptyPosts from "./EmptyPosts";
import PostCard from "./PostCard";

const UserFeedsCard = ({
  loading,
  posts,
  likeRecipe,
  openModal,
  showPostModal,
  likedPosts,
}) => {
  return (
    <div className="flex w-full  ">
      {/* post cards */}
      {loading ? (
        <div className="flex  flex-col gap-4 items-center justify-center h-full w-full">
          <AiOutlineLoading3Quarters className="spin text-3xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
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
                />
              );
            })
          ) : (
            <EmptyPosts showPostModal={showPostModal} />
          )}
        </div>
      )}

      {/* notification card */}
      <div className="mt-16 ">
        <NotificationCard />
      </div>
    </div>
  );
};

export default UserFeedsCard;
