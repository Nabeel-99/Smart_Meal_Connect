import React from "react";
import metricsImgOne from "../../assets/metric.png";
import metricsImgTwo from "../../assets/rate.png";
import { motion } from "framer-motion";
import FadeInSection from "../animation/FadeInSection";

const MetricsHeader = () => {
  return (
    <>
      <div className=" relative w-full flex flex-col items-center gap-4">
        <motion.div
          initial={{ left: "25%", opacity: 0 }}
          animate={{ left: "2%", opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-24"
        >
          <img
            src={metricsImgOne}
            alt=""
            className="hidden lg:block lg:w-72 p-4 rounded-xl  backdrop-blur-md "
          />
        </motion.div>
        <motion.div
          initial={{ right: "25%", opacity: 0 }}
          animate={{ right: "2%", opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-24"
        >
          <div className="hidden h-[21rem] bg-[#ececec] shadow-md dark:bg-[#1e1e1e] lg:flex flex-col gap-2 p-4 rounded-xl">
            <img
              src={metricsImgTwo}
              alt=""
              className="hidden lg:block xl:w-64 "
            />
            <div className="font-bold text-2xl">Adjust your meals</div>
            <div className="text-sm">Eat and grow healthy</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: "20%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-2 pt-20 lg:pt-44 text-sm"
        >
          <div className="h-4 w-6 rounded-xl bg-[#d08824]"></div>
          <p>Metrics-based</p>
        </motion.div>
        <motion.div
          initial={{ translateY: "20%", opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.25, 1, 0.5, 1] }}
          className="  w-full flex  flex-col items-center"
        >
          <FadeInSection>
            <h1 className="text-center text-2xl lg:text-6xl  tracking-tighter z-10 font-semibold">
              Plan from Body Metrics
              <span className="block">to Meal Recommendations</span>
            </h1>
          </FadeInSection>
        </motion.div>
      </div>
    </>
  );
};

export default MetricsHeader;
