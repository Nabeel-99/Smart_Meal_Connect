import React from "react";
import MealSkeletonLoader from "./MealSkeletonLoader";

const ProfileSkeleton = () => {
  let gridView = true;
  return (
    <div className="flex  animate-pulse flex-col w-full h-full gap-8 px-6 md:px-10 dark:text-white lg:px-20">
      <div className="flex pl-4 md:pl-52 lg:pl-24 xl:pl-64 items-center gap-6 xl:gap-10">
        <div className="h-20 w-20 md:h-32 md:w-32 xl:w-44 xl:h-44 bg-[#e0e0e0] dark:bg-[#595959] text-white rounded-full flex items-center justify-center ">
          <div className="p-2 bg-[#e0e0e0] dark:bg-[#595959] rounded"></div>
        </div>
        <div className="flex flex-col gap-2 xl:gap-4">
          <div className="p-2 bg-[#e0e0e0] dark:bg-[#595959] rounded"></div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-[#e0e0e0] dark:bg-[#595959] rounded"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-2 bg-[#e0e0e0] dark:bg-[#595959] rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MealSkeletonLoader count={3} isGridView={gridView} />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
