
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ISS_URL =
  "https://api.wheretheiss.at/v1/satellites/25544";

export async function GET() {
  try {
    const response = await fetch(ISS_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "ISS telemetry source is unavailable." },
        { status: 502 },
      );
    }

    const data = await response.json();

    const required = [
      "latitude",
      "longitude",
      "altitude",
      "velocity",
      "timestamp",
    ];

    if (
      !required.every(
        (key) =>
          typeof data[key] === "number" &&
          Number.isFinite(data[key]),
      )
    ) {
      return NextResponse.json(
        { error: "Invalid ISS telemetry received." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        name: "International Space Station",
        noradId: 25544,
        latitude: data.latitude,
        longitude: data.longitude,
        altitudeKm: data.altitude,
        velocityKmh: data.velocity,
        visibility: data.visibility ?? null,
        timestamp: data.timestamp,
        source: "Where the ISS at?",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the ISS telemetry source." },
      { status: 502 },
    );
  }
}
