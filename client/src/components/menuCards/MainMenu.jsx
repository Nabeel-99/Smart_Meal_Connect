import React from "react";
import SideMenu from "./SideMenu";
import MobileHeader from "../headers/MobileHeader";
import MobileSideMenu from "./MobileSideMenu";

const MainMenu = ({
  userData,
  updateTheme,
  userMetrics,
  theme,
  showPreferences,
  preferences,
  openDialog,
  showPostModal,
  showSideMenu,
  sideMenu,
  location,
  anchorRef,
  showNotifications,
  viewNotifications,
  setViewNotifications,
  getCurrentView,
  getUserMetrics,
  setSideMenu,
  fetchUserData,
  fetchUserDashboardRecipes,
}) => {
  return (
    <>
      {/* side Menu */}
      {userData && userMetrics && (
        <SideMenu
          theme={theme}
          userData={userData}
          userMetrics={userMetrics}
          showPreferences={showPreferences}
          preferences={preferences}
          openDialog={openDialog}
          showPostModal={showPostModal}
        />
      )}

      {/* mobile header */}
      <MobileHeader
        userData={userData}
        userMetrics={userMetrics}
        theme={theme}
        openDialog={openDialog}
        getUserMetrics={getUserMetrics}
        showSideMenu={showSideMenu}
        sideMenu={sideMenu}
        location={location}
        anchorRef={anchorRef}
        showNotifications={showNotifications}
        viewNotifications={viewNotifications}
        setViewNotifications={setViewNotifications}
        getCurrentView={getCurrentView}
        fetchUserData={fetchUserData}
        updateTheme={updateTheme}
        fetchUserDashboardRecipes={fetchUserDashboardRecipes}
      />
      {/* mobile side menu */}
      {sideMenu && userData && userMetrics && (
        <MobileSideMenu
          theme={theme}
          userData={userData}
          userMetrics={userMetrics}
          showPreferences={showPreferences}
          preferences={preferences}
          setSideMenu={setSideMenu}
          openDialog={openDialog}
          showPostModal={showPostModal}
        />
      )}
    </>
  );
};

export default MainMenu;
