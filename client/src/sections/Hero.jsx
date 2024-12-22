import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import ingredients from "../assets/recipe-based.png";
import metrics from "../assets/body-metrics.jpeg";
import GridCard from "../components/viewCards/GridCard";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div
      id="/"
      className="bg-hero  h-full pt-44 flex flex-col gap-2 justify-center items-center"
    >
      <motion.h1
        className="text-4xl md:text-6xl xl:text-8xl font-bold text-center tracking-tight"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.4, 1, 0.8, 1] }}
      >
        Smart <span className="block">Meal Connect</span>
      </motion.h1>

      <motion.p
        className="text-center px-10 lg:px-0 text-sm lg:text-xl dark:text-[#A3A3A3]"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.25, 1, 0.5, 1] }}
      >
        Discover personalized recipes and connect with a community{" "}
        <span className="lg:block">to share your favorite dishes</span>
      </motion.p>

      <motion.div
        className="relative pt-10 bg-gradient-to-b w-full pb-9"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-8 lg:px-0">
          <GridCard
            header={"Get recipes based on Ingredients"}
            image={ingredients}
            description={
              "Easily get meal suggestions by entering your available ingredients. Our tool helps you find meals that make the most of what you have."
            }
            to={"/ingredients-based"}
          />
          <GridCard
            header={"Get recipes based on Body Metrics"}
            image={metrics}
            description={`Adjust your meals by entering your body metrics. Our tool
              will recommend meals that aligns with your fitness goals.`}
            to={"/metrics-based"}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
