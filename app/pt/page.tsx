"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/motion/SmoothScroll";
import HeroSection from "@/components/home/HeroSection";
import ManifestoSection from "@/components/home/ManifestoSection";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import ProcessPreview from "@/components/home/ProcessPreview";
import ContactTeaser from "@/components/home/ContactTeaser";
import Footer from "@/components/Footer";

export default function Page() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-stone-950"
    >
      <ScrollProgress />
      <HeroSection />
      <ManifestoSection />
      <ProjectsShowcase />
      <ProcessPreview />
      <ContactTeaser />
      <Footer />
    </motion.main>
  );
}
