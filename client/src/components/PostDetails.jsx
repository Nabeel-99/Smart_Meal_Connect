import React from "react";
import ImageCard from "./feeds/ImageCard";
import PostHeader from "./feeds/PostHeader";
import CommentsCard from "./feeds/CommentsCard";
import PostComment from "./feeds/PostComment";
import { isNative } from "../../apiConfig";
import { FaXmark } from "react-icons/fa6";

const PostDetails = ({
  selectedPost,
  comment,
  setComment,
  postUserComment,
  deleteComment,
  currentUserId,
  setShowModal,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row justify-between items-center overflow-scroll hide-scrollbar lg:items-stretch p-8 h-[40rem]  lg:h-[35rem] xl:h-[45rem] w-full">
      <ImageCard selectedPost={selectedPost} />
      <div
        className={`flex flex-col  ${
          isNative ? "w-full" : " w-full lg:w-[200rem] xl:w-[230rem] px-4"
        }  h-full`}
      >
        {!isNative && (
          <div className="fixed -top-5  cursor-pointer left-0 right-0 w-full flex items-center justify-center ">
            <button
              className="cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              {" "}
              <FaXmark className="border text-3xl rounded-full backdrop-blur-xl" />
            </button>
          </div>
        )}
        <PostHeader
          firstName={selectedPost.firstName}
          lastName={selectedPost.lastName}
          title={selectedPost.posts.title}
          recipeId={selectedPost.posts._id}
          time={selectedPost.posts.updatedAt || selectedPost.posts.createdAt}
        />
        {/* comments  */}
        <div className="flex flex-col gap-4 pb-2  pt-8   h-96  xl:h-full overflow-y-scroll hide-scrollbar">
          {selectedPost.comments.length > 0 ? (
            selectedPost.comments.map((comment, index) => (
              <CommentsCard
                key={index}
                comment={comment}
                deleteComment={deleteComment}
                selectedPost={selectedPost}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <div className="text-sm text-center text-gray-400">
              No comments yet
            </div>
          )}
        </div>
        {/* post comment */}
        <PostComment
          comment={comment}
          setComment={setComment}
          postUserComment={postUserComment}
          selectedPost={selectedPost}
        />
      </div>
    </div>
  );
};

export default PostDetails;
