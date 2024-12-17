import React, { useEffect, useRef } from "react";
import { FaDiceD6, FaKeyboard } from "react-icons/fa6";
import formImg from "../assets/form-lg.png";
import formImgLight from "../assets/form-lg-light.png";
import formImgMobile from "../assets/form-mobile.png";
import formImgMobileLight from "../assets/form-mobile-light.png";
import bgAlgorithm from "../assets/algorithm-bg.png";
import bgAlgorithmLight from "../assets/algorithm-bg-light.png";
import bgAlgorithmMobile from "../assets/algorithm-bg-mobile.png";
import bgAlgorithmMobileLight from "../assets/algorithm-bg-mobile-light.png";
import formMetrics from "../assets/form-metrics.png";
import formMetricsLight from "../assets/form-metrics-light.png";
import formMetricsMobile from "../assets/form-metrics-mobile.png";
import formMetricsMobileLight from "../assets/form-metrics-mobile-light.png";
import personLG from "../assets/person-lg.png";
import personMobile from "../assets/person-small.png";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../components/stateManagement/UseTheme";
import { motion, useInView } from "framer-motion";
import FadeInSection from "../components/animation/FadeInSection";

const Features = ({ theme }) => {
  const appTheme = useTheme(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      id="features"
      className="pt-14 flex  flex-col items-center justify-start w-full pb-20 "
    >
      <FadeInSection>
        <h1 className="text-[16px] lg:text-xl tracking-[5px] font-medium">
          FEATURES
        </h1>
      </FadeInSection>
      <FadeInSection>
        <div className="flex flex-col gap-12 lg:gap-0 lg:flex-row items-start px-8 lg:px-0  pt-10">
          <div className="flex flex-col gap-6">
            <p className="font-bold text-2xl lg:text-4xl tracking-tight">
              Ingredient-Based
              <span className="block"> Recipe Generation</span>
            </p>
            <p className="dark:text-[#bababa] text-sm md:text-lg">
              Meals are generated based on{" "}
              <span className="text-[#ffffff]">provided items</span>
              <span className="md:block">
                {" "}
                giving you personalized recipes that utilize your{" "}
              </span>
              available ingredients.
            </p>
            <div className="flex items-center gap-6 text-xs lg:text-sm">
              <div className="flex items-center gap-1">
                <FaKeyboard /> Entering ingredients
              </div>
              <div className="flex items-center gap-1">
                <FaDiceD6 /> Matching Algorithm
              </div>
            </div>
          </div>
          {/* bigger screen */}
          <div className="hidden max-w-[568px] max-h-[635px] md:block relative ">
            <img
              src={appTheme === "dark" ? formImg : formImgLight}
              alt=""
              className="lg:h-2/2 lg:ml-28 relative"
            />
            <div className="absolute dark:bottom-10 bottom-5  left-36  gap-8">
              <p className="dark:text-[#A3A3A3] text-sm lg:text-lg">
                The Algorithm optimizes the ingredient-{" "}
                <span className="block">
                  matching, suggesting the recipes based on{" "}
                </span>{" "}
                <span className="block">provided inputs.</span>
              </p>
              <div className="pt-8">
                <Link
                  to={"/ingredients-based"}
                  className="bg-[#B678F0] text-white rounded-lg px-8 py-2 text-lg "
                >
                  Test
                </Link>
              </div>
            </div>
          </div>
          {/* mobile screen  */}
          <div className="md:hidden max-w-[336px] max-h-[442px] relative ">
            <img
              src={appTheme === "dark" ? formImgMobile : formImgMobileLight}
              alt=""
              className="relative h-full"
            />
            <div className="absolute bottom-5 left-4  gap-8">
              <p className="dark:text-[#A3A3A3] text-sm ">
                The Algorithm optimizes the ingredient-{" "}
                <span className="block">
                  matching, suggesting the recipes based on{" "}
                </span>{" "}
                <span className="block">provided inputs.</span>
              </p>
              <div className="pt-4">
                <Link
                  to={"/ingredients-based"}
                  className="bg-[#B678F0] text-white  rounded-lg px-6 py-2 text-sm "
                >
                  Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="hidden md:flex relative  items-start  gap-10 pt-44 px-10 xl:px-64 pb-44">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-3xl font-bold">Multiple Recipe Suggestions</h1>
            <p className="text-lg">
              Recipes are generated based on available ingredients,
              <span className="lg:block">
                allowing up to 3 missing ingredients. Browse suggestions
              </span>{" "}
              to find your perfect meal.{" "}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold"> Pantry Integration</h1>
            <p className="text-lg">
              Easily connect your pantry for recipe ideas customized to your
              ingredients. <span className="lg:block"> </span>{" "}
            </p>
          </div>
          <div className="absolute  top-56 lg:top-36 z-10">
            <img
              src={appTheme === "dark" ? bgAlgorithm : bgAlgorithmLight}
              alt=""
            />
          </div>
        </div>
      </FadeInSection>
      {/* bigger screen */}

      {/* mobile screen */}
      <div className="md:hidden flex flex-col gap-44 pt-20 px-8 relative">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Multiple Recipe Suggestions</h1>
          <p className="text-sm">
            Recipes are generated based on available ingredients,
            <span className="">
              allowing up to 3 missing ingredients. Browse suggestions
            </span>{" "}
            to find your perfect meal.{" "}
          </p>
        </div>
        <div className="absolute top-52 ">
          <img
            src={
              appTheme === "dark" ? bgAlgorithmMobile : bgAlgorithmMobileLight
            }
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold "> Pantry Integration</h1>
          <p className="text-sm">
            Easily connect your pantry for recipe ideas customized to your
            ingredients. <span className="block"> </span>{" "}
          </p>
        </div>
      </div>

      {/* metrics bigger screen */}
      <FadeInSection>
        <div className="hidden md:flex flex-col items-center gap-10 px-20 pt-64">
          <div className="flex items-center gap-20">
            <h1 className="text-2xl xl:text-[40px] leading-[2.5rem] font-bold">
              Body Metrics-Based{" "}
              <span className="block">Meal Recommendations</span>{" "}
            </h1>
            <p className="dark:text-[#bababa] ">
              Using body metrics such as age, weight, height,{" "}
              <span className="block">
                {" "}
                and activity level. Meals are generated to
              </span>{" "}
              align with fitness goals.
            </p>
          </div>
          <div className="relative">
            <img
              src={appTheme === "dark" ? formMetrics : formMetricsLight}
              alt=""
              className="max-h-[700px] max-w-[900px] px-20 xl:px-0"
            />
            <div className="absolute bottom-10 left-28 xl:left-8  gap-8">
              <p className="dark:text-[#A3A3A3] text-sm lg:text-xl">
                The Algorithm creates personalized daily meals,{" "}
                <span className="block">
                  supporting goals like weight loss, muscle gains, or overall
                </span>{" "}
                health objectives.
              </p>
              <div className="pt-8">
                <Link
                  to={"/metrics-based"}
                  className="bg-[#B678F0] text-white rounded-lg px-8 py-2 text-lg "
                >
                  Test
                </Link>
              </div>
            </div>
            <div className="absolute top-10 right-32 xl:right-10">
              <img
                src={personLG}
                alt="hey"
                className="h-[400px] xl:h-[600px]"
              />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* metrics mobile screen */}
      <FadeInSection>
        <div className="md:hidden flex flex-col items-center gap-10 pt-64">
          <div className="flex flex-col items-start justify-center pt-24 px-8 gap-6">
            <h1 className="text-xl font-bold">
              Body Metrics-Based{" "}
              <span className="block">Meal Recommendations</span>{" "}
            </h1>
            <p className="dark:text-[#bababa] ">
              Using body metrics such as age, weight, height,{" "}
              <span className="">
                {" "}
                and activity level. Meals are generated to
              </span>{" "}
              align with your fitness goals.
            </p>
          </div>
          <div className="relative">
            <img
              src={
                appTheme === "dark" ? formMetricsMobile : formMetricsMobileLight
              }
              alt=""
              className="max-h-[700px] max-w-[353px] px-2"
            />
            <div className="absolute bottom-10 left-4  gap-8">
              <p className="text-[#A3A3A3] text-sm lg:text-xl">
                The Algorithm creates personalized daily meals,{" "}
                <span className="block">
                  supporting goals like weight loss, muscle gains,{" "}
                </span>{" "}
                or overall health objectives.
              </p>
              <div className="pt-8">
                <Link
                  to={"/metrics-based"}
                  className="bg-[#B678F0] text-white  rounded-lg px-8 py-2 text-lg "
                >
                  Test
                </Link>
              </div>
            </div>
            <div className="absolute top-10 right-10">
              <img src={personLG} alt="" className="h-52" />
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Features;
