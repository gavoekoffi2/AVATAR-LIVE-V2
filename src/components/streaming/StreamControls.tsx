"use client";

import { useTranslations } from "next-intl";
import { useStudioStore } from "@/stores/studio-store";
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Radio,
  Square,
} from "lucide-react";

export default function StreamControls() {
  const t = useTranslations("studio");
  const {
    isMicOn,
    isCameraOn,
    isLive,
    toggleMic,
    toggleCamera,
    startLive,
    stopLive,
    liveDuration,
  } = useStudioStore();

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass rounded-2xl p-4 border border-border/50">
      <div className="flex items-center justify-center gap-4">
        {/* Mic toggle */}
        <button
          onClick={toggleMic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isMicOn
              ? "bg-surface2 text-foreground hover:bg-surface"
              : "bg-error/20 text-error"
          }`}
          title={isMicOn ? t("mute") : t("unmute")}
        >
          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        {/* Camera toggle */}
        <button
          onClick={toggleCamera}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isCameraOn
              ? "bg-surface2 text-foreground hover:bg-surface"
              : "bg-error/20 text-error"
          }`}
          title={isCameraOn ? t("cameraOff") : t("cameraOn")}
        >
          {isCameraOn ? (
            <Camera className="w-5 h-5" />
          ) : (
            <CameraOff className="w-5 h-5" />
          )}
        </button>

        {/* Go Live / Stop */}
        <button
          onClick={isLive ? stopLive : startLive}
          className={`px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all ${
            isLive
              ? "bg-error text-white hover:bg-error/80"
              : "bg-accent text-white hover:bg-accent/80 animate-pulse-glow"
          }`}
        >
          {isLive ? (
            <>
              <Square className="w-4 h-4" />
              {t("stopLive")}
            </>
          ) : (
            <>
              <Radio className="w-4 h-4" />
              {t("goLive")}
            </>
          )}
        </button>
      </div>

      {/* Live indicator */}
      {isLive && (
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold text-accent">{t("live")}</span>
          </div>
          <span className="text-xs text-muted">
            {t("duration")}: {formatDuration(liveDuration)}
          </span>
        </div>
      )}
    </div>
  );
}
