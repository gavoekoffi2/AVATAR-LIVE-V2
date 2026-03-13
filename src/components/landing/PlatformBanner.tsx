"use client";

import { useTranslations } from "next-intl";

const platforms = [
  { name: "Facebook Live", color: "#1877F2" },
  { name: "YouTube Live", color: "#FF0000" },
  { name: "TikTok Live", color: "#00F2EA" },
  { name: "Instagram Live", color: "#E4405F" },
  { name: "AvatarLive", color: "#6C5CE7" },
];

export default function PlatformBanner() {
  const t = useTranslations("landing");

  return (
    <section className="py-8 border-y border-border/50 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm text-muted mb-6 font-medium">
          {t("platformsTitle")}
        </p>
        <div className="overflow-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...platforms, ...platforms].map((platform, i) => (
              <div
                key={i}
                className="mx-8 flex items-center gap-2 flex-shrink-0"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-lg font-semibold text-muted/70">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
