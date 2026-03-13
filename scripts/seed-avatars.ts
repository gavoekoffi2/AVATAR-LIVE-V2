/**
 * Seed script for populating the database with default avatars and backgrounds
 *
 * Usage: npx ts-node scripts/seed-avatars.ts
 * Or: npx tsx scripts/seed-avatars.ts
 *
 * NOTE: Requires a running PostgreSQL database and correct DATABASE_URL
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const avatars = [
  {
    name: "Business Pro",
    nameFr: "Business Pro",
    nameEn: "Business Pro",
    description: "Professional business avatar for corporate presentations",
    vrmUrl: "/avatars/business-pro.vrm",
    thumbnailUrl: "/avatars/thumbnails/business-pro.png",
    category: "BUSINESS" as const,
    isPremium: false,
    sortOrder: 1,
  },
  {
    name: "Casual Cool",
    nameFr: "Style Décontracté",
    nameEn: "Casual Cool",
    description: "Relaxed casual avatar for everyday content",
    vrmUrl: "/avatars/casual-cool.vrm",
    thumbnailUrl: "/avatars/thumbnails/casual-cool.png",
    category: "CASUAL" as const,
    isPremium: false,
    sortOrder: 2,
  },
  {
    name: "Creative Artist",
    nameFr: "Artiste Créatif",
    nameEn: "Creative Artist",
    description: "Creative avatar for artistic content",
    vrmUrl: "/avatars/creative-artist.vrm",
    thumbnailUrl: "/avatars/thumbnails/creative-artist.png",
    category: "CREATIVE" as const,
    isPremium: false,
    sortOrder: 3,
  },
  {
    name: "Elegant",
    nameFr: "Élégant",
    nameEn: "Elegant",
    description: "Sophisticated elegant avatar",
    vrmUrl: "/avatars/elegant.vrm",
    thumbnailUrl: "/avatars/thumbnails/elegant.png",
    category: "BUSINESS" as const,
    isPremium: true,
    sortOrder: 4,
  },
  {
    name: "Trendy",
    nameFr: "Tendance",
    nameEn: "Trendy",
    description: "Modern trendy avatar for social media",
    vrmUrl: "/avatars/trendy.vrm",
    thumbnailUrl: "/avatars/thumbnails/trendy.png",
    category: "CASUAL" as const,
    isPremium: true,
    sortOrder: 5,
  },
  {
    name: "Visionary",
    nameFr: "Visionnaire",
    nameEn: "Visionary",
    description: "Futuristic visionary avatar",
    vrmUrl: "/avatars/visionary.vrm",
    thumbnailUrl: "/avatars/thumbnails/visionary.png",
    category: "CREATIVE" as const,
    isPremium: true,
    sortOrder: 6,
  },
];

const backgrounds = [
  {
    name: "Purple Haze",
    nameFr: "Brume Violette",
    nameEn: "Purple Haze",
    imageUrl: "/backgrounds/purple-haze.jpg",
    category: "gradient",
    isPremium: false,
  },
  {
    name: "Ocean Deep",
    nameFr: "Océan Profond",
    nameEn: "Ocean Deep",
    imageUrl: "/backgrounds/ocean-deep.jpg",
    category: "gradient",
    isPremium: false,
  },
  {
    name: "Sunset Studio",
    nameFr: "Studio Crépuscule",
    nameEn: "Sunset Studio",
    imageUrl: "/backgrounds/sunset-studio.jpg",
    category: "studio",
    isPremium: false,
  },
  {
    name: "Emerald Studio",
    nameFr: "Studio Émeraude",
    nameEn: "Emerald Studio",
    imageUrl: "/backgrounds/emerald-studio.jpg",
    category: "studio",
    isPremium: false,
  },
  {
    name: "Neon Night",
    nameFr: "Nuit Néon",
    nameEn: "Neon Night",
    imageUrl: "/backgrounds/neon-night.jpg",
    category: "creative",
    isPremium: true,
  },
  {
    name: "Studio Pro",
    nameFr: "Studio Pro",
    nameEn: "Studio Pro",
    imageUrl: "/backgrounds/studio-pro.jpg",
    category: "studio",
    isPremium: true,
  },
];

async function main() {
  console.log("🌱 Seeding avatars...");

  for (const avatar of avatars) {
    await prisma.avatar.upsert({
      where: { id: avatar.name.toLowerCase().replace(/\s+/g, "-") },
      update: avatar,
      create: {
        id: avatar.name.toLowerCase().replace(/\s+/g, "-"),
        ...avatar,
      },
    });
  }
  console.log(`✅ Seeded ${avatars.length} avatars`);

  console.log("🌱 Seeding backgrounds...");
  for (const bg of backgrounds) {
    await prisma.background.upsert({
      where: { id: bg.name.toLowerCase().replace(/\s+/g, "-") },
      update: bg,
      create: {
        id: bg.name.toLowerCase().replace(/\s+/g, "-"),
        ...bg,
      },
    });
  }
  console.log(`✅ Seeded ${backgrounds.length} backgrounds`);

  console.log("🎉 Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
