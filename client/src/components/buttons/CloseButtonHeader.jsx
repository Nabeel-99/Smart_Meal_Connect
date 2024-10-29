import React from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link } from "react-router-dom";

const CloseButtonHeader = () => {
  return (
    <div className="flex justify-between items-center backdrop-blur-lg  fixed right-8 lg:right-16 lg:top-12 left-8 lg:left-24">
      <SiGreasyfork className="text-2xl lg:text-4xl   backdrop-blur-lg" />
      <Link
        to={"/"}
        className="border flex  items-center justify-center rounded-lg bg-[#d9d9d9] text-black w-20 h-8 "
      >
        Close
      </Link>
    </div>
  );
};

export default CloseButtonHeader;
