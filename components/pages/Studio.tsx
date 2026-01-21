"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/ui/LanguageContext";

type TeamMember = {
  name: string;
  role_pt: string;
  role_en: string;
  image: string;
};

type ValueItem = {
  title_pt: string;
  title_en: string;
  desc_pt: string;
  desc_en: string;
};

const team: TeamMember[] = [
  {
    name: "Ana Clara Vasconcelos",
    role_pt: "Diretora de Arquitetura",
    role_en: "Architecture Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  },
  {
    name: "Rafael Montenegro",
    role_pt: "Diretor de Engenharia",
    role_en: "Engineering Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
  {
    name: "Beatriz Nakamura",
    role_pt: "Líder de Projetos",
    role_en: "Project Lead",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
  },
  {
    name: "Lucas Ferraro",
    role_pt: "Arquiteto Senior",
    role_en: "Senior Architect",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
];

const values: ValueItem[] = [
  {
    title_pt: "Integridade",
    title_en: "Integrity",
    desc_pt:
      "Projetos honestos que respeitam contexto, orçamento e expectativas.",
    desc_en: "Honest projects that respect context, budget and expectations.",
  },
  {
    title_pt: "Inovação",
    title_en: "Innovation",
    desc_pt:
      "Busca constante por soluções criativas e materiais contemporâneos.",
    desc_en:
      "Constant search for creative solutions and contemporary materials.",
  },
  {
    title_pt: "Sustentabilidade",
    title_en: "Sustainability",
    desc_pt: "Compromisso com a responsabilidade ambiental em cada decisão.",
    desc_en: "Commitment to environmental responsibility in every decision.",
  },
  {
    title_pt: "Colaboração",
    title_en: "Collaboration",
    desc_pt: "Processo participativo onde o cliente é parte essencial.",
    desc_en: "Participatory process where the client is an essential part.",
  },
];

export default function StudioPage() {
  const { t, language } = useLanguage();

  const heroRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);

  const isStoryInView = useInView(storyRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-stone-950"
    >
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-stone-950/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
            alt="Studio"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="relative z-20 h-full flex items-end px-6 md:px-12 lg:px-24 pb-24"
          style={{ opacity: heroOpacity }}
        >
          <div>
            <motion.span
              className="text-[10px] tracking-[0.5em] text-stone-400 uppercase block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t("Sobre Nós", "About Us")}
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-9xl font-extralight text-stone-100 tracking-[-0.03em]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t("Estúdio", "Studio")}
            </motion.h1>
          </div>
        </motion.div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="relative bg-[#f5f5f0] overflow-hidden">
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Text */}
          <div className="lg:w-1/2 px-6 md:px-12 lg:px-20 py-24 lg:py-32 flex items-center">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase block mb-6">
                {t("Nossa História", "Our Story")}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-stone-900 mb-8 tracking-[-0.02em] leading-tight">
                {t(
                  "Fundada em 2012, a View nasceu da crença de que arquitetura é mais do que construir.",
                  "Founded in 2012, View was born from the belief that architecture is more than building.",
                )}
              </h2>

              <div className="w-16 h-px bg-[#c9a962] mb-8" />

              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  {t(
                    "Somos um escritório multidisciplinar que integra arquitetura e engenharia em uma abordagem única. Cada projeto é tratado como uma oportunidade de criar espaços que transformam a vida das pessoas.",
                    "We are a multidisciplinary office that integrates architecture and engineering in a unique approach. Each project is treated as an opportunity to create spaces that transform people's lives.",
                  )}
                </p>
                <p>
                  {t(
                    "Ao longo de mais de uma década, desenvolvemos projetos que vão de residências íntimas a complexos comerciais, sempre com o mesmo compromisso: excelência técnica e sensibilidade espacial.",
                    "Over more than a decade, we have developed projects ranging from intimate residences to commercial complexes, always with the same commitment: technical excellence and spatial sensitivity.",
                  )}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <motion.div
              className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[60vw] aspect-[4/3] overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80"
                alt="View Studio"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] tracking-[0.5em] text-stone-500 uppercase block mb-4">
              {t("Nossos Valores", "Our Values")}
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight text-stone-100 tracking-[-0.02em]">
              {t("O que nos guia", "What guides us")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-6xl font-extralight text-stone-800 group-hover:text-[#c9a962] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-light text-stone-100 mt-4 mb-3">
                  {language === "pt" ? value.title_pt : value.title_en}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {language === "pt" ? value.desc_pt : value.desc_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f5f5f0] py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase block mb-4">
              {t("Equipe", "Team")}
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight text-stone-900 tracking-[-0.02em]">
              {t("Quem faz acontecer", "Who makes it happen")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-6">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-[#c9a962]/0 group-hover:bg-[#c9a962]/10 transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-light text-stone-900">
                  {member.name}
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  {language === "pt" ? member.role_pt : member.role_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-extralight text-stone-100 mb-12 tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t("Reconhecimentos", "Recognition")}
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-stone-500">
              {[
                "IAB-SP 2023",
                "Bienal 2022",
                "AsBEA 2021",
                "Archdaily 2020",
              ].map((award, i) => (
                <motion.div
                  key={i}
                  className="border border-stone-800 py-6 px-4 hover:border-[#c9a962] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-sm tracking-wider">{award}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
