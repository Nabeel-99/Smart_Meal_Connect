import React from "react";
import { CiBookmark, CiGrid41, CiSettings } from "react-icons/ci";
import { IoIosAddCircleOutline, IoIosLogOut } from "react-icons/io";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { mapText } from "../../../../server/utils/helper";
import { TbFridge } from "react-icons/tb";
import DialogComponent from "../popupCards/DialogComponent";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsBrightnessHigh } from "react-icons/bs";
import { FaMoon } from "react-icons/fa6";
import { LuMoonStar } from "react-icons/lu";

const SideMenu = ({
  showPreferences,
  preferences,
  userData,
  userMetrics,
  openDialog,
  showPostModal,
  theme,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="hidden lg:flex flex-col pt-6 justify-between z-30  w-64 border-r dark:border-r-[#1d1d1d] border-r-[#E0E0E0] dark:bg-[#0c0c0c] bg-[#F7F7F8]  h-full fixed ">
        <div className="flex flex-col w-full gap-8">
          <div className="flex px-5 font-semibold items-center w-full gap-2">
            <div className="w-6 h-6 rounded-full text-center flex items-center text-white justify-center bg-[#B678F0]">
              {userData.firstName.slice(0, 1)}
            </div>
            <div className="">
              {userData.firstName} {userData.lastName}
            </div>
          </div>
          <div className="flex px-3 pt-8 flex-col  pb-4 text-base font-bold gap-4">
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                location.pathname === "/dashboard"
                  ? "dark:bg-[#181818] bg-[#DADADA]"
                  : ""
              }`}
            >
              {theme === "dark" ? (
                <GoHomeFill className="w-6 text-2xl " />
              ) : (
                <GoHome className="w-6 text-2xl " />
              )}
              Dashboard
            </button>
            <button
              onClick={() => {
                navigate("/feeds");
              }}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                location.pathname === "/feeds"
                  ? "dark:bg-[#181818] bg-[#DADADA]"
                  : ""
              }`}
            >
              <CiGrid41 className="w-6 text-2xl " />
              Feeds
            </button>

            <button
              onClick={showPostModal}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 `}
            >
              <IoIosAddCircleOutline className="w-6 text-2xl" />
              Create Post
            </button>

            <button
              onClick={() => {
                navigate("/saved-meals");
              }}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                location.pathname === "/saved-meals"
                  ? "dark:bg-[#181818] bg-[#DADADA]"
                  : ""
              }`}
            >
              <CiBookmark className="w-6 text-2xl" />
              Saved Meals
            </button>
            <button
              onClick={() => {
                navigate("/pantry-items");
              }}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                location.pathname === "/pantry-items"
                  ? "dark:bg-[#181818] bg-[#DADADA]"
                  : ""
              }`}
            >
              <TbFridge className="w-6 text-2xl  text-[#404040] dark:text-[#c8c7c7]" />
              Pantry
            </button>
            <button
              onClick={() => {
                navigate("/settings");
              }}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                location.pathname === "/settings"
                  ? "dark:bg-[#181818] bg-[#DADADA]"
                  : ""
              }`}
            >
              <CiSettings className="w-6 text-2xl" />
              Settings
            </button>

            <button
              onClick={() => {
                navigate("/profile");
              }}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                location.pathname === "/profile"
                  ? "dark:bg-[#181818] bg-[#DADADA]"
                  : ""
              }`}
            >
              <div className="w-6 h-6 rounded-full text-center flex items-center justify-center text-white bg-[#B678F0]">
                {userData.firstName.slice(0, 1)}
              </div>
              Profile
            </button>
            {/* 
            {preferences && (
              <div className="flex px-3 pb-4 text-sm">
                <div className="w-5"></div>
                <ul className="flex flex-col gap-2">
                  <li>Age: {userMetrics.age}</li>
                  <li>Goal: {mapText[userMetrics.goal]}</li>
                  <li>Weight: {userMetrics.weight} kg</li>
                  <li>Height: {userMetrics.height} cm</li>
                  <li>
                    Diet:{" "}
                    {userMetrics.dietaryPreferences.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {userMetrics.dietaryPreferences.map((diet, index) => (
                          <li key={index} className="pl-1">
                            {diet}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>None</span>
                    )}
                  </li>
                  <li>Exercise Level: {mapText[userMetrics.exerciseLevel]}</li>
                </ul>
              </div>
            )} */}
          </div>
        </div>
        <div className="flex flex-col pb-10 gap-4 text-base font-bold px-3">
          <button
            onClick={openDialog}
            className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 
            `}
          >
            <IoIosLogOut className="w-6 text-2xl " />
            <div>Log out</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
