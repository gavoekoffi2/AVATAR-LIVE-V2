"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  Video,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Auto-detect authenticated pages
  const isOnAppPage =
    pathname.startsWith("/dashboard") || pathname.startsWith("/studio");
  const showAuthNav = !!session || isOnAppPage;

  // Close user menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              {t("common.appName")}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />

            {showAuthNav ? (
              <>
                {/* App navigation links */}
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === "/dashboard"
                      ? "text-primary bg-primary/10"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t("nav.dashboard")}
                </Link>
                <Link
                  href="/studio"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith("/studio")
                      ? "text-primary bg-primary/10"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  {t("nav.studio")}
                </Link>

                {/* User menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm hover:bg-surface transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground font-medium">
                      {session?.user?.name || "User"}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 text-muted transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 glass rounded-xl border border-border/50 py-2 shadow-lg"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-surface/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          {t("nav.dashboard")}
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-surface/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          {t("nav.settings")}
                        </Link>
                        <div className="my-1 border-t border-border/50" />
                        <button
                          className="flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors w-full text-left"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          {t("auth.logout")}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                >
                  {t("auth.login")}
                </Link>
                <Link
                  href="/register"
                  className="btn-gradient px-5 py-2 rounded-lg text-sm font-semibold text-white"
                >
                  {t("landing.ctaStart")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="px-4 py-4 space-y-3">
              <LanguageSwitcher />

              {showAuthNav ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {t("nav.dashboard")}
                  </Link>
                  <Link
                    href="/studio"
                    className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Video className="w-4 h-4" />
                    {t("nav.studio")}
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    {t("nav.settings")}
                  </Link>
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-error py-2 w-full"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="w-4 h-4" />
                    {t("auth.logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-sm font-medium text-muted hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("auth.login")}
                  </Link>
                  <Link
                    href="/register"
                    className="block btn-gradient px-5 py-2 rounded-lg text-sm font-semibold text-white text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("landing.ctaStart")}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
