"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#000000] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-[48px] lg:text-[56px] font-medium tracking-tight mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="text-[#6b7280] text-[15px]"
          >
            Some of the work I&apos;m most proud of — designed with purpose,
            built to perform.
          </motion.p>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
