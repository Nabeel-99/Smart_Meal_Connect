import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const GridCard = ({ header, image, description, to }) => {
  return (
    <div className="flex dark:bg-[#19242f3f]  transition-all duration-300 flex-col text-sm backdrop-blur-lg border-[#e0e0e0]  shadow-md md:text-lg gap-2  max-w-[351px] md:max-w-[440px] md:max-h-[511px] max-h-[448px] border rounded-[20px] p-6 dark:border-[#1f1f1f9d]">
      <p className="">{header}</p>
      <img
        src={image}
        alt=""
        className="object-cover max-w-[277px] max-h-[236px] md:max-w-[351px] md:max-h-[282px] rounded-tl-[20px] rounded-br-[100px]"
      />
      <p className="dark:text-[#C0BBBB] font-medium">{description}</p>
      <Link to={to} className="flex items-center text-base">
        See more <MdKeyboardArrowRight />
      </Link>
    </div>
  );
};

export default GridCard;
