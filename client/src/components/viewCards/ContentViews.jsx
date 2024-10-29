import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Feeds from "../../pages/dashboard/Feeds";
import Profile from "../../pages/dashboard/Profile";
import SavedMeals from "../../pages/dashboard/SavedMeals";
import Settings from "../../pages/dashboard/Settings";
import PantryPage from "../../pages/dashboard/PantryPage";

const ContentViews = ({
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
}) => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <Dashboard
            showOptions={showOptions}
            showGridView={showGridView}
            showListView={showListView}
            setViewOptions={setViewOptions}
            viewOptions={viewOptions}
            gridView={gridView}
            listView={listView}
            dashboardRecipes={dashboardRecipes}
          />
        }
      />
      <Route
        path="feeds"
        element={
          <Feeds
            anchorRef={anchorRef}
            showNotifications={showNotifications}
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
      <Route path="/profile/:id" element={<Profile />} />

      <Route
        path="saved-meals"
        element={
          <SavedMeals
            showGridView={showGridView}
            showListView={showListView}
            gridView={gridView}
            listView={listView}
          />
        }
      />
      <Route
        path="settings"
        element={
          <Settings
            userData={userData}
            refreshUserData={fetchUserData}
            userMetrics={userMetrics}
            refreshSideMenu={getUserMetrics}
            updateTheme={updateTheme}
            theme={theme}
          />
        }
      />
      <Route path="pantry-items" element={<PantryPage theme={theme} />} />
    </Routes>
  );
};

export default ContentViews;
