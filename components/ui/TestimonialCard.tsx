"use client";

import { motion } from "framer-motion";
import { StarRating } from "./StarRating";
import type { Testimonial } from "@/lib/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial: t }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="h-full bg-[#0f0f0f] border border-[#c8f135] hover:border-[#b8e020] transition-colors rounded-2xl p-6 flex flex-col min-h-[280px]"
    >
      {/* Author */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-14 h-14 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
          {t.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.avatar}
              alt={t.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span className="text-[#6b7280] text-xl font-bold">
              {t.name[0]}
            </span>
          )}
        </div>
        <div>
          <p className="text-white font-bold text-[16px] lg:text-[18px]">{t.name}</p>
          <p className="text-[#6b7280] text-[14px] lg:text-[15px]">{t.role}</p>
        </div>
      </div>

      {/* Quote */}
      <p className="text-white text-[15px] lg:text-[17px] font-light leading-relaxed flex-1 italic">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#1a1a1a]">
        <StarRating rating={t.rating} />
        <span className="text-[#6b7280] text-[14px] lg:text-[15px]">{t.date}</span>
      </div>
    </motion.div>
  );
}
