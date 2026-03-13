"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useFaceTracking } from "@/hooks/useFaceTracking";
import { useMediaStream } from "@/hooks/useMediaStream";
import { useStudioStore } from "@/stores/studio-store";
import { Camera, CameraOff, Loader2 } from "lucide-react";

interface FaceTrackerProps {
  onTrackingData?: (data: {
    headRotation: { x: number; y: number; z: number };
    blendshapes: Record<string, number>;
  }) => void;
}

export default function FaceTracker({ onTrackingData }: FaceTrackerProps) {
  const t = useTranslations("studio");
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    initialize,
    startTracking,
    stopTracking,
    isInitialized,
    isTracking,
    quality,
    error: trackingError,
  } = useFaceTracking();
  const {
    startCamera,
    stopCamera,
    cameraStream,
    error: cameraError,
  } = useMediaStream();
  const {
    isCameraOn,
    toggleCamera,
    setTrackingQuality,
    setTrackingActive,
  } = useStudioStore();

  // Initialize MediaPipe when component mounts
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Update store with tracking quality
  useEffect(() => {
    setTrackingQuality(quality);
    setTrackingActive(isTracking);
  }, [quality, isTracking, setTrackingQuality, setTrackingActive]);

  // Start/stop camera when toggled
  useEffect(() => {
    if (isCameraOn) {
      startCamera().then(() => {
        if (videoRef.current && isInitialized && onTrackingData) {
          const video = videoRef.current;
          video.srcObject = cameraStream;
          video.play().then(() => {
            startTracking(video, onTrackingData);
          });
        }
      });
    } else {
      stopTracking();
      stopCamera();
    }

    return () => {
      stopTracking();
    };
  }, [isCameraOn]); // eslint-disable-line react-hooks/exhaustive-deps

  const error = trackingError || cameraError;

  return (
    <div className="glass rounded-xl p-4 border border-border/50">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">
          {t("camera")}
        </span>
        <button
          onClick={toggleCamera}
          className={`p-2 rounded-lg transition-all ${
            isCameraOn
              ? "bg-success/20 text-success"
              : "bg-surface2 text-muted hover:text-foreground"
          }`}
        >
          {isCameraOn ? (
            <Camera className="w-4 h-4" />
          ) : (
            <CameraOff className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Camera preview (small) */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface2">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
          style={{
            display: isCameraOn && cameraStream ? "block" : "none",
            transform: "scaleX(-1)",
          }}
        />

        {!isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CameraOff className="w-8 h-8 text-muted/30" />
          </div>
        )}

        {isCameraOn && !isInitialized && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface2/80">
            <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
            <p className="text-xs text-muted">{t("loadingTracking")}</p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs text-error">{error}</p>
      )}
    </div>
  );
}
