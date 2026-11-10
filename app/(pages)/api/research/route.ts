import { NextResponse } from "next/server";

import { getResearch } from "@/lib/osdr";

export async function GET() {
  try {
    const data = await getResearch();

    return NextResponse.json(data);
  } catch (error) {
    console.error("OSDR API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch NASA OSDR data",
      },
      {
        status: 500,
      }
    );
  }
}