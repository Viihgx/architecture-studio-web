"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../ui/LanguageContext";
import { withLocale } from "@/lib/withLocale";
import { ROUTES } from "@/lib/routes";

export default function ContactTeaser() {
  const { t, language } = useLanguage();
  const locale = language === "en" ? "en" : "pt";
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-stone-950 flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 169, 98, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 169, 98, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ scale, opacity }}
      >
        <motion.div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#c9a962]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.span
          className="text-[10px] tracking-[0.5em] text-stone-500 uppercase block mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("Próximo Passo", "Next Step")}
        </motion.span>

        <motion.h2
          className="text-4xl md:text-6xl lg:text-8xl font-extralight text-stone-100 tracking-[-0.02em] mb-12"
          style={{ x: mousePosition.x, y: mousePosition.y }}
        >
          <span className="block">{t("Vamos criar", "Let's create")}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c9a962] to-[#d4b978]">
            {t("juntos?", "together?")}
          </span>
        </motion.h2>

        <Link href={withLocale(ROUTES.contact, locale)}>
          <motion.div
            className="group relative inline-flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute w-48 h-48 rounded-full border border-stone-700"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c9a962] rounded-full" />
            </motion.div>

            <div className="relative w-40 h-40 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center group-hover:bg-[#c9a962] transition-colors duration-500">
              <span className="text-xs tracking-[0.3em] text-stone-300 uppercase group-hover:text-stone-950 transition-colors duration-500">
                {t("Contato", "Contact")}
              </span>
            </div>
          </motion.div>
        </Link>

        <motion.p
          className="mt-16 text-sm text-stone-500 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {t(
            "Cada projeto começa com uma conversa. Estamos prontos para ouvir a sua visão.",
            "Every project starts with a conversation. We're ready to hear your vision.",
          )}
        </motion.p>
      </motion.div>

      <div className="absolute bottom-12 left-12 hidden md:block">
        <span className="text-[10px] tracking-[0.4em] text-stone-600 uppercase">
          São Paulo, Brasil
        </span>
      </div>
      <div className="absolute bottom-12 right-12 hidden md:block">
        <span className="text-[10px] tracking-[0.4em] text-stone-600 uppercase">
          contato@viewarquitetura.com.br
        </span>
      </div>
    </section>
  );
}
