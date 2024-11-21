import React from "react";
const MetricsHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2 pt-20 lg:pt-44 text-sm">
        <div className="h-4 w-6 rounded-xl bg-[#d08824]"></div>
        <p>Metrics-based</p>
      </div>
      <div className="  w-full flex flex-col items-center">
        <h1 className="text-center text-2xl lg:text-6xl  tracking-tighter z-10 font-semibold">
          Plan from Body Metrics
          <span className="block">to Meal Recommendations</span>
        </h1>
      </div>
    </>
  );
};

export default MetricsHeader;
