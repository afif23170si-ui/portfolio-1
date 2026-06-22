"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/data";

interface ExperienceCardProps {
  exp: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ExperienceCard({
  exp,
  index,
  isExpanded,
  onToggle,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <motion.div
        initial={{
          borderColor: "#1a1a1a",
          backgroundColor: "#000000",
        }}
        animate={{
          borderColor: isExpanded ? "#c8f135" : "#1a1a1a",
          backgroundColor: isExpanded ? "#141414" : "#000000",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="rounded-2xl border cursor-pointer group px-0 relative w-full"
        onClick={onToggle}
      >
        <div
          className={cn(
            "py-5 transition-all duration-300",
            isExpanded ? "px-6 lg:px-8" : "px-4 lg:px-6"
          )}
        >
          {/* HEADER ROW */}
          <div className="flex items-start md:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-start md:items-center gap-3 md:gap-4 flex-1">
              {/* Logo icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-[12px] md:rounded-[16px] bg-[#1c1c1c] flex items-center justify-center flex-shrink-0 overflow-hidden border border-[#2a2a2a] mt-0.5 md:mt-0">
                {exp.logo && (exp.logo.startsWith("/") || exp.logo.includes(".")) ? (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-full h-full object-cover rounded-full p-1.5"
                  />
                ) : (
                  <span className="text-sm font-bold text-[#c8f135]">
                    {exp.logo || exp.company.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-bold text-[16px] md:text-[17px] lg:text-[20px] transition-colors leading-snug md:leading-normal",
                    isExpanded
                      ? "text-white"
                      : "text-[#b8b8b8] group-hover:text-white"
                  )}
                >
                  {exp.title}
                </span>
                {/* Mobile company name */}
                <span className="text-[#6b7280] text-[13px] md:hidden mt-0.5">
                  {exp.company}
                </span>
              </div>
            </div>

            {/* Right side (Date & Desktop Company) */}
            <div className="flex items-center gap-3 flex-shrink-0 mt-0.5 md:mt-0">
              <span className="text-[#6b7280] text-[14px] hidden md:block">
                {exp.company}
              </span>
              <div className="flex items-center gap-1.5 md:gap-2 bg-[#1c1c1c] rounded-full px-3 md:px-4 py-1 md:py-1.5 border border-[#2a2a2a]">
                <Calendar className="w-3.5 h-3.5 text-[#c8f135]" />
                <span className="text-white text-[12px] md:text-[13px] whitespace-nowrap">
                  {exp.date}
                </span>
              </div>
            </div>
          </div>

          {/* EXPANDED CONTENT */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="pt-4 pl-[60px] md:pl-[72px]">
                  <div className="w-full h-px bg-[#2a2a2a] mb-4" />
                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, i) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                        className="flex items-start gap-2.5 text-[#b8b8b8] text-[15px] lg:text-[17px] font-light leading-relaxed"
                      >
                        <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#b8e020] flex-shrink-0" />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

