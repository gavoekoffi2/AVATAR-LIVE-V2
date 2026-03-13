"use client";

import { useEffect, useRef } from "react";
import { useAvatar } from "@/hooks/useAvatar";
import { useStudioStore } from "@/stores/studio-store";
import { useTranslations } from "next-intl";

interface AvatarCanvasProps {
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export default function AvatarCanvas({ onCanvasReady }: AvatarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = useTranslations("studio");
  const { initEngine, loadAvatar, isLoading, isReady, error } = useAvatar();
  const { selectedAvatar, videoQuality } = useStudioStore();

  const qualityDimensions = {
    "480p": { width: 854, height: 480 },
    "720p": { width: 1280, height: 720 },
    "1080p": { width: 1920, height: 1080 },
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const dims = qualityDimensions[videoQuality];
    initEngine(canvasRef.current, dims.width, dims.height);

    if (onCanvasReady) {
      onCanvasReady(canvasRef.current);
    }
  }, [videoQuality, initEngine, onCanvasReady]);

  useEffect(() => {
    if (selectedAvatar) {
      loadAvatar(selectedAvatar.vrmUrl);
    }
  }, [selectedAvatar, loadAvatar]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/50 bg-surface2">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ display: isReady ? "block" : "none" }}
      />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface2">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm text-muted">{t("loadingAvatar")}</p>
        </div>
      )}

      {/* No avatar selected */}
      {!selectedAvatar && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface2">
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-3">
            <span className="text-3xl">🎭</span>
          </div>
          <p className="text-sm text-muted">{t("selectAvatar")}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface2">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
}
