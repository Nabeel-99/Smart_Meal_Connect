import React from "react";
import metricsRecipe from "../assets/metrics-recipe.png";
import metricsRecipeLight from "../assets/metrics-recipe-light.png";
import metricsRecipeMobile from "../assets/metrics-recipe-mobile.png";
import metricsRecipeMobileLight from "../assets/metrics-recipe-mobile-light.png";
import { Link } from "react-router-dom";
import useTheme from "../components/stateManagement/UseTheme";
import { motion } from "framer-motion";
import CTACard from "../components/ui/CTACard";
import FadeInSection from "../components/animation/FadeInSection";
const About = ({ theme }) => {
  const appTheme = useTheme(theme);
  return (
    <div
      id="about"
      className="flex flex-col gap-9 md:gap-20  lg:px-0  pt-8 items-center justify-center"
    >
      <motion.h1
        initial={{ y: 10, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[16px] lg:text-xl tracking-[5px] font-medium"
      >
        ABOUT
      </motion.h1>
      <motion.div
        initial={{ y: 10, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        className="flex flex-col px-8 md:flex-row items-start gap-6 md:gap-10  lg:gap-20 xl:gap-44 "
      >
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl lg:text-2xl xl:text-3xl font-bold"
          >
            Smart Meal Connect:{" "}
            <span className="block">Making Meal Decisions</span>
            <span className="block">Easy and Personalized</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            At Smart Meal Connect, we simplify meal planning, reduce food waste,
            <span className="md:block">
              {" "}
              and foster a community for sharing and discovering recipes.
              Whether
            </span>
            <span className="md:block">
              you’re cooking from what you have or setting fitness-based goals
            </span>{" "}
            our platform adapts to fit your needs, making every meal an easy
            choice.
          </motion.p>

          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="border-b pb-2 border-b-[#343333]"
            >
              Our Purpose
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-2"
            >
              In a fast-paced world, making daily decisions about food can be a
              <span className="md:block">
                challenge. At Smart Meal Connect, our goal is to simplify this
                process
              </span>
              <span className="md:block">
                by offering tailored meal recommendations that save you time,
              </span>{" "}
              reduce food waste, connect with community through shared interests
              <span className="block">
                and help you achieve your fitness goals.
              </span>
            </motion.p>
          </div>
        </div>
      </motion.div>
      <FadeInSection delay={0.3}>
        <div transition={{ duration: 0.3 }} className="hidden md:block">
          <img
            src={appTheme === "dark" ? metricsRecipe : metricsRecipeLight}
            alt=""
            className="max-h-[600px] px-10"
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.5}>
        <div className="md:hidden px-8">
          <img
            src={
              appTheme === "dark"
                ? metricsRecipeMobile
                : metricsRecipeMobileLight
            }
            alt=""
            className=""
          />
        </div>
      </FadeInSection>

      {/* CTA */}
      <CTACard />
    </div>
  );
};

export default About;
