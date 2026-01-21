import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientShell from "./ClientShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Architecture Studio Website",
  description: "Base do projeto — View Arquitetura (case)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        className={`${inter.className} min-h-screen bg-stone-950 text-stone-100 antialiased`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
