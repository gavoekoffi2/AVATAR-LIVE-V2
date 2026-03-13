"use client";

import { useTranslations } from "next-intl";
import { useStudioStore } from "@/stores/studio-store";
import { PLATFORM_RTMP_URLS } from "@/types/streaming";
import { Link2, Key, HelpCircle } from "lucide-react";

export default function RTMPConfig() {
  const t = useTranslations("studio");
  const { streamPlatform, rtmpUrl, setRtmpUrl, streamKey, setStreamKey } =
    useStudioStore();

  if (!streamPlatform || streamPlatform === "AVATARLIVE") return null;

  const defaultUrl = PLATFORM_RTMP_URLS[streamPlatform];

  return (
    <div className="glass rounded-xl p-4 border border-border/50 space-y-4">
      {/* RTMP URL */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-muted mb-1.5">
          <Link2 className="w-3.5 h-3.5" />
          {t("rtmpUrl")}
        </label>
        <input
          type="text"
          value={rtmpUrl}
          onChange={(e) => setRtmpUrl(e.target.value)}
          placeholder={defaultUrl || "rtmp://..."}
          className="w-full px-3 py-2.5 rounded-lg bg-surface2 border border-border text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Stream key */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-muted mb-1.5">
          <Key className="w-3.5 h-3.5" />
          {t("streamKey")}
        </label>
        <input
          type="password"
          value={streamKey}
          onChange={(e) => setStreamKey(e.target.value)}
          placeholder="xxxx-xxxx-xxxx-xxxx"
          className="w-full px-3 py-2.5 rounded-lg bg-surface2 border border-border text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Help text */}
      <p className="flex items-start gap-1.5 text-[11px] text-muted leading-relaxed">
        <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        {t("platformHelp")}
      </p>
    </div>
  );
}
