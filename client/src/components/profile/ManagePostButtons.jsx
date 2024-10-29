import { Tooltip } from "@mui/material";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const ManagePostButtons = ({ post, editPost, deletePost }) => {
  return (
    <div className="absolute right-2 flex items-center gap-2 bottom-0 text-xl font-bold">
      <Tooltip title="edit post">
        <button
          onClick={() => editPost(post)}
          className="border text-black hover:border-[#e0e0e0] text-[0.5rem] md:text-[0.8rem] lg:text-base hover:bg-[#dadada] bg-white rounded-full p-1 hover:text-black"
        >
          <MdEdit className="" />
        </button>
      </Tooltip>
      <Tooltip title="delete post">
        <button
          onClick={() => deletePost(post)}
          className=" border  hover:border-[#e0e0e0] text-[0.5rem] md:text-[0.8rem] lg:text-base hover:bg-[#dadada] bg-white text-black rounded-full p-1 hover:text-black"
        >
          <FaTrash className="" />
        </button>
      </Tooltip>
    </div>
  );
};

export default ManagePostButtons;
