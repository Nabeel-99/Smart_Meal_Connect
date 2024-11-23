import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiGreasyfork } from "react-icons/si";
import { FaBarsStaggered, FaMoon, FaXmark } from "react-icons/fa6";
import BurgerMenu from "../menuCards/BurgerMenu";
import {
  BsFillBrightnessHighFill,
  BsMoonStarsFill,
  BsSunFill,
  BsSunset,
} from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import PopperComponent from "../popupCards/PopperComponent";
import { MenuItem, MenuList } from "@mui/material";
import { CiBrightnessUp } from "react-icons/ci";
import { HiComputerDesktop } from "react-icons/hi2";
import ThemePopper from "./ThemePopper";
import FeaturesFlyout from "../ui/FeaturesFlyout";

const Navbar = ({ userData, updateTheme }) => {
  const location = useLocation();
  const pathNames = ["/ingredients-based", "/metrics-based"];
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const navigate = useNavigate();
  const [viewModes, setViewModes] = useState(false);
  const [viewMobileModes, setViewMobileModes] = useState(false);
  const modeRef = useRef(null);
  const mobileRef = useRef(null);
  const toggleMenu = () => {
    setIsBurgerMenu(!isBurgerMenu);
  };
  const closeMenu = () => {
    setIsBurgerMenu(false);
  };
  const showModes = (e) => {
    e.stopPropagation();
    setViewModes((prev) => !prev);
  };
  const showMobileModes = () => {
    setViewMobileModes((prev) => !prev);
  };
  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);
  const setMode = (theme) => {
    updateTheme(theme);
    setViewModes(false);
    setViewMobileModes(false);
  };
  useEffect(() => {
    // handle background scrolling when burger menu is open
    if (isBurgerMenu || viewModes) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isBurgerMenu, viewModes]);

  useEffect(() => {
    setShowFeatures(false);
  }, [location.pathname]);
  return (
    <div className="flex items-center fixed  left-0 right-0 lg:px-10 xl:px-52  2xl:container 2xl:mx-auto  top-6   z-50 ">
      {showFeatures && <div className="inset-0 fixed backdrop-blur-md"></div>}
      <div
        className={`hidden  ${
          showFeatures
            ? "rounded-t-2xl border-t border-r border-l dark:border-t-[#343333] dark:border-r-[#343333] border-b-0 dark:border-l-[#343333]"
            : "rounded-2xl border-[#c5c5c5] dark:border-[#242424] backdrop-blur-lg"
        } relative lg:flex items-center z-50 justify-between bg-[#ffffffb7] dark:bg-[#0e0f1081]    gap-8 px-4 p-3 border  w-full `}
      >
        <div className="">
          <Link
            to={"/"}
            className="hidden lg:flex items-center gap-2 text-base "
          >
            {" "}
            <SiGreasyfork className="text-2xl lg:text-xl" />
            <span>Smart Meal Connect</span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-base transition-all duration-300">
          <div className="flex items-center gap-6 text-base  ">
            <div className="flex items-center gap-10 border-r-2 border-r-[#949494] dark:border-r-[#343333] pr-6">
              <Link
                to="/"
                duration={500}
                smooth="true"
                className="hover:text-[#2f44a1] dark:hover:text-[#a1afee]  cursor-pointer"
              >
                Home
              </Link>

              <div
                onMouseEnter={() => setShowFeatures(true)}
                onMouseLeave={() => setShowFeatures(false)}
                className=""
              >
                <Link className="hover:text-[#2f44a1]  dark:hover:text-[#a1afee]  cursor-pointer">
                  Features
                </Link>
                <AnimatePresence>
                  {showFeatures && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: showFeatures ? "24rem" : 0,
                        opacity: showFeatures ? 1 : 0,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className={` py-6  ${
                        showFeatures
                          ? "absolute lg:flex left-0 right-0 border border-t-0  h-96 w-full   dark:border-b-[#343333] dark:border-r-[#343333] dark:border-l-[#343333]"
                          : "lg:hidden"
                      }  top-full bg-[#ffffffb7] dark:bg-[#0e0f1081]  justify-between  left-0 right-0   gap-8 px-4 p-3  rounded-b-2xl w-full `}
                    >
                      <div className="absolute -top-4 w-full left-0 p-3 right-0 bg-transparent h-4"></div>
                      <FeaturesFlyout />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                className="hover:text-[#2f44a1] dark:hover:text-[#a1afee]  cursor-pointer"
                to={"/about"}
              >
                About
              </Link>
            </div>

            {isLoggedIn ? (
              <div className="hidden lg:flex items-center gap-6">
                <div>
                  <button ref={modeRef} onClick={showModes}>
                    <BsMoonStarsFill />
                  </button>
                  <PopperComponent
                    anchorRef={modeRef}
                    viewPopper={viewModes}
                    setViewPopper={setViewModes}
                  >
                    <MenuList className="absolute right-0 top-10 p-4 w-40 dark:bg-[#08090a] bg-[#F7F7F8] text-black dark:text-white border dark:border-[#1d1d1d] border-[#e0e0e0] flex flex-col z-40 gap-4 rounded-md">
                      <MenuItem
                        onClick={() => {
                          setMode("dark");
                        }}
                        className="flex items-center text-sm gap-4 hover:dark:bg-[#171717] "
                      >
                        <BsMoonStarsFill />
                        Dark
                      </MenuItem>
                      <MenuItem
                        onClick={() => setMode("light")}
                        className="flex items-center text-sm gap-4 hover:dark:bg-[#171717] "
                      >
                        <BsFillBrightnessHighFill />
                        Light
                      </MenuItem>
                      <MenuItem
                        onClick={() => setMode("system")}
                        className="flex items-center text-sm gap-4 hover:dark:bg-[#171717] "
                      >
                        <HiComputerDesktop />
                        System
                      </MenuItem>
                    </MenuList>
                  </PopperComponent>
                </div>
                <Link
                  to={"/dashboard"}
                  className="hidden lg:flex hover:text-[#2f44a1] dark:hover:text-[#a1afee] cursor-pointer"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center   gap-6 ">
                <div>
                  <button ref={modeRef} onClick={showModes}>
                    <BsMoonStarsFill />
                  </button>
                  <ThemePopper
                    modeRef={modeRef}
                    viewModes={viewModes}
                    setViewModes={setViewModes}
                    setMode={setMode}
                  />
                </div>
                <Link
                  to={"/login"}
                  className="border flex items-center justify-center transition-all duration-200 border-[#cecece]  rounded-lg bg-[#e8e8e8]  hover:bg-[#000000] hover:border-[#343333] hover:text-white dark:border-[#1d1d1d] dark:bg-[#29292a] dark:hover:bg-[#202021] px-4 py-1 "
                >
                  Log in
                </Link>
                <Link
                  to={"/sign-up"}
                  className="border flex items-center justify-center transition-all duration-200 rounded-lg border-[#cecece]  bg-[#d9d9d9] text-black px-4 py-1 hover:bg-[#e8e8e8]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* burger menu*/}
      <div
        style={{ paddingTop: `calc(env(safe-area-inset-top) + 16px)` }}
        className={`lg:hidden fixed top-0 px-4  w-full z-50 flex items-center justify-between ${
          isBurgerMenu ? "bg-[#08090a]" : ""
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
      {isBurgerMenu && <BurgerMenu closeMenu={closeMenu} />}
    </div>
    // <div className="flex items-center fixed w-full px-40">
    //   <div className="border p-6 rounded-full w-full ">hey there</div>
    // </div>
  );
};

export default Navbar;
