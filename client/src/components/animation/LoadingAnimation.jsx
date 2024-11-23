import React from "react";
import { SiGreasyfork } from "react-icons/si";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen dark:bg-[#0c0c0c] bg-[#F7F7F8]">
      <SiGreasyfork className="loading-icon text-3xl xl:text-4xl" />
      <p className="app-name text-black dark:text-white">Smart Meal Connect</p>
    </div>
  );
};

export default LoadingAnimation;
