import React from "react";
import PostComment from "./PostComment";
import ModalComponent from "../popupCards/ModalComponent";
import ImageCard from "./ImageCard";
import PostHeader from "./PostHeader";
import CommentsCard from "./CommentsCard";

const PostDetailsModal = ({
  showModal,
  theme,
  setShowModal,
  selectedPost,
  deleteComment,
  currentUserId,
  comment,
  setComment,
  postUserComment,
}) => {
  return (
    <div>
      {showModal && (
        <ModalComponent
          theme={theme}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="flex flex-col gap-4 lg:flex-row justify-between items-center overflow-scroll lg:items-stretch p-8 h-[40rem]  lg:h-[35rem] xl:h-[45rem] w-full">
            <ImageCard selectedPost={selectedPost} />

            <div className="flex flex-col  px-4 lg:w-[200rem] xl:w-[230rem] h-full">
              <PostHeader
                firstName={selectedPost.firstName}
                lastName={selectedPost.lastName}
                title={selectedPost.posts.title}
                recipeId={selectedPost.posts._id}
                time={
                  selectedPost.posts.updatedAt || selectedPost.posts.createdAt
                }
              />
              {/* comments  */}
              <div className="flex flex-col gap-4 pb-2  pt-8   h-96  xl:h-full overflow-y-scroll">
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
        </ModalComponent>
      )}
    </div>
  );
};

export default PostDetailsModal;
