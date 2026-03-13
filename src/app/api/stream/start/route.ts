import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { avatarId, platform, rtmpUrl, streamKey } = await req.json();

    if (!platform) {
      return NextResponse.json(
        { error: "platform is required" },
        { status: 400 }
      );
    }

    const userId = (session.user as { id: string }).id;

    const liveSession = await prisma.liveSession.create({
      data: {
        userId,
        avatarId: avatarId || null,
        platform,
        rtmpUrl: rtmpUrl || null,
        streamKey: streamKey || null,
        status: "LIVE",
      },
    });

    return NextResponse.json({
      sessionId: liveSession.id,
      status: liveSession.status,
      message: "Stream session created",
    });
  } catch (error) {
    console.error("Stream start error:", error);
    return NextResponse.json(
      { error: "Failed to start stream" },
      { status: 500 }
    );
  }
}
