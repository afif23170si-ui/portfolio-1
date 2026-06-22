"use client";

import { motion } from "framer-motion";
import { nodeEnter } from "@/lib/animations";

interface AppIconNodeProps {
  label: string;
  emoji: string;
  index: number;
  className?: string;
}

export function AppIconNode({ label, emoji, index, className }: AppIconNodeProps) {
  return (
    <motion.div
      variants={nodeEnter}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{
        scale: 1.12,
        rotate: 4,
        boxShadow: "0 0 20px rgba(200, 241, 53,0.25)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`w-[68px] h-[68px] rounded-[18px] bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center cursor-pointer select-none ${className}`}
      title={label}
    >
      <span className="text-2xl" role="img" aria-label={label}>
        {emoji}
      </span>
    </motion.div>
  );
}
