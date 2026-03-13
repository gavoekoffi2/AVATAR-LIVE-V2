"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <span className="text-8xl font-bold gradient-text">404</span>
        </div>
        <h1 className="font-heading font-bold text-2xl text-foreground mb-3">
          {t("title")}
        </h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          {t("description")}
        </p>
        <Link
          href="/"
          className="btn-gradient px-8 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2"
        >
          {t("goBack")}
        </Link>
      </div>
    </div>
  );
}
