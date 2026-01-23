"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/ui/LanguageContext";
import { ROUTES } from "@/lib/routes";
import { withLocale } from "@/lib/withLocale";

type ProcessStepType = {
  number: string;
  title_pt: string;
  title_en: string;
  subtitle_pt: string;
  subtitle_en: string;
  description_pt: string;
  description_en: string;
  image: string;
  details_pt: string[];
  details_en: string[];
};

const processSteps: ProcessStepType[] = [
  {
    number: "01",
    title_pt: "Escuta",
    title_en: "Listen",
    subtitle_pt: "Imersão total no seu universo",
    subtitle_en: "Total immersion in your universe",
    description_pt:
      "Começamos ouvindo. Entendemos suas necessidades, sonhos, restrições e o contexto onde o projeto se insere. Cada conversa é uma descoberta.",
    description_en:
      "We start by listening. We understand your needs, dreams, constraints and the context where the project fits. Each conversation is a discovery.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    details_pt: [
      "Análise do terreno",
      "Estudo de viabilidade",
      "Briefing detalhado",
      "Pesquisa de referências",
    ],
    details_en: [
      "Site analysis",
      "Feasibility study",
      "Detailed briefing",
      "Reference research",
    ],
  },
  {
    number: "02",
    title_pt: "Conceito",
    title_en: "Concept",
    subtitle_pt: "A ideia que tudo conecta",
    subtitle_en: "The idea that connects everything",
    description_pt:
      "Da escuta nasce o conceito. Uma ideia-força que guiará todas as decisões projetuais. É a essência traduzida em espaço.",
    description_en:
      "From listening comes the concept. A core idea that will guide all design decisions. It's the essence translated into space.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    details_pt: [
      "Partido arquitetônico",
      "Estudos volumétricos",
      "Maquetes conceituais",
      "Apresentação da ideia",
    ],
    details_en: [
      "Architectural approach",
      "Volumetric studies",
      "Conceptual models",
      "Idea presentation",
    ],
  },
  {
    number: "03",
    title_pt: "Desenvolvimento",
    title_en: "Development",
    subtitle_pt: "Cada detalhe importa",
    subtitle_en: "Every detail matters",
    description_pt:
      "O conceito ganha forma através de plantas, cortes, fachadas e detalhes. Refinamos obsessivamente até alcançar a perfeição.",
    description_en:
      "The concept takes shape through plans, sections, facades and details. We obsessively refine until we reach perfection.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    details_pt: [
      "Projeto executivo",
      "Compatibilização",
      "Especificações técnicas",
      "Orçamento detalhado",
    ],
    details_en: [
      "Executive project",
      "Compatibility",
      "Technical specifications",
      "Detailed budget",
    ],
  },
  {
    number: "04",
    title_pt: "Construção",
    title_en: "Construction",
    subtitle_pt: "Do desenho à matéria",
    subtitle_en: "From drawing to matter",
    description_pt:
      "Acompanhamos cada etapa da obra, garantindo que a visão projetual se materialize com a qualidade que imaginamos.",
    description_en:
      "We follow every stage of the work, ensuring that the design vision materializes with the quality we envisioned.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    details_pt: [
      "Gestão de obra",
      "Controle de qualidade",
      "Soluções in loco",
      "Entrega final",
    ],
    details_en: [
      "Construction management",
      "Quality control",
      "On-site solutions",
      "Final delivery",
    ],
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: ProcessStepType;
  index: number;
}) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={[
        "relative min-h-screen flex flex-col lg:flex-row items-stretch",
        !isEven ? "lg:flex-row-reverse" : "",
      ].join(" ")}
    >
      {/* Number */}
      <motion.div
        className={[
          "hidden lg:block",
          "absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none",
          isEven ? "left-6 md:left-12" : "right-6 md:right-12",
        ].join(" ")}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-[30vw] font-extralight text-stone-100 select-none">
          {step.number}
        </span>
      </motion.div>

      {/* Image */}
      <div
        className={`w-full lg:w-1/2 h-[58vh] sm:h-[64vh] md:h-[72vh] lg:h-screen relative ${isEven ? "lg:pl-0" : "lg:pr-0"}`}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{
            clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          }}
          animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Number grande (mobile) */}
          <motion.div
            className={[
              "lg:hidden",
              "absolute inset-0 z-20 pointer-events-none flex items-end",
              isEven ? "justify-start" : "justify-end",
              "px-5 pb-4",
            ].join(" ")}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.12 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-[42vw] font-extralight text-stone-100 leading-none">
              {step.number}
            </span>
          </motion.div>

          <motion.img
            src={step.image}
            alt={language === "pt" ? step.title_pt : step.title_en}
            className="w-full h-full object-cover"
            initial={{ scale: 1.3 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div
        className={[
          "w-full lg:w-1/2",
          "px-6 md:px-12 lg:px-20",
          "py-12 lg:py-0",
          "lg:flex lg:items-center",
          isEven ? "lg:pl-20" : "lg:pr-20",
        ].join(" ")}
      >
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-[#c9a962] text-sm tracking-[0.3em] mb-4 block">
            {step.number}
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-stone-100 mb-4 tracking-[-0.02em]">
            {language === "pt" ? step.title_pt : step.title_en}
          </h2>

          <p className="text-lg text-stone-400 font-light mb-8">
            {language === "pt" ? step.subtitle_pt : step.subtitle_en}
          </p>

          <div className="w-16 h-px bg-[#c9a962] mb-8" />

          <p className="text-stone-300 leading-relaxed mb-12">
            {language === "pt" ? step.description_pt : step.description_en}
          </p>

          <div className="space-y-3">
            {(language === "pt" ? step.details_pt : step.details_en).map(
              (detail, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span className="w-6 h-px bg-stone-700" />
                  <span className="text-sm text-stone-500">{detail}</span>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProcessPage() {
  const { t, language } = useLanguage();
  const locale = language === "en" ? "en" : "pt";
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-stone-950"
    >
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-stone-950/80 to-stone-950"
          style={{ y: heroY }}
        />

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.span
            className="text-[10px] tracking-[0.5em] text-stone-500 uppercase block mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("Nosso Método", "Our Method")}
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-9xl font-extralight text-stone-100 tracking-[-0.03em]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {t("Processo", "Process")}
          </motion.h1>

          <motion.p
            className="mt-8 text-stone-400 max-w-lg mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {t(
              "Cada projeto é uma jornada única. Nosso processo garante que cada etapa seja tratada com a atenção que merece.",
              "Each project is a unique journey. Our process ensures that each stage is treated with the attention it deserves.",
            )}
          </motion.p>

          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-[#c9a962] to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Steps */}
      {processSteps.map((step, index) => (
        <ProcessStep key={step.number} step={step} index={index} />
      ))}

      {/* CTA */}
      <section className="bg-[#f5f5f0] py-32 md:py-48">
        <div className="px-6 md:px-12 lg:px-24 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-extralight text-stone-900 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t(
              "Pronto para começar sua jornada?",
              "Ready to start your journey?",
            )}
          </motion.h2>

          <Link
            href={withLocale(ROUTES.contact, locale)}
            className="inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
          >
            {t("Fale Conosco", "Contact Us")}
            <span className="w-8 h-px bg-current" />
          </Link>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
