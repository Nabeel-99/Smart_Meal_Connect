import React from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link } from "react-router-dom";

const IngredientsMetricsButtons = () => {
  return (
    <div className="flex flex-col gap-5  md:flex-row w-full items-center lg:gap-10 ">
      <Link
        to={"/ingredients-based"}
        className="border dark:border-[#1d1d1d] border-[#e0e0e0] dark:bg-[#2e2e2e] bg-[#ededed] dark:hover:bg-[#5a4bc8] hover:bg-[#5a4bc8] transition-all duration-300 hover:text-white w-full rounded-lg h-20 xl:w-64 flex items-center justify-center gap-3"
      >
        <SiGreasyfork className="text-3xl " />
        <div className="font-semibold">Get Meal By Ingredients</div>
      </Link>
      <Link
        to={"/metrics-based"}
        className="border dark:border-[#1d1d1d] border-[#e0e0e0] dark:bg-[#2e2e2e] bg-[#ededed] dark:hover:bg-[#d08824]  hover:bg-[#d08824] transition-all duration-300 hover:text-white w-full rounded-lg h-20 xl:w-64 flex items-center justify-center gap-3"
      >
        <SiGreasyfork className="text-3xl" />
        <div className="font-semibold">Get Meal By Body Metrics</div>
      </Link>
    </div>
  );
};

export default IngredientsMetricsButtons;
