import React from "react";
import { BsFillBrightnessHighFill, BsMoonStarsFill } from "react-icons/bs";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { HiComputerDesktop } from "react-icons/hi2";
import { SiGreasyfork } from "react-icons/si";
import { Link } from "react-router-dom";

const MobileNavbar = ({
  isBurgerMenu,
  isLoggedIn,
  showMobileModes,
  viewMobileModes,
  setMode,
  toggleMenu,
}) => {
  return (
    <div
      style={{ paddingTop: `calc(env(safe-area-inset-top) + 16px)` }}
      className={`lg:hidden fixed top-0 px-4  w-full z-50 flex items-center justify-between ${
        isBurgerMenu ? "bg-[#e0e0e0] dark:bg-[#08090a]" : ""
      }  backdrop-blur-lg pb-4`}
    >
      <div className="pl-4">
        <Link to={"/"} className="">
          {" "}
          <SiGreasyfork className="text-2xl lg:text-4xl" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link
            to={"/dashboard"}
            className="border flex items-center justify-center rounded-md bg-[#d9d9d9] text-black px-6 h-8 "
          >
            Dashboard
          </Link>
        ) : (
          <div className="relative flex items-center gap-2">
            <button className="" onClick={showMobileModes}>
              <BsMoonStarsFill />
            </button>
            {viewMobileModes && (
              <div className="absolute left-0 top-10 p-4 w-40 dark:bg-[#08090a] bg-[#F7F7F8] text-black z-50 dark:text-white border dark:border-[#1d1d1d] border-[#e0e0e0] flex flex-col  gap-4 rounded-md">
                <button
                  onClick={() => {
                    setMode("dark");
                  }}
                  className="flex items-center text-sm gap-4 hover:dark:bg-[#171717] "
                >
                  <BsMoonStarsFill />
                  Dark
                </button>
                <button
                  onClick={() => setMode("light")}
                  className="flex items-center text-sm gap-4 hover:dark:bg-[#171717] "
                >
                  <BsFillBrightnessHighFill />
                  Light
                </button>
                <button
                  onClick={() => setMode("system")}
                  className="flex items-center text-sm gap-4 hover:dark:bg-[#171717] "
                >
                  <HiComputerDesktop />
                  System
                </button>
              </div>
            )}
            <Link
              to={"/login"}
              className="border flex items-center justify-center text-white rounded-lg border-[#1d1d1d] bg-[#29292a] w-20 h-8 "
            >
              Log in
            </Link>
            <Link
              to={"/sign-up"}
              className="border flex items-center justify-center rounded-lg bg-[#d9d9d9] text-black w-20 h-8 "
            >
              Sign Up
            </Link>
          </div>
        )}

        <button onClick={toggleMenu} className="">
          {isBurgerMenu ? (
            <FaXmark className="text-2xl" />
          ) : (
            <FaBarsStaggered className="text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileNavbar;
