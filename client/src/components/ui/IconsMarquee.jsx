import React from "react";
import {
  FaAppleAlt,
  FaCarrot,
  FaCocktail,
  FaHamburger,
  FaLemon,
} from "react-icons/fa";
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
  GiAvocado,
  GiCabbage,
  GiChickenOven,
  GiChiliPepper,
  GiCupcake,
  GiGrapes,
  GiMeat,
  GiPeach,
  GiPineapple,
  GiSteak,
  GiStrawberry,
  GiTomato,
  GiWatermelon,
} from "react-icons/gi";
import MarqueeItems from "./MarqueeItems";

const IconsMarquee = () => {
  const firstMarquee = [
    { name: <GiSteak />, color: "brown" },
    { name: <FaFish />, color: "blue" },
    { name: <FaAppleAlt />, color: "orange" },
    { name: <FaCarrot />, color: "orange" },
    { name: <FaLemon />, color: "yellow" },
    { name: <GiCabbage />, color: "green" },
    { name: <FaBowlRice />, color: "white" },
    { name: <FaHamburger />, color: "orange" },
    { name: <FaFish />, color: "blue" },
    { name: <FaPizzaSlice />, color: "orange" },
    { name: <FaCheese />, color: "yellow" },
    { name: <FaPepperHot />, color: "red" },
    { name: <FaIceCream />, color: "pink" },
    { name: <FaCocktail />, color: "green" },
    { name: <FaDrumstickBite />, color: "brown" },
    { name: <GiChickenOven />, color: "brown" },
    { name: <GiChickenOven />, color: "brown" },
    { name: <GiChiliPepper />, color: "red" },
    { name: <GiAvocado />, color: "green" },
    { name: <GiTomato />, color: "red" },
    { name: <GiWatermelon />, color: "green" },
  ];

  const secondMarquee = [
    { name: <GiChickenOven />, color: "brown" },
    { name: <GiChiliPepper />, color: "red" },
    { name: <GiAvocado />, color: "green" },
    { name: <GiTomato />, color: "red" },
    { name: <GiWatermelon />, color: "green" },
    { name: <GiStrawberry />, color: "red" },
    { name: <GiGrapes />, color: "purple" },
    { name: <GiPeach />, color: "orange" },
    { name: <GiPineapple />, color: "yellow" },
    { name: <GiCupcake />, color: "pink" },
    { name: <GiMeat />, color: "brown" },
    { name: <GiSteak />, color: "brown" },
    { name: <FaFish />, color: "blue" },
    { name: <FaPizzaSlice />, color: "orange" },
    { name: <FaCheese />, color: "yellow" },
    { name: <FaPepperHot />, color: "red" },
    { name: <FaIceCream />, color: "pink" },
    { name: <FaCocktail />, color: "green" },
    { name: <FaDrumstickBite />, color: "brown" },
    { name: <GiChickenOven />, color: "brown" },
    { name: <GiChiliPepper />, color: "red" },
    { name: <GiAvocado />, color: "green" },
    { name: <GiTomato />, color: "red" },
    { name: <GiWatermelon />, color: "green" },
    { name: <GiStrawberry />, color: "red" },
  ];
  const thirdMarquee = [
    { name: <GiPineapple />, color: "yellow" },
    { name: <GiCupcake />, color: "pink" },
    { name: <GiMeat />, color: "brown" },
    { name: <GiCabbage />, color: "green" },
    { name: <FaBowlRice />, color: "white" },
    { name: <FaHamburger />, color: "orange" },
    { name: <FaFish />, color: "blue" },
    { name: <FaPizzaSlice />, color: "orange" },
    { name: <FaCheese />, color: "yellow" },
    { name: <FaPepperHot />, color: "red" },
    { name: <FaIceCream />, color: "pink" },
    { name: <FaCocktail />, color: "green" },
    { name: <FaDrumstickBite />, color: "brown" },
    { name: <GiChickenOven />, color: "brown" },
    { name: <GiChickenOven />, color: "brown" },
    { name: <GiAvocado />, color: "green" },
    { name: <GiTomato />, color: "red" },
    { name: <GiWatermelon />, color: "green" },
    { name: <GiStrawberry />, color: "red" },
    { name: <GiGrapes />, color: "purple" },
    { name: <GiPeach />, color: "orange" },
    { name: <GiPineapple />, color: "yellow" },
    { name: <GiCupcake />, color: "pink" },
    { name: <GiMeat />, color: "brown" },
    { name: <GiSteak />, color: "brown" },
  ];
  const fourthMarquee = [
    { name: <GiChickenOven />, color: "brown" },
    { name: <GiChiliPepper />, color: "red" },
    { name: <GiAvocado />, color: "green" },
    { name: <GiTomato />, color: "red" },
    { name: <FaCarrot />, color: "orange" },
    { name: <FaLemon />, color: "yellow" },
    { name: <GiCabbage />, color: "green" },
    { name: <FaBowlRice />, color: "white" },
    { name: <FaHamburger />, color: "orange" },
    { name: <FaFish />, color: "blue" },
    { name: <FaPizzaSlice />, color: "orange" },
    { name: <FaCheese />, color: "yellow" },
    { name: <FaPepperHot />, color: "red" },
    { name: <FaIceCream />, color: "pink" },
    { name: <FaCocktail />, color: "green" },
    { name: <FaDrumstickBite />, color: "brown" },
    { name: <GiTomato />, color: "red" },
    { name: <GiWatermelon />, color: "green" },
    { name: <GiStrawberry />, color: "red" },
  ];

  return (
    <div className="container overflow-x-hidden flex flex-col top-44 gap-6 mx-auto opacity-40 dark:opacity-35  absolute">
      <MarqueeItems items={firstMarquee} initial={0} animate={`-${100}%`} />
      <MarqueeItems items={secondMarquee} initial={`-${100}%`} animate={0} />
      <MarqueeItems items={thirdMarquee} initial={0} animate={`-${100}%`} />
      <MarqueeItems items={fourthMarquee} initial={`-${100}%`} animate={0} />
    </div>
  );
};

export default IconsMarquee;
