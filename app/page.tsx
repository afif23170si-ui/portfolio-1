import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import CareerGoalSection from "@/components/sections/CareerGoalSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <CareerGoalSection />
      <ExperienceSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
