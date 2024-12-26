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
import { Badge } from "@mui/material";

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
  const [showDotBadge, setShowDotBadge] = useState(false);
  const [notificationsViewed, setNotificationsViewed] = useState(false);
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
      const newLikers = response.data.notificationsWithNames;
      const lastViewedTimestamp = localStorage.getItem(
        "lastViewedNotification"
      );

      const hasNewNotifications = newLikers.some((notification) => {
        const notificationTime = new Date(notification.timestamp).getTime();
        const lastViewedTime = lastViewedTimestamp
          ? new Date(lastViewedTimestamp).getTime()
          : 0;

        return notificationTime > lastViewedTime;
      });

      setLikers(newLikers);

      if (hasNewNotifications) {
        setShowDotBadge(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCommentNotifications = async () => {
    try {
      const response = await axiosInstance.get(`/api/users/commenters`);
      const newCommenters = response.data.notificationsWithNames;

      const lastViewedTimestamp = localStorage.getItem(
        "lastViewedNotification"
      );

      const hasNewNotifications = newCommenters.some((notification) => {
        const notificationTime = new Date(notification.timestamp).getTime();
        const lastViewedTime = lastViewedTimestamp
          ? new Date(lastViewedTimestamp).getTime()
          : 0;
        return notificationTime > lastViewedTime;
      });

      setCommenters(newCommenters);

      if (hasNewNotifications) {
        setShowDotBadge(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = () => {
      fetchLikeNotifications();
      fetchCommentNotifications();
    };
    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleMobileNotificationClick = (e) => {
    e.stopPropagation();
    setViewNotifications((prev) => !prev);

    if (sortedNotifications.length > 0) {
      localStorage.setItem(
        "lastViewedNotification",
        sortedNotifications[0].timestamp
      );
    }
    setShowDotBadge(false);
  };

  const notifications = [...likers, ...commenters];

  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <>
      <div className="px-4 lg:px-10 2xl:px-24 pt-14 lg:pt-0 flex flex-col gap-8 w-full">
        <div className="hidden pt-6   lg:flex gap-2 items-center justify-between border-b dark:border-b-[#1d1d1d] border-b-[#E0E0E0] w-full pb-2">
          For you
        </div>
        <div className="block fixed z-50 top-6 right-10  xl:hidden">
          <button ref={anchorRef} onClick={handleMobileNotificationClick}>
            <div className="relative">
              <Badge
                badgeContent={showDotBadge ? 100 : 0}
                color="error"
                variant={showDotBadge ? "dot" : "standard"}
              >
                <IoIosNotifications className="text-2xl" />
              </Badge>
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
          {/* larger screen notification card */}
          <div className="mt-16 ">
            <NotificationCard
              commenters={commenters}
              likers={likers}
              showDotBadge={showDotBadge}
              sortedNotifications={sortedNotifications}
              setNotificationsViewed={setNotificationsViewed}
              notificationsViewed={notificationsViewed}
              setShowDotBadge={setShowDotBadge}
            />
          </div>
          {/* mobile notification */}
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
