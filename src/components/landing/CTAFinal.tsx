"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function CTAFinal() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 animate-gradient" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            {t("ctaFinalTitle")}
          </h2>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 btn-gradient px-10 py-5 rounded-xl text-white font-semibold text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">{t("ctaFinalButton")}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 animate-shimmer" />
          </Link>

          <p className="mt-4 text-sm text-muted">{t("ctaFinalSubtitle")}</p>
        </motion.div>
      </div>
    </section>
  );
}
