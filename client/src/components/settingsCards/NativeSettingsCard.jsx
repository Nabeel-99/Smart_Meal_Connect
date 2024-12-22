import React from "react";
import NativeDialog from "../popupCards/NativeDialog";
import { FaGear } from "react-icons/fa6";
import { BsSliders } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import PreferenceSection from "./PreferenceSection";
import { TbFridge } from "react-icons/tb";
import PantryPage from "../../pages/dashboard/PantryPage";
import { IoIosLogOut } from "react-icons/io";
import AccountSection from "./AccountSection";

const NativeSettingsCard = ({
  theme,
  showModal,
  setShowModal,
  displayAccount,
  showAccount,
  setShowAccount,
  userData,
  updateTheme,
  fetchUserData,
  displayPreference,
  showPreference,
  setShowPreference,
  userMetrics,
  getUserMetrics,
  fetchUserDashboardRecipes,
  displayPantry,
  showPantry,
  setShowPantry,
  openDialog,
}) => {
  return (
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
            className="flex items-center border rounded-xl p-4 bg-[#dadada] dark:bg-[#161717] dark:border-[#202020] justify-between text-base w-full"
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
            className="flex items-center border rounded-xl p-4 bg-[#dadada] dark:bg-[#161717] dark:border-[#202020] justify-between text-base w-full"
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
            className="flex items-center border rounded-xl p-4 bg-[#dadada] dark:bg-[#161717] dark:border-[#202020] justify-between text-base w-full"
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
          className="mb-24 flex items-center border rounded-xl p-4 bg-[#dadada] dark:bg-[#161717] dark:border-[#202020] justify-between text-base w-full"
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
  );
};

export default NativeSettingsCard;
