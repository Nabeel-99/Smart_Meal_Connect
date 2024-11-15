import React from "react";
import metricsRecipe from "../assets/metrics-recipe.png";
import metricsRecipeLight from "../assets/metrics-recipe-light.png";
import metricsRecipeMobile from "../assets/metrics-recipe-mobile.png";
import metricsRecipeMobileLight from "../assets/metrics-recipe-mobile-light.png";
import { Link } from "react-router-dom";
import useTheme from "../components/UseTheme";
const About = ({ theme }) => {
  const appTheme = useTheme(theme);
  return (
    <div
      id="about"
      className="flex flex-col gap-9 md:gap-20  lg:px-0  pt-8 items-center justify-center"
    >
      <h1 className="text-[16px] lg:text-xl tracking-[5px] font-medium">
        ABOUT
      </h1>
      <div className="flex flex-col px-8 md:flex-row items-start gap-6 md:gap-10  lg:gap-20 xl:gap-44 ">
        <div>
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold">
            Smart Meal Connect:{" "}
            <span className="block">Making Meal Decisons </span>
            <span className="block">Easy and Personalized</span>
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          <p>
            At Smart Meal Connect, we simplify meal planning, reduce food waste,
            <span className="md:block">
              {" "}
              and foster a community for sharing and discovering recipes.Whether
            </span>
            <span className="md:block">
              you’re cooking from what you have or setting fitness-based goals
            </span>{" "}
            our platform adapts to fit your needs, making every meal an easy
            choice.
          </p>
          <div>
            <p className="border-b pb-2  border-b-[#343333]">Our Purpose</p>
            <p className="pt-2">
              In a fast-paced world, making daily decisions about food can be a
              <span className="md:block">
                challenge. At Smart Meal Connect, our goal is to simplify this
                process
              </span>
              <span className="md:block">
                {" "}
                by offering tailored meal recommendations that save you time,
              </span>{" "}
              reduce food waste, connect with community through shared interests
              <span className="block">
                and help you achieve your fitness goals.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={appTheme === "dark" ? metricsRecipe : metricsRecipeLight}
          alt=""
          className="max-h-[600px] px-10"
        />
      </div>
      <div className="md:hidden px-8">
        <img
          src={
            appTheme === "dark" ? metricsRecipeMobile : metricsRecipeMobileLight
          }
          alt=""
          className=""
        />
      </div>
      {/* CTA */}
      <div className="flex flex-col px-8 gap-20 md:flex-row items-start md:items-center border-b border-b-[#d1d1d1] dark:border-b-[#343333] pt-20 pb-20 w-full md:justify-between md:px-16  xl:justify-around bg-gradient-to-b from-[#dadada] to-[#e8e8e8] dark:from-[#08090a] dark:to-[#161616]">
        <div>
          <h2 className="text-2xl  md:text-5xl xl:text-6xl tracking-tighter">
            Plan the present. <span className="block">Cook Later.</span>
          </h2>
        </div>
        <div>
          <Link
            to={"/login"}
            className="dark:bg-[#e6e6e6] bg-black text-white hover:bg-[#252526] dark:text-black rounded-md px-4 py-2"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
