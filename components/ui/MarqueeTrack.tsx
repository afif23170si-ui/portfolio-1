"use client";

import { motion } from "framer-motion";

interface MarqueeTrackProps {
  children: React.ReactNode;
  speed?: number; // Duration in seconds per full loop
  direction?: "left" | "right";
}

export function MarqueeTrack({
  children,
  speed = 35,
  direction = "left",
}: MarqueeTrackProps) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* Render twice for seamless loop */}
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">{children}</div>
      </motion.div>
    </div>
  );
}
