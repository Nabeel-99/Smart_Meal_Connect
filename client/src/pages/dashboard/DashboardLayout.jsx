import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import DialogComponent from "../../components/popupCards/DialogComponent";
import ModalComponent from "../../components/popupCards/ModalComponent";
import PostForm from "../../components/forms/PostForm";
import AutoHideSnackbar from "../../components/popupCards/AutoHideSnackbar";
import Content from "../../components/viewCards/Content";
import ContentViews from "../../components/viewCards/ContentViews";
import MainMenu from "../../components/menuCards/MainMenu";

const DashboardLayout = ({ userData, fetchUserData, theme, updateTheme }) => {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [listView, setListView] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [viewOptions, setViewOptions] = useState(false);
  const [userMetrics, setUserMetrics] = useState(null);
  const [dashboardRecipes, setDashboardRecipes] = useState([]);
  const [fetchingInProgress, setFetchingInProgress] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showMetricsPrompt, setShowMetricsPrompt] = useState(false);
  const { id: userId } = useParams();
  const anchorRef = useRef(null);

  const showPostModal = () => setShowModal(!showModal);
  const showNotifications = () => setViewNotifications(!viewNotifications);
  const openDialog = () => {
    setShowDialog(true);
  };
  const showListView = () => {
    setListView(true);
    setGridView(false);
    setViewOptions(false);
  };
  const showGridView = () => {
    setGridView(true);
    setListView(false);
    setViewOptions(false);
  };
  const showOptions = () => setViewOptions(!viewOptions);
  const showSideMenu = () => setSideMenu(!sideMenu);
  const showPreferences = () => setPreferences(!preferences);
  const location = useLocation();

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

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        null,
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserMetrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/get-user-metrics",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserMetrics(response.data.metrics);
        console.log("repsonse", response.data);
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

  const fetchUserDashboardRecipes = async () => {
    if (fetchingInProgress) return;
    setFetchingInProgress(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/recipes/dashboard-recipes",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setDashboardRecipes(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingInProgress(false);
    }
  };

  const getCurrentView = () => {
    if (location.pathname === "/profile") return "Profile";
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/saved-meals") return "Saved Meals";
    if (location.pathname === "/settings") return "Settings";
    if (location.pathname === "/pantry-items") return "Pantry";
  };

  const renderContentView = () => {
    return (
      <ContentViews
        showMetricsPrompt={showMetricsPrompt}
        setShowMetricsPrompt={setShowMetricsPrompt}
        showOptions={showOptions}
        showGridView={showGridView}
        showListView={showListView}
        setViewOptions={setViewOptions}
        viewOptions={viewOptions}
        gridView={gridView}
        listView={listView}
        dashboardRecipes={dashboardRecipes}
        anchorRef={anchorRef}
        showNotifications={showNotifications}
        userData={userData}
        showPostModal={showPostModal}
        theme={theme}
        setShowSuccessSnackbar={setShowSuccessSnackbar}
        setSuccessMessage={setSuccessMessage}
        userPosts={userPosts}
        userProfile={userProfile}
        totalLikes={totalLikes}
        totalPosts={totalPosts}
        fetchUserData={fetchUserData}
        fetchUserPosts={fetchUserPosts}
        userMetrics={userMetrics}
        getUserMetrics={getUserMetrics}
        updateTheme={updateTheme}
        userId={userId}
        showModal={showModal}
        setShowModal={setShowModal}
        fetchUserDashboardRecipes={fetchUserDashboardRecipes}
      />
    );
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  useEffect(() => {
    getUserMetrics();
  }, []);

  useEffect(() => {
    fetchUserDashboardRecipes();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (userMetrics) {
      const refetchData = async () => await fetchUserData();
      refetchData();
    }
  }, [userMetrics]);

  useEffect(() => {
    if (sideMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sideMenu]);

  if (loading || !userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AiOutlineLoading3Quarters className="spin text-3xl" />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row dark:bg-[#0c0c0c] dark:text-white bg-[#F7F7F8] text-black w-full  gap-10">
        {/* Side Menu */}
        <MainMenu
          userData={userData}
          userMetrics={userMetrics}
          theme={theme}
          showPreferences={showPreferences}
          preferences={preferences}
          openDialog={openDialog}
          showPostModal={showPostModal}
          showSideMenu={showSideMenu}
          sideMenu={sideMenu}
          location={location}
          anchorRef={anchorRef}
          showNotifications={showNotifications}
          viewNotifications={viewNotifications}
          setViewNotifications={setViewNotifications}
          getCurrentView={getCurrentView}
          setSideMenu={setSideMenu}
        />
        {/* Content area */}
        <Content
          getCurrentView={getCurrentView}
          renderContentView={renderContentView}
          location={location}
        />
      </div>

      <ModalComponent
        theme={theme}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <PostForm
          theme={theme}
          setShowModal={setShowModal}
          setShowSuccessSnackbar={setShowSuccessSnackbar}
          setSuccessMessage={setSuccessMessage}
          fetchUserPosts={fetchUserPosts}
        />
      </ModalComponent>

      <AutoHideSnackbar
        message={successMessage}
        setSnackbar={setShowSuccessSnackbar}
        openSnackbar={showSuccessSnackbar}
      />

      <DialogComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleAction={handleLogout}
        title={"Are you sure you want to log out?"}
      />
    </>
  );
};

export default DashboardLayout;
