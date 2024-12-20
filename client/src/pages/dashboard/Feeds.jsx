import React, { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios";
import AutoHideSnackbar from "../../components/popupCards/AutoHideSnackbar";
import UserFeedsCard from "../../components/feeds/UserFeedsCard";
import PostDetailsModal from "../../components/feeds/PostDetailsModal";
import BASE_URL, { axiosInstance } from "../../../apiConfig";
import NotificationCard from "../../components/notificationCards/NotificationCard";
import MobileNotificationCard from "../../components/notificationCards/MobileNotificationCard";
import PopperComponent from "../../components/popupCards/PopperComponent";
import { IoIosNotifications } from "react-icons/io";
import useFetchPosts from "../../components/hooks/useFetchPosts";
import usePostActions from "../../components/hooks/usePostActions";

const Feeds = ({
  anchorRef,
  showNotifications,
  viewNotifications,
  setViewNotifications,
  currentUserId,
  showPostModal,
  theme,
}) => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [likers, setLikers] = useState([]);
  const [commenters, setCommenters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { likedPosts, fetchAllPosts, setLikedPosts, fetchLikedPosts } =
    useFetchPosts(page, setPosts, setLoading);

  const {
    comment,
    selectedPost,
    snackbarMsg,
    displaySnackbar,
    setComment,
    postUserComment,
    deleteComment,
    setSelectedPost,
    likeRecipe,
    setDisplaySnackbar,
  } = usePostActions(fetchAllPosts, setLikedPosts, setPosts);

  useEffect(() => {
    fetchLikedPosts();
  }, []);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const openModal = (id) => {
    setSelectedPost(id);
    setShowModal(true);
  };

  const fetchLikeNotifications = async () => {
    try {
      const response = await axiosInstance.get(`/api/users/likers`);

      setLikers(response.data.notificationsWithNames);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchCommentNotifications = async () => {
    try {
      const response = await axiosInstance.get(`/api/users/commenters`);
      setCommenters(response.data.notificationsWithNames);
    } catch (error) {
      console.log("error", error);
    }
  };
  const isNotification = [...commenters, ...likers];
  useEffect(() => {
    fetchLikeNotifications();
  }, []);
  useEffect(() => {
    fetchCommentNotifications();
  }, []);
  return (
    <>
      <div className="px-4 lg:px-10 2xl:px-24 pt-14 lg:pt-0 flex flex-col gap-8 w-full">
        <div className="hidden pt-6   lg:flex gap-2 items-center justify-between border-b dark:border-b-[#1d1d1d] border-b-[#E0E0E0] w-full pb-2">
          For you
        </div>
        <div className="block fixed z-50 top-6 right-10  xl:hidden">
          <button
            ref={anchorRef}
            onClick={(e) => {
              e.stopPropagation();
              setViewNotifications((prev) => !prev);
            }}
          >
            <div className="relative">
              <IoIosNotifications className="text-2xl w-6" />

              {isNotification.length > 0 && (
                <div
                  className="absolute top-0 right-0 flex items-center justify-center bg-red-500 text-white text-sm
            rounded-full p-1 w-4 h-4"
                >
                  {isNotification.length}
                </div>
              )}
            </div>
          </button>
        </div>
        <div className="flex w-full">
          <UserFeedsCard
            loading={loading}
            posts={posts}
            likeRecipe={likeRecipe}
            openModal={openModal}
            showPostModal={showPostModal}
            likedPosts={likedPosts}
            fetchAllPosts={fetchAllPosts}
            viewNotifications={viewNotifications}
          />
          {/* notification card */}
          <div className="mt-16 ">
            <NotificationCard commenters={commenters} likers={likers} />
          </div>
          {/* mobile */}
          <PopperComponent
            viewPopper={viewNotifications}
            anchorRef={anchorRef}
            setViewPopper={setViewNotifications}
            isNotification={true}
          >
            <MobileNotificationCard commenters={commenters} likers={likers} />
          </PopperComponent>
        </div>

        {/* <div ref={spinnerRef}>loading here</div> */}
      </div>

      <PostDetailsModal
        showModal={showModal}
        theme={theme}
        setShowModal={setShowModal}
        selectedPost={selectedPost}
        deleteComment={deleteComment}
        currentUserId={currentUserId}
        comment={comment}
        setComment={setComment}
        postUserComment={postUserComment}
      />

      <AutoHideSnackbar
        message={snackbarMsg}
        openSnackbar={displaySnackbar}
        setSnackbar={setDisplaySnackbar}
      />
    </>
  );
};

export default Feeds;
