import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios";
import AutoHideSnackbar from "../../components/popupCards/AutoHideSnackbar";
import UserFeedsCard from "../../components/feeds/UserFeedsCard";
import PostDetailsModal from "../../components/feeds/PostDetailsModal";
import BASE_URL from "../../../apiConfig";

const Feeds = ({
  anchorRef,
  showNotifications,
  currentUserId,
  showPostModal,
  theme,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [comment, setComment] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  console.log("posts", posts);
  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const savedRecipeResponse = await axios.get(
        `${BASE_URL}/api/recipes/get-saved-recipes`,
        { withCredentials: true }
      );
      const savedRecipeIds = savedRecipeResponse.data.map(
        (recipe) => recipe._id
      );

      const response = await axios.get(`${BASE_URL}/api/users/posts`, {
        withCredentials: true,
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

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/liked-posts`, {
          withCredentials: true,
        });

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
      const response = await axios.post(
        `${BASE_URL}/api/users/like`,
        {
          postId: postId,
        },
        { withCredentials: true }
      );

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
      const response = await axios.post(
        `${BASE_URL}/api/users/post-comment`,
        {
          postId: postId,
          comment: comment,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const newComment = response.data.comment.comments.slice(-1)[0];

        setSelectedPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, newComment],
        }));

        await fetchAllPosts();
      }
      setComment("");
    } catch (error) {
      console.log("Error posting comment:", error);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/delete-comment`,
        {
          postId: postId,
          commentId: commentId,
        },
        { withCredentials: true }
      );

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

  return (
    <>
      <div className="px-4 lg:px-10 pt-14 lg:pt-0 flex flex-col gap-8 w-full">
        <div className="hidden  lg:flex gap-2 items-center justify-between border-b dark:border-b-[#1d1d1d] border-b-[#E0E0E0] w-full pb-2">
          For you
          <div className="lg:block  xl:hidden">
            <button ref={anchorRef} onClick={showNotifications}>
              <FaRegHeart className="text-2xl w-6" />
            </button>
          </div>
        </div>
        <UserFeedsCard
          loading={loading}
          posts={posts}
          likeRecipe={likeRecipe}
          openModal={openModal}
          showPostModal={showPostModal}
          likedPosts={likedPosts}
          fetchAllPosts={fetchAllPosts}
        />
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
