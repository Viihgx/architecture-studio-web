"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { ROUTES } from "@/lib/routes";
import { withLocale } from "@/lib/withLocale";

type Project = {
  id: number;
  title_pt: string;
  title_en: string;
  category: string;
  year: string;
  location: string;
  area: string;
  image: string;
  slug: string;
};

const projects: Project[] = [
  {
    id: 1,
    title_pt: "Casa Mirante",
    title_en: "Viewpoint House",
    category: "residencial",
    year: "2024",
    location: "Campos do Jordão, SP",
    area: "480m²",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    slug: "casa-mirante",
  },
  {
    id: 2,
    title_pt: "Edifício Horizonte",
    title_en: "Horizon Building",
    category: "comercial",
    year: "2023",
    location: "São Paulo, SP",
    area: "12.000m²",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    slug: "edificio-horizonte",
  },
  {
    id: 3,
    title_pt: "Centro Cultural Luz",
    title_en: "Light Cultural Center",
    category: "institucional",
    year: "2023",
    location: "São Paulo, SP",
    area: "8.500m²",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    slug: "centro-cultural-luz",
  },
  {
    id: 4,
    title_pt: "Loft Jardins",
    title_en: "Jardins Loft",
    category: "interiores",
    year: "2024",
    location: "São Paulo, SP",
    area: "180m²",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    slug: "loft-jardins",
  },
  {
    id: 5,
    title_pt: "Praça das Águas",
    title_en: "Waters Square",
    category: "urbanismo",
    year: "2022",
    location: "Campinas, SP",
    area: "25.000m²",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    slug: "praca-das-aguas",
  },
  {
    id: 6,
    title_pt: "Residência Serra",
    title_en: "Serra Residence",
    category: "residencial",
    year: "2023",
    location: "Gramado, RS",
    area: "620m²",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    slug: "residencia-serra",
  },
];

const categories = [
  { id: "all", label_pt: "Todos", label_en: "All" },
  { id: "residencial", label_pt: "Residencial", label_en: "Residential" },
  { id: "comercial", label_pt: "Comercial", label_en: "Commercial" },
  { id: "institucional", label_pt: "Institucional", label_en: "Institutional" },
  { id: "interiores", label_pt: "Interiores", label_en: "Interiors" },
  { id: "urbanismo", label_pt: "Urbanismo", label_en: "Urban" },
];

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const { language } = useLanguage();
  const locale = language === "en" ? "en" : "pt";
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const localePrefix = language === "en" ? "/en" : "/pt";

  // Alternating layouts
  const layouts = [
    "col-span-12 md:col-span-7",
    "col-span-12 md:col-span-5 md:mt-32",
    "col-span-12 md:col-span-6 md:col-start-2",
    "col-span-12 md:col-span-5 md:col-start-8",
    "col-span-12 md:col-span-8",
    "col-span-12 md:col-span-4 md:mt-24",
  ];

  return (
    <motion.div
      ref={ref}
      className={layouts[index % layouts.length]}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.1 }}
    >
      <Link
        href={withLocale(
          `${ROUTES.projects}/${encodeURIComponent(project.slug)}`,
          locale,
        )}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <motion.div
            className="absolute inset-0 bg-stone-950 z-10"
            initial={{ scaleX: 1 }}
            animate={isInView ? { scaleX: 0 } : {}}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ transformOrigin: "right" }}
          />

          <motion.img
            src={project.image}
            alt={language === "pt" ? project.title_pt : project.title_en}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-stone-950/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-[#c9a962] flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArrowUpRight className="w-6 h-6 text-stone-950" />
            </motion.div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-6 flex items-start justify-between">
          <div>
            <motion.h3
              className="text-xl md:text-2xl font-extralight text-stone-100"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {language === "pt" ? project.title_pt : project.title_en}
            </motion.h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-stone-500">
              <span className="uppercase tracking-wider">
                {project.location}
              </span>
              <span>•</span>
              <span>{project.area}</span>
            </div>
          </div>
          <span className="text-sm text-stone-600 tabular-nums">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-stone-950"
    >
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[70vh] flex items-end overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
            alt="Projects"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 px-6 md:px-12 lg:px-24 pb-16 md:pb-24 w-full">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-[10px] tracking-[0.5em] text-stone-500 uppercase block mb-4">
              {t("Portfólio", "Portfolio")}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-stone-100 tracking-[-0.02em]">
              {t("Projetos", "Projects")}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur-sm border-b border-stone-900">
        <div className="px-6 md:px-12 lg:px-24 py-6">
          <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "text-[#c9a962]"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {language === "pt" ? cat.label_pt : cat.label_en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid - Asymmetric */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f5f5f0] py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              {
                number: "47",
                label: t("Projetos Realizados", "Completed Projects"),
              },
              {
                number: "12",
                label: t("Anos de Experiência", "Years of Experience"),
              },
              { number: "8", label: t("Prêmios", "Awards") },
              { number: "32", label: t("Cidades", "Cities") },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-5xl md:text-6xl font-extralight text-stone-900">
                  {stat.number}
                </span>
                <p className="mt-2 text-xs tracking-[0.2em] text-stone-500 uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
