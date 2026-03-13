"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Globe, Shield, Smartphone } from "lucide-react";

const features = [
  { icon: Sparkles, titleKey: "feature1Title" as const, descKey: "feature1Desc" as const, color: "text-primary" },
  { icon: Globe, titleKey: "feature2Title" as const, descKey: "feature2Desc" as const, color: "text-secondary" },
  { icon: Shield, titleKey: "feature3Title" as const, descKey: "feature3Desc" as const, color: "text-success" },
  { icon: Smartphone, titleKey: "feature4Title" as const, descKey: "feature4Desc" as const, color: "text-accent" },
];

export default function Features() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl glass border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <div
                  className={`w-12 h-12 rounded-xl bg-surface2 flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
