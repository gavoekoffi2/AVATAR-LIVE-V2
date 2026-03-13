import { requireAuth } from "@/lib/auth-guard";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return <>{children}</>;
}
