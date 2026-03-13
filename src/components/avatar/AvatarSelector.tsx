"use client";

import { useTranslations, useLocale } from "next-intl";
import { useStudioStore } from "@/stores/studio-store";
import { DEFAULT_AVATARS, type AvatarInfo } from "@/types/avatar";
import { Check, Crown } from "lucide-react";
import { useState } from "react";

export default function AvatarSelector() {
  const t = useTranslations("avatars");
  const locale = useLocale();
  const { selectedAvatar, setAvatar } = useStudioStore();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "business", "casual", "creative"] as const;

  const filtered =
    activeCategory === "all"
      ? DEFAULT_AVATARS
      : DEFAULT_AVATARS.filter(
          (a) => a.category.toLowerCase() === activeCategory
        );

  const getName = (avatar: AvatarInfo) =>
    locale === "fr" ? avatar.nameFr : avatar.nameEn;

  return (
    <div>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
        {t("title")}
      </h3>
      <p className="text-sm text-muted mb-4">{t("subtitle")}</p>

      {/* Category tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat
                ? "btn-gradient text-white"
                : "bg-surface2 text-muted hover:text-foreground"
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Avatar grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filtered.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => setAvatar(avatar)}
            className={`relative group rounded-xl p-3 border transition-all duration-300 ${
              selectedAvatar?.id === avatar.id
                ? "border-primary bg-primary/10"
                : "border-border/50 bg-surface2 hover:border-primary/30"
            }`}
          >
            {/* Thumbnail placeholder */}
            <div className="w-full aspect-square rounded-lg bg-surface flex items-center justify-center mb-2 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center">
                <span className="text-xl">🎭</span>
              </div>
            </div>

            <p className="text-xs font-medium text-foreground truncate">
              {getName(avatar)}
            </p>

            {/* Premium badge */}
            {avatar.isPremium && (
              <div className="absolute top-2 right-2 bg-warning/20 p-1 rounded-md">
                <Crown className="w-3 h-3 text-warning" />
              </div>
            )}

            {/* Selected check */}
            {selectedAvatar?.id === avatar.id && (
              <div className="absolute top-2 left-2 bg-primary p-1 rounded-full">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
