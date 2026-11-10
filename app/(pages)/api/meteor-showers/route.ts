import { NextResponse } from "next/server";
import type { MeteorShowerResponse } from "@/types/meteorShowerI";

const METEOR_SHOWERS_API =
  "https://meteorshowercal.com/api/v1/showers";

export async function GET() {
  try {
    const response = await fetch(METEOR_SHOWERS_API, {
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch meteor shower data",
        },
        { status: response.status }
      );
    }

    const data: MeteorShowerResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Meteor Showers API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch meteor shower data",
      },
      { status: 500 }
    );
  }
}