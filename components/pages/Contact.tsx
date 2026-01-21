"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/ui/LanguageContext";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, ArrowRight, Check } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

type ProjectType = {
  value: string;
  label_pt: string;
  label_en: string;
};

export default function ContactPage() {
  const { t, language } = useLanguage();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes: ProjectType[] = useMemo(
    () => [
      {
        value: "residential",
        label_pt: "Residencial",
        label_en: "Residential",
      },
      { value: "commercial", label_pt: "Comercial", label_en: "Commercial" },
      {
        value: "institutional",
        label_pt: "Institucional",
        label_en: "Institutional",
      },
      { value: "interior", label_pt: "Interiores", label_en: "Interior" },
      { value: "other", label_pt: "Outro", label_en: "Other" },
    ],
    [],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-stone-950"
    >
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/30 z-10" />
          <motion.img
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&q=80"
            alt="Contact"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <div className="relative z-20 px-6 md:px-12 lg:px-24 pb-16 md:pb-24 w-full">
          <motion.span
            className="text-[10px] tracking-[0.5em] text-stone-400 uppercase block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("Vamos Conversar", "Let's Talk")}
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extralight text-stone-100 tracking-[-0.02em]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {t("Contato", "Contact")}
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative bg-[#f5f5f0]">
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Left - Info */}
          <div className="lg:w-2/5 bg-stone-950 px-6 md:px-12 lg:px-16 py-20 lg:py-32">
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-extralight text-stone-100 mb-12">
                  {t(
                    "Cada projeto começa com uma conversa.",
                    "Every project starts with a conversation.",
                  )}
                </h2>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[#c9a962] mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase block mb-2">
                          {t("Endereço", "Address")}
                        </span>
                        <p className="text-stone-300">
                          Rua Augusta, 1200
                          <br />
                          Consolação, São Paulo
                          <br />
                          SP 01304-000
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-[#c9a962] mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase block mb-2">
                          Email
                        </span>
                        <a
                          href="mailto:contato@viewarquitetura.com.br"
                          className="text-stone-300 hover:text-[#c9a962] transition-colors"
                        >
                          contato@viewarquitetura.com.br
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-[#c9a962] mt-1 shrink-0" />
                      <div>
                        <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase block mb-2">
                          {t("Telefone", "Phone")}
                        </span>
                        <a
                          href="tel:+5511999999999"
                          className="text-stone-300 hover:text-[#c9a962] transition-colors"
                        >
                          +55 11 99999-9999
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-16 pt-8 border-t border-stone-800">
                  <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase block mb-4">
                    {t("Redes Sociais", "Social Media")}
                  </span>
                  <div className="flex gap-6">
                    {["Instagram", "LinkedIn", "Behance"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="text-sm text-stone-400 hover:text-[#c9a962] transition-colors"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:w-3/5 px-6 md:px-12 lg:px-20 py-20 lg:py-32">
            <div className="max-w-2xl">
              {!isSubmitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extralight text-stone-900 mb-2">
                      {t(
                        "Conte-nos sobre seu projeto",
                        "Tell us about your project",
                      )}
                    </h3>
                    <p className="text-stone-500">
                      {t(
                        "Preencha o formulário abaixo e entraremos em contato em até 48 horas.",
                        "Fill out the form below and we'll get back to you within 48 hours.",
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                        {t("Nome", "Name")} *
                      </label>
                      <Input
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-stone-300 focus-visible:ring-0 focus:border-[#c9a962] rounded-none h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-stone-300 focus-visible:ring-0 focus:border-[#c9a962] rounded-none h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                        {t("Telefone", "Phone")}
                      </label>
                      <Input
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="bg-transparent border-stone-300 focus-visible:ring-0 focus:border-[#c9a962] rounded-none h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                        {t("Tipo de Projeto", "Project Type")} *
                      </label>

                      <select
                        name="projectType"
                        value={formState.projectType}
                        onChange={handleChange}
                        required
                        className="w-full h-12 bg-transparent border border-stone-300 focus:border-[#c9a962] px-4 text-stone-900 outline-none rounded-none"
                      >
                        <option value="">
                          {t("Selecione...", "Select...")}
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {language === "pt" ? type.label_pt : type.label_en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] text-stone-500 uppercase">
                      {t("Mensagem", "Message")} *
                    </label>
                    <Textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={t(
                        "Conte-nos sobre sua visão, terreno, orçamento estimado...",
                        "Tell us about your vision, site, estimated budget...",
                      )}
                      className="bg-transparent border-stone-300 focus-visible:ring-0 focus:border-[#c9a962] rounded-none resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-stone-900 hover:bg-[#c9a962] text-stone-100 hover:text-stone-900 rounded-none h-14 px-12 text-sm tracking-[0.2em] uppercase transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <motion.div
                          className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        {t("Enviando...", "Sending...")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        {t("Enviar Mensagem", "Send Message")}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-[#c9a962]/10 flex items-center justify-center mx-auto mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Check className="w-10 h-10 text-[#c9a962]" />
                  </motion.div>

                  <h3 className="text-2xl font-extralight text-stone-900 mb-4">
                    {t("Mensagem Enviada!", "Message Sent!")}
                  </h3>
                  <p className="text-stone-500 max-w-md mx-auto">
                    {t(
                      "Obrigado pelo seu interesse. Nossa equipe entrará em contato em breve.",
                      "Thank you for your interest. Our team will contact you soon.",
                    )}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[50vh] bg-stone-900">
        <div className="absolute inset-0 opacity-50">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
            alt="São Paulo"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-7xl md:text-9xl font-extralight text-stone-100/10">
              23°33&apos;S
            </span>
            <p className="text-stone-400 mt-4 tracking-[0.3em] uppercase text-sm">
              São Paulo, Brasil
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
