"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "fr" ? "en" : "fr";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
        text-muted hover:text-foreground hover:bg-surface transition-all duration-300
        disabled:opacity-50"
      title={t("switchTo")}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{locale === "fr" ? "EN" : "FR"}</span>
    </button>
  );
}
