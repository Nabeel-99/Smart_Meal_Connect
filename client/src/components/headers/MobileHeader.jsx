import React from "react";
import { FaBarsStaggered, FaRegHeart, FaXmark } from "react-icons/fa6";
import PopperComponent from "../popupCards/PopperComponent";
import MobileNotificationCard from "../notificationCards/MobileNotificationCard";

const MobileHeader = ({
  showSideMenu,
  sideMenu,
  location,
  anchorRef,
  showNotifications,
  viewNotifications,
  setViewNotifications,
  getCurrentView,
}) => {
  return (
    <div className="lg:hidden pt-6 pl-6 flex items-center text-sm gap-4 border-b pb-3 dark:border-b-[#343333] border-b-[#E0E0E0] fixed  dark:bg-[#0c0c0c] bg-white z-50 w-full">
      <div className="flex items-center">
        <button onClick={showSideMenu} className="">
          {sideMenu ? (
            <FaXmark className="text-2xl" />
          ) : (
            <FaBarsStaggered className="text-2xl" />
          )}
        </button>
        {location.pathname === "/feeds" && (
          <button
            ref={anchorRef}
            onClick={showNotifications}
            className="fixed right-5"
          >
            <FaRegHeart className="text-2xl" />
          </button>
        )}
        {viewNotifications && (
          <PopperComponent
            viewPopper={viewNotifications}
            anchorRef={anchorRef}
            setViewPopper={setViewNotifications}
          >
            <MobileNotificationCard />
          </PopperComponent>
        )}
      </div>
      <div className="mb-1 text-lg">{getCurrentView()}</div>
    </div>
  );
};

export default MobileHeader;
