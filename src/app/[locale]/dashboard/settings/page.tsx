"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import {
  ChevronLeft,
  User,
  Globe,
  Bell,
  Shield,
  CreditCard,
  Crown,
} from "lucide-react";

export default function SettingsPage() {
  const t = useTranslations();

  const sections = [
    {
      icon: User,
      title: { fr: "Profil", en: "Profile" },
      desc: { fr: "Nom, email, photo de profil", en: "Name, email, profile photo" },
    },
    {
      icon: Globe,
      title: { fr: "Langue", en: "Language" },
      desc: { fr: "Changer la langue de l'interface", en: "Change interface language" },
      action: <LanguageSwitcher />,
    },
    {
      icon: Bell,
      title: { fr: "Notifications", en: "Notifications" },
      desc: { fr: "Gérer vos notifications", en: "Manage your notifications" },
    },
    {
      icon: Shield,
      title: { fr: "Sécurité", en: "Security" },
      desc: { fr: "Mot de passe, connexions", en: "Password, connections" },
    },
    {
      icon: CreditCard,
      title: { fr: "Facturation", en: "Billing" },
      desc: { fr: "Gérer votre forfait et paiements", en: "Manage your plan and payments" },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <Link
            href="/dashboard"
            className="p-2 rounded-lg bg-surface2 text-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {t("common.save").replace("Enregistrer", "Paramètres").replace("Save", "Settings")}
          </h1>
        </motion.div>

        {/* Current plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 glass rounded-2xl p-6 border border-primary/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-warning" />
              <div>
                <p className="font-semibold text-foreground">
                  {t("dashboard.plan")}: {t("landing.pricingFree")}
                </p>
                <p className="text-sm text-muted">
                  {t("landing.pricingFreeDesc")}
                </p>
              </div>
            </div>
            <button className="btn-gradient px-4 py-2 rounded-lg text-white text-sm font-medium">
              {t("dashboard.upgrade")}
            </button>
          </div>
        </motion.div>

        {/* Settings sections */}
        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="glass rounded-xl p-5 border border-border/50 hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface2 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-muted" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {section.title.fr}
                    </p>
                    <p className="text-xs text-muted">{section.desc.fr}</p>
                  </div>
                </div>
                {section.action ? (
                  section.action
                ) : (
                  <ChevronLeft className="w-4 h-4 text-muted rotate-180" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
