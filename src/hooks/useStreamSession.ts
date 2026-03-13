"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useStudioStore } from "@/stores/studio-store";
import { CanvasCapture } from "@/lib/streaming/canvas-capture";
import { RTMPBridge } from "@/lib/streaming/rtmp-bridge";
import { LiveKitStreamClient } from "@/lib/streaming/livekit-client";
import type { StreamPlatform } from "@/types/streaming";

export function useStreamSession() {
  const captureRef = useRef(new CanvasCapture());
  const rtmpBridgeRef = useRef(new RTMPBridge());
  const livekitRef = useRef(new LiveKitStreamClient());
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    streamPlatform,
    rtmpUrl,
    streamKey,
    isLive,
    startLive,
    stopLive,
    incrementDuration,
  } = useStudioStore();

  const startStream = useCallback(
    async (avatarCanvas: HTMLCanvasElement, audioStream?: MediaStream) => {
      if (!streamPlatform) {
        setError("No platform selected");
        return;
      }

      setIsConnecting(true);
      setError(null);

      try {
        // Capture avatar canvas
        const videoStream = avatarCanvas.captureStream(30);
        const combinedStream = captureRef.current.createCombinedStream({
          videoStream,
          audioStream,
        });

        if (streamPlatform === "AVATARLIVE") {
          // Use LiveKit for internal streaming
          const tokenRes = await fetch("/api/livekit/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              roomName: `live-${Date.now()}`,
              participantName: "broadcaster",
            }),
          });
          const { token } = await tokenRes.json();
          const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

          if (livekitUrl && token) {
            await livekitRef.current.connect(livekitUrl, token);
            await livekitRef.current.publishTracks(combinedStream);
          }
        } else {
          // RTMP streaming via WebSocket bridge
          const wsUrl = `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/api/stream/ws`;

          await rtmpBridgeRef.current.connect(wsUrl);
          rtmpBridgeRef.current.sendConfig({
            rtmpUrl: rtmpUrl,
            streamKey: streamKey,
          });

          // Start recording and sending chunks
          captureRef.current.startRecording(combinedStream, (data) => {
            rtmpBridgeRef.current.sendData(data);
          });
        }

        // Start live
        startLive();

        // Duration counter
        durationIntervalRef.current = setInterval(() => {
          incrementDuration();
        }, 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to start stream");
      } finally {
        setIsConnecting(false);
      }
    },
    [streamPlatform, rtmpUrl, streamKey, startLive, incrementDuration]
  );

  const stopStream = useCallback(async () => {
    // Stop duration counter
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }

    // Stop recording
    captureRef.current.stopRecording();

    // Disconnect
    await livekitRef.current.disconnect();
    rtmpBridgeRef.current.disconnect();

    stopLive();
  }, [stopLive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      captureRef.current.dispose();
      rtmpBridgeRef.current.disconnect();
    };
  }, []);

  return {
    startStream,
    stopStream,
    isConnecting,
    error,
  };
}
