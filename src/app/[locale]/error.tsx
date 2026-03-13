"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-error/10 flex items-center justify-center">
          <span className="text-4xl">&#9888;</span>
        </div>
        <h1 className="font-heading font-bold text-2xl text-foreground mb-3">
          {t("common.error")}
        </h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          {error.message || t("common.error")}
        </p>
        <button
          onClick={reset}
          className="btn-gradient px-8 py-3 rounded-xl text-white font-semibold"
        >
          {t("common.back")}
        </button>
      </div>
    </div>
  );
}
