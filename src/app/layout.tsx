import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AvatarLive — Go live without showing your face",
  description:
    "Stream live on Facebook, YouTube, TikTok and Instagram using an animated avatar. Your face is never shown. Built for African creators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
