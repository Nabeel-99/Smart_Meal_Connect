import React from "react";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import PopperComponent from "../popupCards/PopperComponent";
import { MenuItem, MenuList } from "@mui/material";
import { CiGrid41 } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";

const MobileViewOptions = ({
  anchorRef,
  showOptions,
  viewOptions,
  setViewOptions,
  showGridView,
  showListView,
}) => {
  return (
    <div className="lg:hidden flex items-center  gap-2">
      <button ref={anchorRef} onClick={showOptions}>
        <LuArrowDownWideNarrow />
      </button>
      {viewOptions && (
        <PopperComponent
          viewPopper={viewOptions}
          anchorRef={anchorRef}
          setViewPopper={setViewOptions}
        >
          <MenuList className="absolute right-2 top-8 p-4 dark:bg-[#08090a] bg-[#F7F7F8] text-black dark:text-white border dark:border-[#1d1d1d] border-[#e0e0e0] flex flex-col gap-4 rounded-md">
            <MenuItem
              onClick={showGridView}
              className="flex items-center text-sm gap-4"
            >
              <CiGrid41 />
              Grid view
            </MenuItem>
            <MenuItem
              onClick={showListView}
              className="flex items-center text-sm gap-4"
            >
              <HiBars3 />
              List View
            </MenuItem>
          </MenuList>
        </PopperComponent>
      )}
    </div>
  );
};

export default MobileViewOptions;
