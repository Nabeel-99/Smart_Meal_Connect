import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="flex pt-8 lg:px-10 flex-col w-full px-8 animate-pulse lg:w-[550px] gap-3  ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="dark:bg-[#2e2e2e] bg-[#ededed] p-3 rounded-full"></div>
          <div className="rounded-lg dark:bg-[#2e2e2e] bg-[#ededed] w-20 lg:w-44 p-3"></div>
        </div>

        <div className="w-20 lg:w-44 dark:bg-[#2e2e2e] bg-[#ededed]  rounded p-3"></div>
      </div>
      <div className="dark:bg-[#2e2e2e] bg-[#ededed] w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-md "></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="dark:bg-[#2e2e2e] bg-[#ededed] p-3 rounded-lg"></div>
          <div className="dark:bg-[#2e2e2e] bg-[#ededed] p-3 rounded-lg"></div>
        </div>
        <div className="dark:bg-[#2e2e2e] bg-[#ededed] p-3 rounded-lg"></div>
      </div>
      <div>
        <div className="rounded-lg dark:bg-[#2e2e2e] bg-[#ededed] w-44 p-3"></div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
