import { NextResponse } from "next/server";

const SOLAR_WIND_SPEED_API =
  "https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json";

const SOLAR_WIND_MAG_API =
  "https://services.swpc.noaa.gov/products/summary/solar-wind-mag-field.json";

export async function GET() {
  try {
    const [speedResponse, magneticResponse] =
      await Promise.all([
        fetch(SOLAR_WIND_SPEED_API, {
          next: {
            revalidate: 300,
          },
        }),
        fetch(SOLAR_WIND_MAG_API, {
          next: {
            revalidate: 300,
          },
        }),
      ]);

    if (!speedResponse.ok || !magneticResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch solar wind data.",
        },
        { status: 502 }
      );
    }

    const [speedData, magneticData] =
      await Promise.all([
        speedResponse.json(),
        magneticResponse.json(),
      ]);

    return NextResponse.json({
      speed: speedData,
      magneticField: magneticData,
    });
  } catch (error) {
    console.error("Solar Wind API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch solar wind data.",
      },
      { status: 500 }
    );
  }
}