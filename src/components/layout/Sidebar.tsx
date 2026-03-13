"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  LayoutDashboard,
  Video,
  Settings,
  Crown,
  Users,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "nav.dashboard" },
  { href: "/studio", icon: Video, labelKey: "nav.studio" },
  { href: "/studio/select-avatar", icon: Users, labelKey: "avatars.title" },
  { href: "/dashboard/settings", icon: Settings, labelKey: "nav.settings" },
];

export default function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen glass border-r border-border/50 pt-20 px-4">
      {/* Plan info */}
      <div className="mb-6 p-3 rounded-xl bg-surface2/50 border border-border/50">
        <div className="flex items-center gap-2 mb-1">
          <Crown className="w-4 h-4 text-warning" />
          <span className="text-sm font-semibold text-foreground">
            {t("landing.pricingFree")}
          </span>
        </div>
        <p className="text-xs text-muted">{t("landing.pricingFreeDesc")}</p>
        <button className="mt-2 w-full text-center text-xs btn-gradient px-3 py-1.5 rounded-lg text-white font-medium">
          {t("dashboard.upgrade")}
        </button>
      </div>

      {/* Nav items */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted hover:text-foreground hover:bg-surface2"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Quick stats */}
      <div className="mt-auto mb-4 p-3 rounded-xl bg-surface2/50">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-muted" />
          <span className="text-xs text-muted">{t("dashboard.stats")}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">0</p>
            <p className="text-[10px] text-muted">Lives</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">0h</p>
            <p className="text-[10px] text-muted">{t("dashboard.totalDuration")}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
