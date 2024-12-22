import { useState, useEffect } from "react";
import { axiosInstance } from "../../../apiConfig";

const useUserData = (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userMetrics, setUserMetrics] = useState(null);
  const [showMetricsPrompt, setShowMetricsPrompt] = useState(false);

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/users/profile/${userId || ""}`
      );
      setUserProfile(response.data.userProfile);
      setUserPosts(response.data.userPosts);
      setTotalPosts(response.data.userPosts.length);
      setTotalLikes(response.data.totalLikes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserMetrics = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/users/get-user-metrics`);
      if (response.status === 200) {
        setUserMetrics(response.data.metrics);

        if (response.data.metrics.defaultMetrics) {
          setShowMetricsPrompt(true);
        }
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setUserMetrics(error.response.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  useEffect(() => {
    getUserMetrics();
  }, []);

  return {
    userProfile,
    userPosts,
    totalPosts,
    totalLikes,
    userMetrics,
    showMetricsPrompt,
    setShowMetricsPrompt,
    loading,
    fetchUserPosts,
    getUserMetrics,
  };
};

export default useUserData;
