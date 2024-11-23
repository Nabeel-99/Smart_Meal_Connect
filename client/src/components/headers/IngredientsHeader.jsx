import React from "react";
import IngredientsImg from "../../assets/ingredients-slanted.png";
import IngredientsImgMobile from "../../assets/ingredients-slanted-mobile.png";
import IconsMarquee from "../ui/IconsMarquee";
const IngredientsHeader = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-2 pt-44">
        <div className="flex items-center gap-2 z-10 text-sm ">
          <div className="h-4 w-6 rounded-xl bg-[#361BFF]"></div>
          <p>Ingredients-based</p>
        </div>
        <div className="relative  w-full h-[350px]  flex flex-col items-center">
          <h1 className="text-center text-4xl lg:text-6xl tracking-tighter z-10 font-semibold">
            Prepare a Meal with
            <span className="block">What You Have</span>
          </h1>
        </div>
        {/* bigger screen */}
        <IconsMarquee />
        {/* mobile */}
        <div className="flex absolute w-full -top-0 md:hidden -z-10 items-center justify-center">
          <img
            src={IngredientsImgMobile}
            alt=""
            className="w-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default IngredientsHeader;
