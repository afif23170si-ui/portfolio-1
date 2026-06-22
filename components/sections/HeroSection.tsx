"use client";

import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

function Star() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L14.5 7.67L22.39 6L17 12L22.39 18L14.5 16.33L12 24L9.5 16.33L1.61 18L7 12L1.61 6L9.5 7.67Z" fill="#c8f135" />
    </svg>
  );
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskSize = useMotionValue(0);

  // Smooth out the mouse following for a nice brush effect
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });
  const smoothSize = useSpring(maskSize, { damping: 20, stiffness: 200 });

  const maskImage = useMotionTemplate`radial-gradient(${smoothSize}px circle at ${smoothX}px ${smoothY}px, black 30%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    maskSize.set(110); // Smaller brush size
  };

  const handleMouseLeave = () => {
    maskSize.set(0);
  };

  return (
    <section
      id="hero"
      className="relative bg-[#0c1006]"
    >
      {/* Massive radial gradient glow behind the photo */}
      <div className="absolute top-0 left-0 right-0 bottom-[-150px] bg-[radial-gradient(circle_at_70%_50%,#243d10_0%,transparent_70%)] pointer-events-none z-[5]" />

      {/* Horizontal Framing Lines */}
      <div className="absolute top-[80px] lg:top-[112px] left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.4)] pointer-events-none z-0" />
      <div className="absolute bottom-[80px] lg:bottom-[66px] left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.4)] pointer-events-none z-0" />

      {/* Vertical Framing Lines & Intersection Stars */}
      <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[1600px] h-full relative">
          <div className="absolute top-0 bottom-0 left-4 lg:left-8 w-[1px] bg-[rgba(255,255,255,0.4)]" />
          <div className="absolute top-0 bottom-0 right-4 lg:right-8 w-[1px] bg-[rgba(255,255,255,0.4)]" />

          {/* Top-Right Star (Intersection of top line and right vertical line) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="absolute top-[80px] lg:top-[112px] right-4 lg:right-8 -translate-y-1/2 translate-x-1/2 z-10 select-none pointer-events-none"
          >
            <Star />
          </motion.div>

          {/* Bottom-Left Star (Intersection of bottom line and left vertical line) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute bottom-[80px] lg:bottom-[66px] left-4 lg:left-8 translate-y-1/2 -translate-x-1/2 z-10 select-none pointer-events-none"
          >
            <Star />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-18 pt-[132px] lg:pt-[141px] pb-[24px] lg:pb-[116px] flex flex-col lg:flex-row items-center justify-between">
        {/* LEFT: Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 w-full max-w-[620px] flex flex-col items-center text-center lg:items-start lg:text-left lg:justify-center relative z-20"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-white text-[22px] lg:text-[24px] font-normal mb-3"
          >
            Hey,{" "}
            <span role="img" aria-label="wave">
              👋
            </span>{" "}
            I am
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            custom={0.12}
            className="text-white font-clash font-medium text-[28px] min-[360px]:text-[32px] min-[414px]:text-[38px] sm:text-[56px] md:text-[72px] lg:text-[84px] leading-[1.05] tracking-[-0.03em] mb-2 whitespace-normal md:whitespace-nowrap"
          >
            Afif Ramadhan
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            custom={0.24}
            className="text-[#c8f135] font-bold text-[18px] sm:text-[22px] lg:text-[26px] tracking-wide mb-3 lg:mb-5"
          >
            A Full Stack Developer
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            custom={0.36}
            className="text-white text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.4] max-w-[600px] mb-6 lg:mb-8 font-light"
          >
            I architect pixel-perfect interfaces{" "}
            <br className="block sm:hidden" />
            and code them into seamless,{" "}
            <br className="block sm:hidden" />
            human-centered experiences.
          </motion.p>

          {/* Contact Pill */}
          <motion.div
            variants={fadeUp}
            custom={0.52}
            className="inline-flex flex-row justify-center lg:justify-start items-center gap-4 sm:gap-5 lg:gap-6 lg:bg-white/[0.04] lg:backdrop-blur-md lg:border lg:border-white/[0.08] lg:rounded-full lg:px-8 lg:py-4 lg:shadow-lg"
          >
            <a 
              href="mailto:afifr5092@gmail.com" 
              className="flex items-center justify-center gap-2 text-[#d1d1d1] lg:text-[15px] whitespace-nowrap w-12 h-12 lg:w-auto lg:h-auto rounded-full lg:rounded-none bg-white/[0.04] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/[0.08] lg:border-none hover:text-white hover:bg-white/[0.08] lg:hover:bg-transparent transition-all"
              aria-label="Email Afif"
            >
              <Mail className="w-5 h-5 text-[#c8f135] shrink-0" />
              <span className="hidden lg:block">afifr5092@gmail.com</span>
            </a>
            
            <a 
              href="tel:+6285121597870" 
              className="flex items-center justify-center gap-2 text-[#d1d1d1] lg:text-[15px] whitespace-nowrap w-12 h-12 lg:w-auto lg:h-auto rounded-full lg:rounded-none bg-white/[0.04] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/[0.08] lg:border-none hover:text-white hover:bg-white/[0.08] lg:hover:bg-transparent transition-all"
              aria-label="Call Afif"
            >
              <Phone className="w-5 h-5 text-[#c8f135] shrink-0" />
              <span className="hidden lg:block">+62 851-2159-7870</span>
            </a>
            
            <a 
              href="https://maps.google.com/?q=Jakarta,Indonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-[#d1d1d1] lg:text-[15px] whitespace-nowrap w-12 h-12 lg:w-auto lg:h-auto rounded-full lg:rounded-none bg-white/[0.04] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/[0.08] lg:border-none hover:text-white hover:bg-white/[0.08] lg:hover:bg-transparent transition-all"
              aria-label="Location"
            >
              <MapPin className="w-5 h-5 text-[#c8f135] shrink-0" />
              <span className="hidden lg:block">Jakarta, Indonesia</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT: Photo + decorative elements */}
        <div className="relative -mt-24 sm:-mt-12 lg:mt-0 w-full lg:w-[50vw] lg:max-w-[800px] h-[366px] sm:h-[426px] lg:h-[586px] lg:-mr-12 pointer-events-none z-0">
          {/* Wireframe 1: Pen tool (assumed) */}
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            src="/images/UjYoLFfIPBPSjrS5ljfbCeFn0.svg"
            className="absolute top-[52%] lg:top-[45%] left-[4%] lg:left-[15%] w-[60px] lg:w-[100px] select-none pointer-events-none z-30 drop-shadow-lg"
            alt=""
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />

          {/* Wireframe 2: Browser window */}
          <motion.img
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1.5, delay: 1.0 }}
            src="/images/p957znXMPr1ggLrFNnMEK1hgTnI.svg"
            className="absolute top-[55%] lg:top-[55%] right-[6%] lg:right-[6%] w-[70px] lg:w-[115px] select-none pointer-events-none z-30"
            alt=""
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />

          {/* Hero Photo with magic hover mask reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full h-full flex justify-center lg:justify-end items-end relative cursor-crosshair pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full h-full flex items-end justify-center origin-bottom scale-[0.95] sm:scale-100 lg:scale-[1.25]">


              {/* Base Front Photo */}
              <img
                src="/images/hero.webp"
                alt="Afif Ramadhan — Full Stack Developer"
                className="relative z-10 w-auto h-full object-contain object-bottom drop-shadow-2xl translate-y-24 lg:translate-y-36 lg:translate-x-[30px] pointer-events-none"
              />

              {/* Magic Hover Reveal Layer (hero-1.PNG) */}
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-[-250px] z-20 pointer-events-none"
                style={{
                  WebkitMaskImage: maskImage,
                  maskImage: maskImage,
                }}
              >
                <img
                  src="/images/hero-hover.webp"
                  alt="Afif Ramadhan Reveal"
                  className="absolute top-0 w-full h-[calc(100%-250px)] object-contain object-bottom translate-y-24 lg:translate-y-36 lg:translate-x-[30px]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SVG Filter for natural blue silhouette glow */}
      <svg className="absolute w-0 h-0 pointer-events-none hidden" aria-hidden="true">
        <filter id="lime-glow">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.784
                    0 0 0 0 0.945
                    0 0 0 0 0.208
                    0 0 0 1 0"
          />
          <feGaussianBlur stdDeviation="75" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
          </feMerge>
        </filter>
      </svg>
    </section>
  );
}
