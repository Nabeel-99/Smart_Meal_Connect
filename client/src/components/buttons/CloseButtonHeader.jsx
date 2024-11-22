import React from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link } from "react-router-dom";

const CloseButtonHeader = ({ goBack }) => {
  return (
    <div
      style={{ paddingTop: `calc(env(safe-area-inset-top) + 16px)` }}
      className="flex justify-between  z-50 2xl:container 2xl:mx-auto items-center backdrop-blur-lg lg:backdrop-blur-0 fixed top-0 pt-10 right-0 left-0 pr-8 pl-8 lg:pl-0 pb-4 lg:pr-0 lg:right-16 lg:top-10 lg:left-24 xl:px-24 2xl:px-40"
    >
      <SiGreasyfork className="text-2xl lg:text-4xl z-50   backdrop-blur-lg" />
      {goBack ? (
        <button
          onClick={goBack}
          className="border flex  bg-[#282828] hover:bg-black text-white dark:text-black items-center justify-center rounded-lg dark:bg-[#d9d9d9] dark:hover:bg-[#e0e0e0]  w-20 h-8 "
        >
          Close
        </button>
      ) : (
        <Link
          to={"/"}
          className="border flex  bg-[#282828] hover:bg-black text-white dark:text-black items-center justify-center rounded-lg dark:bg-[#d9d9d9] dark:hover:bg-[#e0e0e0]  w-20 h-8 "
        >
          Close
        </Link>
      )}
    </div>
  );
};

export default CloseButtonHeader;
