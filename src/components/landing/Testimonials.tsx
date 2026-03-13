"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kofi A.",
    role: { fr: "Commerçant", en: "Merchant" },
    location: { fr: "Lomé", en: "Lomé" },
    flag: "🇹🇬",
    quote: {
      fr: "Grâce à AvatarLive, je vends mes produits en live sur Facebook sans que personne ne sache à quoi je ressemble. Mes ventes ont triplé !",
      en: "Thanks to AvatarLive, I sell my products live on Facebook without anyone knowing what I look like. My sales have tripled!",
    },
    avatar: "K",
    color: "from-primary to-primary-light",
  },
  {
    name: "Amina D.",
    role: { fr: "Créatrice de contenu", en: "Content creator" },
    location: { fr: "Abidjan", en: "Abidjan" },
    flag: "🇨🇮",
    quote: {
      fr: "Je fais des tutoriels sur TikTok avec mon avatar. C'est fun et mes abonnés adorent !",
      en: "I make tutorials on TikTok with my avatar. It's fun and my followers love it!",
    },
    avatar: "A",
    color: "from-secondary to-secondary-light",
  },
  {
    name: "Jean-Paul M.",
    role: { fr: "Coach digital", en: "Digital coach" },
    location: { fr: "Douala", en: "Douala" },
    flag: "🇨🇲",
    quote: {
      fr: "En tant que coach, je fais mes sessions live avec un avatar professionnel. Ça me donne une image de marque unique.",
      en: "As a coach, I do my live sessions with a professional avatar. It gives me a unique brand image.",
    },
    avatar: "J",
    color: "from-accent to-accent-light",
  },
];

export default function Testimonials() {
  const t = useTranslations("landing");
  const locale = useLocale() as "fr" | "en";

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
            {t("testimonialTitle")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl glass border border-border/50 hover:border-primary/20 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-warning text-warning"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote[locale as "fr" | "en"]}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted">
                      {testimonial.role[locale as "fr" | "en"]},{" "}
                      {testimonial.location[locale as "fr" | "en"]}{" "}
                      {testimonial.flag}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
