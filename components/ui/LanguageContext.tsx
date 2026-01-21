"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Locale = "pt" | "en";

type LanguageContextValue = {
  language: Locale;
  isTransitioning: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Locale) => void;
  t: (pt: string, en: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>("pt");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleLanguage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
      setTimeout(() => setIsTransitioning(false), 300);
    }, 200);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      isTransitioning,
      toggleLanguage,
      setLanguage,
      t: (pt, en) => (language === "pt" ? pt : en),
    }),
    [language, isTransitioning],
  );

  return (
    <LanguageContext.Provider value={value}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`relative group ${className}`}
      aria-label="Toggle language"
    >
      <span className="text-xs tracking-[0.3em] uppercase font-light">
        <motion.span
          key={language}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block"
        >
          {language === "pt" ? "EN" : "PT"}
        </motion.span>
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-500" />
    </button>
  );
}

export default LanguageContext;
