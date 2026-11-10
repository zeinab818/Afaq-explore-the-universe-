import { NextRequest, NextResponse } from "next/server";
import * as Astronomy from "astronomy-engine";

import type {
  MoonCalendarResponse,
  MoonDay,
  NextPhases,
  Eclipse,
  MoonEvent,
  TraditionalMoon,
} from "@/types/moonI";

/* ============================================================
   CONSTANTS
============================================================ */

const SYNODIC_MONTH = 29.530588853;
const AU_TO_KM = 149597870.7;
const DAY_MS = 24 * 60 * 60 * 1000;

/* ============================================================
   HELPERS
============================================================ */

function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/* ============================================================
   PHASE NAME
============================================================ */

function getPhaseName(phaseAngle: number): string {
  const normalized = normalizeAngle(phaseAngle);

  if (normalized < 22.5) {
    return "New Moon";
  }

  if (normalized < 67.5) {
    return "Waxing Crescent";
  }

  if (normalized < 112.5) {
    return "First Quarter";
  }

  if (normalized < 157.5) {
    return "Waxing Gibbous";
  }

  if (normalized < 202.5) {
    return "Full Moon";
  }

  if (normalized < 247.5) {
    return "Waning Gibbous";
  }

  if (normalized < 292.5) {
    return "Last Quarter";
  }

  if (normalized < 337.5) {
    return "Waning Crescent";
  }

  return "New Moon";
}

function getMoonAge(date: Date): number {
  try {
    /*
     * Search from approximately one lunar cycle
     * before the requested date.
     */

    const searchStart = new Date(
      date.getTime() -
        SYNODIC_MONTH * DAY_MS
    );

    const result =
      Astronomy.SearchMoonPhase(
        0,
        searchStart,
        SYNODIC_MONTH + 2
      );

    if (!result?.date) {
      return 0;
    }

    let newMoonDate = result.date;

    /*
     * We need the NEW MOON BEFORE the requested date.
     *
     * If Astronomy returned a future New Moon,
     * search one cycle earlier.
     */

    if (
      newMoonDate.getTime() >
      date.getTime()
    ) {
      const earlierStart =
        new Date(
          searchStart.getTime() -
            SYNODIC_MONTH * DAY_MS
        );

      const previous =
        Astronomy.SearchMoonPhase(
          0,
          earlierStart,
          SYNODIC_MONTH + 2
        );

      if (!previous?.date) {
        return 0;
      }

      newMoonDate = previous.date;
    }

    const ageMilliseconds =
      date.getTime() -
      newMoonDate.getTime();

    const ageDays =
      ageMilliseconds / DAY_MS;

    /*
     * Safety check.
     */

    if (
      ageDays < 0 ||
      ageDays > SYNODIC_MONTH + 1
    ) {
      return 0;
    }

    return ageDays;
  } catch (error) {
    console.error(
      "Failed to calculate moon age:",
      error
    );

    return 0;
  }
}

/* ============================================================
   FORMAT MOON AGE
============================================================ */


/* ============================================================
   ZODIAC
============================================================ */

function getZodiac(date: Date) {
  const longitude =
    Astronomy.EclipticLongitude(
      Astronomy.Body.Moon,
      date
    );

  const normalizedLongitude =
    normalizeAngle(longitude);

  const signs = [
    ["Aries", "aries"],
    ["Taurus", "taurus"],
    ["Gemini", "gemini"],
    ["Cancer", "cancer"],
    ["Leo", "leo"],
    ["Virgo", "virgo"],
    ["Libra", "libra"],
    ["Scorpio", "scorpio"],
    ["Sagittarius", "sagittarius"],
    ["Capricorn", "capricorn"],
    ["Aquarius", "aquarius"],
    ["Pisces", "pisces"],
  ] as const;

  const signIndex = Math.floor(
    normalizedLongitude / 30
  );

  const degree =
    normalizedLongitude -
    signIndex * 30;

  return {
    sign: signs[signIndex][0],
    sign_id: signs[signIndex][1],
    degree,
    zodiac_type: "tropical",
  };
}

/* ============================================================
   NEXT PHASE
============================================================ */

function getNextPhase(
  phaseAngle: number,
  date: Date
): string {
  try {
    const result =
      Astronomy.SearchMoonPhase(
        phaseAngle,
        date,
        40
      );

    if (!result?.date) {
      return "";
    }

    return result.date.toISOString();
  } catch (error) {
    console.error(
      `Failed to calculate moon phase ${phaseAngle}:`,
      error
    );

    return "";
  }
}

function getNextPhases(
  date: Date
): NextPhases {
  return {
    new_moon: getNextPhase(
      0,
      date
    ),

    first_quarter: getNextPhase(
      90,
      date
    ),

    full_moon: getNextPhase(
      180,
      date
    ),

    last_quarter: getNextPhase(
      270,
      date
    ),
  };
}

/* ============================================================
   ECLIPSE
============================================================ */

function getEclipseForDate(
  date: Date
): Eclipse {
  try {
    const eclipse =
      Astronomy.SearchLunarEclipse(
        date
      );

    if (
      !eclipse?.peak?.date
    ) {
      return {
        is_eclipse: false,
        is_blood_moon: false,
      };
    }

    const difference =
      Math.abs(
        eclipse.peak.date.getTime() -
          date.getTime()
      );

    /*
     * We consider the eclipse relevant
     * if its peak occurs within ±24 hours.
     */

    const isEclipse =
      difference <= DAY_MS;

    const kind =
      String(
        eclipse.kind ?? ""
      ).toLowerCase();

    return {
      is_eclipse: isEclipse,

      is_blood_moon:
        isEclipse &&
        kind.includes("total"),
    };
  } catch (error) {
    console.error(
      "Failed to calculate eclipse:",
      error
    );

    return {
      is_eclipse: false,
      is_blood_moon: false,
    };
  }
}

/* ============================================================
   DISTANCE
============================================================ */

function getMoonDistance(
  date: Date
): number {
  const vector =
    Astronomy.GeoVector(
      Astronomy.Body.Moon,
      date,
      true
    );

  const distanceAU =
    Math.sqrt(
      vector.x ** 2 +
        vector.y ** 2 +
        vector.z ** 2
    );

  return (
    distanceAU *
    AU_TO_KM
  );
}

/* ============================================================
   FULL MOONS
============================================================ */

function getFullMoons(year: number): Date[] {
  const fullMoons: Date[] = [];

  const start = new Date(
    Date.UTC(year, 0, 1)
  );

  const end = new Date(
    Date.UTC(year + 1, 0, 1)
  );

  let searchDate = start;

  while (searchDate < end) {
    const result =
      Astronomy.SearchMoonPhase(
        180,
        searchDate,
        40
      );

    if (!result?.date) {
      break;
    }

    const fullMoon = result.date;

    if (
      fullMoon >= start &&
      fullMoon < end
    ) {
      fullMoons.push(fullMoon);
    }

    // Move forward to avoid finding the same Full Moon again
    searchDate = new Date(
      fullMoon.getTime() + DAY_MS
    );
  }

  return fullMoons;
}

/* ============================================================
   MOON EVENTS
============================================================ */

function createMoonEvents(
  year: number
): MoonEvent[] {
  const fullMoons =
    getFullMoons(year);

  return fullMoons.map(
    (date, index) => {
      const month =
        date.getUTCMonth();

      const distance_km =
        getMoonDistance(date);

      const isBlueMoon =
        fullMoons.some(
          (
            otherDate,
            otherIndex
          ) =>
            otherIndex !== index &&
            otherDate.getUTCMonth() ===
              month
        );

      /*
       * Current practical definition:
       * Full Moon at or below 360,000 km.
       */

      const isSupermoon =
        distance_km <= 360000;

          return {
          id: `full-moon-${year}-${index + 1}`,

          type: isBlueMoon
            ? "blue_moon"
            : isSupermoon
              ? "supermoon"
              : "full_moon",

          name: isBlueMoon
            ? "Blue Moon"
            : isSupermoon
              ? "Supermoon"
              : "Full Moon",

          date: date.toISOString(),

          distance_km,

          traditional_moon: getTraditionalMoon(date),
        };
          
        }
  );
}
function getTraditionalMoon(
  date: Date
): TraditionalMoon | undefined {
  const month = date.getUTCMonth();

  if (month === 5) {
    return {
      name: "Strawberry Moon",
      naming_system: "Traditional Full Moon Name",
      month: "June",
      applies_to_full_moon_at: date.toISOString(),
      is_current_full_moon: false,
    };
  }

  return undefined;
}
/* ============================================================
   MOON DAY
============================================================ */
function getCairoDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return `${values.year}-${values.month}-${values.day}`;
} 
function createMoonDay(
  date: Date,
  latitude: number,
  longitude: number
): MoonDay {
  /* ----------------------------------------------------------
     PHASE
  ---------------------------------------------------------- */

  const phaseAngle =
    Astronomy.MoonPhase(date);

  const normalizedPhase =
    normalizeAngle(
      phaseAngle
    );

  /* ----------------------------------------------------------
     ILLUMINATION
  ---------------------------------------------------------- */

  const illumination =
    Astronomy.Illumination(
      Astronomy.Body.Moon,
      date
    );

  const illuminationFraction =
    Math.max(
      0,
      Math.min(
        1,
        illumination.phase_fraction
      )
    );

  /* ----------------------------------------------------------
     MOON AGE
  ---------------------------------------------------------- */

  const ageDays =
    getMoonAge(date);

  /* ----------------------------------------------------------
     DISTANCE
  ---------------------------------------------------------- */

  const distanceKm =
    getMoonDistance(date);

  /* ----------------------------------------------------------
     OBSERVER
  ---------------------------------------------------------- */

  const observer =
    new Astronomy.Observer(
      latitude,
      longitude,
      0
    );

  /* ----------------------------------------------------------
     EQUATORIAL POSITION
  ---------------------------------------------------------- */

  const equator =
    Astronomy.Equator(
      Astronomy.Body.Moon,
      date,
      observer,
      true,
      true
    );

  /* ----------------------------------------------------------
     HORIZON
  ---------------------------------------------------------- */

  const horizon =
    Astronomy.Horizon(
      date,
      observer,
      equator.ra,
      equator.dec,
      "normal"
    );

  /* ----------------------------------------------------------
     MOONRISE
  ---------------------------------------------------------- */

  let moonrise:
    string | null = null;

  try {
    const rise =
      Astronomy.SearchRiseSet(
        Astronomy.Body.Moon,
        observer,
        +1,
        date,
        1
      );

    moonrise =
      rise?.date
        ? rise.date.toISOString()
        : null;
  } catch (error) {
    console.error(
      "Failed to calculate moonrise:",
      error
    );

    moonrise = null;
  }

  /* ----------------------------------------------------------
     MOONSET
  ---------------------------------------------------------- */

  let moonset:
    string | null = null;

  try {
    const set =
      Astronomy.SearchRiseSet(
        Astronomy.Body.Moon,
        observer,
        -1,
        date,
        1
      );

    moonset =
      set?.date
        ? set.date.toISOString()
        : null;
  } catch (error) {
    console.error(
      "Failed to calculate moonset:",
      error
    );

    moonset = null;
  }

  /* ----------------------------------------------------------
     NEXT PHASES
  ---------------------------------------------------------- */

  const nextPhases =
    getNextPhases(date);

  /* ----------------------------------------------------------
     ECLIPSE
  ---------------------------------------------------------- */

  const eclipse =
    getEclipseForDate(date);

  /* ----------------------------------------------------------
     WAXING / WANING
  ---------------------------------------------------------- */

  const isWaxing =
    normalizedPhase > 0 &&
    normalizedPhase < 180;

  /* ----------------------------------------------------------
     RETURN
  ---------------------------------------------------------- */

  return {
      calendar_date: getCairoDate(date),

  timestamp: date.toISOString(),

   
    phase: {
      name:
        getPhaseName(
          normalizedPhase
        ),

      phase_angle_deg:
        normalizedPhase,

      illumination:
        illuminationFraction,

      age_days:
        ageDays,

      distance_km:
        distanceKm,

      is_waxing:
        isWaxing,
    },

    zodiac:
      getZodiac(date),

    moon_visual: {
      type: "css",

      shadow_ratio:
        1 -
        illuminationFraction,

      waxing:
        isWaxing,
    },

    next_phases:
      nextPhases,

    eclipse,

    position: {
      altitude:
        horizon.altitude,

      azimuth:
        horizon.azimuth,

      distance:
        distanceKm,
    },

    moonrise,
    moonset,
  } as MoonDay;
}

/* ============================================================
   GET
============================================================ */

export async function GET(
  req: NextRequest
) {
  try {
    const { searchParams } =
      new URL(req.url);

    /* ========================================================
       LOCATION
    ======================================================== */

    const latitude = Number(
      searchParams.get("lat") ??
        "30.0444"
    );

    const longitude = Number(
      searchParams.get("lon") ??
        "31.2357"
    );

    /* ========================================================
       DATE
    ======================================================== */

   const now = new Date();

const year = Number(
  searchParams.get("year") ?? now.getFullYear()
);

const month = Number(
  searchParams.get("month") ?? now.getMonth() + 1
);

    /* ========================================================
       TIMESTAMP
    ======================================================== */

    const timestamp =
      searchParams.get(
        "timestamp"
      );

    const requestedDate =
      timestamp
        ? new Date(timestamp)
        : now;

    /* ========================================================
       VALIDATION
    ======================================================== */

    if (
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid latitude",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid longitude",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(year) ||
      year < 1900 ||
      year > 2200
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid year",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid month",
        },
        { status: 400 }
      );
    }

    if (
      Number.isNaN(
        requestedDate.getTime()
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid timestamp. Use ISO 8601.",
        },
        { status: 400 }
      );
    }

    /* ========================================================
       DAYS IN MONTH
    ======================================================== */

    const daysInMonth =
      new Date(
        Date.UTC(
          year,
          month,
          0
        )
      ).getUTCDate();

    /* ========================================================
       MONTH DAYS
    ======================================================== */

    const days: MoonDay[] = [];

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      /*
       * Calendar snapshot:
       * 12:00 UTC.
       *
       * This is independent from
       * the exact current timestamp.
       */

      const date =
        new Date(
          Date.UTC(
            year,
            month - 1,
            day,
            12,
            0,
            0
          )
        );

      days.push(
        createMoonDay(
          date,
          latitude,
          longitude
        )
      );
    }

    /* ========================================================
       CURRENT MOON
    ======================================================== */

    const currentMoon =
      createMoonDay(
        requestedDate,
        latitude,
        longitude
      );

    /* ========================================================
       MOON EVENTS
    ======================================================== */

    const moonEvents =
      createMoonEvents(year);

    console.log(
      "Moon Events:",
      moonEvents
    );

    /* ========================================================
       MONTH NAME
    ======================================================== */

    const monthName =
      new Intl.DateTimeFormat(
        "en-US",
        {
          month: "long",
          timeZone: "UTC",
        }
      ).format(
        new Date(
          Date.UTC(
            year,
            month - 1,
            1
          )
        )
      );

    /* ========================================================
       RESPONSE
    ======================================================== */

    const response:
      MoonCalendarResponse & {
        current_moon: MoonDay;
      } = {
      year,

      month,

      month_name:
        monthName,

      days_in_month:
        daysInMonth,

      calendar_basis:
        "astronomical",

      calendar_timezone:
        "UTC",

      latitude,

      longitude,

      days,

      current_moon:
        currentMoon,

      moon_events:
        moonEvents,
    };

    return NextResponse.json(
      response
    );
  } catch (error) {
    console.error(
      "Moon calculation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to calculate moon data",

        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}