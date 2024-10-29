import React from "react";

const PostBottomSection = ({ post, openModal }) => {
  return (
    <>
      <div>
        {post.likesCount > 0 && (
          <p>
            {post.likesCount}
            {post.likesCount === 1 ? " like" : " likes"}
          </p>
        )}
      </div>
      <div className="">
        <span className="font-bold pr-2">
          {" "}
          {post.firstName} {post.lastName}
        </span>
        {post.posts.title}
      </div>
      <div>
        {post.commentsCount > 0 ? (
          <button
            onClick={openModal}
            className="text-sm text-gray-500 hover:text-white"
          >
            View {post.commentsCount === 1 ? "" : "all"} {post.commentsCount}{" "}
            {post.commentsCount === 1 ? "comment" : "comments"}
          </button>
        ) : (
          <button
            onClick={openModal}
            className="text-sm text-gray-500 hover:text-black dark:hover:text-white"
          >
            Add a comment
          </button>
        )}
      </div>
    </>
  );
};

export default PostBottomSection;
