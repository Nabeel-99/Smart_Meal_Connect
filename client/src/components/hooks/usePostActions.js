import { useState } from "react";
import { axiosInstance } from "../../../apiConfig";

const usePostActions = (fetchAllPosts, setLikedPosts, setPosts) => {
  const [comment, setComment] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [displaySnackbar, setDisplaySnackbar] = useState(false);

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
    if (!comment) return;

    try {
      const response = await axiosInstance.post(`/api/users/post-comment`, {
        postId,
        comment,
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
      console.error("Error posting comment:", error);
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
      fetchAllPosts();
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

  return {
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
  };
};

export default usePostActions;
