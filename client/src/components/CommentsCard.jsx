import React from "react";
import moment from "moment";

const CommentsCard = ({
  comment,
  deleteComment,
  selectedPost,
  currentUserId,
}) => {
  return (
    <div className="relative w-full  group hover:visible flex items-center gap-4">
      <div className="min-w-10 max-w-10 h-10 rounded-full font-bold text-sm text-center flex items-center justify-center bg-[#B678F0]">
        N
      </div>
      <div className="flex flex-col gap-1 w-full text-sm">
        <div>
          {" "}
          <span className="font-bold pr-1 ">
            {comment.userId.firstName} {comment.userId.lastName}
          </span>
          <span className="">{comment.text} </span>
        </div>
        <div className="text-gray-500 justify-between flex items-center w-full">
          {moment(comment.timestamp).fromNow()}
          {comment.userId._id === currentUserId && (
            <button
              onClick={() => deleteComment(selectedPost.postId, comment._id)}
              className="text-red-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity
          "
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;
