import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const applicationId = process.env.ASTRONOMY_API_ID;
    const applicationSecret = process.env.ASTRONOMY_API_SECRET;

    if (!applicationId || !applicationSecret) {
      return NextResponse.json(
        { error: "Astronomy API credentials are missing" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);

    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const elevation = searchParams.get("elevation") ?? "0";

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    // Current date → one year ahead
    const today = new Date();

   const fromDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
    
    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const toDate = [
      nextYear.getFullYear(),
      String(nextYear.getMonth() + 1).padStart(2, "0"),
      String(nextYear.getDate()).padStart(2, "0"),
    ].join("-");
 

    // AstronomyAPI Basic Authentication
    const authString = Buffer.from(
      `${applicationId}:${applicationSecret}`
    ).toString("base64");

    const baseUrl =
      "https://api.astronomyapi.com/api/v2/bodies/events";

    const params = new URLSearchParams({
      latitude,
      longitude,
      elevation,
      from_date: fromDate,
      to_date: toDate,
      time: "00:00:00",
      output: "rows",
    });

    const [sunResponse, moonResponse] = await Promise.all([
      fetch(`${baseUrl}/sun?${params.toString()}`, {
        headers: {
          Authorization: `Basic ${authString}`,
        },
        cache: "no-store",
      }),

      fetch(`${baseUrl}/moon?${params.toString()}`, {
        headers: {
          Authorization: `Basic ${authString}`,
        },
        cache: "no-store",
      }),
    ]);

    const sunData = await sunResponse.json();
    const moonData = await moonResponse.json();

    if (!sunResponse.ok || !moonResponse.ok) {
      console.error("Astronomy API error:", {
        sun: sunData,
        moon: moonData,
      });

      return NextResponse.json(
        { error: "Failed to fetch celestial events" },
        { status: sunResponse.status || moonResponse.status }
      );
    }

  type AstronomyEventHighlight = {
    date?: string | null;
    altitude?: number | null;
  };

  type AstronomyEvent = {
    type: string;
    extraInfo?: unknown;
    eventHighlights?: {
      peak?: AstronomyEventHighlight;
      partialStart?: AstronomyEventHighlight;
      penumbralStart?: AstronomyEventHighlight;
      totalStart?: AstronomyEventHighlight;
      partialEnd?: AstronomyEventHighlight;
      penumbralEnd?: AstronomyEventHighlight;
      totalEnd?: AstronomyEventHighlight;
    };
  };

  type AstronomyRow = {
    events?: AstronomyEvent[];
  };

  type AstronomyApiResponse = {
    data?: {
      rows?: AstronomyRow[];
    };
  };

  const normalizeEvents = (
    data: AstronomyApiResponse | undefined,
    body: "Sun" | "Moon"
  ) => {
    const rows = data?.data?.rows ?? [];

    return rows.flatMap((row: AstronomyRow) =>
      (row.events ?? []).map((event: AstronomyEvent, index: number) => {
        const highlights = event.eventHighlights ?? {};

        const start =
          highlights.partialStart?.date ??
          highlights.penumbralStart?.date ??
          highlights.totalStart?.date ??
          null;

        const end =
          highlights.partialEnd?.date ??
          highlights.penumbralEnd?.date ??
          highlights.totalEnd?.date ??
          null;

        const peak = highlights.peak?.date ?? null;

        const altitude =
          highlights.peak?.altitude ??
          highlights.partialStart?.altitude ??
          highlights.penumbralStart?.altitude ??
          null;

        return {
          id: `${event.type}-${eventHighlightsDate(event)}-${index}`,
          type: event.type,
          body,
          date: peak ?? start ?? end,
          peak,
          start,
          end,
          altitude,
          extraInfo: event.extraInfo,
        };
      })
    );
  };

  function eventHighlightsDate(event: AstronomyEvent) {
    return (
      event.eventHighlights?.peak?.date ??
      event.eventHighlights?.partialStart?.date ??
      event.eventHighlights?.penumbralStart?.date ??
      "unknown"
    );
  }

  const events = [
    ...normalizeEvents(sunData, "Sun"),
    ...normalizeEvents(moonData, "Moon"),
  ];

events.sort(
  (a, b) =>
    (a.date ? new Date(a.date).getTime() : Number.POSITIVE_INFINITY) -
    (b.date ? new Date(b.date).getTime() : Number.POSITIVE_INFINITY)
);

return NextResponse.json(events);
  } catch (error) {
    console.error("Celestial events error:", error);

    return NextResponse.json(
      { error: "Something went wrong while fetching celestial events" },
      { status: 500 }
    );
  }
}