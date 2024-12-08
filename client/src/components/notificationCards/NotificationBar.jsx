import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const NotificationBar = ({ message, showNotificationBar }) => {
  return (
    <AnimatePresence>
      {showNotificationBar && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="dark:bg-[#181818] bg-white shadow-sm p-4 rounded-xl flex flex-col gap-1"
        >
          <div>{message?.title || ""}</div>
          {/* <div>liked your post</div> */}
          <div className="">
            {message?.body.length > 40
              ? message?.body?.slice(0, 40).concat("...")
              : message?.body || "You have a new notification"}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBar;
