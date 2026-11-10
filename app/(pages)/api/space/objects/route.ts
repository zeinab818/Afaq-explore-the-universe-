
import { NextRequest, NextResponse } from "next/server";
import {
  degreesLat,
  degreesLong,
  eciToGeodetic,
  gstime,
  json2satrec,
  propagate,
} from "satellite.js";

export const dynamic = "force-dynamic";

const GROUPS = {
  STATIONS: { label: "Space Stations", limit: 100 },
  STARLINK: { label: "Starlink", limit: 500 },
  SCIENCE: { label: "Science", limit: 500 },
  WEATHER: { label: "Weather", limit: 300 },
  "GPS-OPS": { label: "GPS", limit: 100 },
} as const;

type Group = keyof typeof GROUPS;

type Omm = {
  OBJECT_NAME?: string;
  NORAD_CAT_ID?: number | string;
  OBJECT_ID?: string;
  EPOCH?: string;
  [key: string]: unknown;
};

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("group") ?? "STATIONS";

  if (!(requested in GROUPS)) {
    return NextResponse.json(
      { error: "Unsupported satellite group." },
      { status: 400 },
    );
  }

  const group = requested as Group;

  try {
    const url = new URL(
      "https://celestrak.org/NORAD/elements/gp.php",
    );
    url.searchParams.set("GROUP", group);
    url.searchParams.set("FORMAT", "JSON");

    // CelesTrak's orbital elements are cached for two hours.
    // Positions are still recalculated for the current time below.
    const response = await fetch(url, {
      next: { revalidate: 7200 },
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "CelesTrak is temporarily unavailable." },
        { status: 502 },
      );
    }

    const payload: unknown = await response.json();

    if (!Array.isArray(payload)) {
      return NextResponse.json(
        { error: "Unexpected orbital catalog response." },
        { status: 502 },
      );
    }

    const now = new Date();
    const siderealTime = gstime(now);
    const config = GROUPS[group];

    const objects = (payload as Omm[])
      .slice(0, config.limit)
      .flatMap((omm) => {
        try {
          if (
            !omm.OBJECT_NAME ||
            omm.NORAD_CAT_ID == null
          ) {
            return [];
          }

          const satrec = json2satrec(
            omm as Parameters<typeof json2satrec>[0],
          );

          const state = propagate(satrec, now) as
            | {
                position?: {
                  x: number;
                  y: number;
                  z: number;
                } | null;
                velocity?: {
                  x: number;
                  y: number;
                  z: number;
                } | null;
              }
            | null;

          if (!state?.position) return [];

          const geo = eciToGeodetic(
            state.position,
            siderealTime,
          );

          const latitude = degreesLat(geo.latitude);
          const longitude = degreesLong(geo.longitude);
          const altitudeKm = geo.height;

          if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            !Number.isFinite(altitudeKm)
          ) {
            return [];
          }

          const velocity = state.velocity;
          const velocityKmh = velocity
            ? Math.hypot(
                velocity.x,
                velocity.y,
                velocity.z,
              ) * 3600
            : null;

          return [{
            name: omm.OBJECT_NAME,
            noradId: String(omm.NORAD_CAT_ID),
            objectId: omm.OBJECT_ID ?? null,
            group,
            latitude,
            longitude,
            altitudeKm,
            velocityKmh,
            epoch: omm.EPOCH ?? null,
            positionCalculatedAt: now.toISOString(),
          }];
        } catch {
          // Skip malformed or unpropagatable orbital records.
          return [];
        }
      });

    return NextResponse.json(
      {
        group,
        groupLabel: config.label,
        count: objects.length,
        catalogCount: payload.length,
        calculatedAt: now.toISOString(),
        source: "CelesTrak GP / OMM",
        objects,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
      console.error("[Orbital Catalog API]", {
        group,
        error,
        cause:
          error instanceof Error
            ? error.cause
            : undefined,
      });

      return NextResponse.json(
        { error: "Unable to load orbital catalog." },
        { status: 502 },
      );

}
}
