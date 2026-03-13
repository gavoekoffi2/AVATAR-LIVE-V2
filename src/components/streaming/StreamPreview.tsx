"use client";

import { useTranslations } from "next-intl";
import { useStudioStore } from "@/stores/studio-store";
import { Maximize2, Users, Clock } from "lucide-react";

interface StreamPreviewProps {
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export default function StreamPreview({ canvasRef }: StreamPreviewProps) {
  const t = useTranslations("studio");
  const { isLive, liveDuration, viewerCount, selectedAvatar } =
    useStudioStore();

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/50 bg-surface2">
      {/* Canvas output */}
      {canvasRef?.current ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {selectedAvatar ? (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-3">
                <span className="text-4xl">🎭</span>
              </div>
              <p className="text-sm text-muted">{t("loadingAvatar")}</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted">{t("selectAvatar")}</p>
            </div>
          )}
        </div>
      )}

      {/* Overlay controls */}
      <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between">
        {/* Live badge */}
        {isLive && (
          <div className="flex items-center gap-2 bg-accent/90 px-3 py-1 rounded-full live-badge">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold tracking-wider">
              {t("live")}
            </span>
          </div>
        )}

        {/* Fullscreen */}
        <button className="ml-auto p-1.5 rounded-lg glass hover:bg-surface2 transition-colors">
          <Maximize2 className="w-4 h-4 text-foreground/70" />
        </button>
      </div>

      {/* Bottom stats */}
      {isLive && (
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 glass px-2.5 py-1 rounded-full">
              <Users className="w-3 h-3 text-foreground/70" />
              <span className="text-xs text-foreground/80">
                {viewerCount} {t("viewers")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 glass px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3 text-foreground/70" />
              <span className="text-xs text-foreground/80">
                {formatDuration(liveDuration)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
