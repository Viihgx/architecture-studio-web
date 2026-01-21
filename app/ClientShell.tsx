"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Navigation from "@/components/navigation/Navigation";
import { LanguageProvider } from "@/components/ui/LanguageContext";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <LanguageProvider>
      <Navigation />

      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname}>{children}</div>
      </AnimatePresence>
    </LanguageProvider>
  );
}
