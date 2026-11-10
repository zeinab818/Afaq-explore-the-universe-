import { NextResponse } from "next/server";

import { getMissions } from "@/lib/missions";

export async function GET() {
  try {
    const missions = await getMissions();

    return NextResponse.json(missions);
  } catch (error) {
    console.error("NASA Missions API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch NASA missions",
      },
      {
        status: 500,
      }
    );
  }
}