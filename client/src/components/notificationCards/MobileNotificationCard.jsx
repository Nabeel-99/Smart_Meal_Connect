import React from "react";
import food from "../../assets/food4.jpg";
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa6";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";

const MobileNotificationCard = ({ likers }) => {
  return (
    <div className="mt-4  lg:mt-4 relative   lg:right-10 lg:top-0 xl:hidden py-2 flex flex-col w-full  border dark:border-[#1d1d1d] border-[#e0e0e0] h-80 dark:bg-[#0f0f0f] bg-[#ededed] ">
      <div className="flex items-center  w-full justify-center border-b dark:border-b-[#2a2a2a] border-b-[#e0e0e0] px-4 py-2 text-lg gap-2">
        Notifications
        <IoIosNotifications className="text-2xl w-6" />
      </div>
      <div className="overflow-y-scroll flex flex-col w-full pt-4 pb-4 gap-6">
        {likers.length > 0 ? (
          likers.map((liker, index) => (
            <React.Fragment key={index}>
              <div
                className="flex justify-between items-center pr-6"
                key={`like-${index}`}
              >
                <div className="flex items-center gap-2 px-4">
                  <div className="w-12 h-12 rounded-full font-bold text-sm text-center flex items-center text-white justify-center bg-[#B678F0]">
                    {liker.firstName[0]}
                  </div>
                  <div>
                    {" "}
                    <span className="font-bold pr-1">{liker.firstName}</span>
                    liked your post
                  </div>
                </div>
                <div>
                  <img
                    src={food}
                    className="w-12 min-w-12 max-w-12 rounded h-12"
                  />
                </div>
              </div>
              <div
                className="flex justify-between items-center pr-6"
                key={`comment-${index}`}
              >
                <div className="flex items-center gap-2 px-4">
                  <div className="max-w-12 min-w-12 w-12 h-12 rounded-full font-bold text-sm text-center flex items-center justify-center bg-[#B678F0]">
                    N
                  </div>
                  <div>
                    {" "}
                    <span className="font-bold pr-1">cristiano</span>
                    Commented:{" "}
                    <span className="">
                      Tried it and it turned out so nice!😍{" "}
                    </span>
                  </div>
                </div>
                <div>
                  <img
                    src={food}
                    className="w-12 min-w-12 max-w-12 rounded h-12"
                  />
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="w-full flex itmes-center justify-center">
            No Notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNotificationCard;
