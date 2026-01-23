"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
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

  const isLgUp = useIsLgUp();

  // Scroll parallax do bloco inteiro (mantém)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Progresso do rail baseado no conteúdo (premium)
  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Refs / inView por step (para step ativo)
  const stepRefs = useMemo(
    () => steps.map(() => React.createRef<HTMLDivElement>()),
    [],
  );

  const inViews = stepRefs.map((r) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInView(r, { margin: "-45% 0px -45% 0px" }),
  );

  const activeIndex = Math.max(0, inViews.findIndex(Boolean));
  const active = activeIndex === -1 ? 0 : activeIndex;

  // Micro “cinematic” na imagem conforme step ativo
  const imgScale = useTransform(contentProgress, [0, 1], [1.08, 1]);
  const imgY = useTransform(contentProgress, [0, 1], [10, -10]);

  return (
    <section ref={sectionRef} className="relative bg-[#f5f5f0] overflow-hidden">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* IMAGE SIDE */}
        <motion.div
          className="relative lg:w-1/2 h-[70vh] lg:h-auto lg:sticky lg:top-0"
          style={{ x: isLgUp ? imageX : 0 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
              alt="Architecture Process"
              className="w-full h-full object-cover"
              style={{
                scale: isLgUp ? imgScale : 1,
                y: isLgUp ? imgY : 0,
              }}
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1.08 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Premium overlays: vinheta + grain leve */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f5f5f0]/35 lg:bg-gradient-to-l" />
            <div
              className="absolute inset-0 opacity-[0.07] mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')",
              }}
            />
          </div>

          {/* “Nosso Método” vertical (desktop) */}
          <div className="absolute left-6 md:left-12 bottom-12 hidden lg:block">
            <span
              className="text-[10px] tracking-[0.5em] text-stone-700/80 uppercase"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {t("Nosso Método", "Our Method")}
            </span>
          </div>

          {/* Step indicator minimal no canto (desktop) */}
          <div className="hidden lg:block absolute right-10 bottom-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.4em] uppercase text-stone-800/70">
                {String(active + 1).padStart(2, "0")} / 04
              </span>
              <div className="w-20 h-px bg-stone-900/20" />
            </div>
          </div>
        </motion.div>

        {/* CONTENT SIDE */}
        <motion.div
          ref={contentRef}
          className="lg:w-1/2 py-20 lg:py-32 px-6 md:px-12 lg:px-20 relative"
          style={{ x: isLgUp ? contentX : 0 }}
        >
          {/* Premium rail (desktop) */}
          <div className="hidden lg:block absolute left-6 top-32 bottom-32 w-px bg-stone-200">
            <motion.div
              className="w-px bg-[#c9a962] origin-top"
              style={{ scaleY: contentProgress }}
            />
          </div>

          <div className="max-w-xl ml-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
            <div className="mt-16 space-y-10">
              {steps.map((step, i) => {
                const isActive = i === active;

                return (
                  <motion.div
                    key={step.number}
                    ref={stepRefs[i]}
                    className="group relative"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }}
                  >
                    <motion.div
                      className="flex items-start gap-6 rounded-2xl"
                      animate={{
                        opacity: isActive ? 1 : 0.55,
                      }}
                      transition={{ duration: 0.35 }}
                    >
                      {/* Number badge */}
                      <motion.span
                        className="text-4xl md:text-5xl font-extralight"
                        animate={{
                          color: isActive ? "#c9a962" : "rgba(214,211,209,1)", // stone-300/200 vibe
                          y: isActive ? -2 : 0,
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        {step.number}
                      </motion.span>

                      <div className="pt-2">
                        <h3 className="text-xl md:text-2xl font-light text-stone-900 mb-2">
                          {language === "pt" ? step.title_pt : step.title_en}
                        </h3>
                        <p className="text-sm text-stone-500 leading-relaxed">
                          {language === "pt" ? step.desc_pt : step.desc_en}
                        </p>

                        {/* Micro underline animado */}
                        <motion.div
                          className="h-px bg-stone-300 mt-6"
                          initial={{ width: "30%" }}
                          animate={{ width: isActive ? "100%" : "45%" }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA premium */}
            <div className="mt-16">
              <Link
                href={withLocale(ROUTES.process, locale)}
                className="group inline-flex items-center gap-4"
              >
                <span className="text-sm tracking-[0.2em] text-stone-700 uppercase">
                  {t("Explorar Processo", "Explore Process")}
                </span>

                <span className="relative w-11 h-11 rounded-full border border-stone-300 flex items-center justify-center overflow-hidden">
                  <motion.span
                    className="absolute inset-0 bg-stone-900"
                    initial={{ x: "-110%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                  <svg
                    className="relative w-4 h-4 text-stone-700 group-hover:text-stone-100 transition-colors"
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
