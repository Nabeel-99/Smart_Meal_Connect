import React from "react";
import IngredientsImg from "../../assets/ingredients-slanted.png";
import IngredientsImgMobile from "../../assets/ingredients-slanted-mobile.png";
const IngredientsHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <div className="h-4 w-6 rounded-xl bg-[#361BFF]"></div>
        <p>Ingredients-based</p>
      </div>
      <div className="relative  w-full h-[550px]  flex flex-col items-center">
        <h1 className="text-center text-4xl lg:text-6xl shadow-lg tracking-tighter z-10 font-semibold">
          Prepare a Meal with
          <span className="block">What You Have</span>
        </h1>
        <div className="absolute left-0 bg-gradient-to-r from-[#08090a] from-15% to-transparent lg:shadow-xl lg:drop-shadow-xl h-full w-20 lg:h-3/4 lg:w-72"></div>
        <div className="absolute right-0  bg-gradient-to-l from-[#08090a] from-15% to-transparent lg:shadow-xl lg:drop-shadow-xl h-full w-20 lg:h-3/4 lg:w-72"></div>
        <div className="absolute bottom-12 lg:bottom-0 w-full bg-gradient-to-t  from-[#08090a] from-80% to-transparent h-20 lg:h-44"></div>
        {/* bigger screen */}
        <div className="hidden absolute w-full top-0 md:flex -z-10 items-center justify-center">
          <img src={IngredientsImg} alt="" className="w-full object-contain" />
        </div>
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
