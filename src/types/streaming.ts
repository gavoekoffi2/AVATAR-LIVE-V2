export type StreamPlatform =
  | "FACEBOOK"
  | "YOUTUBE"
  | "TIKTOK"
  | "INSTAGRAM"
  | "CUSTOM_RTMP"
  | "AVATARLIVE";

export type VideoQuality = "480p" | "720p" | "1080p";

export interface StreamConfig {
  platform: StreamPlatform;
  rtmpUrl?: string;
  streamKey?: string;
  quality: VideoQuality;
}

export interface StreamState {
  isLive: boolean;
  duration: number;
  viewers: number;
  platform: StreamPlatform | null;
}

export const QUALITY_SETTINGS: Record<
  VideoQuality,
  { width: number; height: number; bitrate: number }
> = {
  "480p": { width: 854, height: 480, bitrate: 1500000 },
  "720p": { width: 1280, height: 720, bitrate: 2500000 },
  "1080p": { width: 1920, height: 1080, bitrate: 4500000 },
};

export const PLATFORM_RTMP_URLS: Partial<Record<StreamPlatform, string>> = {
  FACEBOOK: "rtmps://live-api-s.facebook.com:443/rtmp/",
  YOUTUBE: "rtmp://a.rtmp.youtube.com/live2/",
  TIKTOK: "rtmp://push.tiktokv.com/live/",
  INSTAGRAM: "rtmps://live-upload.instagram.com:443/rtmp/",
};
