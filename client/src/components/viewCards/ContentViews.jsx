import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Feeds from "../../pages/dashboard/Feeds";
import Profile from "../../pages/dashboard/Profile";
import SavedMeals from "../../pages/dashboard/SavedMeals";
import Settings from "../../pages/dashboard/Settings";
import PantryPage from "../../pages/dashboard/PantryPage";

const ContentViews = ({
  showVerifyEmail,
  setShowVerifyEmail,
  showOptions,
  showGridView,
  showListView,
  setViewOptions,
  viewOptions,
  gridView,
  listView,
  dashboardRecipes,
  anchorRef,
  showNotifications,
  userData,
  showPostModal,
  theme,
  setShowSuccessSnackbar,
  setSuccessMessage,
  userPosts,
  userProfile,
  totalLikes,
  totalPosts,
  fetchUserPosts,
  fetchUserData,
  userMetrics,
  getUserMetrics,
  updateTheme,
  userId,
  showMetricsPrompt,
  setShowMetricsPrompt,
  fetchUserDashboardRecipes,
  fetchingInProgress,
  viewNotifications,
  setViewNotifications,
}) => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <Dashboard
            userData={userData}
            showOptions={showOptions}
            showGridView={showGridView}
            showListView={showListView}
            setViewOptions={setViewOptions}
            viewOptions={viewOptions}
            gridView={gridView}
            listView={listView}
            dashboardRecipes={dashboardRecipes}
            showMetricsPrompt={showMetricsPrompt}
            setShowMetricsPrompt={setShowMetricsPrompt}
            showVerifyEmail={showVerifyEmail}
            setShowVerifyEmail={setShowVerifyEmail}
            fetchingInProgress={fetchingInProgress}
          />
        }
      />
      <Route
        path="feeds"
        element={
          <Feeds
            anchorRef={anchorRef}
            showNotifications={showNotifications}
            viewNotifications={viewNotifications}
            setViewNotifications={setViewNotifications}
            currentUserId={userData._id}
            showPostModal={showPostModal}
            theme={theme}
          />
        }
      />
      <Route
        path="/profile"
        element={
          <Profile
            theme={theme}
            currentUserId={userData._id}
            setShowSuccessSnackbar={setShowSuccessSnackbar}
            setSuccessMessage={setSuccessMessage}
            userPosts={userPosts}
            userProfile={userProfile}
            totalLikes={totalLikes}
            totalPosts={totalPosts}
            fetchUserPosts={fetchUserPosts}
            userId={userId}
          />
        }
      />
      <Route
        path="/profile/:id"
        element={
          <Profile
            theme={theme}
            currentUserId={userData._id}
            setShowSuccessSnackbar={setShowSuccessSnackbar}
            setSuccessMessage={setSuccessMessage}
            userPosts={userPosts}
            userProfile={userProfile}
            totalLikes={totalLikes}
            totalPosts={totalPosts}
            fetchUserPosts={fetchUserPosts}
            userId={userId}
          />
        }
      />

      <Route
        path="saved-meals"
        element={
          <SavedMeals
            showGridView={showGridView}
            showListView={showListView}
            gridView={gridView}
            listView={listView}
            setShowSuccessSnackbar={setShowSuccessSnackbar}
            setSuccessMessage={setSuccessMessage}
          />
        }
      />
      <Route
        path="settings"
        element={
          <Settings
            showVerifyEmail={showVerifyEmail}
            userData={userData}
            refreshUserData={fetchUserData}
            userMetrics={userMetrics}
            refreshSideMenu={getUserMetrics}
            updateTheme={updateTheme}
            theme={theme}
            fetchUserDashboardRecipes={fetchUserDashboardRecipes}
          />
        }
      />
      <Route path="pantry-items" element={<PantryPage theme={theme} />} />
    </Routes>
  );
};

export default ContentViews;
