"use client";

import { useCallback, useRef, useState } from "react";
import { MediaPipeTracker } from "@/lib/tracking/mediapipe-tracker";
import { LandmarkSmoother } from "@/lib/tracking/landmark-smoother";
import type { TrackingQuality } from "@/types/tracking";

export function useFaceTracking() {
  const trackerRef = useRef<MediaPipeTracker | null>(null);
  const smootherRef = useRef(new LandmarkSmoother(0.5));
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [quality, setQuality] = useState<TrackingQuality>("lost");
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      trackerRef.current = new MediaPipeTracker();
      await trackerRef.current.initialize();
      setIsInitialized(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initialize tracker"
      );
    }
  }, []);

  const startTracking = useCallback(
    (
      videoElement: HTMLVideoElement,
      onResult: (data: {
        headRotation: { x: number; y: number; z: number };
        blendshapes: Record<string, number>;
      }) => void
    ) => {
      if (!trackerRef.current || !isInitialized) return;

      setIsTracking(true);
      trackerRef.current.start();

      let lastTime = 0;
      const targetInterval = 1000 / 30; // 30 FPS

      const detect = () => {
        if (!trackerRef.current?.getIsRunning()) return;

        const now = performance.now();
        if (now - lastTime < targetInterval) {
          requestAnimationFrame(detect);
          return;
        }
        lastTime = now;

        const result = trackerRef.current.detectForVideo(videoElement, now);

        if (result && result.quality !== "lost") {
          setQuality(result.quality);

          // Use KalidoKit-style conversion from landmarks
          const smoothedBlendshapes = smootherRef.current.smoothBlendshapes(
            result.blendshapes
          );

          // Extract head rotation from transformation matrix or landmarks
          const headRotation = smootherRef.current.smoothRotation("head", {
            x: (result.blendshapes["headPitch"] ?? 0) * 0.5,
            y: (result.blendshapes["headYaw"] ?? 0) * 0.5,
            z: (result.blendshapes["headRoll"] ?? 0) * 0.3,
          });

          onResult({ headRotation, blendshapes: smoothedBlendshapes });
        } else {
          setQuality("lost");
        }

        requestAnimationFrame(detect);
      };

      requestAnimationFrame(detect);
    },
    [isInitialized]
  );

  const stopTracking = useCallback(() => {
    if (trackerRef.current) {
      trackerRef.current.stop();
    }
    setIsTracking(false);
    setQuality("lost");
    smootherRef.current.reset();
  }, []);

  const dispose = useCallback(() => {
    stopTracking();
    if (trackerRef.current) {
      trackerRef.current.dispose();
      trackerRef.current = null;
    }
    setIsInitialized(false);
  }, [stopTracking]);

  return {
    initialize,
    startTracking,
    stopTracking,
    dispose,
    isInitialized,
    isTracking,
    quality,
    error,
  };
}
