import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import BASE_URL from "../../../apiConfig";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@mui/material";

const NotificationCard = ({
  likers,
  commenters,
  setNotificationsViewed,
  notificationsViewed,
}) => {
  const notifications = [...likers, ...commenters];
  const [notificationList, setNotificationList] = useState(false);

  const showNotificationList = () => {
    if (!notificationsViewed) {
      setNotificationsViewed(true);
      localStorage.setItem("notificationsViewed", "true");
    }
    setNotificationList(!notificationList);
  };

  useEffect(() => {
    const viewed = localStorage.getItem("notificationsViewed");
    if (viewed === "true") {
      setNotificationsViewed(true);
    }
  }, []);

  useEffect(() => {
    const viewed = localStorage.getItem("notificationsViewed");
    if (viewed === "false" && (likers.length > 0 || commenters.length > 0)) {
      setNotificationsViewed(false);
      localStorage.setItem("notificationsViewed", "false");
    }
  }, [likers, commenters]);
  return (
    <div className="hidden xl:sticky top-[60px] w-96 py-2 xl:flex flex-col  border dark:border-[#1d1d1d] border-[#e0e0e0] rounded-xl dark:bg-[#0f0f0f] bg-[#ededed]  ">
      <div className="flex items-center  justify-between  dark:border-b-[#2a2a2a] border-b-[#e0e0e0] px-4 py-2 text-lg gap-2">
        <div className="relative flex items-center gap-2">
          Notifications
          <Badge badgeContent={100} color="error" variant="dot">
            <IoIosNotifications className="text-xl" />
          </Badge>
        </div>
        <div>
          <button
            onClick={showNotificationList}
            className="text-sm border border-[#e3e2e2] bg-[#dfdfdf] p-1 px-2 hover:bg-[#cecece] dark:border-[#424242] dark:bg-[#2e2e2e] dark:hover:bg-[#404040] transition-all ease-in-out duration-300 rounded-xl"
          >
            {notificationList ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {notificationList && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: notificationList ? "24rem" : 0,
              opacity: notificationList ? 1 : 0,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="overflow-y-scroll hide-scrollbar max-h-80  flex flex-col pt-4 pb-4 gap-6"
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pr-6"
                >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCard;
