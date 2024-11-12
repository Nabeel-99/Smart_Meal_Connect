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
import NativeDialog from "../NativeDialog";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsSliders } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AccountSection from "../settingsCards/AccountSection";
import PreferenceSection from "../settingsCards/PreferenceSection";
import PantryPage from "../../pages/dashboard/PantryPage";

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
      className={`lg:hidden pt-6 pl-6 flex items-center 
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
      <div className="flex items-center justify-between w-full">
        <div className="mb-1 text-lg">{getCurrentView()}</div>
        {isNative && window.location.pathname === "/profile" && (
          <>
            <button onClick={displayMore} className="pr-4">
              <IoIosMenu className="text-3xl" />
            </button>

            <NativeDialog
              theme={theme}
              showModal={showModal}
              setShowModal={setShowModal}
              direction={"left"}
              title={"Settings"}
            >
              <div className="w-full h-full flex flex-col items-start justify-between gap-4 p-4">
                <div className="flex flex-col h-full w-full gap-4 ">
                  <button
                    onClick={displayAccount}
                    className="flex items-center justify-between text-base w-full"
                  >
                    <div className="flex items-center gap-3">
                      <span>
                        <FaGear />
                      </span>
                      Account{" "}
                    </div>
                    <span>
                      <MdOutlineKeyboardArrowRight className="text-xl" />
                    </span>
                  </button>
                  <NativeDialog
                    theme={theme}
                    showModal={showAccount}
                    direction={"left"}
                    setShowModal={setShowAccount}
                    title={"Account Settings"}
                  >
                    <div className="p-8 pt-10 ">
                      <AccountSection
                        userData={userData}
                        theme={theme}
                        updateTheme={updateTheme}
                        refreshUserData={fetchUserData}
                      />
                    </div>
                  </NativeDialog>
                  <button
                    onClick={displayPreference}
                    className="flex items-center justify-between text-base w-full"
                  >
                    {" "}
                    <div className="flex items-center gap-3">
                      <span>
                        <BsSliders />
                      </span>
                      Preferences{" "}
                    </div>
                    <span>
                      <MdOutlineKeyboardArrowRight className="text-xl" />
                    </span>
                  </button>
                  <NativeDialog
                    theme={theme}
                    showModal={showPreference}
                    direction={"left"}
                    setShowModal={setShowPreference}
                    title={"Preferences"}
                  >
                    <div className="p-8 pt-10 ">
                      <PreferenceSection
                        userMetrics={userMetrics}
                        refreshSideMenu={getUserMetrics}
                        fetchUserDashboardRecipes={fetchUserDashboardRecipes}
                      />
                    </div>
                  </NativeDialog>
                  <button
                    onClick={displayPantry}
                    className="flex items-center justify-between text-base w-full"
                  >
                    {" "}
                    <div className="flex items-center gap-3">
                      <span>
                        <TbFridge />
                      </span>
                      Pantry{" "}
                    </div>
                    <span>
                      <MdOutlineKeyboardArrowRight className="text-xl" />
                    </span>
                  </button>
                  <NativeDialog
                    theme={theme}
                    showModal={showPantry}
                    direction={"left"}
                    setShowModal={setShowPantry}
                    title={"Pantry"}
                  >
                    <div className="p-8 pt-10 ">
                      <PantryPage theme={theme} />
                    </div>
                  </NativeDialog>
                </div>

                <button
                  onClick={openDialog}
                  className="mb-24 flex items-center justify-between text-base w-full"
                >
                  {" "}
                  <div className="flex items-center gap-3">
                    <span>
                      <IoIosLogOut />
                    </span>
                    Logout{" "}
                  </div>
                </button>
              </div>
            </NativeDialog>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
