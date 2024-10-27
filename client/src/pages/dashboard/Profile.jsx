import React, { useEffect, useState } from "react";
import { MdGridOn } from "react-icons/md";
import food from "../../assets/food4.jpg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { HiSquare2Stack } from "react-icons/hi2";
import { AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { Tooltip } from "@mui/material";
import ModalComponent from "../../components/ModalComponent";
import DialogComponent from "../../components/DialogComponent";
import { FaTrash } from "react-icons/fa6";
import AutoHideSnackbar from "../../components/AutoHideSnackbar";
import PostForm from "../../components/PostForm";

const Profile = ({ currentUserId, theme, setCreatePost }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const { id: userId } = useParams();
  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/profile/${userId || ""}`,
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
  const editPost = (post) => {
    setShowModal(true);
    setSelectedPost(post.posts);
  };
  const deletePost = (post) => {
    setShowDialog(true);
    setPostToDelete(post);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/delete-post`,
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
        setDeleteSuccess("Post deleted successfully");
        setShowSnackbar(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserPosts();
  }, [userId]);
  return (
    <div className="flex flex-col  h-full gap-8 pt-28 px-6 md:px-10 dark:text-white lg:px-20">
      {loading ? (
        <div className="flex  flex-col gap-4 items-center justify-center h-full w-full">
          <AiOutlineLoading3Quarters className="spin text-3xl" />
        </div>
      ) : (
        <>
          <div className="flex pl-4 md:pl-52 lg:pl-24 xl:pl-64 items-center gap-6 xl:gap-10">
            <div className="h-20 w-20 md:h-32 md:w-32 xl:w-44 xl:h-44 bg-[#B678F0] text-white rounded-full flex items-center justify-center ">
              <div className="text-2xl md:text-4xl xl:text-6xl font-bold">
                {userProfile?.firstName?.slice(0, 1)}
              </div>
            </div>
            <div className="flex flex-col gap-2 xl:gap-4">
              <div className="text-base xl:text-xl font-semi-bold">
                {userProfile?.firstName} {userProfile?.lastName}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex flex-col items-center">
                  <div className="font-bold">{totalPosts}</div>
                  <div>Posts</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-bold">{totalLikes}</div>
                  <div>Likes</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full  h-full">
            <div className="flex  text-sm xl:text-base items-center gap-2 justify-center ">
              <MdGridOn /> POSTS
            </div>
            {userPosts.length > 0 ? (
              <div className="grid grid-cols-3 w-full gap-2">
                {userPosts.map((post, index) => (
                  <div key={index} className="relative">
                    <Link to={`/recipe-details/${post.posts._id}`}>
                      <img
                        src={`http://localhost:8000/${post.posts?.images[currentImageIndex]}`}
                        className="h-28 w-full md:h-52 lg:h-44 xl:h-80 xl:w-full rounded-sm object-cover"
                      />
                      {post.posts.images.length > 1 && (
                        <div className="absolute right-2 top-2 text-xl font-bold">
                          <HiSquare2Stack className="text-white" />
                        </div>
                      )}
                    </Link>
                    {currentUserId === post.userId && (
                      <div className="absolute right-2 flex items-center gap-2 bottom-0 text-xl font-bold">
                        <Tooltip title="edit post">
                          <button
                            onClick={() => editPost(post)}
                            className="border text-black hover:border-[#e0e0e0] text-[0.5rem] md:text-[0.8rem] lg:text-base hover:bg-[#dadada] bg-white rounded-full p-1 hover:text-black"
                          >
                            <MdEdit className="" />
                          </button>
                        </Tooltip>
                        <Tooltip title="delete post">
                          <button
                            onClick={() => deletePost(post)}
                            className=" border  hover:border-[#e0e0e0] text-[0.5rem] md:text-[0.8rem] lg:text-base hover:bg-[#dadada] bg-white text-black rounded-full p-1 hover:text-black"
                          >
                            <FaTrash className="" />
                          </button>
                        </Tooltip>
                      </div>
                    )}
                    {showModal && (
                      <ModalComponent
                        theme={theme}
                        setShowModal={setShowModal}
                        showModal={showModal}
                      >
                        <PostForm
                          setCreatePost={setCreatePost}
                          selectedPost={selectedPost}
                          setShowModal={setShowModal}
                          fetchUserPosts={fetchUserPosts}
                        />
                      </ModalComponent>
                    )}
                    {showDialog && (
                      <DialogComponent
                        title={"Are yu sure you want to delete this post?"}
                        handleAction={handleDelete}
                        setShowDialog={setShowDialog}
                        showDialog={showDialog}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-2xl flex h-full w-full items-center justify-center font-bold">
                No posts yet
              </div>
            )}
            {showSnackbar && (
              <AutoHideSnackbar
                openSnackbar={showSnackbar}
                message={deleteSuccess}
                setSnackbar={setShowSnackbar}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
