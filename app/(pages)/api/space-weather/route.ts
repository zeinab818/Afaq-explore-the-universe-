import { NextResponse } from "next/server";

const SPACE_WEATHER_API =
  "https://services.swpc.noaa.gov/products/noaa-scales.json";

export async function GET() {
  try {
    const response = await fetch(SPACE_WEATHER_API, {
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch space weather data.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Space Weather API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch space weather data.",
      },
      { status: 500 }
    );
  }
}