import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const UserLink = ({ userId, firstName, lastName, postDate }) => {
  return (
    <Link to={`/profile/${userId}`} className="">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full font-bold text-sm text-white text-center flex items-center justify-center bg-[#B678F0]">
          {firstName[0]}
        </div>
        <div className="text-sm font-semibold">
          {" "}
          {firstName} {lastName} {moment(postDate).fromNow()}
        </div>
      </div>
    </Link>
  );
};

export default UserLink;
