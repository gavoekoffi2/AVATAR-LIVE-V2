"use client";

import { useTranslations } from "next-intl";
import type { TrackingQuality } from "@/types/tracking";
import { Scan } from "lucide-react";

interface TrackingStatusProps {
  quality: TrackingQuality;
}

export default function TrackingStatus({ quality }: TrackingStatusProps) {
  const t = useTranslations("studio");

  const statusConfig: Record<
    TrackingQuality,
    { color: string; bgColor: string; label: string }
  > = {
    good: {
      color: "text-success",
      bgColor: "bg-success/20",
      label: t("trackingGood"),
    },
    fair: {
      color: "text-warning",
      bgColor: "bg-warning/20",
      label: t("trackingFair"),
    },
    poor: {
      color: "text-error",
      bgColor: "bg-error/20",
      label: t("trackingPoor"),
    },
    lost: {
      color: "text-muted",
      bgColor: "bg-surface2",
      label: t("trackingLost"),
    },
  };

  const config = statusConfig[quality];

  return (
    <div className="flex items-center gap-2">
      <Scan className={`w-4 h-4 ${config.color}`} />
      <span className="text-xs text-muted">{t("trackingStatus")}:</span>
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bgColor} ${config.color}`}
      >
        {config.label}
      </span>
    </div>
  );
}
