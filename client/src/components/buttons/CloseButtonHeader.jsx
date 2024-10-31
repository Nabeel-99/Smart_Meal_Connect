import React from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link } from "react-router-dom";

const CloseButtonHeader = ({ goBack }) => {
  return (
    <div className="flex justify-between items-center backdrop-blur-lg lg:backdrop-blur-0 fixed right-8 lg:right-16 lg:top-12 left-8 lg:left-24">
      <SiGreasyfork className="text-2xl lg:text-4xl   backdrop-blur-lg" />
      {goBack ? (
        <button
          onClick={goBack}
          className="border flex  items-center justify-center rounded-lg bg-[#d9d9d9] text-black w-20 h-8 "
        >
          Close
        </button>
      ) : (
        <Link
          to={"/"}
          className="border flex  items-center justify-center rounded-lg bg-[#d9d9d9] text-black w-20 h-8 "
        >
          Close
        </Link>
      )}
    </div>
  );
};

export default CloseButtonHeader;
