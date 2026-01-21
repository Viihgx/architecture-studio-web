"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "../ui/LanguageContext";

export default function ManifestoSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const words = t(
    "Cada espaço que criamos é uma resposta ao seu contexto — luz, topografia, pessoas. Não projetamos edifícios. Projetamos experiências de habitar.",
    "Every space we create is a response to its context — light, topography, people. We don't design buildings. We design experiences of dwelling.",
  ).split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#f5f5f0] py-32 md:py-48 overflow-hidden"
    >
      {/* Background Typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <motion.div style={{ x: x1 }} className="absolute top-20 -left-20">
          <span className="text-[20vw] font-extralight text-stone-200/50 tracking-[-0.05em]">
            VIEW
          </span>
        </motion.div>
        <motion.div style={{ x: x2 }} className="absolute bottom-20 -right-20">
          <span className="text-[15vw] font-extralight text-stone-200/50 tracking-[-0.05em]">
            ARQUITETURA
          </span>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase">
              {t("Manifesto", "Manifesto")}
            </span>
            <div className="w-12 h-[1px] bg-[#c9a962] mt-4" />
          </motion.div>

          {/* Animated Text */}
          <div ref={textRef} className="relative">
            <p className="text-2xl md:text-4xl lg:text-5xl font-extralight leading-[1.4] text-stone-800 tracking-[-0.01em]">
              {words.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden mr-[0.3em]"
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.04,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </p>
          </div>

          {/* Signature */}
          <motion.div
            className="mt-16 md:mt-24 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-16 h-[1px] bg-stone-300" />
            <span className="text-xs tracking-[0.3em] text-stone-500 uppercase">
              View Studio
            </span>
          </motion.div>
        </div>
      </div>

      {/* Decorative Vertical Line */}
      <motion.div
        className="absolute right-12 md:right-24 top-0 bottom-0 w-[1px]"
        style={{ opacity }}
      >
        <div className="h-full bg-gradient-to-b from-transparent via-[#c9a962]/30 to-transparent" />
      </motion.div>
    </section>
  );
}
