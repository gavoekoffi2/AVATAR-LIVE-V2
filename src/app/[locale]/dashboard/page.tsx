"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import {
  Video,
  Clock,
  ArrowRight,
  Crown,
  Calendar,
  PlayCircle,
} from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations();

  const stats = [
    {
      label: t("dashboard.totalLives"),
      value: "0",
      icon: Video,
      color: "text-primary",
    },
    {
      label: t("dashboard.totalDuration"),
      value: `0 ${t("dashboard.minutes")}`,
      icon: Clock,
      color: "text-secondary",
    },
    {
      label: t("dashboard.plan"),
      value: t("landing.pricingFree"),
      icon: Crown,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-heading font-bold text-3xl text-foreground">
            {t("dashboard.welcome", { name: "User" })}
          </h1>
          <p className="text-muted mt-1">{t("common.tagline")}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-border/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Go to Studio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <Link
            href="/studio"
            className="block group"
          >
            <div className="rounded-2xl p-8 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl btn-gradient flex items-center justify-center">
                    <PlayCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-foreground">
                      {t("dashboard.goToStudio")}
                    </h2>
                    <p className="text-sm text-muted">{t("common.tagline")}</p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Recent sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
            {t("dashboard.recentSessions")}
          </h2>

          <div className="glass rounded-2xl p-12 border border-border/50 text-center">
            <Calendar className="w-12 h-12 text-muted/50 mx-auto mb-4" />
            <p className="text-muted">{t("dashboard.noSessions")}</p>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 mt-4 btn-gradient px-6 py-2 rounded-xl text-white font-medium text-sm"
            >
              {t("dashboard.goToStudio")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
