import React from "react";
import { Link } from "react-router-dom";

const GetStartedSection = () => {
  return (
    <div className="flex flex-col px-8 gap-20 md:flex-row items-start md:items-center border-b border-b-[#d1d1d1] dark:border-b-[#343333] pt-20 pb-20 w-full md:justify-between md:px-16  xl:justify-around bg-gradient-to-b from-[#dadada] to-[#e8e8e8] dark:from-[#08090a] dark:to-[#161616]">
      <div className="flex flex-col px-8 gap-20 md:flex-row items-start md:items-center md:justify-between  xl:justify-around w-full 2xl:mx-auto 2xl:container">
        <div>
          <h2 className="text-2xl   md:text-3xl xl:text-6xl tracking-tighter">
            Want meal recommendations?{" "}
            <span className="block">
              Discover the best choices just for You!
            </span>
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

export default GetStartedSection;
