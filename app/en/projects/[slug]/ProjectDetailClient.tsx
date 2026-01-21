"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { ROUTES } from "@/lib/routes";

type ProjectDetail = {
  title_pt: string;
  title_en: string;
  category: string;
  year: string;
  location: string;
  area: string;
  client: string;
  description_pt: string;
  description_en: string;
  hero_image: string;
  gallery: string[];
};

export default function ProjectDetailClient({
  project,
}: {
  project: ProjectDetail;
}) {
  const { t, language } = useLanguage();
  const localePrefix = language === "en" ? "/en" : "/pt";

  const heroRef = useRef<HTMLElement | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-stone-950"
    >
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent z-10" />
          <motion.img
            src={project.hero_image}
            alt={language === "pt" ? project.title_pt : project.title_en}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>

        {/* Back */}
        <div className="absolute top-24 left-6 md:left-12 z-30">
          <Link
            href={`${localePrefix}/${ROUTES.projects}`}
            className="group flex items-center gap-3 text-stone-300 hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs tracking-[0.2em] uppercase">
              {t("Voltar", "Back")}
            </span>
          </Link>
        </div>

        {/* Title */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-24 pb-16 md:pb-24"
          style={{ y: titleY, opacity: heroOpacity }}
        >
          <span className="text-[10px] tracking-[0.5em] text-[#c9a962] uppercase block mb-4">
            {project.category} — {project.year}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extralight text-stone-100 tracking-[-0.02em]">
            {language === "pt" ? project.title_pt : project.title_en}
          </h1>
        </motion.div>
      </section>

      {/* Info */}
      <section className="relative bg-[#f5f5f0] py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="grid grid-cols-2 gap-8">
              {[
                {
                  label: t("Localização", "Location"),
                  value: project.location,
                },
                { label: t("Área", "Area"), value: project.area },
                { label: t("Ano", "Year"), value: project.year },
                { label: t("Cliente", "Client"), value: project.client },
              ].map((item, i) => (
                <div key={i} className="border-t border-stone-300 pt-4">
                  <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase block mb-2">
                    {item.label}
                  </span>
                  <span className="text-lg font-light text-stone-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xl md:text-2xl font-extralight text-stone-800 leading-relaxed">
                {language === "pt"
                  ? project.description_pt
                  : project.description_en}
              </p>
              <div className="w-16 h-px bg-[#c9a962] mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-stone-950 py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="relative aspect-video overflow-hidden mb-8">
            <motion.img
              key={activeImage}
              src={project.gallery[activeImage]}
              alt=""
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />

            <button
              type="button"
              onClick={() =>
                setActiveImage((prev) =>
                  prev === 0 ? project.gallery.length - 1 : prev - 1,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-950/80 flex items-center justify-center hover:bg-[#c9a962] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-stone-100" />
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveImage((prev) =>
                  prev === project.gallery.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-950/80 flex items-center justify-center hover:bg-[#c9a962] transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-stone-100" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative shrink-0 w-32 h-20 overflow-hidden ${
                  activeImage === i
                    ? "ring-2 ring-[#c9a962]"
                    : "opacity-50 hover:opacity-100"
                } transition-all`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-16 md:py-24">
        <div className="px-6 md:px-12 lg:px-24">
          <Link
            href={`${localePrefix}/${ROUTES.projects}`}
            className="group flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] tracking-[0.5em] text-stone-500 uppercase block mb-2">
                {t("Explorar mais", "Explore more")}
              </span>
              <span className="text-2xl md:text-4xl font-extralight text-stone-100 group-hover:text-[#c9a962] transition-colors">
                {t("Ver todos os projetos", "View all projects")}
              </span>
            </div>
            <ArrowRight className="w-8 h-8 text-stone-500 group-hover:text-[#c9a962] group-hover:translate-x-2 transition-all" />
          </Link>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
