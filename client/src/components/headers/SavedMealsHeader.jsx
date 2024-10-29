import React from "react";
import { CiGrid41 } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";

const SavedMealsHeader = ({ showGridView, showListView }) => {
  return (
    <div className="flex gap-4 lg:items-center sticky top-[69px] z-10 pt-8 pb-4 dark:bg-[#0c0c0c] bg-[#F7F7F8] justify-between">
      <div className="flex items-center justify-between   gap-4">
        <div className="relative text-sm">Saved</div>
      </div>
      <div className="flex items-center gap-3 relative">
        <div className="flex cursor-pointer items-center text-sm gap-1">
          {/* <button onClick={showOptions} className="flex items-center gap-1">
          Sort by <MdOutlineKeyboardArrowDown />
        </button> */}
          {/* 
        {viewOptions && (
          <div className="absolute right-10 top-10 p-4 bg-[#08090a] px-6 w-44 border border-[#1d1d1d] flex flex-col gap-4 rounded-md">
            <button className="flex items-center text-sm gap-4">
              Alphabetical
            </button>
            <button className="flex items-center text-sm gap-4">
              Last Modified
            </button>
          </div>
        )} */}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={showGridView}>
            <CiGrid41 />
          </button>
          <button onClick={showListView}>
            {" "}
            <HiBars3 className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedMealsHeader;
