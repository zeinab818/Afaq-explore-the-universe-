import { NextRequest, NextResponse } from "next/server";

const METEOR_TONIGHT_API =
  "https://meteorshowercal.com/api/v1/tonight";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        {
          error: "Latitude and longitude are required.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${METEOR_TONIGHT_API}?lat=${encodeURIComponent(
        lat
      )}&lon=${encodeURIComponent(lon)}`,
      {
        next: {
          revalidate: 900,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Meteor Shower Tonight API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch tonight's meteor shower data.",
      },
      { status: 500 }
    );
  }
}