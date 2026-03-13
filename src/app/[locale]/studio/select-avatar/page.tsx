"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { useStudioStore } from "@/stores/studio-store";
import { DEFAULT_AVATARS, type AvatarInfo } from "@/types/avatar";
import { ChevronLeft, Check, Crown, Search } from "lucide-react";
import { useState } from "react";

export default function SelectAvatarPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { selectedAvatar, setAvatar } = useStudioStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = ["all", "business", "casual", "creative"] as const;

  const filtered = DEFAULT_AVATARS.filter((a) => {
    const matchesCategory =
      activeCategory === "all" ||
      a.category.toLowerCase() === activeCategory;
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.nameFr.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getName = (avatar: AvatarInfo) =>
    locale === "fr" ? avatar.nameFr : avatar.nameEn;

  const handleSelect = (avatar: AvatarInfo) => {
    setAvatar(avatar);
  };

  const handleConfirm = () => {
    if (selectedAvatar) {
      router.push("/studio");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/studio"
              className="p-2 rounded-lg bg-surface2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">
                {t("avatars.title")}
              </h1>
              <p className="text-sm text-muted">{t("avatars.subtitle")}</p>
            </div>
          </div>

          {selectedAvatar && (
            <button
              onClick={handleConfirm}
              className="btn-gradient px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
            >
              {t("common.confirm")}
            </button>
          )}
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface2 border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="Search..."
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "btn-gradient text-white"
                    : "bg-surface2 text-muted hover:text-foreground border border-border/50"
                }`}
              >
                {t(`avatars.categories.${cat}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Avatar grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((avatar, i) => (
            <motion.button
              key={avatar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => handleSelect(avatar)}
              className={`relative group rounded-2xl p-4 border-2 transition-all duration-300 text-left ${
                selectedAvatar?.id === avatar.id
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : "border-border/50 bg-surface hover:border-primary/30 hover:shadow-md"
              }`}
            >
              {/* Thumbnail */}
              <div className="w-full aspect-square rounded-xl bg-surface2 flex items-center justify-center mb-3 overflow-hidden group-hover:scale-[1.02] transition-transform">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                  <span className="text-4xl">🎭</span>
                </div>
              </div>

              <p className="font-medium text-sm text-foreground truncate">
                {getName(avatar)}
              </p>
              <p className="text-xs text-muted capitalize">
                {t(`avatars.categories.${avatar.category.toLowerCase() as "business" | "casual" | "creative"}`)}
              </p>

              {/* Premium badge */}
              {avatar.isPremium ? (
                <div className="absolute top-3 right-3 bg-warning/20 border border-warning/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3 text-warning" />
                  <span className="text-[10px] font-bold text-warning">
                    {t("avatars.premium")}
                  </span>
                </div>
              ) : (
                <div className="absolute top-3 right-3 bg-success/20 border border-success/30 px-2 py-0.5 rounded-full">
                  <span className="text-[10px] font-bold text-success">
                    {t("avatars.free")}
                  </span>
                </div>
              )}

              {/* Selected check */}
              {selectedAvatar?.id === avatar.id && (
                <div className="absolute top-3 left-3 bg-primary p-1.5 rounded-full shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Upload own (coming soon) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button
            disabled
            className="glass rounded-xl px-6 py-3 border border-border/50 text-sm text-muted cursor-not-allowed"
          >
            {t("avatars.uploadOwn")}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
