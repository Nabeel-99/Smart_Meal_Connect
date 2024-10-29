import React from "react";
import SideMenu from "./SideMenu";
import MobileHeader from "../headers/MobileHeader";
import MobileSideMenu from "./MobileSideMenu";

const MainMenu = ({
  userData,
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
  setSideMenu,
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
        showSideMenu={showSideMenu}
        sideMenu={sideMenu}
        location={location}
        anchorRef={anchorRef}
        showNotifications={showNotifications}
        viewNotifications={viewNotifications}
        setViewNotifications={setViewNotifications}
        getCurrentView={getCurrentView}
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
