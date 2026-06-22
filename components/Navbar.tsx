"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";

function AppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1.5" transform="rotate(45 6.5 6.5)" stroke="white" strokeWidth="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About me", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(13,13,13,0)", "rgba(13,13,13,0.2)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const blurValue = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(8px)"]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          backgroundColor: isMenuOpen ? "transparent" : bgColor,
          backdropFilter: isMenuOpen ? "none" : blurValue,
          WebkitBackdropFilter: isMenuOpen ? "none" : blurValue,
          borderBottom: isMenuOpen ? "none" : "1px solid",
          borderBottomColor: useTransform(
            borderOpacity,
            (v) => `rgba(255,255,255,${Number(v) * 0.06})`
          ),
        }}
      >
        <nav className="relative flex flex-row-reverse lg:flex-row items-center justify-between px-6 lg:px-18 h-[80px] lg:h-[112px] w-full max-w-[1600px] mx-auto">
          {/* LEFT: Grid icon / Close icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            className="w-12 h-12 flex items-center justify-center rounded-[10px] border bg-white/[0.04] backdrop-blur-md hover:border-[#c8f135] transition-colors z-[110] relative shrink-0"
            style={{ borderColor: isMenuOpen ? "#3a4a80" : "rgba(255,255,255,0.08)" }} // Glassmorphic white border when closed
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <AppIcon />}
          </button>

          {/* CENTER: Brand */}
          <span className="text-white font-light text-[28px] lg:text-[38px] tracking-wide select-none z-[110] lg:absolute lg:left-1/2 lg:-translate-x-1/2 relative">
            Portfolio
          </span>

          {/* RIGHT: CTA with animated accent lines */}
          <motion.div
            initial="initial"
            whileHover="hover"
            className="hidden sm:block relative z-[110] cursor-pointer"
            onClick={() => {
              setIsMenuOpen(false);
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {/* Top Right Floating Line */}
            <motion.span
              variants={{
                initial: { x: 0, y: 0, opacity: 1 },
                hover: { x: -30, y: 10, opacity: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute -top-[10px] -right-[6px] w-12 h-[3px] bg-[#c8f135]"
            />

            {/* Main Button */}
            <motion.div
              variants={{
                initial: { scale: 1, backgroundColor: "#c8f135" },
                hover: { scale: 1, backgroundColor: "#b8e020" }
              }}
              transition={{ duration: 0.2 }}
              className="px-7 py-3 bg-[#c8f135] text-black font-bold text-[15px] rounded-[10px] relative z-10"
            >
              Let&apos;s Connect
            </motion.div>

            {/* Bottom Left Floating Line */}
            <motion.span
              variants={{
                initial: { x: 0, y: 0, opacity: 1 },
                hover: { x: 30, y: -10, opacity: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute -bottom-[10px] -left-[6px] w-12 h-[3px] bg-[#c8f135]"
            />
          </motion.div>
        </nav>
      </motion.header>

      {/* FULL SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#050811] flex flex-col lg:flex-row pt-[80px] lg:pt-[112px] overflow-y-auto lg:overflow-y-hidden"
          >
            {/* Right side background glow (radial) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#042a0d_0%,transparent_60%)] pointer-events-none" />

            {/* LEFT COLUMN: Links (approx 30%) */}
            <div className="w-full lg:w-[35%] lg:border-r border-white/10 flex flex-col justify-center px-6 lg:px-12 relative z-10 lg:h-full py-4 lg:py-0">
              <ul className="flex flex-col w-full max-w-[400px] mx-auto lg:mx-0">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="w-full"
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center lg:text-left text-white text-[20px] lg:text-[32px] font-bold py-4 lg:py-6 border-b border-white/10 hover:text-[#c8f135] transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* RIGHT COLUMN: Contact Info (approx 65%) */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-6 lg:py-0 pb-12 lg:pb-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white font-light text-[24px] lg:text-[64px] mb-6 lg:mb-12 tracking-tight text-center"
              >
                Feel Free to ask
              </motion.h2>

              <div className="flex flex-col items-center gap-4 lg:gap-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-[#a0a0a0] text-[13px] lg:text-[18px] mb-1 lg:mb-2 font-light">Call for query</p>
                  <p className="text-white text-[16px] lg:text-[24px] font-bold tracking-wide">+62 851-2159-7870</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-[#a0a0a0] text-[13px] lg:text-[18px] mb-1 lg:mb-2 font-light">Send email</p>
                  <p className="text-white text-[16px] lg:text-[24px] font-bold tracking-wide">afifr5092@gmail.com</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-[#a0a0a0] text-[13px] lg:text-[18px] mb-1 lg:mb-2 font-light">Location</p>
                  <p className="text-white text-[16px] lg:text-[24px] font-bold tracking-wide">Jakarta, Indonesia</p>
                </motion.div>

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="block lg:hidden mt-2"
                >
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-3 bg-[#c8f135] text-black font-bold text-[15px] rounded-[10px] hover:bg-[#b8e020] transition-colors"
                  >
                    Let&apos;s Connect
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
