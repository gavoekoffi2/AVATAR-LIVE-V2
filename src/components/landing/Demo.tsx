"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User, Sparkles, ArrowRight } from "lucide-react";

export default function Demo() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl gradient-text">
            {t("demoTitle")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
        >
          {/* Before */}
          <div className="relative group">
            <div className="w-64 h-80 rounded-2xl glass border border-border overflow-hidden flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="w-24 h-24 rounded-full bg-surface2 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-muted" />
              </div>
              <span className="text-4xl mb-2">?</span>
              <p className="text-sm text-muted px-4 text-center">
                {t("demoBeforeDesc")}
              </p>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-surface2 border border-border px-4 py-1 rounded-full">
              <span className="text-xs font-bold text-muted">
                {t("demoBefore")}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary" />
              <ArrowRight className="w-6 h-6 text-secondary" />
            </div>
            <div className="md:hidden">
              <ArrowRight className="w-6 h-6 text-secondary rotate-90" />
            </div>
          </div>

          {/* After */}
          <div className="relative group">
            <div className="w-64 h-80 rounded-2xl overflow-hidden border border-primary/30 transition-transform duration-300 group-hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0f0f23 100%)",
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 animate-float">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-bold text-accent">LIVE</span>
                </div>
                <p className="text-sm text-foreground/80 px-4 text-center">
                  {t("demoAfterDesc")}
                </p>
              </div>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary/20 border border-primary/40 px-4 py-1 rounded-full">
              <span className="text-xs font-bold text-primary-light">
                {t("demoAfter")}
              </span>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
