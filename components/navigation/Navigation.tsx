"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitch, useLanguage } from "../ui/LanguageContext";

type Locale = "pt" | "en";

function withLocale(path: string, locale: Locale) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const { t, language } = useLanguage();
  const locale: Locale = language === "en" ? "en" : "pt";

  const routes = useMemo(() => {
    if (locale === "pt") {
      return {
        home: "/",
        projects: "/projects",
        process: "/process",
        studio: "/studio",
        contact: "/contact",
      };
    }
    return {
      home: "/",
      projects: "/projects",
      process: "/process",
      studio: "/studio",
      contact: "/contact",
    };
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = [
    {
      label: t("Projetos", "Projects"),
      href: withLocale(routes.projects, locale),
    },
    {
      label: t("Processo", "Process"),
      href: withLocale(routes.process, locale),
    },
    { label: t("Estúdio", "Studio"), href: withLocale(routes.studio, locale) },
    {
      label: t("Contato", "Contact"),
      href: withLocale(routes.contact, locale),
    },
  ];

  return (
    <>
      {/* Fixed Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-700 ${
          scrolled ? "mix-blend-difference" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={withLocale(routes.home, locale)}
            className="relative z-50"
            onClick={closeMenu}
          >
            <motion.div
              className="flex flex-col"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className={`text-xl md:text-2xl font-extralight tracking-[0.2em] ${
                  isOpen ? "text-stone-950" : "text-stone-100"
                } transition-colors duration-500`}
              >
                VIEW
              </span>
              <span
                className={`text-[8px] tracking-[0.4em] uppercase ${
                  isOpen ? "text-stone-600" : "text-stone-400"
                } transition-colors duration-500`}
              >
                {t("Arquitetura & Engenharia", "Architecture & Engineering")}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-12">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative"
                onClick={closeMenu}
              >
                <span className="text-xs tracking-[0.2em] uppercase text-stone-300 group-hover:text-stone-100 transition-colors duration-300">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a962] group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
            <LanguageSwitch className="text-stone-300 hover:text-stone-100 ml-8 cursor-pointer" />
          </div>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <motion.span
              className={`w-6 h-px ${
                isOpen ? "bg-stone-950" : "bg-stone-100"
              } transition-colors`}
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
            />
            <motion.span
              className={`w-6 h-px ${
                isOpen ? "bg-stone-950" : "bg-stone-100"
              } transition-colors`}
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#f5f5f0]"
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 48px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="h-full flex flex-col justify-center px-12 md:px-24">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                >
                  <Link
                    href={link.href}
                    className="group block py-4 md:py-6"
                    onClick={closeMenu}
                  >
                    <span className="text-4xl md:text-7xl font-extralight text-stone-950 group-hover:text-[#c9a962] transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <LanguageSwitch className="text-stone-600 hover:text-stone-950" />
              </motion.div>
            </div>

            {/* Decorative */}
            <motion.div
              className="absolute bottom-12 right-12 text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs tracking-[0.3em] text-stone-400 uppercase">
                {t("Construindo visões", "Building visions")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
