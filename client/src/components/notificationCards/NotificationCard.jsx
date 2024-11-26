import React from "react";
import { IoIosNotifications } from "react-icons/io";
import BASE_URL from "../../../apiConfig";

const NotificationCard = ({ likers, commenters }) => {
  const notifications = [...likers, ...commenters];

  return (
    <div className="hidden xl:sticky top-[60px] w-96 py-2 xl:flex flex-col  border dark:border-[#1d1d1d] border-[#e0e0e0] rounded-xl h-80 dark:bg-[#0f0f0f] bg-[#ededed]  ">
      <div className="flex items-center  justify-center border-b dark:border-b-[#2a2a2a] border-b-[#e0e0e0] px-4 py-2 text-lg gap-2">
        Notifications
        <div className="relative">
          <IoIosNotifications className="text-3xl w-6" />
          {notifications.length > 0 && (
            <div
              className="absolute top-0 right-0 flex items-center justify-center bg-red-500 text-white text-sm
            rounded-full p-1 w-4 h-4"
            >
              {notifications.length}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-y-scroll hide-scrollbar flex flex-col pt-4 pb-4 gap-6">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="flex justify-between items-center pr-6">
              <div className="flex items-center gap-2 px-4">
                <div className="min-w-12 w-12 max-w-12 h-12  text-white rounded-full font-bold text-sm text-center flex items-center justify-center bg-[#B678F0]">
                  {notification.firstName[0]}
                </div>
                <div className="text-sm">
                  {" "}
                  <span className="font-bold pr-1">
                    {notification.firstName}
                  </span>
                  {notification.type === "like" ? (
                    <span>liked your post </span>
                  ) : (
                    <span>commented: {notification.text} </span>
                  )}
                </div>
              </div>
              <div>
                <img
                  src={`${BASE_URL}/${notification.image}`}
                  className="w-12 min-w-12 max-w-12 rounded h-12"
                />
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-center text-lg py-4">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
