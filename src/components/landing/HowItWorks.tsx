"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Palette, Camera, Rocket } from "lucide-react";

const steps = [
  { icon: Palette, key: "step1" as const, color: "from-primary to-primary-light" },
  { icon: Camera, key: "step2" as const, color: "from-secondary to-secondary-light" },
  { icon: Rocket, key: "step3" as const, color: "from-accent to-accent-light" },
];

export default function HowItWorks() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 bg-surface/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl gradient-text">
            {t("stepsTitle")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="text-center group"
            >
              {/* Step number */}
              <div className="relative inline-flex mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">
                    {i + 1}
                  </span>
                </div>
              </div>

              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                {t(step.key)}
              </h3>
              <p className="text-muted text-sm max-w-xs mx-auto">
                {t(`${step.key}Desc`)}
              </p>

              {/* Connecting line (desktop only) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
