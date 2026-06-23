"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="static lg:sticky"
      style={{ top: `calc(120px + ${index * 30}px)` }}
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="bg-[#0f0f0f] border border-[#c8f135] rounded-2xl overflow-hidden hover:border-[#b8e020] transition-colors"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0">
          {/* LEFT: Info */}
          <div className="px-4 py-6 lg:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-[20px] lg:text-[28px] mb-4 leading-tight">
                {project.title}
              </h3>
              <p className="text-[#6b7280] text-[15px] lg:text-[17px] font-light leading-relaxed mb-2">
                <span className="text-[#b8e020]">Type:</span> {project.type}
              </p>
              <p className="text-[#b8b8b8] text-[15px] lg:text-[17px] font-light leading-relaxed mb-3">
                <span className="text-[#6b7280]">Summary:</span>{" "}
                {project.summary}
              </p>
              <p className="text-[#6b7280] text-[15px] lg:text-[17px] font-light leading-relaxed">
                <span className="text-[#b8e020]">Tech:</span>{" "}
                {project.tech.join(", ")}
              </p>
            </div>

            <div className="mt-8 pt-2">
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="relative inline-block cursor-pointer"
              >
                {/* Top Right Floating Line */}
                <motion.span
                  variants={{
                    initial: { x: 0, y: 0, opacity: 1 },
                    hover: { x: -30, y: 10, opacity: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute -top-[10px] right-0 w-12 h-[3px] bg-[#c8f135] rounded-full"
                />

                {/* Main Button */}
                <motion.div
                  variants={{
                    initial: { scale: 1, backgroundColor: "#c8f135" },
                    hover: { scale: 1, backgroundColor: "#b8e020" }
                  }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c8f135] text-black font-bold text-[15px] rounded-[10px] relative z-10"
                >
                  View Live Site
                  <ExternalLink className="w-4 h-4" />
                </motion.div>

                {/* Bottom Left Floating Line */}
                <motion.span
                  variants={{
                    initial: { x: 0, y: 0, opacity: 1 },
                    hover: { x: 30, y: -10, opacity: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute -bottom-[10px] left-0 w-12 h-[3px] bg-[#c8f135] rounded-full"
                />
              </motion.a>
            </div>
          </div>

          {/* RIGHT: Screenshot */}
          <div className="relative bg-[#12122a] border border-[#2a2a2a] rounded-2xl m-4 lg:m-6 overflow-hidden aspect-[16/10] self-center">
            {/* Browser chrome dots */}
            <div className="absolute top-3 left-4 flex gap-1.5 z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12122a]/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
