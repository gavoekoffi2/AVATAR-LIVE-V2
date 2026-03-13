import { NextResponse } from "next/server";
import { DEFAULT_AVATARS, CSS_BACKGROUNDS } from "@/types/avatar";

export async function GET() {
  // In production, this would query the database
  // For MVP, return the static data
  return NextResponse.json({
    avatars: DEFAULT_AVATARS,
    backgrounds: CSS_BACKGROUNDS,
  });
}
