"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import AvatarSelector from "@/components/avatar/AvatarSelector";
import BackgroundSelector from "@/components/avatar/BackgroundSelector";
import TrackingStatus from "@/components/tracking/TrackingStatus";
import StreamControls from "@/components/streaming/StreamControls";
import PlatformSelector from "@/components/streaming/PlatformSelector";
import { useStudioStore } from "@/stores/studio-store";
import { Settings, ChevronLeft } from "lucide-react";

const AvatarCanvas = dynamic(
  () => import("@/components/avatar/AvatarCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-video rounded-2xl bg-surface2 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function StudioPage() {
  const t = useTranslations();
  const { trackingQuality, videoQuality, setVideoQuality, isLive } =
    useStudioStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg bg-surface2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">
                {t("studio.title")}
              </h1>
              <TrackingStatus quality={trackingQuality} />
            </div>
          </div>

          {/* Live badge */}
          {isLive && (
            <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full live-badge">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-bold text-accent">
                {t("studio.live")}
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Main area — Avatar preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <AvatarCanvas />

            {/* Stream controls */}
            <StreamControls />

            {/* Video quality selector */}
            <div className="glass rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-muted" />
                <span className="text-sm font-medium text-foreground">
                  {t("studio.videoQuality")}
                </span>
              </div>
              <div className="flex gap-2">
                {(["480p", "720p", "1080p"] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setVideoQuality(q)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      videoQuality === q
                        ? "btn-gradient text-white"
                        : "bg-surface2 text-muted hover:text-foreground"
                    }`}
                  >
                    {t(`studio.quality${q.replace("p", "")}` as "studio.quality480" | "studio.quality720" | "studio.quality1080")}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Hidden video element for camera feed */}
            <video
              className="hidden"
              id="camera-feed"
              autoPlay
              playsInline
              muted
            />

            {/* Avatar selection */}
            <div className="glass rounded-2xl p-4 border border-border/50">
              <AvatarSelector />
            </div>

            {/* Background selection */}
            <div className="glass rounded-2xl p-4 border border-border/50">
              <BackgroundSelector />
            </div>

            {/* Platform selection */}
            <div className="glass rounded-2xl p-4 border border-border/50">
              <PlatformSelector />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
