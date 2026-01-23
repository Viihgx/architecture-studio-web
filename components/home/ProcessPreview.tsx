"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { withLocale } from "@/lib/withLocale";
import { useLanguage } from "../ui/LanguageContext";
import { ROUTES } from "@/lib/routes";

const steps = [
  {
    number: "01",
    title_pt: "Escuta",
    title_en: "Listen",
    desc_pt: "Entender o contexto, os desejos e as restrições.",
    desc_en: "Understanding context, desires and constraints.",
  },
  {
    number: "02",
    title_pt: "Conceito",
    title_en: "Concept",
    desc_pt: "Traduzir a essência em uma ideia espacial.",
    desc_en: "Translating essence into a spatial idea.",
  },
  {
    number: "03",
    title_pt: "Desenvolvimento",
    title_en: "Development",
    desc_pt: "Refinar cada detalhe até a perfeição.",
    desc_en: "Refining every detail to perfection.",
  },
  {
    number: "04",
    title_pt: "Construção",
    title_en: "Construction",
    desc_pt: "Transformar desenhos em matéria.",
    desc_en: "Transforming drawings into matter.",
  },
];

function useIsLgUp() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsLg(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return isLg;
}

export default function ProcessPreview() {
  const { t, language } = useLanguage();
  const locale = language === "en" ? "en" : "pt";
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const isLgUp = useIsLgUp();

  return (
    <section ref={sectionRef} className="relative bg-[#f5f5f0] overflow-hidden">
      {/* Asymmetric Layout */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Image Side */}
        <motion.div
          className="relative lg:w-1/2 h-[60vh] lg:h-auto lg:sticky lg:top-0"
          style={{ x: isLgUp ? imageX : 0 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
              alt="Architecture Process"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f5f5f0]/30 lg:bg-gradient-to-l" />
          </div>

          {/* Vertical Text */}
          <div className="absolute left-6 md:left-12 bottom-12 hidden lg:block">
            <span
              className="text-[10px] tracking-[0.5em] text-stone-600 uppercase"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {t("Nosso Método", "Our Method")}
            </span>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          ref={contentRef}
          className="lg:w-1/2 py-20 lg:py-32 px-6 md:px-12 lg:px-20"
          style={{ x: isLgUp ? contentX : 0 }}
        >
          <div className="max-w-xl ml-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase block mb-4">
                {t("Processo", "Process")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-stone-900 tracking-[-0.02em] mb-6">
                {t(
                  "Como transformamos ideias em espaços.",
                  "How we transform ideas into spaces.",
                )}
              </h2>
              <div className="w-16 h-[1px] bg-[#c9a962]" />
            </motion.div>

            {/* Steps */}
            <div className="mt-16 space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="group relative"
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex items-start gap-6">
                    <span className="text-4xl md:text-5xl font-extralight text-stone-200 group-hover:text-[#c9a962] transition-colors duration-500">
                      {step.number}
                    </span>
                    <div className="pt-2">
                      <h3 className="text-xl md:text-2xl font-light text-stone-900 mb-2">
                        {language === "pt" ? step.title_pt : step.title_en}
                      </h3>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        {language === "pt" ? step.desc_pt : step.desc_en}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-0 bottom-0 w-full h-[1px] bg-stone-200 group-hover:bg-stone-300 transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                href={withLocale(ROUTES.process, locale)}
                className="group inline-flex items-center gap-4"
              >
                <span className="text-sm tracking-[0.2em] text-stone-600 uppercase group-hover:text-stone-900 transition-colors">
                  {t("Explorar Processo", "Explore Process")}
                </span>
                <span className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 transition-all">
                  <svg
                    className="w-4 h-4 text-stone-600 group-hover:text-stone-100 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
