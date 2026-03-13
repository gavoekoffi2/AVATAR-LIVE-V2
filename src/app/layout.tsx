import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#6C5CE7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "AvatarLive — Faites vos lives sans montrer votre visage",
    template: "%s | AvatarLive",
  },
  description:
    "Diffusez en direct sur Facebook, YouTube, TikTok et Instagram avec un avatar animé. Votre visage n'est jamais transmis. Fait pour les créateurs africains.",
  keywords: [
    "avatar live streaming",
    "vtuber",
    "live sans visage",
    "avatar en direct",
    "Facebook Live avatar",
    "YouTube Live avatar",
    "TikTok Live avatar",
    "streaming anonyme",
    "créateur contenu Afrique",
    "live commerce",
    "AvatarLive",
  ],
  authors: [{ name: "Pro Genius AI" }],
  creator: "Pro Genius AI",
  publisher: "AvatarLive",
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "https://avatarlive.com"
  ),
  openGraph: {
    type: "website",
    siteName: "AvatarLive",
    title: "AvatarLive — Go live with an animated avatar",
    description:
      "Stream live on Facebook, YouTube, TikTok and Instagram using an animated avatar. Your face is never shown.",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AvatarLive — Go live with an avatar",
    description:
      "Stream live with an animated avatar. Your face is never transmitted.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
