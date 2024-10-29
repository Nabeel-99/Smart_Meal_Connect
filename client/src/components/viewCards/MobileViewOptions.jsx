import React from "react";
import { CiGrid41 } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";

const MobileViewOptions = ({ showGridView, showListView }) => {
  return (
    <div className="hidden lg:flex items-center gap-2">
      <button onClick={showGridView}>
        <CiGrid41 />
      </button>
      <button onClick={showListView}>
        {" "}
        <HiBars3 className="text-lg" />
      </button>
    </div>
  );
};

export default MobileViewOptions;
