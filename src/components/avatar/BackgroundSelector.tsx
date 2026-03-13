"use client";

import { useTranslations, useLocale } from "next-intl";
import { useStudioStore } from "@/stores/studio-store";
import { CSS_BACKGROUNDS } from "@/types/avatar";
import { Check } from "lucide-react";

export default function BackgroundSelector() {
  const t = useTranslations("studio");
  const locale = useLocale();
  const { selectedBackground, setBackground, setBackgroundStyle } =
    useStudioStore();

  const handleSelect = (bg: (typeof CSS_BACKGROUNDS)[0]) => {
    setBackground(bg.id);
    setBackgroundStyle(bg.style);
  };

  return (
    <div>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
        {t("selectBackground")}
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {CSS_BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => handleSelect(bg)}
            className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedBackground === bg.id
                ? "border-primary"
                : "border-transparent hover:border-primary/30"
            }`}
          >
            <div
              className="w-full h-full"
              style={{ background: bg.style }}
            />

            <div className="absolute bottom-0 inset-x-0 bg-black/40 px-2 py-1">
              <p className="text-[10px] text-white truncate">
                {locale === "fr" ? bg.nameFr : bg.nameEn}
              </p>
            </div>

            {selectedBackground === bg.id && (
              <div className="absolute top-1 right-1 bg-primary p-0.5 rounded-full">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
