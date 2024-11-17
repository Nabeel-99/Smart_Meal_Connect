import React from "react";
import { motion } from "framer-motion";

const MarqueeItems = ({ items, initial, animate }) => {
  return (
    <div className="flex mask-marquee">
      <motion.div
        initial={{ x: `${initial}` }}
        animate={{ x: `${animate}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-md dark:bg-[#181818] bg-white w-20 h-20 mr-6 flex items-center justify-center"
            style={{ color: item.color, fontSize: "2rem" }}
          >
            {item.name}
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ x: `${initial}` }}
        animate={{ x: `${animate}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-md dark:bg-[#181818] bg-white w-20 h-20 mr-6 flex items-center justify-center"
            style={{ color: item.color, fontSize: "2rem" }}
          >
            {item.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeItems;
