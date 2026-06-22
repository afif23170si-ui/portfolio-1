"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/data";
import { slideVariants } from "@/lib/animations";

const ITEMS_PER_PAGE = 3;

export default function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const slideDir = useRef(1);

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const currentTestimonials = testimonials.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const paginate = (dir: 1 | -1) => {
    slideDir.current = dir;
    setPage((prev) => (prev + dir + totalPages) % totalPages);
  };

  return (
    <section id="testimonials" className="bg-[#000000] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-clash font-medium text-[28px] min-[360px]:text-[32px] min-[414px]:text-[38px] sm:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.03em] mb-3"
          >
            What Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white text-[15px] lg:text-[17px] font-light leading-relaxed"
          >
            A few kind words from the people I&apos;ve worked with.
          </motion.p>
        </div>

        {/* Cards with AnimatePresence slider */}
        <div className="relative overflow-hidden mb-8">
          <AnimatePresence mode="wait" custom={slideDir.current}>
            <motion.div
              key={page}
              custom={slideDir.current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3 },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {currentTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(-1)}
            aria-label="Previous testimonials"
            className="w-12 h-12 rounded-full bg-[#c8f135] flex items-center justify-center hover:bg-[#b8e020] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(1)}
            aria-label="Next testimonials"
            className="w-12 h-12 rounded-full bg-[#c8f135] flex items-center justify-center hover:bg-[#b8e020] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
