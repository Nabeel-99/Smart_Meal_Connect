import React from "react";

const ProfileCard = ({ userProfile, totalLikes, totalPosts }) => {
  return (
    <div className="flex pl-4 md:pl-52 lg:pl-24 xl:pl-64 items-center gap-6 xl:gap-10">
      <div className="h-20 w-20 md:h-32 md:w-32 xl:w-44 xl:h-44 bg-[#B678F0] text-white rounded-full flex items-center justify-center ">
        <div className="text-2xl md:text-4xl xl:text-6xl font-bold">
          {userProfile?.firstName?.slice(0, 1)}
        </div>
      </div>
      <div className="flex flex-col gap-2 xl:gap-4">
        <div className="text-base xl:text-xl font-semi-bold">
          {userProfile?.firstName} {userProfile?.lastName}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col items-center">
            <div className="font-bold">{totalPosts}</div>
            <div>Posts</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-bold">{totalLikes}</div>
            <div>Likes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
