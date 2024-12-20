import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apiConfig";

const useFetchPosts = (page, setPosts, setLoading) => {
  const [likedPosts, setLikedPosts] = useState({});

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

  return {
    likedPosts,
    setLikedPosts,
    fetchAllPosts,
    fetchLikedPosts,
  };
};

export default useFetchPosts;
