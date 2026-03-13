"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface PlanFeature {
  textKey: string;
  params?: Record<string, string>;
}

interface PricingPlan {
  nameKey: string;
  priceKey: string;
  descKey: string;
  popular: boolean;
  features: PlanFeature[];
}

const plans: PricingPlan[] = [
  {
    nameKey: "pricingFree",
    priceKey: "0 FCFA",
    descKey: "pricingFreeDesc",
    popular: false,
    features: [
      { textKey: "pricingFeatureLivesDay", params: { count: "2" } },
      { textKey: "pricingFeatureMaxDuration", params: { duration: "30 min" } },
      { textKey: "pricingFeatureWatermark" },
      { textKey: "pricingFeatureAvatars", params: { count: "3" } },
    ],
  },
  {
    nameKey: "pricingStarter",
    priceKey: "pricingStarterPrice",
    descKey: "pricingStarterDesc",
    popular: true,
    features: [
      { textKey: "pricingFeatureLivesDay", params: { count: "10" } },
      { textKey: "pricingFeatureMaxDuration", params: { duration: "2h" } },
      { textKey: "pricingFeatureNoWatermark" },
      { textKey: "pricingFeatureAvatars", params: { count: "10" } },
    ],
  },
  {
    nameKey: "pricingPro",
    priceKey: "pricingProPrice",
    descKey: "pricingProDesc",
    popular: false,
    features: [
      { textKey: "pricingFeatureUnlimited" },
      { textKey: "pricingFeatureUnlimitedDuration" },
      { textKey: "pricingFeatureAllAvatars" },
      { textKey: "pricingFeatureCustomAvatars" },
      { textKey: "pricingFeaturePrioritySupport" },
    ],
  },
];

export default function Pricing() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl gradient-text">
            {t("pricingTitle")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/10 to-secondary/5 border-2 border-primary/50 scale-105"
                  : "glass border border-border/50"
              } transition-all duration-300 hover:shadow-lg hover:shadow-primary/5`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="btn-gradient px-4 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white">
                      {t("pricingPopular")}
                    </span>
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                {t(plan.nameKey)}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">
                  {plan.priceKey.includes("pricing")
                    ? t(plan.priceKey)
                    : plan.priceKey}
                </span>
              </div>

              <p className="text-sm text-muted mb-6">{t(plan.descKey)}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.textKey} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm text-foreground/80">
                      {t(feature.textKey, feature.params)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/register"
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? "btn-gradient text-white"
                    : "border border-border text-foreground hover:bg-surface hover:border-primary/30"
                }`}
              >
                {plan.popular
                  ? t("pricingChoose", { plan: t(plan.nameKey) })
                  : t("ctaStart")}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
