import React from "react";
import PostComment from "./PostComment";
import ModalComponent from "../popupCards/ModalComponent";
import ImageCard from "./ImageCard";
import PostHeader from "./PostHeader";
import CommentsCard from "./CommentsCard";
import { isNative } from "../../../apiConfig";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import NativeDialog from "../NativeDialog";
import PostDetails from "../PostDetails";
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
