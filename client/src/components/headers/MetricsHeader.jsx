import React from "react";
import MetricsBg from "../../assets/background-circle.svg";
const MetricsHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2 pt-20 text-sm">
        <div className="h-4 w-6 rounded-xl bg-[#d08824]"></div>
        <p>Metrics-based</p>
      </div>
      <div className="  w-full h-[300px] lg:h-[550px]  flex flex-col items-center">
        <h1 className="text-center text-2xl lg:text-6xl shadow-lg tracking-tighter z-10 font-semibold">
          Plan from Body Metrics
          <span className="block">to Meal Recommendations</span>
        </h1>
        <div className="hidden lg:flex absolute  top-40 left-0 bg-gradient-to-r from-[#08090a] from-15% to-transparent lg:shadow-xl lg:drop-shadow-xl h-full w-20 lg:h-3/4 lg:w-96"></div>
        <div className="hidden lg:flex absolute right-0 top-40  bg-gradient-to-l from-[#08090a] from-15% to-transparent lg:shadow-xl lg:drop-shadow-xl h-full w-20 lg:h-3/4 lg:w-96"></div>

        <div className="absolute w-screen mt-8 -top-8 lg:top-24 lg:rotate-180  md:flex -z-10 items-center justify-center">
          <img
            src={MetricsBg}
            alt=""
            className="w-[3000px] h-[600px] object-contain lg:object-fill "
          />
        </div>
      </div>
    </>
  );
};

export default MetricsHeader;
