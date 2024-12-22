import React from "react";
import MealSkeletonLoader from "./MealSkeletonLoader";
import ProfileSkeleton from "./ProfileSkeleton";

const LayoutSkeleton = () => {
  let gridView = true;
  return (
    <div className="flex animate-pulse  dark:bg-[#0c0c0c] bg-[#F7F7F8] w-full h-full">
      <div className="w-64 hidden  lg:flex flex-col gap-14 pt-6 border-r dark:border-r-[#1d1d1d] border-r-[#E0E0E0] h-full ">
        <div className="flex flex-col gap-10 mt-20 px-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="border w-full    border-[#181818] py-4 rounded-md  dark:bg-[#181818] bg-[#dadada]"
            ></div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-16 px-6 xl:pl-8">
        <div className="border-b pt-6 h-16 dark:border-b-[#1d1d1d] border-b-[#E0E0E0] w-full px-6 ">
          {" "}
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:pl-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="border  dark:border-[#1d1d1d] border-[#e0e0e0] dark:bg-[#2e2e2e] bg-[#ededed]  transition-all duration-300 hover:text-white w-full rounded-lg h-20 xl:w-64 flex items-center justify-center gap-3"
            ></div>
          ))}
        </div>
        <div className=" rounded dark:bg-[#181818] bg-[#e0e0e0] pt-6 xl:w-96 xl:ml-8"></div>
        <div className="px-10">
          <MealSkeletonLoader count={18} isGridView={gridView} />
        </div>
      </div>
    </div>
  );
};

export default LayoutSkeleton;
