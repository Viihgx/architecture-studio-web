"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../ui/LanguageContext";
import { withLocale } from "@/lib/withLocale";
import { ROUTES } from "@/lib/routes";

type Project = {
  id: number;
  title_pt: string;
  title_en: string;
  category: string;
  year: string;
  image: string;
  slug: string;
};

const projects: Project[] = [
  {
    id: 1,
    title_pt: "Casa Mirante",
    title_en: "Viewpoint House",
    category: "Residencial",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    slug: "casa-mirante",
  },
  {
    id: 2,
    title_pt: "Edifício Horizonte",
    title_en: "Horizon Building",
    category: "Comercial",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    slug: "edificio-horizonte",
  },
  {
    id: 3,
    title_pt: "Centro Cultural Luz",
    title_en: "Light Cultural Center",
    category: "Institucional",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    slug: "centro-cultural-luz",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const localePrefix = language === "en" ? "/en" : "/pt";

  const isOdd = index % 2 === 1;

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${isOdd ? "md:ml-auto md:mr-12" : "md:ml-12"} max-w-4xl`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <Link
        href={`${localePrefix}/${ROUTES.process}/${encodeURIComponent(project.slug)}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <motion.div
            className="absolute inset-0 bg-stone-950 z-10"
            initial={{ scaleX: 1 }}
            animate={isInView ? { scaleX: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ transformOrigin: "right" }}
          />
          <motion.img
            src={project.image}
            alt={language === "pt" ? project.title_pt : project.title_en}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />

          <motion.div
            className="absolute inset-0 bg-stone-950/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#c9a962] flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ArrowUpRight className="w-5 h-5 text-stone-950" />
          </motion.div>
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div>
            <motion.h3
              className="text-2xl md:text-3xl font-extralight text-stone-100"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {language === "pt" ? project.title_pt : project.title_en}
            </motion.h3>
            <p className="text-sm text-stone-500 mt-2 tracking-wide">
              {project.category}
            </p>
          </div>
          <span className="text-sm text-stone-600 tabular-nums">
            {project.year}
          </span>
        </div>
      </Link>

      <div
        className={`absolute -top-8 ${
          isOdd ? "right-0 md:-right-16" : "left-0 md:-left-16"
        } text-8xl md:text-9xl font-extralight text-stone-800/20 select-none pointer-events-none`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const { t, language } = useLanguage();
  const locale = language === "en" ? "en" : "pt";
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative bg-stone-950 py-32 md:py-48">
      <div className="px-6 md:px-12 lg:px-24 mb-20 md:mb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.span
              className="text-[10px] tracking-[0.5em] text-stone-500 uppercase block mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t("Trabalhos Selecionados", "Selected Works")}
            </motion.span>
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-extralight text-stone-100 tracking-[-0.02em]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t("Projetos", "Projects")}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={withLocale(ROUTES.projects, locale)}
              className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] text-stone-400 hover:text-[#c9a962] transition-colors uppercase"
            >
              {t("Ver Todos", "View All")}
              <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-12 space-y-24 md:space-y-40">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <motion.div
        className="absolute left-0 top-1/4 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-stone-800 to-transparent"
        style={{ y: backgroundY }}
      />
    </section>
  );
}
