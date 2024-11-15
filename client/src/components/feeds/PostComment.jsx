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
      className={`flex flex-col md:flex-row items-end fixed bottom-0 right-0 left-0 px-4 lg:px-0 pb-4 lg:pb-0 dark:bg-[#0c0c0c] bg-white lg:dark:bg-transparent lg:bg-transparent  lg:relative  pt-8 border-t border-t-[#e0e0e0] dark:border-t-[#1d1d1d] justify-between gap-10 w-full `}
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
        className="hidden md:flex dark:text-blue-500 text-blue-700 text-sm font-semibold hover:text-blue-300"
      >
        Post
      </button>
      <button
        type="submit"
        className="md:hidden bg-blue-600  text-white p-2 w-full rounded-md font-semibold hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
};

export default PostComment;
