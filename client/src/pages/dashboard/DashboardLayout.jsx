import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DialogComponent from "../../components/popupCards/DialogComponent";
import ModalComponent from "../../components/popupCards/ModalComponent";
import PostForm from "../../components/forms/PostForm";
import AutoHideSnackbar from "../../components/popupCards/AutoHideSnackbar";
import Content from "../../components/viewCards/Content";
import ContentViews from "../../components/viewCards/ContentViews";
import MainMenu from "../../components/menuCards/MainMenu";
import { isNative } from "../../../apiConfig";
import NativeDialog from "../../components/popupCards/NativeDialog";
import IconTabs from "../../components/ui/IconTabs";
import LoadingAnimation from "../../components/animation/LoadingAnimation";
import NotificationBar from "../../components/notificationCards/NotificationBar";
import useUserData from "../../components/hooks/useUserData";
import useViewPreferences from "../../components/hooks/useViewPreferences";
import useDashboardRecipes from "../../components/hooks/useDashboardRecipes";
import useLogout from "../../components/hooks/useLogout";

const DashboardLayout = ({
  userData,
  fetchUserData,
  theme,
  updateTheme,
  message,
  showNotificationBar,
  setShowNotificationBar,
  setTheme,
}) => {
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const { id: userId } = useParams();
  const anchorRef = useRef(null);

  // user data
  const {
    userProfile,
    userPosts,
    totalPosts,
    totalLikes,
    userMetrics,
    showMetricsPrompt,
    setShowMetricsPrompt,
    fetchUserPosts,
    getUserMetrics,
  } = useUserData(userId);

  // views
  const {
    listView,
    gridView,
    viewOptions,
    sideMenu,
    preferences,
    showListView,
    showGridView,
    showOptions,
    showSideMenu,
    showPreferences,
    setSideMenu,
    setViewOptions,
  } = useViewPreferences();

  // dashboard data
  const { dashboardRecipes, fetchingInProgress, fetchUserDashboardRecipes } =
    useDashboardRecipes();

  const showPostModal = () => setShowModal(!showModal);
  const showNotifications = () => setViewNotifications(!viewNotifications);
  const openDialog = () => {
    setShowDialog(true);
  };

  const location = useLocation();

  const { handleLogout } = useLogout();

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
        setTheme={setTheme}
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
    fetchUserDashboardRecipes();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
            <IconTabs
              showPostModal={showPostModal}
              userData={userData?.firstName}
            />
          </div>
        )}

        {isNative && showNotificationBar && (
          <div className="fixed  p-4  z-50 top-10 left-0 right-0 w-full">
            <NotificationBar
              message={message}
              showNotificationBar={showNotificationBar}
              setShowNotificationBar={setShowNotificationBar}
            />
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
