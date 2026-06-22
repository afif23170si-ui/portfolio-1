"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const currentSegmentRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Variables to control the "delay" / scroll speed
  const CARD_SCROLL_VH = 120; // Scroll distance (in vh) to hold each card open
  const BUFFER_VH = 60; // Scroll distance before the first card opens and after the last closes
  const totalVh = experiences.length * CARD_SCROLL_VH + BUFFER_VH * 2;
  
  const bufferPercent = BUFFER_VH / totalVh;
  const cardsPercent = 1 - bufferPercent * 2;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let segment: number | null = null;
    
    // Check if within the start or end buffer zones
    if (latest < bufferPercent) {
      segment = null;
    } else if (latest > 1 - bufferPercent) {
      segment = null;
    } else {
      // Within the active cards zone
      const normalized = (latest - bufferPercent) / cardsPercent;
      let idx = Math.floor(normalized * experiences.length);
      if (idx >= experiences.length) idx = experiences.length - 1;
      if (idx < 0) idx = 0;
      segment = idx;
    }

    // Only update state if the calculated segment actually changed
    if (segment !== currentSegmentRef.current) {
      currentSegmentRef.current = segment;
      setActiveIndex(segment);
    }
  });

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="bg-[#000000] relative pt-28 lg:pt-32" 
      style={{ height: `${totalVh}vh` }}
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 h-full">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-clash font-medium text-[28px] min-[360px]:text-[32px] min-[414px]:text-[38px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.03em] text-center mb-12 lg:mb-16"
        >
          Experiences
        </motion.h2>

        {/* Experience list */}
        <div className="sticky top-28 lg:top-32 flex flex-col gap-3 relative w-full pb-16 lg:pb-24 z-10">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
              isExpanded={activeIndex === index}
              onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


