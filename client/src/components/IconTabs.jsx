import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { FaHome } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { MdDynamicFeed } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex items-center justify-center gap-14">
      <GoHomeFill className="text-2xl text-[#e5e5e5]" />
      <MdDynamicFeed className="text-2xl text-[#e5e5e5] " />
      <IoIosAddCircleOutline className="text-2xl text-[#e5e5e5]" />
      <CiBookmark className="text-2xl text-[#e5e5e5]" />
      <div className="w-6 h-6 rounded-full text-center flex items-center justify-center text-white text-sm bg-[#B678F0]">
        N
      </div>
    </div>
  );
}
