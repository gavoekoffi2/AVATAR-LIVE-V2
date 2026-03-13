import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    // In production, this would:
    // 1. Update the LiveSession record with endedAt and duration
    // 2. Stop the FFmpeg RTMP bridge process
    // 3. Clean up resources

    return NextResponse.json({
      sessionId,
      status: "ENDED",
      message: "Stream session ended",
    });
  } catch (error) {
    console.error("Stream stop error:", error);
    return NextResponse.json(
      { error: "Failed to stop stream" },
      { status: 500 }
    );
  }
}
