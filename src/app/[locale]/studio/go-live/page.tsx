"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { useStudioStore } from "@/stores/studio-store";
import PlatformSelector from "@/components/streaming/PlatformSelector";
import StreamControls from "@/components/streaming/StreamControls";
import TrackingStatus from "@/components/tracking/TrackingStatus";
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Wifi,
  MonitorPlay,
} from "lucide-react";

export default function GoLivePage() {
  const t = useTranslations();
  const {
    selectedAvatar,
    streamPlatform,
    trackingQuality,
    isLive,
    isCameraOn,
    isMicOn,
    liveDuration,
    viewerCount,
  } = useStudioStore();

  const readinessChecks = [
    {
      label: { fr: "Avatar sélectionné", en: "Avatar selected" },
      ok: !!selectedAvatar,
    },
    {
      label: { fr: "Caméra activée", en: "Camera enabled" },
      ok: isCameraOn,
    },
    {
      label: { fr: "Micro activé", en: "Microphone enabled" },
      ok: isMicOn,
    },
    {
      label: { fr: "Plateforme choisie", en: "Platform selected" },
      ok: !!streamPlatform,
    },
    {
      label: { fr: "Visage détecté", en: "Face detected" },
      ok: trackingQuality !== "lost",
    },
  ];

  const allReady = readinessChecks.every((c) => c.ok);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {t("studio.goLive")}
            </h1>
          </div>

          {isLive && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full live-badge">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-bold text-accent">
                  {t("studio.live")}
                </span>
              </div>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-sm text-foreground">
                  {formatDuration(liveDuration)}
                </span>
              </div>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-sm text-foreground">
                  {viewerCount} {t("studio.viewers")}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Readiness checks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="glass rounded-2xl p-6 border border-border/50 mb-6">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <MonitorPlay className="w-5 h-5 text-primary" />
                {t("studio.confirmGoLive")}
              </h2>

              <div className="space-y-3">
                {readinessChecks.map((check, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface2/50"
                  >
                    {check.ok ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        check.ok ? "text-foreground" : "text-muted"
                      }`}
                    >
                      {check.label.fr}
                    </span>
                  </div>
                ))}
              </div>

              {!allReady && (
                <p className="mt-4 text-xs text-warning flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {t("studio.preparing")}
                </p>
              )}
            </div>

            {/* Connection status */}
            <div className="glass rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-foreground">
                  Connection
                </span>
              </div>
              <TrackingStatus quality={trackingQuality} />
            </div>
          </motion.div>

          {/* Right: Platform + Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-border/50">
              <PlatformSelector />
            </div>

            <StreamControls />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
