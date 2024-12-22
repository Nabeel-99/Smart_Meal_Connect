import React from "react";
import { ImSpinner6 } from "react-icons/im";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full xl:w-[750px] 2xl:w-[850px]">
      <ImSpinner6 className="text-2xl spin" />
    </div>
  );
};

export default Spinner;
