"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Play, ArrowRight, Users } from "lucide-react";
import dynamic from "next/dynamic";

const HeroAvatar = dynamic(() => import("./HeroAvatar"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-md mx-auto rounded-2xl glass flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <span className="text-4xl">🎭</span>
      </div>
    </div>
  ),
});

export default function Hero() {
  const t = useTranslations("landing");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface2 to-background animate-gradient" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight">
              <span className="gradient-text">{t("heroTitle")}</span>
              <br />
              <span className="text-foreground">
                {t("heroSubtitle").split("—")[0]}
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted max-w-lg">
              {t("heroSubtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10">{t("ctaStart")}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 animate-shimmer" />
              </Link>

              <button className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:bg-surface transition-colors">
                <Play className="w-5 h-5 text-primary" />
                {t("ctaDemo")}
              </button>
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[
                  "bg-primary",
                  "bg-secondary",
                  "bg-accent",
                  "bg-success",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-background flex items-center justify-center`}
                  >
                    <span className="text-xs text-white font-bold">
                      {["K", "A", "J", "M"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted">
                <Users className="w-4 h-4" />
                {t("socialProof", { count: "500" })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroAvatar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
