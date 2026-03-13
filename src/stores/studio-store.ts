import { create } from "zustand";
import type { AvatarInfo } from "@/types/avatar";
import type { TrackingQuality } from "@/types/tracking";
import type { StreamPlatform, VideoQuality } from "@/types/streaming";

interface StudioState {
  selectedAvatar: AvatarInfo | null;
  selectedBackground: string | null;
  backgroundStyle: string | null;

  isCameraOn: boolean;
  isMicOn: boolean;
  videoQuality: VideoQuality;

  trackingQuality: TrackingQuality;
  isTrackingActive: boolean;

  isLive: boolean;
  liveDuration: number;
  viewerCount: number;
  streamPlatform: StreamPlatform | null;
  rtmpUrl: string;
  streamKey: string;

  isLoading: boolean;
  loadingMessage: string;

  setAvatar: (avatar: AvatarInfo | null) => void;
  setBackground: (bg: string | null) => void;
  setBackgroundStyle: (style: string | null) => void;
  toggleCamera: () => void;
  toggleMic: () => void;
  setVideoQuality: (quality: VideoQuality) => void;
  setTrackingQuality: (quality: TrackingQuality) => void;
  setTrackingActive: (active: boolean) => void;
  startLive: () => void;
  stopLive: () => void;
  setStreamPlatform: (platform: StreamPlatform | null) => void;
  setRtmpUrl: (url: string) => void;
  setStreamKey: (key: string) => void;
  setLoading: (loading: boolean, message?: string) => void;
  incrementDuration: () => void;
  setViewerCount: (count: number) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  selectedAvatar: null,
  selectedBackground: null,
  backgroundStyle: null,

  isCameraOn: false,
  isMicOn: true,
  videoQuality: "720p",

  trackingQuality: "lost",
  isTrackingActive: false,

  isLive: false,
  liveDuration: 0,
  viewerCount: 0,
  streamPlatform: null,
  rtmpUrl: "",
  streamKey: "",

  isLoading: false,
  loadingMessage: "",

  setAvatar: (avatar) => set({ selectedAvatar: avatar }),
  setBackground: (bg) => set({ selectedBackground: bg }),
  setBackgroundStyle: (style) => set({ backgroundStyle: style }),
  toggleCamera: () => set((s) => ({ isCameraOn: !s.isCameraOn })),
  toggleMic: () => set((s) => ({ isMicOn: !s.isMicOn })),
  setVideoQuality: (quality) => set({ videoQuality: quality }),
  setTrackingQuality: (quality) => set({ trackingQuality: quality }),
  setTrackingActive: (active) => set({ isTrackingActive: active }),
  startLive: () => set({ isLive: true, liveDuration: 0 }),
  stopLive: () => set({ isLive: false }),
  setStreamPlatform: (platform) => set({ streamPlatform: platform }),
  setRtmpUrl: (url) => set({ rtmpUrl: url }),
  setStreamKey: (key) => set({ streamKey: key }),
  setLoading: (loading, message = "") =>
    set({ isLoading: loading, loadingMessage: message }),
  incrementDuration: () =>
    set((s) => ({ liveDuration: s.liveDuration + 1 })),
  setViewerCount: (count) => set({ viewerCount: count }),
}));
