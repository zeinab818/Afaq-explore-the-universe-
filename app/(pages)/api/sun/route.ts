
import { NextRequest, NextResponse } from "next/server";
import {
  calculateSunPosition,
  calculateSunTimes,
} from "@/lib/solar/solar-calculations";
import type {
  SunApiResponse,
  Coordinates,
} from "@/types/sunI";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  if (latParam === null || lonParam === null) {
    return NextResponse.json(
      {
        status: "error",
        error: "Latitude and longitude are required",
        data: null,
      },
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
      {
        status: "error",
        error: "Invalid latitude or longitude",
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const timezone = "Africa/Cairo";
    const now = new Date();

    const getLocalPart = (type: string) =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      })
        .formatToParts(now)
        .find((part) => part.type === type)?.value ?? "";

    const date =
      `${getLocalPart("year")}-${getLocalPart("month")}-${getLocalPart("day")}`;

    const time =
      `${getLocalPart("hour")}:${getLocalPart("minute")}:${getLocalPart("second")}`;

    const coordinates: Coordinates = {
      latitude,
      longitude,
    };

    const sunPosition = calculateSunPosition(
      latitude,
      longitude,
      now
    );

    const solarTimes = calculateSunTimes(
      latitude,
      longitude,
      now,
      timezone
    );

    const data: SunApiResponse = {
      status: "success",
      error: null,
      data: {
        date,
        time,
        timezone,
        timestampUTC: now.toISOString(),
        coordinates,
        sun: {
          ...sunPosition,
          nextSolarEclipse: null,
          airMass: null,
          clearSky: null,
          shadowRatio: null,
          panelAim: null,
        },
        solarTimes,
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Sun calculation error:", error);

    return NextResponse.json(
      {
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Failed to calculate Sun position",
        data: null,
      },
      { status: 500 }
    );
  }
}
