"use client";

import { motion } from "framer-motion";

interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.08,
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={`text-base ${
            i < rating ? "text-[#c8f135]" : "text-[#3a3a3a]"
          }`}
        >
          ★
        </motion.span>
      ))}
      <span className="text-white text-[13px] ml-1 font-medium">
        {rating}.0
      </span>
    </div>
  );
}
