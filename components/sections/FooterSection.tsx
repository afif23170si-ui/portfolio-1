"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { LinkedinIcon, GithubIcon, DribbbleIcon, BehanceIcon, XIcon } from "@/components/ui/CustomIcons";

const socialLinks = [
  { name: "LinkedIn", icon: <LinkedinIcon className="w-5 h-5 lg:w-6 lg:h-6" />, href: "#" },
  { name: "GitHub", icon: <GithubIcon className="w-5 h-5 lg:w-6 lg:h-6" />, href: "#" },
  { name: "Dribbble", icon: <DribbbleIcon className="w-5 h-5 lg:w-6 lg:h-6" />, href: "#" },
  { name: "Behance", icon: <BehanceIcon className="w-5 h-5 lg:w-6 lg:h-6" />, href: "#" },
  { name: "X", icon: <XIcon className="w-5 h-5 lg:w-6 lg:h-6" />, href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#000000] pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative bg-[#080808] rounded-[24px] border border-[#1a1a1a] px-6 py-5 lg:px-10 lg:py-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          {/* Center Glow — mobile */}
          <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-[#3a6a15] blur-[60px] rounded-full pointer-events-none opacity-90" />
          {/* Center Glow — desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#243d10] blur-[100px] rounded-full pointer-events-none" />
          
          {/* Brand */}
          <span className="text-white font-clash font-medium text-[28px] lg:text-[32px] tracking-tight select-none relative z-10">
            Portfolio
          </span>

          {/* Copyright */}
          <p className="text-white/80 text-[14px] lg:text-[16px] text-center relative z-10">
            © 2026 Portfolio by Afif Ramadhan. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 relative z-10">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                whileHover={{ scale: 1.05, borderColor: "#c8f135" }}
                transition={{ duration: 0.2 }}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-[12px] lg:rounded-[14px] border border-[#2a2a2a] bg-transparent flex items-center justify-center text-white hover:text-[#c8f135] transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
