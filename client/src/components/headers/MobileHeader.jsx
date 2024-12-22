import React, { useRef, useState } from "react";
import {
  FaBarsStaggered,
  FaCaretDown,
  FaGear,
  FaRegHeart,
  FaUserGear,
  FaXmark,
} from "react-icons/fa6";
import PopperComponent from "../popupCards/PopperComponent";
import MobileNotificationCard from "../notificationCards/MobileNotificationCard";
import { isNative } from "../../../apiConfig";
import { IoIosLogOut, IoIosMenu } from "react-icons/io";
import { MenuItem, MenuList } from "@mui/material";
import { TbFridge } from "react-icons/tb";
import NativeDialog from "../popupCards/NativeDialog";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsSliders } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AccountSection from "../settingsCards/AccountSection";
import PreferenceSection from "../settingsCards/PreferenceSection";
import PantryPage from "../../pages/dashboard/PantryPage";
import NativeSettingsCard from "../settingsCards/NativeSettingsCard";

const MobileHeader = ({
  showSideMenu,
  sideMenu,
  location,
  anchorRef,
  showNotifications,
  viewNotifications,
  setViewNotifications,
  getCurrentView,
  userData,
  fetchUserData,
  userMetrics,
  getUserMetrics,
  theme,
  updateTheme,
  openDialog,
  fetchUserDashboardRecipes,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showPreference, setShowPreference] = useState(false);
  const [showPantry, setShowPantry] = useState(false);
  const displayMore = () => setShowModal(true);
  const displayAccount = () => setShowAccount(true);
  const displayPreference = () => setShowPreference(true);
  const displayPantry = () => setShowPantry(true);
  const navigate = useNavigate();
  return (
    <div
      className={`lg:hidden pt-6 ${
        !isNative ? "pl-6" : "pl-2"
      } flex items-center 
       text-sm gap-4 border-b pb-3 dark:border-b-[#343333] border-b-[#E0E0E0] fixed  dark:bg-[#0c0c0c] bg-white z-50 w-full`}
    >
      <div className="flex items-center">
        {!isNative && (
          <button onClick={showSideMenu} className="">
            {sideMenu ? (
              <FaXmark className="text-2xl" />
            ) : (
              <FaBarsStaggered className="text-2xl" />
            )}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="mb-1 text-lg">{getCurrentView()}</div>
        {isNative && window.location.pathname === "/profile" && (
          <>
            <button onClick={displayMore} className="pr-4">
              <IoIosMenu className="text-3xl" />
            </button>

            <NativeSettingsCard
              theme={theme}
              showModal={showModal}
              setShowModal={setShowModal}
              displayAccount={displayAccount}
              showAccount={showAccount}
              setShowAccount={setShowAccount}
              userData={userData}
              updateTheme={updateTheme}
              fetchUserData={fetchUserData}
              displayPreference={displayPreference}
              showPreference={showPreference}
              setShowPreference={setShowPreference}
              userMetrics={userMetrics}
              getUserMetrics={getUserMetrics}
              fetchUserDashboardRecipes={fetchUserDashboardRecipes}
              displayPantry={displayPantry}
              showPantry={showPantry}
              setShowPantry={setShowPantry}
              openDialog={openDialog}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
