"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "./ui/LanguageContext";
import { withLocale } from "@/lib/withLocale";
import { ROUTES } from "@/lib/routes";

type Locale = "pt" | "en";
type NavKey = Exclude<keyof typeof ROUTES, "home">;

export default function Footer() {
  const { t, language } = useLanguage();
  const locale: Locale = language === "en" ? "en" : "pt";
  const currentYear = new Date().getFullYear();

  const navLinks: { label: string; key: NavKey }[] = [
    { label: t("Projetos", "Projects"), key: "projects" },
    { label: t("Processo", "Process"), key: "process" },
    { label: t("Estúdio", "Studio"), key: "studio" },
    { label: t("Contato", "Contact"), key: "contact" },
  ];

  return (
    <footer className="relative bg-stone-950 border-t border-stone-900">
      {/* Main Footer */}
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link
                href={withLocale(ROUTES.home, locale)}
                className="inline-block"
              >
                <span className="text-2xl font-extralight tracking-[0.2em] text-stone-100">
                  VIEW
                </span>
              </Link>

              <p className="mt-6 text-sm text-stone-500 max-w-sm leading-relaxed">
                {t(
                  "Escritório de arquitetura e engenharia dedicado a criar espaços que inspiram e transformam a maneira como vivemos.",
                  "Architecture and engineering studio dedicated to creating spaces that inspire and transform the way we live.",
                )}
              </p>

              {/* Social Links */}
              <div className="flex gap-6 mt-8">
                {["Instagram", "LinkedIn", "Behance"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs tracking-[0.2em] text-stone-600 hover:text-[#c9a962] transition-colors uppercase"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-6">
                {t("Navegação", "Navigation")}
              </h4>

              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={withLocale(ROUTES[link.key], locale)}
                    className="block text-sm text-stone-400 hover:text-stone-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-6">
                {t("Contato", "Contact")}
              </h4>

              <div className="space-y-4 text-sm text-stone-400">
                <p>contato@viewarquitetura.com.br</p>
                <p>+55 11 99999-9999</p>
                <p className="pt-4">
                  Rua Augusta, 1200
                  <br />
                  Consolação, São Paulo
                  <br />
                  SP 01304-000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-900">
        <div className="px-6 md:px-12 lg:px-24 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-600">
              © {currentYear} View Arquitetura e Engenharia.{" "}
              {t("Todos os direitos reservados.", "All rights reserved.")}
            </p>
            <p className="text-xs text-stone-700">
              {t("Feito com propósito.", "Made with purpose.")}
            </p>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <motion.span
          className="block text-[25vw] font-extralight text-stone-900/30 tracking-[-0.05em] text-center leading-none"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          VIEW
        </motion.span>
      </div>
    </footer>
  );
}
