"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Bounce({ children, delay = 0.5, className }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, translateY: 100 }, // Start hidden and slightly above
        visible: { opacity: 1, translateY: 0 },  // End at normal position
      }}
      transition={{
        type: "spring",
        duration: 1.5,  // Increased duration for a smoother animation
        damping: 10,
        delay: delay,
        stiffness: 100,
        bounce: 0.4
      }}
      initial="hidden"
      whileInView="onscreen"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
