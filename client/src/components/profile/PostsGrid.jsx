import React, { useRef, useState } from "react";
import ManagePostButtons from "../buttons/ManagePostButtons";
import { HiSquare2Stack } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { MdGridOn } from "react-icons/md";
import ModalComponent from "../popupCards/ModalComponent";
import PostForm from "../forms/PostForm";
import DialogComponent from "../popupCards/DialogComponent";
import BASE_URL, { isNative } from "../../../apiConfig";
import { Capacitor } from "@capacitor/core";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import NativeDialog from "../NativeDialog";

const PostsGrid = ({
  userPosts,
  currentImageIndex,
  editPost,
  deletePost,
  theme,
  setShowModal,
  showModal,
  selectedPost,
  fetchUserPosts,
  setShowSuccessSnackbar,
  setSuccessMessage,
  setShowDialog,
  showDialog,
  handleDelete,
  currentUserId,
}) => {
  return (
    <div className="flex flex-col gap-8 w-full  h-full">
      <div className="flex  text-sm xl:text-base items-center gap-2 justify-center ">
        <MdGridOn /> POSTS
      </div>
      {userPosts.length > 0 ? (
        <div className="grid grid-cols-3 2xl:grid-cols-4 w-full gap-2">
          {userPosts.map((post, index) => (
            <div key={index} className="relative">
              <Link to={`/recipe-details/${post.posts._id}`}>
                <img
                  src={`${BASE_URL}/${post.posts?.images[currentImageIndex]}`}
                  className="h-28 w-full md:h-52 lg:h-44 xl:h-80 2xl:h-96 xl:w-full border border-[#e0e0e0] dark:border-[#3c3c3c] rounded-sm object-cover"
                />
                {post.posts.images.length > 1 && (
                  <div className="absolute right-2 top-2 text-xl font-bold">
                    <HiSquare2Stack className="text-white" />
                  </div>
                )}
              </Link>
              {currentUserId === post.userId && (
                <ManagePostButtons
                  post={post}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              )}

              {isNative ? (
                <NativeDialog
                  showModal={showModal}
                  setShowModal={setShowModal}
                  theme={theme}
                  title={"Update Post"}
                >
                  <PostForm
                    theme={theme}
                    selectedPost={selectedPost}
                    setShowModal={setShowModal}
                    fetchUserPosts={fetchUserPosts}
                    setShowSuccessSnackbar={setShowSuccessSnackbar}
                    setSuccessMessage={setSuccessMessage}
                  />
                </NativeDialog>
              ) : (
                <ModalComponent
                  theme={theme}
                  setShowModal={setShowModal}
                  showModal={showModal}
                >
                  <PostForm
                    theme={theme}
                    selectedPost={selectedPost}
                    setShowModal={setShowModal}
                    fetchUserPosts={fetchUserPosts}
                    setShowSuccessSnackbar={setShowSuccessSnackbar}
                    setSuccessMessage={setSuccessMessage}
                  />
                </ModalComponent>
              )}

              <DialogComponent
                title={"Are you sure you want to delete this post?"}
                handleAction={handleDelete}
                setShowDialog={setShowDialog}
                showDialog={showDialog}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl flex h-full w-full items-center justify-center font-bold">
          No posts yet
        </div>
      )}
      {/* {showSnackbar && (
              <AutoHideSnackbar
                openSnackbar={showSnackbar}
                message={deleteSuccess}
                setSnackbar={setShowSnackbar}
              />
            )} */}
    </div>
  );
};

export default PostsGrid;
