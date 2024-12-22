import React from "react";
import PopperComponent from "../popupCards/PopperComponent";
import { MenuItem, MenuList } from "@mui/material";
import { BsFillBrightnessHighFill, BsMoonStarsFill } from "react-icons/bs";
import { HiComputerDesktop } from "react-icons/hi2";

const ThemePopper = ({ modeRef, viewModes, setViewModes, setMode }) => {
  return (
    <PopperComponent
      anchorRef={modeRef}
      viewPopper={viewModes}
      setViewPopper={setViewModes}
    >
      <MenuList className="absolute right-0 top-10 p-4 w-40 dark:bg-[#08090a] bg-[#F7F7F8] text-black z-50 dark:text-white border dark:border-[#1d1d1d] border-[#e0e0e0] flex flex-col  gap-4 rounded-md">
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
  );
};

export default ThemePopper;
