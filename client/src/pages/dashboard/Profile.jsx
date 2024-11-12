import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProfileCard from "../../components/profile/ProfileCard";
import PostsGrid from "../../components/profile/PostsGrid";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../apiConfig";
import ProfileSkeleton from "../../components/ProfileSkeleton";

const Profile = ({
  currentUserId,
  theme,
  setSuccessMessage,
  setShowSuccessSnackbar,
  // showModal,
  // setShowModal,
  // fetchUserPosts,
  // userPosts,
  // userProfile,
  // totalPosts,
  // totalLikes,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { id: userId } = useParams();
  const editPost = (post) => {
    fetchUserPosts();
    setShowModal(true);
    setSelectedPost(post.posts);
  };
  const deletePost = (post) => {
    setShowDialog(true);
    setPostToDelete(post);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/delete-post`,
        {
          postId: postToDelete.postId,
          recipeId: postToDelete.posts._id,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.status === 200) {
        setShowDialog(false);
        setPostToDelete(null);
        fetchUserPosts();
        setSuccessMessage("Post deleted successfully");
        setShowSuccessSnackbar(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/profile/${userId || ""}`,
        { withCredentials: true }
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

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);
  return (
    <div className="flex flex-col   h-full gap-8 pt-28 px-6 md:px-10 dark:text-white lg:px-20">
      {loading ? (
        <div className="flex  flex-col gap-4 items-center justify-center h-full w-full">
          <ProfileSkeleton />
        </div>
      ) : (
        <>
          {/* profile card */}
          <ProfileCard
            userProfile={userProfile}
            totalLikes={totalLikes}
            totalPosts={totalPosts}
          />
          {/* posts grid */}
          <PostsGrid
            currentUserId={currentUserId}
            userPosts={userPosts}
            currentImageIndex={currentImageIndex}
            editPost={editPost}
            deletePost={deletePost}
            theme={theme}
            setShowModal={setShowModal}
            showModal={showModal}
            selectedPost={selectedPost}
            fetchUserPosts={fetchUserPosts}
            setShowSuccessSnackbar={setShowSuccessSnackbar}
            setSuccessMessage={setSuccessMessage}
            setShowDialog={setShowDialog}
            showDialog={showDialog}
            handleDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
