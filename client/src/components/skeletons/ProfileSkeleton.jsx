import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex  animate-pulse flex-col w-full h-full gap-8 px-6  dark:text-white">
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
      <div className="flex  text-sm xl:text-base items-center gap-2 justify-center " />
      <div className="grid grid-cols-3 2xl:grid-cols-4 w-full gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className={` bg-[#595959]  h-28 w-full md:h-52 lg:h-44 xl:h-80 2xl:h-96 xl:w-full border border-[#7d7d7d]  duration-1000 ease-in-out rounded-2xl`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
