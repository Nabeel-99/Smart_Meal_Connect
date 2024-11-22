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
import LayoutSkeleton from "../../components/LayoutSkeleton";
import BASE_URL, { isNative } from "../../../apiConfig";
import NativeDialog from "../../components/NativeDialog";
import IconTabs from "../../components/IconTabs";
import { SiGreasyfork } from "react-icons/si";
import LoadingAnimation from "../../components/LoadingAnimation";

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
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const { id: userId } = useParams();
  const anchorRef = useRef(null);

  const showPostModal = () => setShowModal(!showModal);
  const showNotifications = () => setViewNotifications(!viewNotifications);
  const openDialog = () => {
    setShowDialog(true);
  };
  useEffect(() => {
    const preferredView = localStorage.getItem("preferredView");
    if (preferredView === "list") {
      setListView(true);
      setGridView(false);
    } else if (preferredView === "grid") {
      setGridView(true);
      setListView(false);
    }
  }, []);
  const showListView = () => {
    setListView(true);
    setGridView(false);
    setViewOptions(false);
    localStorage.setItem("preferredView", "list");
  };
  const showGridView = () => {
    setGridView(true);
    setListView(false);
    setViewOptions(false);
    localStorage.setItem("preferredView", "grid");
  };
  const showOptions = () => setViewOptions(!viewOptions);
  const showSideMenu = () => setSideMenu(!sideMenu);
  const showPreferences = () => setPreferences(!preferences);
  const location = useLocation();

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

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/logout`, null, {
        withCredentials: true,
      });

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
        `${BASE_URL}/api/users/get-user-metrics`,
        { withCredentials: true }
      );
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

  const fetchUserDashboardRecipes = async () => {
    if (fetchingInProgress) return;
    setFetchingInProgress(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/recipes/dashboard-recipes`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const filteredBreakfast = (
          response.data.recipes?.breakfast || []
        ).filter((meal) => meal !== null);
        const filteredLunch = (response.data.recipes?.lunch || []).filter(
          (meal) => meal !== null
        );
        const filteredDinner = (response.data.recipes?.dinner || []).filter(
          (meal) => meal !== null
        );

        setDashboardRecipes({
          ...response.data,
          recipes: {
            breakfast: filteredBreakfast,
            lunch: filteredLunch,
            dinner: filteredDinner,
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingInProgress(false);
    }
  };

  const getCurrentView = () => {
    if (location.pathname === "/profile") return "Profile";
    if (location.pathname === "/feeds") return "Feeds";
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
        showVerifyEmail={showVerifyEmail}
        setShowVerifyEmail={setShowVerifyEmail}
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
        viewNotifications={viewNotifications}
        setViewNotifications={setViewNotifications}
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
        fetchingInProgress={fetchingInProgress}
        showModal={showModal}
        setShowModal={setShowModal}
        fetchUserDashboardRecipes={fetchUserDashboardRecipes}
      />
    );
  };

  useEffect(() => {
    if (userData?.isVerified) {
      setShowVerifyEmail(false);
    } else {
      setShowVerifyEmail(true);
    }
  }, [userData?.isVerified]);

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
    return <LoadingAnimation />;
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row dark:bg-[#0c0c0c] dark:text-white bg-[#F7F7F8] text-black w-full  gap-10">
        {/* Side Menu */}
        <MainMenu
          userData={userData}
          userMetrics={userMetrics}
          getUserMetrics={getUserMetrics}
          theme={theme}
          updateTheme={updateTheme}
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
          fetchUserData={fetchUserData}
          fetchUserDashboardRecipes={fetchUserDashboardRecipes}
        />
        {/* Content area */}
        <Content
          getCurrentView={getCurrentView}
          renderContentView={renderContentView}
          location={location}
        />
        {/* <IconTabs /> */}
        {isNative && (
          <div className="fixed dark:bg-[#0c0c0c] p-4 border-t z-50 dark:border-t-[#2a2a2a] border-t-[#08090a] bg-[#e0e0e0] bottom-0 left-0 right-0 w-full">
            <IconTabs showPostModal={showPostModal} />
          </div>
        )}
      </div>

      {isNative ? (
        <NativeDialog
          theme={theme}
          showModal={showModal}
          setShowModal={setShowModal}
          direction={"up"}
          title={"Manage Post"}
        >
          <PostForm
            theme={theme}
            setShowModal={setShowModal}
            setShowSuccessSnackbar={setShowSuccessSnackbar}
            setSuccessMessage={setSuccessMessage}
            fetchUserPosts={fetchUserPosts}
          />
        </NativeDialog>
      ) : (
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
      )}
      <AutoHideSnackbar
        message={successMessage}
        setSnackbar={setShowSuccessSnackbar}
        openSnackbar={showSuccessSnackbar}
      />
      <DialogComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        handleAction={handleLogout}
        loading={loading}
        title={"Are you sure you want to log out?"}
      />
    </>
  );
};

export default DashboardLayout;
