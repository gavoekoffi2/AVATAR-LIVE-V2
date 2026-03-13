"use client";

import { useCallback, useRef, useState } from "react";
import { AvatarEngine } from "@/lib/avatar/avatar-engine";

export function useAvatar() {
  const engineRef = useRef<AvatarEngine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initEngine = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      if (engineRef.current) {
        engineRef.current.dispose();
      }

      const isMobile = window.innerWidth < 768;
      engineRef.current = new AvatarEngine({
        canvas,
        width,
        height,
        antialias: !isMobile,
        pixelRatio: isMobile ? 1 : Math.min(window.devicePixelRatio, 2),
      });

      return engineRef.current;
    },
    []
  );

  const loadAvatar = useCallback(async (vrmUrl: string) => {
    if (!engineRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      await engineRef.current.loadVRM(vrmUrl);
      engineRef.current.startRenderLoop();
      setIsReady(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load avatar");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const dispose = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.dispose();
      engineRef.current = null;
      setIsReady(false);
    }
  }, []);

  return {
    engine: engineRef,
    initEngine,
    loadAvatar,
    dispose,
    isLoading,
    isReady,
    error,
  };
}
