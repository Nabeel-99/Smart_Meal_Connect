import React from "react";

const PostComment = ({
  comment,
  setComment,
  postUserComment,
  selectedPost,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    postUserComment(selectedPost.postId);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-end  pt-8 border-t border-t-[#e0e0e0] dark:border-t-[#1d1d1d] justify-between gap-10 "
    >
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="dark:bg-[#0c0c0c] bg-[#e9e9e9]  w-full h-10 overflow-scroll hide-scrollbar border text-sm dark:border-[#1d1d1d] border-[#e0e0e0] rounded-md px-2 py-2"
        required
      />
      <button
        type="submit"
        className="dark:text-blue-500 text-blue-700 text-sm font-semibold hover:text-blue-300"
      >
        Post
      </button>
    </form>
  );
};

export default PostComment;
