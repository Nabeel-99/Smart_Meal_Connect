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
import { useNavigate } from "react-router-dom";

export default function IconTabs({ showPostModal, userData }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center gap-14">
      <GoHomeFill
        onClick={() => {
          navigate("/dashboard");
        }}
        className="text-2xl dark:text-[#e5e5e5] text-[#1b1b1b]"
      />
      <MdDynamicFeed
        onClick={() => {
          navigate("/feeds");
        }}
        className="text-2xl dark:text-[#e5e5e5] text-[#1b1b1b]"
      />
      <IoIosAddCircleOutline
        onClick={showPostModal}
        className="text-2xl dark:text-[#e5e5e5] text-[#1b1b1b]"
      />
      <CiBookmark
        onClick={() => {
          navigate("/saved-meals");
        }}
        className="text-2xl dark:text-[#e5e5e5] text-[#1b1b1b]"
      />
      <div
        onClick={() => navigate("/profile")}
        className="w-6 h-6 rounded-full text-center flex items-center justify-center text-white text-sm bg-[#B678F0]"
      >
        {userData[0].toUpperCase()}
      </div>
    </div>
  );
}
