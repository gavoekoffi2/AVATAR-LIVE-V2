import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionId = req.nextUrl.searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const liveSession = await prisma.liveSession.findUnique({
      where: { id: sessionId },
    });

    if (!liveSession) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const duration = liveSession.endedAt
      ? liveSession.duration
      : Math.floor((Date.now() - liveSession.startedAt.getTime()) / 1000);

    return NextResponse.json({
      sessionId: liveSession.id,
      status: liveSession.status,
      duration,
      platform: liveSession.platform,
      startedAt: liveSession.startedAt,
      endedAt: liveSession.endedAt,
    });
  } catch (error) {
    console.error("Stream status error:", error);
    return NextResponse.json(
      { error: "Failed to get stream status" },
      { status: 500 }
    );
  }
}
