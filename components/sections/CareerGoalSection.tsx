"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

function SquircleIcon({
  src,
  x,
  y,
  delay = 0,
}: {
  src: string;
  x: number;
  y: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute z-30 flex items-center justify-center rounded-[26px] bg-gradient-to-b from-[#1a2408] to-[#040602] shadow-[0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden border border-[#5c8014]/40"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: 80,
        height: 80,
        marginLeft: -40,
        marginTop: -40,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Top green glow reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#8abf1c]/45 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c8f135]/90 to-transparent" />

      {/* Icon image */}
      <img src={src} className="w-[50%] h-[50%] object-contain relative z-10" alt="" />
    </motion.div>
  );
}

function MobileSquircleIcon({
  src,
  delay = 0,
}: {
  src: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="relative flex items-center justify-center rounded-[20px] bg-gradient-to-b from-[#1a2408] to-[#040602] shadow-[0_6px_12px_rgba(0,0,0,0.5)] overflow-hidden border border-[#5c8014]/40"
      style={{
        width: 64,
        height: 64,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Top green glow reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#8abf1c]/45 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c8f135]/90 to-transparent" />

      {/* Icon image */}
      <img src={src} className="w-[50%] h-[50%] object-contain relative z-10" alt="" />
    </motion.div>
  );
}

export default function CareerGoalSection() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-[#0c1006] to-[#040602] pt-8 lg:pt-20 pb-16"
    >
      {/* Large Radial Glow (Placed at section level to prevent clipping by overflow wrappers) */}
      <div className="absolute top-[-200px] left-0 right-0 h-[900px] lg:h-[1100px] bg-[radial-gradient(circle_at_50%_50%,#1a2e09_0%,transparent_50%)] pointer-events-none z-[5]" />

      {/* Desktop Layout (Hidden on Mobile) */}
      <div className="hidden lg:block w-full overflow-x-visible no-scrollbar relative z-10">
        <div className="relative min-w-[1000px] max-w-[1400px] h-[500px] lg:h-[600px] mx-auto px-6">

          {/* SVG Circuit Lines (Mobile/Tablet) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1] lg:hidden"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {[
              // Left side
              "M 30 28 L 26 28 Q 25 28 24.3 27.3 L 11 14",
              "M 30 51 L 26 51 Q 25 51 24.6 50.1 L 19.4 38.9 Q 19 38 18 38 L 0 38",
              "M 30 62 L 13 62",
              "M 30 72 L 26 72 Q 25 72 24.6 72.9 L 19.4 84.1 Q 19 85 18 85 L 0 85",
              // Right side
              "M 70 28 L 74 28 Q 75 28 75.7 27.3 L 89 14",
              "M 70 51 L 74 51 Q 75 51 75.4 50.1 L 80.6 38.9 Q 81 38 82 38 L 100 38",
              "M 70 62 L 87 62",
              "M 70 72 L 74 72 Q 75 72 75.4 72.9 L 80.6 84.1 Q 81 85 82 85 L 100 85",
            ].map((d, i) => (
              <g key={i}>
                {/* Base Circuit Line */}
                <motion.path
                  d={d}
                  stroke="#5c8014"
                  strokeWidth="0.2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                />
                {/* Traveling Glow Pulse */}
                <motion.path
                  d={d}
                  stroke="#aae01a"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0.15, pathOffset: -0.15, opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    pathOffset: [-0.15, 1.0],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    opacity: { duration: 0.5, delay: 1.5 },
                    pathOffset: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.5 + i * 0.3,
                    }
                  }}
                />
              </g>
            ))}
          </svg>

          {/* SVG Circuit Lines (Desktop - extends to screen edges) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1] hidden lg:block overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {[
              // Left side
              "M 30 28 L 26 28 Q 25 28 24.3 27.3 L 11 14",
              "M 30 51 L 26 51 Q 25 51 24.6 50.1 L 19.4 38.9 Q 19 38 18 38 L -100 38",
              "M 30 62 L 13 62",
              "M 30 72 L 26 72 Q 25 72 24.6 72.9 L 19.4 84.1 Q 19 85 18 85 L -100 85",
              // Right side
              "M 70 28 L 74 28 Q 75 28 75.7 27.3 L 89 14",
              "M 70 51 L 74 51 Q 75 51 75.4 50.1 L 80.6 38.9 Q 81 38 82 38 L 200 38",
              "M 70 62 L 87 62",
              "M 70 72 L 74 72 Q 75 72 75.4 72.9 L 80.6 84.1 Q 81 85 82 85 L 200 85",
            ].map((d, i) => (
              <g key={i}>
                {/* Base Circuit Line */}
                <motion.path
                  d={d}
                  stroke="#5c8014"
                  strokeWidth="0.2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                />
                {/* Traveling Glow Pulse */}
                <motion.path
                  d={d}
                  stroke="#aae01a"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0.15, pathOffset: -0.15, opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    pathOffset: [-0.15, 1.0],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    opacity: { duration: 0.5, delay: 1.5 },
                    pathOffset: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.5 + i * 0.3,
                    }
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Center Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-[24%] bottom-[24%] left-[30%] right-[30%] bg-transparent flex flex-col items-center justify-center p-10 z-20"
          >
            {/* Left Bracket Border */}
            <div className="absolute top-0 bottom-0 left-0 w-[25%] lg:w-[15%] border-l border-t border-b border-[#aae01a] rounded-l-[16px] drop-shadow-[0_0_6px_rgba(170,224,26,0.5)] pointer-events-none" />
            {/* Right Bracket Border */}
            <div className="absolute top-0 bottom-0 right-0 w-[25%] lg:w-[15%] border-r border-t border-b border-[#aae01a] rounded-r-[16px] drop-shadow-[0_0_6px_rgba(170,224,26,0.5)] pointer-events-none" />

            <h2 className="text-white font-clash font-medium text-[28px] min-[360px]:text-[32px] min-[414px]:text-[38px] sm:text-[42px] lg:text-[48px] leading-[1.05] tracking-[-0.03em] mb-4 text-center">
              Career Goal
            </h2>
            <p className="text-white text-center text-[15px] lg:text-[17px] font-light leading-relaxed max-w-[420px]">
              To join a forward-thinking team where design and technology
              intersect, creating meaningful digital products that enhance user
              experiences at scale and push creative boundaries.
            </p>
          </motion.div>

          {/* Left Icons */}
          <SquircleIcon src="/images/career/wp-logo.svg" x={9} y={9} delay={0.4} />
          <SquircleIcon src="/images/career/framer-logo.svg" x={20} y={38} delay={0.5} />
          <SquircleIcon src="/images/career/copy-logo.svg" x={13} y={62} delay={0.6} />
          <SquircleIcon src="/images/career/figma-logo.png" x={12} y={85} delay={0.7} />

          {/* Right Icons */}
          <SquircleIcon src="/images/career/xd-logo.svg" x={91} y={9} delay={0.4} />
          <SquircleIcon src="/images/career/html-logo.svg" x={79} y={38} delay={0.5} />
          <SquircleIcon src="/images/career/css-logo.svg" x={87} y={62} delay={0.6} />
          <SquircleIcon src="/images/career/javascript-logo.svg" x={88} y={85} delay={0.7} />
        </div>
      </div>

      {/* Mobile Layout (Visible only on mobile/tablet) */}
      <div className="lg:hidden flex flex-col items-center px-4 py-8 relative z-10">
        {/* Top Icons Row */}
        <div className="flex gap-3 justify-center mb-8">
          <MobileSquircleIcon src="/images/career/wp-logo.svg" delay={0.1} />
          <MobileSquircleIcon src="/images/career/framer-logo.svg" delay={0.2} />
          <MobileSquircleIcon src="/images/career/figma-logo.png" delay={0.3} />
          <MobileSquircleIcon src="/images/career/copy-logo.svg" delay={0.4} />
        </div>

        {/* Center Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-transparent flex flex-col items-center justify-center py-12 px-8 w-full max-w-[340px] z-20 mb-8"
        >
          {/* Left Bracket Border */}
          <div className="absolute top-0 bottom-0 left-0 w-[15%] border-l border-t border-b border-[#aae01a] rounded-l-[16px] drop-shadow-[0_0_6px_rgba(170,224,26,0.5)] pointer-events-none" />
          {/* Right Bracket Border */}
          <div className="absolute top-0 bottom-0 right-0 w-[15%] border-r border-t border-b border-[#aae01a] rounded-r-[16px] drop-shadow-[0_0_6px_rgba(170,224,26,0.5)] pointer-events-none" />

          <h2 className="text-white font-clash font-medium text-[28px] min-[360px]:text-[32px] min-[414px]:text-[38px] sm:text-[42px] leading-[1.05] tracking-[-0.03em] mb-4 text-center">
            Career Goal
          </h2>
          <p className="text-white text-center text-[15px] font-light leading-relaxed max-w-[280px]">
            To join a forward-thinking team where design and technology
            intersect, creating meaningful digital products that enhance user
            experiences at scale and push creative boundaries.
          </p>
        </motion.div>

        {/* Bottom Icons Row */}
        <div className="flex gap-3 justify-center">
          <MobileSquircleIcon src="/images/career/xd-logo.svg" delay={0.5} />
          <MobileSquircleIcon src="/images/career/html-logo.svg" delay={0.6} />
          <MobileSquircleIcon src="/images/career/javascript-logo.svg" delay={0.7} />
          <MobileSquircleIcon src="/images/career/css-logo.svg" delay={0.8} />
        </div>
      </div>

      {/* Bottom Text Section */}
      <div className="max-w-[1400px] mx-auto mt-2 pt-8 px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white text-center md:text-left text-[15px] lg:text-[17px] leading-relaxed"
          >
            I&apos;m a multidisciplinary designer and full-stack developer with
            4+ years of experience creating conversion-focused digital
            experiences. I specialize in intuitive UI/UX and modern websites
            using WordPress, React, and Framer.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="text-white text-center md:text-left text-[15px] lg:text-[17px] leading-relaxed"
          >
            From no-code builds to custom themes, I help global brands craft
            fast, scalable web solutions. Off hours? I&apos;m likely exploring
            design trends or fine-tuning plugins over a cold brew.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
