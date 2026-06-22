"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { LinkedinIcon, GithubIcon, DribbbleIcon, XIcon } from "@/components/ui/CustomIcons";

const socialLinks = [
  { name: "LinkedIn", icon: <LinkedinIcon className="w-4 h-4" />, href: "#" },
  { name: "Website", icon: <Globe className="w-4 h-4" />, href: "#" },
  { name: "Dribbble", icon: <DribbbleIcon className="w-4 h-4" />, href: "#" },
  { name: "GitHub", icon: <GithubIcon className="w-4 h-4" />, href: "#" },
  { name: "X", icon: <XIcon className="w-4 h-4" />, href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-t from-[#0d0d0d] to-[#000000]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <span className="text-white font-semibold text-[22px] tracking-tight select-none">
            ProfileA
          </span>

          {/* Copyright */}
          <p className="text-[#6b7280] text-[13px] text-center">
            © 2026 ProfileA by Afif Ramadhan. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                whileHover={{ scale: 1.1, borderColor: "#c8f135" }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-full border border-[#2a2a2a] bg-[#141414] flex items-center justify-center text-white hover:text-[#c8f135] transition-colors"
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
