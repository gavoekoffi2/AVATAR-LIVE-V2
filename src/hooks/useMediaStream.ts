"use client";

import { useCallback, useRef, useState } from "react";
import { CanvasCapture } from "@/lib/streaming/canvas-capture";

export function useMediaStream() {
  const captureRef = useRef(new CanvasCapture());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await CanvasCapture.getCameraStream();
      setCameraStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      return stream;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Camera access denied");
      return null;
    }
  }, []);

  const startAudio = useCallback(async () => {
    try {
      const stream = await CanvasCapture.getAudioStream();
      setAudioStream(stream);
      return stream;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Microphone access denied");
      return null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
    }
  }, [cameraStream]);

  const stopAudio = useCallback(() => {
    if (audioStream) {
      audioStream.getTracks().forEach((t) => t.stop());
      setAudioStream(null);
    }
  }, [audioStream]);

  const getCombinedStream = useCallback(
    (videoStream: MediaStream) => {
      return captureRef.current.createCombinedStream({
        videoStream,
        audioStream: audioStream ?? undefined,
      });
    },
    [audioStream]
  );

  const dispose = useCallback(() => {
    stopCamera();
    stopAudio();
    captureRef.current.dispose();
  }, [stopCamera, stopAudio]);

  return {
    videoRef,
    cameraStream,
    audioStream,
    startCamera,
    startAudio,
    stopCamera,
    stopAudio,
    getCombinedStream,
    dispose,
    error,
  };
}
