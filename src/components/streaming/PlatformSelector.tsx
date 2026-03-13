"use client";

import { useTranslations } from "next-intl";
import { useStudioStore } from "@/stores/studio-store";
import type { StreamPlatform } from "@/types/streaming";
import { PLATFORM_RTMP_URLS } from "@/types/streaming";

const platforms: { key: StreamPlatform; name: string; color: string }[] = [
  { key: "FACEBOOK", name: "Facebook Live", color: "#1877F2" },
  { key: "YOUTUBE", name: "YouTube Live", color: "#FF0000" },
  { key: "TIKTOK", name: "TikTok Live", color: "#00F2EA" },
  { key: "INSTAGRAM", name: "Instagram Live", color: "#E4405F" },
  { key: "CUSTOM_RTMP", name: "Custom RTMP", color: "#6C5CE7" },
  { key: "AVATARLIVE", name: "AvatarLive", color: "#00D2D3" },
];

export default function PlatformSelector() {
  const t = useTranslations("studio");
  const {
    streamPlatform,
    setStreamPlatform,
    rtmpUrl,
    setRtmpUrl,
    streamKey,
    setStreamKey,
  } = useStudioStore();

  const handleSelect = (platform: StreamPlatform) => {
    setStreamPlatform(platform);
    const defaultUrl = PLATFORM_RTMP_URLS[platform];
    if (defaultUrl) {
      setRtmpUrl(defaultUrl);
    }
  };

  const showRtmpConfig =
    streamPlatform &&
    streamPlatform !== "AVATARLIVE";

  return (
    <div>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
        {t("selectPlatform")}
      </h3>

      {/* Platform grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {platforms.map((platform) => (
          <button
            key={platform.key}
            onClick={() => handleSelect(platform.key)}
            className={`p-3 rounded-xl border text-left transition-all ${
              streamPlatform === platform.key
                ? "border-primary bg-primary/10"
                : "border-border/50 bg-surface2 hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: platform.color }}
              />
              <span className="text-xs font-medium text-foreground">
                {platform.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* RTMP config */}
      {showRtmpConfig && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-muted mb-1">
              {t("rtmpUrl")}
            </label>
            <input
              type="text"
              value={rtmpUrl}
              onChange={(e) => setRtmpUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface2 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              placeholder="rtmp://..."
            />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">
              {t("streamKey")}
            </label>
            <input
              type="password"
              value={streamKey}
              onChange={(e) => setStreamKey(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface2 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              placeholder="xxxx-xxxx-xxxx"
            />
          </div>
          <p className="text-[10px] text-muted">{t("platformHelp")}</p>
        </div>
      )}
    </div>
  );
}
