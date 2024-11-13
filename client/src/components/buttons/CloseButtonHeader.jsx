import React from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link } from "react-router-dom";

const CloseButtonHeader = ({ goBack }) => {
  return (
    <div
      style={{ paddingTop: `calc(env(safe-area-inset-top) + 16px)` }}
      className="flex justify-between items-center backdrop-blur-lg lg:backdrop-blur-0 fixed top-2 pt-10 right-0 left-0 pr-8 pl-8 lg:pl-0 pb-4 lg:pr-0 lg:right-16 lg:top-10 lg:left-24 xl:px-24 2xl:px-40"
    >
      <SiGreasyfork className="text-2xl lg:text-4xl   backdrop-blur-lg" />
      {goBack ? (
        <button
          onClick={goBack}
          className="border flex  items-center justify-center rounded-lg bg-[#d9d9d9] hover:bg-[#e0e0e0] text-black w-20 h-8 "
        >
          Close
        </button>
      ) : (
        <Link
          to={"/"}
          className="border flex  items-center justify-center rounded-lg bg-[#d9d9d9] hover:bg-[#e0e0e0] border-[#c9c7c7] text-black w-20 h-8 "
        >
          Close
        </Link>
      )}
    </div>
  );
};

export default CloseButtonHeader;
