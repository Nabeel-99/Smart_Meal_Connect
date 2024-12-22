import React from "react";
import ModalComponent from "../popupCards/ModalComponent";
import { isNative } from "../../../apiConfig";
import NativeDialog from "../popupCards/NativeDialog";
import PostDetails from "../feeds/PostDetails";

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
      {isNative ? (
        <NativeDialog
          showModal={showModal}
          setShowModal={setShowModal}
          title={"Comment"}
          theme={theme}
        >
          <PostDetails
            selectedPost={selectedPost}
            deleteComment={deleteComment}
            comment={comment}
            setComment={setComment}
            postUserComment={postUserComment}
            currentUserId={currentUserId}
          />
        </NativeDialog>
      ) : (
        <ModalComponent
          theme={theme}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <PostDetails
            selectedPost={selectedPost}
            deleteComment={deleteComment}
            setShowModal={setShowModal}
            comment={comment}
            setComment={setComment}
            postUserComment={postUserComment}
            currentUserId={currentUserId}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default PostDetailsModal;
