import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BurgerMenu from "../menuCards/BurgerMenu";
import MobileNavbar from "./MobileNavbar";
import LargerNavbar from "./LargerNavbar";

const Navbar = ({ userData, updateTheme, setTheme }) => {
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
    updateTheme(theme, setTheme);
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
      {/* Bigger Screen Navbar */}
      <LargerNavbar
        setShowFeatures={setShowFeatures}
        setMode={setMode}
        showFeatures={showFeatures}
        isLoggedIn={isLoggedIn}
        modeRef={modeRef}
        showModes={showModes}
        viewModes={viewModes}
        setViewModes={setViewModes}
      />

      {/* burger menu*/}
      <MobileNavbar
        isBurgerMenu={isBurgerMenu}
        isLoggedIn={isLoggedIn}
        showMobileModes={showMobileModes}
        viewMobileModes={viewMobileModes}
        setMode={setMode}
        toggleMenu={toggleMenu}
      />
      {isBurgerMenu && <BurgerMenu closeMenu={closeMenu} />}
    </div>
  );
};

export default Navbar;
