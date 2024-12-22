import React from "react";
import { FaRegComment } from "react-icons/fa6";

const CommentButton = ({ openModal }) => {
  return (
    <button>
      <FaRegComment onClick={openModal} className="text-xl" />
    </button>
  );
};

export default CommentButton;
