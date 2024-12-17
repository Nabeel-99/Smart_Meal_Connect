import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const FadeInSection = ({
  children,
  delay = 0,
  duration = 1,
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.42, 0, 0.58, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
