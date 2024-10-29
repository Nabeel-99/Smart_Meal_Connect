import { Tooltip } from "@mui/material";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const SaveButton = ({ saveRecipe, post }) => {
  return (
    <div>
      <Tooltip title="save">
        <button onClick={saveRecipe} className="relative group ">
          {" "}
          {post.isSaved ? (
            <FaBookmark className="text-xl  group-hover:block " />
          ) : (
            <FaRegBookmark className="text-xl group-hover:hidden" />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default SaveButton;
