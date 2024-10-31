import { Tooltip } from "@mui/material";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const SaveButton = ({ saveRecipe, post, isSaved }) => {
  return (
    <div>
      <Tooltip title="save">
        <button onClick={() => saveRecipe(post)} className="relative group ">
          {" "}
          {isSaved ? (
            <FaBookmark className="text-xl  group-hover:block " />
          ) : (
            <>
              <FaRegBookmark className="text-xl group-hover:hidden" />
              <FaBookmark className="text-xl hidden  group-hover:block " />
            </>
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default SaveButton;
