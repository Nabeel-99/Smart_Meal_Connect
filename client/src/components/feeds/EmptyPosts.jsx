import React from "react";

const EmptyPosts = ({ showPostModal }) => {
  return (
    <div className="flex  flex-col gap-4 items-center justify-center pt-32 xl:pt-0  h-full">
      <p className="text-center">
        No feeds yet.{" "}
        <span className="block">
          Be the first to share your recipe and inspire others!
        </span>
      </p>
      <button
        onClick={showPostModal}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4"
      >
        Create post
      </button>
    </div>
  );
};

export default EmptyPosts;
