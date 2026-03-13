import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "sessionId is required" },
      { status: 400 }
    );
  }

  // In production, this would query the database for session status
  return NextResponse.json({
    sessionId,
    status: "CREATED",
    duration: 0,
    viewers: 0,
  });
}
