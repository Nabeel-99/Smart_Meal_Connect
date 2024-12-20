import React, { useState } from "react";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { IoIosAddCircleOutline, IoIosLogOut } from "react-icons/io";
import { MdDynamicFeed } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { TbFridge } from "react-icons/tb";
import { GoHome, GoHomeFill } from "react-icons/go";
import { isNative } from "../../../apiConfig";
import { mapText } from "../../utils/variables";

const MobileSideMenu = ({
  userMetrics,
  preferences,
  setSideMenu,
  openDialog,
  userData,
  showPostModal,
  theme,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {!isNative && (
        <div className="flex lg:hidden flex-col  pt-24 justify-between  w-full z-40  dark:border-r-[#1d1d1d] border-r[#E0E0E0] dark:bg-[#0c0c0c] bg-[#F7F7F8] h-full fixed ">
          <div className="flex flex-col w-full gap-2">
            <div className="flex px-5 font-semibold items-center w-full gap-2">
              <div className="w-6 h-6 rounded-full text-center flex items-center text-white justify-center bg-[#B678F0]">
                {userData.firstName.slice(0, 1)}
              </div>
              <div>
                {userData.firstName} {userData.lastName}
              </div>
            </div>
            <div className="flex px-3 pt-8 flex-col  pb-4 text-base font-bold gap-4">
              <button
                onClick={() => {
                  setSideMenu(false);
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
                  setSideMenu(false);
                  navigate("/feeds");
                }}
                className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                  location.pathname === "/feeds"
                    ? "dark:bg-[#181818] bg-[#DADADA]"
                    : ""
                }`}
              >
                <MdDynamicFeed className="w-6 text-xl " />
                Feeds
              </button>
              <button
                onClick={() => {
                  setSideMenu(false);
                  showPostModal();
                }}
                className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 `}
              >
                <IoIosAddCircleOutline className="w-6 text-xl" />
                Create Post
              </button>

              <button
                onClick={() => {
                  setSideMenu(false);
                  navigate("/saved-meals");
                }}
                className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                  location.pathname === "/saved-meals"
                    ? "dark:bg-[#181818] bg-[#DADADA]"
                    : ""
                }`}
              >
                <CiBookmark className="w-6 text-xl" />
                Saved Meals
              </button>
              <button
                onClick={() => {
                  setSideMenu(false);
                  navigate("/pantry-items");
                }}
                className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                  location.pathname === "/pantry-items"
                    ? "dark:bg-[#181818] bg-[#DADADA]"
                    : ""
                }`}
              >
                <TbFridge className="w-6 text-xl  text-[#c8c7c7]" />
                Pantry
              </button>
              <button
                onClick={() => {
                  setSideMenu(false);
                  navigate("/settings");
                }}
                className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                  location.pathname === "/settings"
                    ? "dark:bg-[#181818] bg-[#DADADA]"
                    : ""
                }`}
              >
                <CiSettings className="w-6 text-xl" />
                Settings
              </button>

              <button
                onClick={() => {
                  setSideMenu(false);
                  navigate("/profile");
                }}
                className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 ${
                  location.pathname === "/profile"
                    ? "dark:bg-[#181818] bg-[#DADADA]"
                    : ""
                }`}
              >
                <div className="w-6 h-6 rounded-full text-center text-white flex items-center justify-center bg-[#B678F0]">
                  {userData.firstName.slice(0, 1)}
                </div>
                Profile
              </button>
              {/* <button
             onClick={showPreferences}
             className="flex cursor-pointer items-center gap-2"
           >
             <svg
               className="w-6 text-xl"
               title="folder 16"
               aria-label="folder 16"
               xmlns="http://www.w3.org/2000/svg"
               width="14"
               height="14"
               viewBox="0 0 16 16"
             >
               <path
                 fill="#ffffff"
                 fillOpacity=".7"
                 fillRule="evenodd"
                 stroke="none"
                 d="M3 2H2v11h12V4H8V2zm4 2V3H3v1zM3 5v7h10V5z"
               ></path>
             </svg>
             <div>Preferences</div>
             <div className="pt-1">
               {preferences ? (
                 <MdOutlineKeyboardArrowUp />
               ) : (
                 <MdOutlineKeyboardArrowDown />
               )}
             </div>
           </button> */}
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
                    <li>
                      Exercise Level: {mapText[userMetrics.exerciseLevel]}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col pb-10 gap-4 text-base font-bold px-3">
            <button
              onClick={openDialog}
              className={`flex items-center border py-3 rounded-md border-none dark:hover:bg-[#181818] hover:bg-[#dadada] transition-all duration-300  px-2 gap-2 
           `}
            >
              <IoIosLogOut className="w-6 text-xl " />
              <div>Log out</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSideMenu;
