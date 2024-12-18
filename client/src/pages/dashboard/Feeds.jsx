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

const Feeds = ({
  anchorRef,
  showNotifications,
  viewNotifications,
  setViewNotifications,
  currentUserId,
  showPostModal,
  theme,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [likers, setLikers] = useState([]);
  const [comment, setComment] = useState("");
  const [commenters, setCommenters] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [page, setPage] = useState(1);

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const savedRecipeResponse = await axiosInstance.get(
        `/api/recipes/get-saved-recipes`
      );
      const savedRecipeIds = savedRecipeResponse.data.map(
        (recipe) => recipe._id
      );
      const response = await axiosInstance.get(`/api/users/posts`, {
        params: {
          page: page,
          limit: 10,
        },
      });

      const feedPosts = response.data.map((post) => ({
        ...post,
        isSaved: savedRecipeIds.includes(post.posts._id),
      }));
      setPosts(feedPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const response = await axiosInstance.get(`/api/users/liked-posts`);

      const likedPostIds = response.data.likedPostIds;
      const likedPostsMap = {};

      likedPostIds.forEach((postId) => {
        likedPostsMap[postId] = true;
      });

      setLikedPosts(likedPostsMap);
    } catch (error) {
      console.log(error);
    }
  };
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

  const likeRecipe = async (postId) => {
    try {
      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
      const response = await axiosInstance.post(`/api/users/like`, {
        postId: postId,
      });

      const likesCount = response.data.likesCount;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId ? { ...post, likesCount } : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const postUserComment = async (postId) => {
    if (!comment) {
      return;
    }
    try {
      const response = await axiosInstance.post(`/api/users/post-comment`, {
        postId: postId,
        comment: comment,
      });

      if (response.status === 200) {
        const newComment = response.data.comment.comments.slice(-1)[0];

        setSelectedPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, newComment],
        }));
      }
      fetchAllPosts();
      setComment("");
    } catch (error) {
      console.log("Error posting comment:", error);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await axiosInstance.post(`/api/users/delete-comment`, {
        postId: postId,
        commentId: commentId,
      });

      setSelectedPost((prevPost) => {
        return {
          ...prevPost,
          comments: prevPost.comments.filter(
            (comment) => comment._id !== commentId
          ),
        };
      });
      if (response.status === 200) {
        setDisplaySnackbar(true);
        setSnackbarMsg("Comment deleted");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setDisplaySnackbar(error.response.message);
        setDisplaySnackbar(true);
      }
    }
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
