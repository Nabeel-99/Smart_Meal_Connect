import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxCaretDown } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

const BurgerMenu = ({ closeMenu }) => {
  const [features, setFeatures] = useState(false);
  const showDropdown = () => {
    setFeatures(!features);
  };
  return (
    <div
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
      className=" z-40 fixed inset-0 top-16 bg-[#e0e0e0] dark:bg-[#08090a] xl:hidden"
    >
      <div className="flex text-lg flex-col gap-4 items-start h-full justify-between px-8 pt-6">
        <div className="flex flex-col gap-4">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <button className="flex items-center gap-4" onClick={showDropdown}>
            Features <RxCaretDown className="text-xl" />
          </button>
          <AnimatePresence>
            {features && (
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                exit={{ y: -40, opacity: 0 }}
                className="flex flex-col gap-4 text-lg"
              >
                <Link to="/ingredients-based" onClick={closeMenu}>
                  Ingredients Based
                </Link>
                <Link to="/metrics-based" onClick={closeMenu}>
                  Metrics Based
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
