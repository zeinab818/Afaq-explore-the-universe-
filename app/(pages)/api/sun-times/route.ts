
import { NextRequest, NextResponse } from "next/server";
import { calculateSunTimes } from "@/lib/solar/solar-calculations";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");
  const dateParam = searchParams.get("date");
  const timezone = searchParams.get("timezone") || "Africa/Cairo";

  if (latParam === null || lonParam === null) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  const latitude = Number(latParam);
  const longitude = Number(lonParam);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json(
      { error: "Invalid latitude or longitude" },
      { status: 400 }
    );
  }

  if (dateParam && !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json(
      { error: "Date must use YYYY-MM-DD format" },
      { status: 400 }
    );
  }

  try {
    // Use noon UTC as an anchor for the requested calendar date.
    // This avoids interpreting a date-only string in the server timezone.
    const date = dateParam
      ? new Date(`${dateParam}T12:00:00.000Z`)
      : new Date();

    if (Number.isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    // Reject impossible calendar dates, such as 2026-02-31.
    if (
      dateParam &&
      date.toISOString().slice(0, 10) !== dateParam
    ) {
      return NextResponse.json(
        { error: "Invalid calendar date" },
        { status: 400 }
      );
    }

    // Validate the timezone identifier.
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: timezone });
    } catch {
      return NextResponse.json(
        { error: "Invalid timezone" },
        { status: 400 }
      );
    }

    const solarTimes = calculateSunTimes(
      latitude,
      longitude,
      date,
      timezone
    );

    return NextResponse.json({
      status: "success",
      error: null,
      data: solarTimes,
    });
  } catch (error) {
    console.error("Local sunrise/sunset calculation error:", error);

    return NextResponse.json(
      {
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Failed to calculate sunrise and sunset",
      },
      { status: 500 }
    );
  }
}
