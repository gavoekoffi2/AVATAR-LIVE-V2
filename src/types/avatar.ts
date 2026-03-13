export type AvatarCategory = "BUSINESS" | "CASUAL" | "CREATIVE" | "CUSTOM";

export interface AvatarInfo {
  id: string;
  name: string;
  nameFr: string;
  nameEn: string;
  description?: string;
  vrmUrl: string;
  thumbnailUrl: string;
  category: AvatarCategory;
  isPremium: boolean;
  sortOrder: number;
}

export interface BackgroundInfo {
  id: string;
  name: string;
  nameFr: string;
  nameEn: string;
  imageUrl: string;
  category: string;
  isPremium: boolean;
}

export const DEFAULT_AVATARS: AvatarInfo[] = [
  {
    id: "avatar-1",
    name: "Business Pro",
    nameFr: "Business Pro",
    nameEn: "Business Pro",
    description: "Professional business avatar",
    vrmUrl: "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm",
    thumbnailUrl: "/avatars/thumbnails/business-pro.png",
    category: "BUSINESS",
    isPremium: false,
    sortOrder: 1,
  },
  {
    id: "avatar-2",
    name: "Casual Cool",
    nameFr: "Style Décontracté",
    nameEn: "Casual Cool",
    description: "Casual everyday avatar",
    vrmUrl: "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm",
    thumbnailUrl: "/avatars/thumbnails/casual-cool.png",
    category: "CASUAL",
    isPremium: false,
    sortOrder: 2,
  },
  {
    id: "avatar-3",
    name: "Creative Artist",
    nameFr: "Artiste Créatif",
    nameEn: "Creative Artist",
    description: "Creative artist avatar",
    vrmUrl: "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm",
    thumbnailUrl: "/avatars/thumbnails/creative-artist.png",
    category: "CREATIVE",
    isPremium: false,
    sortOrder: 3,
  },
  {
    id: "avatar-4",
    name: "Elegant",
    nameFr: "Élégant",
    nameEn: "Elegant",
    description: "Elegant professional avatar",
    vrmUrl: "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm",
    thumbnailUrl: "/avatars/thumbnails/elegant.png",
    category: "BUSINESS",
    isPremium: true,
    sortOrder: 4,
  },
  {
    id: "avatar-5",
    name: "Trendy",
    nameFr: "Tendance",
    nameEn: "Trendy",
    description: "Trendy modern avatar",
    vrmUrl: "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm",
    thumbnailUrl: "/avatars/thumbnails/trendy.png",
    category: "CASUAL",
    isPremium: true,
    sortOrder: 5,
  },
  {
    id: "avatar-6",
    name: "Visionary",
    nameFr: "Visionnaire",
    nameEn: "Visionary",
    description: "Visionary creative avatar",
    vrmUrl: "https://github.com/pixiv/three-vrm/raw/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm",
    thumbnailUrl: "/avatars/thumbnails/visionary.png",
    category: "CREATIVE",
    isPremium: true,
    sortOrder: 6,
  },
];

export const CSS_BACKGROUNDS = [
  {
    id: "bg-gradient-1",
    name: "Purple Haze",
    nameFr: "Brume Violette",
    nameEn: "Purple Haze",
    style: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0f0f23 100%)",
    category: "gradient",
    isPremium: false,
  },
  {
    id: "bg-gradient-2",
    name: "Ocean Deep",
    nameFr: "Océan Profond",
    nameEn: "Ocean Deep",
    style: "linear-gradient(135deg, #0c1445 0%, #0d4f4f 50%, #0f0f23 100%)",
    category: "gradient",
    isPremium: false,
  },
  {
    id: "bg-gradient-3",
    name: "Sunset Studio",
    nameFr: "Studio Crépuscule",
    nameEn: "Sunset Studio",
    style: "linear-gradient(135deg, #1a0a2e 0%, #3d1a2e 50%, #0f0f23 100%)",
    category: "gradient",
    isPremium: false,
  },
  {
    id: "bg-gradient-4",
    name: "Emerald Studio",
    nameFr: "Studio Émeraude",
    nameEn: "Emerald Studio",
    style: "linear-gradient(135deg, #0a1a0a 0%, #0d3320 50%, #0f0f23 100%)",
    category: "gradient",
    isPremium: false,
  },
  {
    id: "bg-gradient-5",
    name: "Neon Night",
    nameFr: "Nuit Néon",
    nameEn: "Neon Night",
    style: "linear-gradient(135deg, #0f0f23 0%, #1a0533 30%, #16213E 70%, #0f0f23 100%)",
    category: "gradient",
    isPremium: false,
  },
  {
    id: "bg-gradient-6",
    name: "Studio Pro",
    nameFr: "Studio Pro",
    nameEn: "Studio Pro",
    style: "radial-gradient(ellipse at center, #1e1e3a 0%, #0f0f23 70%)",
    category: "gradient",
    isPremium: false,
  },
];
