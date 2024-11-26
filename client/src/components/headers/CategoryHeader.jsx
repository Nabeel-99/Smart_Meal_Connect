import React from "react";
import { LuArrowDownWideNarrow } from "react-icons/lu";
import PopperComponent from "../popupCards/PopperComponent";
import { MenuItem, MenuList } from "@mui/material";
import { CiGrid41 } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
import MobileViewOptions from "../viewCards/MobileViewOptions";

const CategoryHeader = ({
  showBreakfast,
  breakfast,
  showLunch,
  lunch,
  showDinner,
  dinner,
  anchorRef,
  showOptions,
  viewOptions,
  setViewOptions,
  showGridView,
  showListView,
}) => {
  return (
    <div className="flex items-center justify-between   lg:justify-normal gap-4">
      <div className="relative flex items-center gap-2">
        <button
          onClick={showBreakfast}
          className={` px-3 py-1  rounded-md dark:hover:bg-[#181818] hover:bg-[#dadada] ${
            breakfast
              ? "border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] border-[#e0e0e0] bg-[#dadada]  "
              : ""
          }`}
        >
          Breakfast
        </button>
        <button
          onClick={showLunch}
          className={` px-3 py-1  rounded-md dark:hover:bg-[#181818] hover:bg-[#dadada] ${
            lunch
              ? "border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] border-[#e0e0e0] bg-[#dadada] "
              : ""
          }`}
        >
          Lunch
        </button>
        <button
          onClick={showDinner}
          className={` px-3 py-1  rounded-md dark:hover:bg-[#181818] hover:bg-[#dadada] ${
            dinner
              ? "border dark:border-[#1d1d1d] dark:bg-[#2e2e2e] border-[#e0e0e0] bg-[#dadada] "
              : ""
          }`}
        >
          Dinner
        </button>
      </div>
      <MobileViewOptions
        anchorRef={anchorRef}
        showOptions={showOptions}
        viewOptions={viewOptions}
        setViewOptions={setViewOptions}
        showGridView={showGridView}
        showListView={showListView}
      />
    </div>
  );
};

export default CategoryHeader;
