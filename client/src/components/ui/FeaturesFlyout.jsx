import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import metricsImg from "../../assets/metricsBar.avif";

import {
  FaBowlRice,
  FaCheese,
  FaDrumstickBite,
  FaFish,
  FaIceCream,
  FaPepperHot,
  FaPizzaSlice,
} from "react-icons/fa6";
import {
  FaAppleAlt,
  FaCarrot,
  FaCocktail,
  FaHamburger,
  FaLemon,
} from "react-icons/fa";

const FeaturesFlyout = () => {
  const items = [
    { name: <FaFish />, color: "aqua" },
    { name: <FaAppleAlt />, color: "orange" },
    { name: <FaCarrot />, color: "orange" },
    { name: <FaLemon />, color: "yellow" },
    { name: <FaBowlRice />, color: "red" },
    { name: <FaHamburger />, color: "orange" },
    { name: <FaDrumstickBite />, color: "orange" },
    { name: <FaPizzaSlice />, color: "orange" },
    { name: <FaCheese />, color: "yellow" },
    { name: <FaPepperHot />, color: "red" },
    { name: <FaIceCream />, color: "pink" },
    { name: <FaCocktail />, color: "green" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex gap-10"
    >
      <Link
        to={"/ingredients-based"}
        className="shadow-sm group  opacity-100 hover:opacity-100 z-50  transition-all duration-100 ease-in-out rounded-xl relative p-3 w-80 bg-[#e0e0e0] hover:bg-[#dadada] dark:bg-[#232326] dark:hover:bg-[#2e2e32] h-80 max-h-96 overflow-hidden hide-scrollbar"
      >
        <div className="flex flex-col justify-between  h-full text-sm">
          <div>
            <p className="font-bold">Ingredients Based</p>
            <p className="opacity-80 group-hover:opacity-100">
              Get meal recommendations based on{" "}
              <span className="block">your available ingredients</span>{" "}
            </p>
          </div>
          {/* <img
            src={foodIngredient}
            className="h-44 object-cover rounded-2xl  opacity-50 group-hover:opacity-100 w-full"
          /> */}
          <div className="absolute top-20 p-2 left-0 right-0 grid grid-cols-4 mask-marquee opacity-80 group-hover:opacity-100 place-content-center  place-items-center gap-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl shadow-md  dark:bg-[#414142] bg-white w-14 h-14  flex items-center justify-center"
                style={{ color: item.color, fontSize: "2rem" }}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className=" flex items-end justify-end">
            <div
              to={"/metrics-based"}
              className="border border-[#dadada] bg-[#c2c2c2] hover:bg-[#cfcfcf] dark:shadow-lg z-20 px-4 py-2 dark:border-[#232326] dark:border-0 rounded-xl dark:bg-[#3d3d3d] dark:hover:bg-[#474747] p-1"
            >
              See more
            </div>
          </div>
        </div>
      </Link>
      <Link
        to={"/metrics-based"}
        className="shadow-sm group  opacity-100 hover:opacity-100 z-50  transition-all duration-100 ease-in-out rounded-xl relative p-3 w-80 bg-[#e0e0e0] hover:bg-[#dadada] dark:bg-[#232326] dark:hover:bg-[#2e2e32] h-80 max-h-96 overflow-hidden hide-scrollbar"
      >
        <div className="flex flex-col justify-between  h-full text-sm">
          <div>
            <p className="font-bold">Metrics Based</p>
            <p className="opacity-80 group-hover:opacity-100">
              Get meal recommendations based on{" "}
              <span className="block">your body metrics</span>{" "}
            </p>
          </div>
          <div className="absolute top-20 left-0 right-0">
            <img
              src={metricsImg}
              className="h-44 filter invert dark:invert-0 object-cover rounded-2xl  opacity-50 group-hover:opacity-100 w-full"
            />
          </div>

          <div className=" flex items-end justify-end">
            <div
              to={"/metrics-based"}
              className="border border-[#dadada] bg-[#c2c2c2] hover:bg-[#cfcfcf] dark:shadow-lg z-20 px-4 py-2 dark:border-[#232326] dark:border-0 rounded-xl dark:bg-[#3d3d3d] dark:hover:bg-[#474747] p-1"
            >
              See more
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturesFlyout;
