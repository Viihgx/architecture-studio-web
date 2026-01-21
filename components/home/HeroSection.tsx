"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../ui/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-stone-950">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0" style={{ scale }}>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-transparent to-stone-950 z-10" />
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
            alt="Architecture"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12"
          style={{ opacity }}
        >
          <div className="max-w-[90vw]">
            {/* Overline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-[1px] bg-[#c9a962] mb-8"
            />

            {/* Main Title - Architectural Typography */}
            <motion.h1 className="relative" style={{ y: textY }}>
              <motion.span
                className="block text-[12vw] md:text-[10vw] font-extralight leading-[0.85] text-stone-100 tracking-[-0.02em]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                {t("Construímos", "We build")}
              </motion.span>
              <motion.span
                className="block text-[12vw] md:text-[10vw] font-extralight leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-[#c9a962] to-[#d4b978] tracking-[-0.02em]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                {t("visões.", "visions.")}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 md:mt-12 max-w-md text-stone-400 text-sm md:text-base font-light leading-relaxed"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {t(
                "Arquitetura que transcende o convencional. Cada projeto é uma narrativa espacial única.",
                "Architecture that transcends the conventional. Each project is a unique spatial narrative.",
              )}
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute right-6 md:right-12 bottom-24 md:bottom-32 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-[10px] tracking-[0.4em] text-stone-500 uppercase rotate-90 origin-center translate-x-4">
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-16 bg-gradient-to-b from-[#c9a962] to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-stone-800/30" />
          <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-stone-800/30" />
          <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-stone-800/30" />
        </div>

        {/* Side Text */}
        <motion.div
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block"
          style={{ y: y1 }}
        >
          <span
            className="text-[10px] tracking-[0.5em] text-stone-600 uppercase writing-mode-vertical transform -rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            View Arquitetura © 2024
          </span>
        </motion.div>
      </div>
    </section>
  );
}
