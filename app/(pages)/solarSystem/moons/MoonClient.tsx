"use client";

import React, { useEffect, useState } from "react";

import {
  Moon,
  Sunrise,
  Sunset,
  Orbit,
  MapPin,
  Sparkles,
  Eclipse,
  CalendarDays,
  Clock3,
  Navigation,
  type LucideIcon,
} from "lucide-react";

import { MoonCalendarResponse, MoonEvent } from "@/types/moonI";

import OthersMoons from "@/components/ui/Moons/OthersMoons";
interface MoonClientProps {
  initialParams: {
    lat?: string;
    lon?: string;
    year?: string;
    month?: string;
  };
}

/* ============================================================
FETCH MOON DATA
============================================================ */

async function getMoonData(
  latitude: string,
  longitude: string,
  year: string,
  month: string,
  signal?: AbortSignal,
): Promise<MoonCalendarResponse> {
  const url =
    `/api/moon` +
    `?lat=${encodeURIComponent(latitude)}` +
    `&lon=${encodeURIComponent(longitude)}` +
    `&year=${encodeURIComponent(year)}` +
    `&month=${encodeURIComponent(month)}`;

  const response = await fetch(url, {
    cache: "no-store",
    signal,
  });

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new Error("The Moon API returned an invalid response.");
  }

  if (!response.ok) {
    console.error("Moon API error:", {
      status: response.status,
      data,
    });

    const apiError =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : null;

    throw new Error(
      apiError ?? `Failed to fetch moon data: ${response.status}`,
    );
  }

  return data as MoonCalendarResponse;
}

/* ============================================================
   FORMATTERS
============================================================ */

function formatMoonAge(ageDays: number): string {
  const safeDays = Math.max(0, ageDays);

  const days = Math.floor(safeDays);

  const hours = Math.round((safeDays - days) * 24);

  if (hours >= 24) {
    return `${days + 1} days old`;
  }

  if (hours === 0) {
    return `${days} days old`;
  }

  if (days === 0) {
    return `${hours} hours old`;
  }

  return `${days} days, ${hours} hours old`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatCoordinate(
  value: number,
  positive: string,
  negative: string,
): string {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positive : negative}`;
}

function formatDegrees(value: number): string {
  return `${value.toFixed(1)}°`;
}

function formatDate(date: string | null | undefined): string {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatTime(date: string | null | undefined): string {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ============================================================
   MOON PAGE
============================================================ */

export default function MoonClient({ initialParams }: MoonClientProps) {
  const latitude = initialParams.lat ?? "30.0444";
  const longitude = initialParams.lon ?? "31.2357";

  const now = new Date();

  const year = initialParams.year ?? String(now.getFullYear());

  const month = initialParams.month ?? String(now.getMonth() + 1);
  const [response, setResponse] = useState<MoonCalendarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMoonData() {
      setLoading(true);
      setError(null);

      try {
        const data = await getMoonData(
          latitude,
          longitude,
          year,
          month,
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setResponse(data);
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Moon page data error:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMoonData();

    return () => controller.abort();
  }, [latitude, longitude, year, month, retryCount]);

  if (!response) {
    return null;
  }

  /* ==========================================================
     CURRENT MOON
  ========================================================== */ /* ==========================================================
     CURRENT MOON
  ========================================================== */

  const moon = response.current_moon;

  const phase = moon.phase;

  const zodiac = moon.zodiac;

  const traditionalMoon = moon.traditional_moon;

  const nextPhases = moon.next_phases;

  const eclipse = moon.eclipse;

  /*
   * Notable full-moon events:
   * Full Moon / Supermoon / Blue Moon
   * with traditional names when available.
   */
  const moonEvents = response.moon_events ?? [];

  /* ==========================================================
     DERIVED VALUES
  ========================================================== */

  const illuminationPercent = Math.max(
    0,
    Math.min(100, phase.illumination * 100),
  );

  const altitude = moon.position?.altitude ?? 0;

  const azimuth = moon.position?.azimuth ?? 0;

  const visibleNow = altitude > 0;

  const upcomingPhases = nextPhases
    ? [
        {
          key: "new_moon",
          title: "New Moon",
          date: nextPhases.new_moon,
          description: "A new chapter begins.",
        },
        {
          key: "first_quarter",
          title: "First Quarter",
          date: nextPhases.first_quarter,
          description: "The Moon reaches its first quarter.",
        },
        {
          key: "full_moon",
          title: "Full Moon",
          date: nextPhases.full_moon,
          description: "The lunar disk appears fully illuminated.",
        },
        {
          key: "last_quarter",
          title: "Last Quarter",
          date: nextPhases.last_quarter,
          description: "The illuminated portion begins its final turn.",
        },
      ]
        .filter((phase) => phase.date)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  return (
    <main className="min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        {/* Ambient atmosphere */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              left-[10%]
              top-[15%]
              h-80
              w-80
              rounded-full
              bg-indigo-500/10
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              right-[5%]
              top-[35%]
              h-96
              w-96
              rounded-full
              bg-violet-500/10
              blur-[140px]
            "
          />

          <div
            className="
              absolute
              bottom-[-10%]
              left-1/2
              h-100
              w-100
              -translate-x-1/2
              rounded-full
              bg-blue-500/5
              blur-[130px]
            "
          />
        </div>

        {/* Large orbital rings */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-125
            w-175
            -translate-x-1/2
            -translate-y-1/2
            rotate-18
            rounded-[50%]
            border
            border-indigo-300/[0.07]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-150
            w-225
            -translate-x-1/2
            -translate-y-1/2
            -rotate-12
            rounded-[50%]
            border
            border-white/[0.035]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-175
            w-250
            -translate-x-1/2
            -translate-y-1/2
            rotate-35
            rounded-[50%]
            border
            border-violet-300/[0.035]
          "
        />

        {/* Content */}

        <div
          className="
            relative
            mx-auto
            flex
            min-h-screen
            max-w-7xl
            items-center
            px-6
            py-32
            lg:px-8
          "
        >
          <div
            className="
              grid
              w-full
              items-center
              gap-16
              lg:grid-cols-[1fr_0.9fr]
              lg:gap-8
            "
          >
            {/* ==================================================
                HERO TEXT
            ================================================== */}

            <div className="relative z-20">
              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-indigo-300
                "
              >
                <Moon size={15} strokeWidth={1.5} />

                <span>Lunar Observatory</span>
              </div>

              <h1
                className="
                  font-display
                  text-6xl
                  font-semibold
                  tracking-[-0.04em]
                  md:text-8xl
                  lg:text-9xl
                "
              >
                The Moon
              </h1>

              <p
                className="
                  mt-5
                  max-w-xl
                  font-display
                  text-xl
                  text-indigo-200/90
                  md:text-2xl
                "
              >
                Earth&apos;s natural companion in motion.
              </p>

              <p
                className="
                  mt-7
                  max-w-2xl
                  text-base
                  leading-8
                  text-foreground-secondary
                  md:text-lg
                "
              >
                Explore the Moon&apos;s current phase, illumination, position,
                distance, visibility, and upcoming celestial events from your
                location.
              </p>

              {/* Location */}

              <div
                className="
                  mt-9
                  flex
                  flex-wrap
                  gap-x-8
                  gap-y-3
                  text-sm
                  text-foreground-muted
                "
              >
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-indigo-300" />

                  <span>
                    {formatCoordinate(Number(latitude), "N", "S")}
                    {" · "}
                    {formatCoordinate(Number(longitude), "E", "W")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-indigo-300" />

                  <span>{moon.calendar_date}</span>
                </div>
              </div>

              {/* Main badges */}

              <div className="mt-9 flex flex-wrap gap-3">
                <MoonBadge>{phase.name}</MoonBadge>

                <MoonBadge>
                  {illuminationPercent.toFixed(1)}% illuminated
                </MoonBadge>

                <MoonBadge>{formatMoonAge(phase.age_days)}</MoonBadge>
              </div>

              {/* Visibility */}

              <div
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-white/2.5
                  px-4
                  py-2.5
                  text-xs
                  backdrop-blur-xl
                "
              >
                <span
                  className={`
                    h-2
                    w-2
                    rounded-full
                    ${
                      visibleNow
                        ? "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]"
                        : "bg-slate-500"
                    }
                  `}
                />

                <span className="text-foreground-secondary">
                  {visibleNow ? "Above the horizon" : "Below the horizon"}
                </span>
              </div>
            </div>

            {/* ==================================================
                MOON VISUAL
            ================================================== */}

            <div
              className="
                relative
                flex
                min-h-130
                items-center
                justify-center
              "
            >
              <MoonVisual
                illumination={phase.illumination}
                isWaxing={phase.is_waxing}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          OVERVIEW
      ====================================================== */}

      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Lunar Overview"
            title="The Moon right now"
            description="A precise snapshot of the Moon's current physical and observational state."
          />

          <div
            className="
              grid
              overflow-hidden
              rounded-3xl
              border
              border-white/6
              bg-white/[0.018]
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <MoonStat icon={Moon} label="Phase" value={phase.name} />

            <MoonStat
              icon={Sparkles}
              label="Illumination"
              value={`${illuminationPercent.toFixed(1)}%`}
            />

            <MoonStat
              icon={Clock3}
              label="Moon Age"
              value={formatMoonAge(phase.age_days)}
            />

            <MoonStat
              icon={Orbit}
              label="Distance"
              value={`${formatNumber(phase.distance_km)} km`}
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          SKY POSITION
      ====================================================== */}

      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sky Position"
            title="Where is the Moon?"
            description="Its position in your local sky at the current observation time."
          />

          <div
            className="
              overflow-hidden
              rounded-4xl
              border
              border-white/6
              bg-white/[0.018]
              backdrop-blur-xl
            "
          >
            {/* ==================================================
                SKY MAP
            ================================================== */}

            <div
              className="
                relative
                min-h-145
                overflow-hidden
                border-b
                border-white/6
                bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.09),transparent_42%)]
              "
            >
              {/* Ambient glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-[44%]
                  h-80
                  w-80
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-indigo-400/8
                  blur-[110px]
                "
              />

              {/* ==================================================
                  ALTITUDE ARCS
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[15%]
                  left-1/2
                  h-110
                  w-220
                  -translate-x-1/2
                  rounded-t-[880px]
                  border
                  border-white/4.5
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[15%]
                  left-1/2
                  h-85
                  w-170
                  -translate-x-1/2
                  rounded-t-[680px]
                  border
                  border-indigo-300/5.5
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[15%]
                  left-1/2
                  h-60
                  w-120
                  -translate-x-1/2
                  rounded-t-[480px]
                  border
                  border-white/4.5
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[15%]
                  left-1/2
                  h-32.5
                  w-65
                  -translate-x-1/2
                  rounded-t-[260px]
                  border
                  border-white/4
                "
              />

              {/* ==================================================
                  HORIZON
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-[15%]
                  left-[7%]
                  right-[7%]
                  h-px
                  bg-linear-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[15%]
                  left-1/2
                  h-24
                  w-[70%]
                  -translate-x-1/2
                  rounded-full
                  bg-indigo-400/4.5
                  blur-[55px]
                "
              />

              {/* ==================================================
                  CARDINAL DIRECTIONS
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-[9%]
                  left-[7%]
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-foreground-muted
                "
              >
                <span>W</span>

                <span className="hidden sm:inline">West</span>
              </div>

              <div
                className="
                  absolute
                  bottom-[9%]
                  left-1/2
                  -translate-x-1/2
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-foreground-muted
                "
              >
                N · North
              </div>

              <div
                className="
                  absolute
                  bottom-[9%]
                  right-[7%]
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-foreground-muted
                "
              >
                <span className="hidden sm:inline">East</span>

                <span>E</span>
              </div>

              {/* Zenith */}

              <div
                className="
                  absolute
                  left-1/2
                  top-[8%]
                  -translate-x-1/2
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-foreground-muted
                "
              >
                Zenith · 90°
              </div>

              {/* ==================================================
                  SKY CENTER
              ================================================== */}

              <div
                className="
                  absolute
                  left-1/2
                  bottom-[15%]
                  h-95
                  w-190
                  -translate-x-1/2
                "
              >
                {/* Observer point */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-2
                    w-2
                    -translate-x-1/2
                    rounded-full
                    bg-indigo-300
                    shadow-[0_0_20px_rgba(165,180,252,0.9)]
                  "
                />

                {/* Moon */}

                <SkyMoon altitude={altitude} azimuth={azimuth} />
              </div>

              {/* ==================================================
                  POSITION LABEL
              ================================================== */}

              <div
                className="
                  absolute
                  left-6
                  top-6
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/20
                  px-5
                  py-4
                  backdrop-blur-xl
                "
              >
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.22em]
                    text-foreground-muted
                  "
                >
                  Current position
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <Navigation size={14} className="text-indigo-300" />

                  <span className="font-display text-lg">
                    {formatDegrees(azimuth)}
                  </span>
                </div>
              </div>

              {/* Visibility */}

              <div
                className="
                  absolute
                  right-6
                  top-6
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-black/20
                  px-4
                  py-2.5
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  backdrop-blur-xl
                "
              >
                <span
                  className={`
                    h-2
                    w-2
                    rounded-full
                    ${
                      visibleNow
                        ? "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]"
                        : "bg-slate-500"
                    }
                  `}
                />

                {visibleNow ? "Above horizon" : "Below horizon"}
              </div>
            </div>

            {/* ==================================================
                SKY DATA
            ================================================== */}

            <div className="grid sm:grid-cols-3">
              <MoonSkyStat
                label="Altitude"
                value={formatDegrees(altitude)}
                description={
                  altitude > 0 ? "Above the horizon" : "Below the horizon"
                }
              />

              <MoonSkyStat
                label="Azimuth"
                value={formatDegrees(azimuth)}
                description="Measured clockwise from north"
              />

              <MoonSkyStat
                label="Observer"
                value={`${Number(latitude).toFixed(2)}°, ${Number(
                  longitude,
                ).toFixed(2)}°`}
                description="Observation coordinates"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          MOONRISE / MOONSET
      ====================================================== */}

      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Daily Motion"
            title="Moonrise & Moonset"
            description="The Moon's next rising and setting times for the selected observation."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <EventCard
              icon={Sunrise}
              label="Moonrise"
              value={formatTime(moon.moonrise)}
              date={formatDate(moon.moonrise)}
            />

            <EventCard
              icon={Sunset}
              label="Moonset"
              value={formatTime(moon.moonset)}
              date={formatDate(moon.moonset)}
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          ZODIAC
      ====================================================== */}

      {zodiac && (
        <section className="border-t border-white/6 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Celestial Coordinates"
              title="The Moon in the Zodiac"
              description="The Moon's apparent position along the tropical zodiac."
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/6
                bg-white/[0.018]
                p-8
                md:p-10
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-25
                  -top-25
                  h-72
                  w-72
                  rounded-full
                  bg-indigo-500/6
                  blur-[100px]
                "
              />

              <div
                className="
                  relative
                  flex
                  flex-col
                  gap-8
                  md:flex-row
                  md:items-end
                  md:justify-between
                "
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">
                    Current sign
                  </p>

                  <h3 className="mt-4 font-display text-5xl font-semibold">
                    {zodiac.sign}
                  </h3>

                  <p className="mt-3 text-foreground-secondary">
                    {zodiac.degree.toFixed(1)}° within the sign
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/6
                    bg-black/10
                    px-6
                    py-5
                  "
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
                    System
                  </p>

                  <p className="mt-2 font-display text-xl capitalize">
                    {zodiac.zodiac_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          TRADITIONAL MOON
      ====================================================== */}

      {traditionalMoon && (
        <section className="border-t border-white/6 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Lunar Tradition"
              title={traditionalMoon.name}
              description="A traditional lunar naming system associated with the Moon's cycle."
            />

            <div className="grid gap-5 md:grid-cols-3">
              <MoonInfoCard
                icon={Moon}
                label="Name"
                value={traditionalMoon.name}
              />

              <MoonInfoCard
                icon={CalendarDays}
                label="Naming System"
                value={traditionalMoon.naming_system}
              />

              <MoonInfoCard
                icon={Clock3}
                label="Full Moon"
                value={formatDate(traditionalMoon.applies_to_full_moon_at)}
              />
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          UPCOMING PHASES
      ====================================================== */}

      {/* UPCOMING PHASES */}

      {upcomingPhases.length > 0 && (
        <section className="border-t border-white/6 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Lunar Cycle"
              title="The Moon's next chapters"
              description="Follow the next milestones in the lunar cycle, in chronological order."
            />

            <div className="relative mt-16">
              {/* Timeline connector */}
              <div
                aria-hidden="true"
                className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-linear-to-r from-violet-500/10 via-amber-200/50 to-violet-500/10 md:block"
              />

              <div className="grid gap-8 md:grid-cols-4 md:gap-5">
                {upcomingPhases.map((phase, index) => (
                  <article key={phase.key} className="relative">
                    {/* Timeline marker */}
                    <div className="relative z-10 mb-6 flex items-center gap-4 md:justify-center">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-[#101321] text-amber-200 shadow-[0_0_25px_rgba(167,139,250,0.08)]">
                        <span className="text-sm font-medium">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <span className="text-xs uppercase tracking-[0.2em] text-violet-300 md:hidden">
                        Upcoming phase
                      </span>
                    </div>

                    {/* Phase card */}
                    <div className="group h-full rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-white/[0.045] md:min-h-52">
                      <p className="text-xs uppercase tracking-[0.18em] text-violet-300">
                        {phase.title}
                      </p>

                      <h3 className="mt-4 text-lg font-medium text-white">
                        {new Date(phase.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "Africa/Cairo",
                        })}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/50">
                        {phase.description}
                      </p>

                      <div className="mt-6 h-px w-full bg-linear-to-r from-violet-300/30 to-transparent transition-all group-hover:from-amber-200/50" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          NOTABLE FULL MOONS
      ====================================================== */}

      {moonEvents.length > 0 && (
        <section className="border-t border-white/6 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Notable Full Moons"
              title="Special moments in the lunar cycle"
              description="Explore the year's full moons, including supermoons, blue moons, and traditional lunar names."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {moonEvents.map((event) => (
                <MoonEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          ECLIPSE
      ====================================================== */}

      {eclipse && (
        <section className="border-t border-white/6 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Celestial Event"
              title="Lunar Eclipse"
              description="A check for lunar eclipse activity around the current observation."
            />

            <div
              className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                p-8
                md:p-10
                ${
                  eclipse.is_eclipse
                    ? "border-red-300/15 bg-red-400/2.5"
                    : "border-white/6 bg-white/[0.018]"
                }
              `}
            >
              <div
                className="
                  flex
                  flex-col
                  gap-7
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <div className="flex items-center gap-5">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/7
                      bg-white/3
                    "
                  >
                    <Eclipse size={25} strokeWidth={1.4} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                      Eclipse status
                    </p>

                    <h3 className="mt-2 font-display text-2xl">
                      {eclipse.is_eclipse
                        ? "Lunar eclipse"
                        : "No eclipse today"}
                    </h3>
                  </div>
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/2.5
                    px-5
                    py-2.5
                    text-xs
                    text-foreground-secondary
                  "
                >
                  {eclipse.is_blood_moon
                    ? "Total eclipse · Blood Moon"
                    : eclipse.is_eclipse
                      ? "Lunar eclipse"
                      : "No active eclipse"}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          OTHER MOONS
      ====================================================== */}

      <section className="border-t border-white/6 py-24">
        <OthersMoons />
      </section>

      {/* ======================================================
          FOOTER NOTE
      ====================================================== */}

      <section className="border-t border-white/6 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="
              flex
              flex-col
              gap-5
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <p className="font-display text-lg">Lunar Observatory</p>

              <p className="mt-2 text-sm text-foreground-muted">
                Astronomical calculations for the selected location and time.
              </p>
            </div>

            <div className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
              {response.calendar_timezone}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   MOON VISUAL
============================================================ */

function MoonVisual({
  illumination,
  isWaxing,
}: {
  illumination: number;
  isWaxing: boolean;
}) {
  const clamped = Math.max(0, Math.min(1, illumination));

  const phaseStyle = getMoonPhaseStyle(clamped, isWaxing);

  return (
    <div
      className="
        relative
        z-10
        flex
        h-125
        w-125
        items-center
        justify-center
      "
    >
      {/* Main glow */}

      <div
        className="
          pointer-events-none
          absolute
          h-75
          w-75
          rounded-full
          bg-indigo-200/9
          blur-[100px]
          animate-pulse
        "
      />

      {/* Orbit */}

      <div
        className="
          pointer-events-none
          absolute
          h-97.5
          w-97.5
          rounded-full
          border
          border-indigo-200/9
          animate-[spin_55s_linear_infinite]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          h-117.5
          w-170
          -rotate-28
          rounded-[50%]
          border
          border-violet-300/[0.07]
          animate-[spin_75s_linear_infinite_reverse]
        "
      />

      {/* Moon */}

      <div
        className="
          relative
          h-72
          w-72
          overflow-hidden
          rounded-full
          md:h-96
          md:w-96
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            -inset-10
            rounded-full
            bg-slate-200/8
            blur-[55px]
          "
        />

        {/* Surface */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            rounded-full
            bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.99),rgba(226,232,240,0.96)_32%,rgba(148,163,184,0.9)_68%,rgba(71,85,105,0.98))]
            shadow-[0_0_100px_rgba(226,232,240,0.28)]
          "
        >
          {/* Craters */}

          <div
            className="
              absolute
              left-[20%]
              top-[25%]
              h-12
              w-12
              rounded-full
              bg-slate-500/16
              blur-[2px]
            "
          />

          <div
            className="
              absolute
              right-[22%]
              top-[17%]
              h-8
              w-8
              rounded-full
              bg-slate-500/20
            "
          />

          <div
            className="
              absolute
              left-[33%]
              bottom-[25%]
              h-14
              w-14
              rounded-full
              bg-slate-600/14
            "
          />

          <div
            className="
              absolute
              right-[19%]
              bottom-[23%]
              h-9
              w-9
              rounded-full
              bg-slate-600/18
            "
          />

          <div
            className="
              absolute
              left-[48%]
              top-[46%]
              h-6
              w-6
              rounded-full
              bg-slate-500/15
            "
          />

          {/* Phase */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              transition-all
              duration-1000
            "
            style={{
              background: phaseStyle,
            }}
          />

          {/* Depth */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              bg-[radial-gradient(circle_at_35%_25%,transparent_0%,rgba(15,23,42,0.05)_55%,rgba(15,23,42,0.18)_100%)]
            "
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MOON PHASE STYLE
============================================================ */

function getMoonPhaseStyle(illumination: number, isWaxing: boolean): string {
  if (illumination <= 0.02) {
    return `
      radial-gradient(
        circle at 50% 50%,
        rgba(2, 6, 23, 0.98) 0%,
        rgba(2, 6, 23, 1) 100%
      )
    `;
  }

  if (illumination >= 0.98) {
    return "transparent";
  }

  /*
   * Waxing:
   * illuminated portion grows from the right.
   *
   * Waning:
   * illuminated portion grows from the left.
   */

  const percentage = illumination * 100;

  if (isWaxing) {
    return `
      linear-gradient(
        90deg,
        rgba(2,6,23,1) 0%,
        rgba(2,6,23,1) ${100 - percentage}%,
        rgba(2,6,23,0) ${100 - percentage}%,
        rgba(2,6,23,0) 100%
      )
    `;
  }

  return `
    linear-gradient(
      90deg,
      rgba(2,6,23,0) 0%,
      rgba(2,6,23,0) ${percentage}%,
      rgba(2,6,23,1) ${percentage}%,
      rgba(2,6,23,1) 100%
    )
  `;
}

/* ============================================================
   SKY MOON
============================================================ */

function SkyMoon({ altitude, azimuth }: { altitude: number; azimuth: number }) {
  /*
   * Convert azimuth into a visual horizontal position.
   *
   * 0°   = North
   * 90°  = East
   * 180° = South
   * 270° = West
   */

  const normalizedAzimuth = ((azimuth % 360) + 360) % 360;

  const horizontalPosition = (normalizedAzimuth / 360) * 100;

  /*
   * Altitude:
   *
   * 0°  = horizon
   * 90° = zenith
   */

  const safeAltitude = Math.max(-10, Math.min(90, altitude));

  const verticalPosition = 100 - ((safeAltitude + 10) / 100) * 100;

  return (
    <div
      className="
        absolute
        h-20
        w-20
        -translate-x-1/2
        -translate-y-1/2
        transition-all
        duration-1000
      "
      style={{
        left: `${horizontalPosition}%`,
        top: `${verticalPosition}%`,
      }}
    >
      {/* Moon glow */}

      <div
        className="
          absolute
          -inset-7
          rounded-full
          bg-indigo-200/10
          blur-[25px]
        "
      />

      {/* Position beam */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-32
          w-px
          -translate-x-1/2
          -translate-y-full
          bg-linear-to-t
          from-indigo-300/20
          to-transparent
        "
      />

      {/* Moon */}

      <div
        className="
          relative
          h-20
          w-20
          overflow-hidden
          rounded-full
          bg-[radial-gradient(circle_at_32%_28%,#ffffff,#e2e8f0_45%,#94a3b8_100%)]
          shadow-[0_0_45px_rgba(226,232,240,0.4)]
        "
      >
        {/* Craters */}

        <span
          className="
            absolute
            left-[22%]
            top-[25%]
            h-3
            w-3
            rounded-full
            bg-slate-500/20
          "
        />

        <span
          className="
            absolute
            right-[20%]
            top-[22%]
            h-2
            w-2
            rounded-full
            bg-slate-500/20
          "
        />

        <span
          className="
            absolute
            left-[38%]
            bottom-[24%]
            h-4
            w-4
            rounded-full
            bg-slate-500/15
          "
        />
      </div>

      {/* Coordinates */}

      <div
        className="
          absolute
          left-1/2
          top-full
          mt-4
          -translate-x-1/2
          whitespace-nowrap
          rounded-full
          border
          border-white/[0.07]
          bg-black/30
          px-3
          py-1.5
          text-[9px]
          uppercase
          tracking-[0.15em]
          text-indigo-100/70
          backdrop-blur-xl
        "
      >
        {formatDegrees(altitude)}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <p
        className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-indigo-300
        "
      >
        {eyebrow}
      </p>

      <h2
        className="
          mt-4
          font-display
          text-3xl
          font-semibold
          tracking-tight
          md:text-5xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-5
          max-w-2xl
          leading-8
          text-foreground-secondary
        "
      >
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   STAT
============================================================ */

function MoonStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        border-b
        border-white/6
        bg-background/50
        p-7
        transition-all
        duration-300
        hover:bg-indigo-400/[0.035]
        lg:border-b-0
        lg:border-r
        lg:last:border-r-0
      "
    >
      <div className="flex items-center justify-between">
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-foreground-muted
          "
        >
          {label}
        </p>

        <Icon
          size={17}
          strokeWidth={1.4}
          className="shrink-0 text-indigo-300/70"
          aria-hidden="true"
        />
      </div>

      <p
        className="
          mt-5
          wrap-break-words
          font-display
          text-2xl
          font-medium
          md:text-3xl
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   SKY STAT
============================================================ */

function MoonSkyStat({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div
      className="
        border-b
        border-white/6
        p-7
        transition-all
        duration-300
        hover:bg-indigo-400/25
        last:border-b-0
        sm:border-b-0
        sm:border-r
        sm:last:border-r-0
      "
    >
      <p
        className="
          text-[10px]
          uppercase
          tracking-[0.22em]
          text-foreground-muted
        "
      >
        {label}
      </p>

      <p
        className="
          mt-4
          font-display
          text-3xl
          font-medium
        "
      >
        {value}
      </p>

      <p className="mt-2 text-sm text-foreground-secondary">{description}</p>
    </div>
  );
}

/* ============================================================
   INFO CARD
============================================================ */

function MoonInfoCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-white/6
        bg-white/[0.018]
        p-7
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-300/18
        hover:bg-indigo-400/[0.025]
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/6
            bg-white/[0.025]
          "
        >
          <Icon
            size={18}
            strokeWidth={1.4}
            className="text-indigo-300"
            aria-hidden="true"
          />
        </div>

        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Lunar data
        </span>
      </div>

      <p
        className="
          mt-8
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-foreground-muted
        "
      >
        {label}
      </p>

      <p
        className="
          mt-3
          wrap-break-words
          font-display
          text-2xl
          font-medium
        "
      >
        {value}
      </p>

      {description && (
        <p className="mt-3 text-sm text-foreground-secondary">{description}</p>
      )}
    </div>
  );
}

/* ============================================================
   EVENT CARD
============================================================ */

function EventCard({
  icon: Icon,
  label,
  value,
  date,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  date: string;
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/6
        bg-white/[0.018]
        p-8
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-300/18
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-15
          -top-15
          h-40
          w-40
          rounded-full
          bg-indigo-500/5
          blur-[60px]
        "
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
            "
          >
            <Icon size={19} strokeWidth={1.4} className="text-indigo-300" />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
            {label}
          </p>
        </div>

        <p className="mt-8 font-display text-4xl font-medium">{value}</p>

        <p className="mt-3 text-sm text-foreground-secondary">{date}</p>
      </div>
    </div>
  );
}

/* ============================================================
   BADGE
============================================================ */

function MoonBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        rounded-full
        border
        border-white/[0.08]
        bg-white/[0.03]
        px-4
        py-2
        text-xs
        text-foreground-secondary
        backdrop-blur-xl
      "
    >
      {children}
    </span>
  );
}

/* ============================================================
   PHASE CARD
============================================================ */

/* ============================================================
   MOON EVENT CARD
============================================================ */

function MoonEventCard({ event }: { event: MoonEvent }) {
  const isSupermoon = event.type === "supermoon";

  const isBlueMoon = event.type === "blue_moon";

  const eventLabel = isSupermoon
    ? "Supermoon"
    : isBlueMoon
      ? "Blue Moon"
      : "Full Moon";

  const eventDescription = isSupermoon
    ? "A full moon occurring relatively close to Earth."
    : isBlueMoon
      ? "The second full moon occurring within the same calendar month."
      : "A full moon in the lunar cycle.";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/6
        bg-white/[0.018]
        p-7
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-300/18
        hover:bg-indigo-400/25
      "
    >
      {/* Ambient glow */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          blur-[70px]
          ${
            isSupermoon
              ? "bg-indigo-400/10"
              : isBlueMoon
                ? "bg-violet-400/10"
                : "bg-white/5"
          }
        `}
      />

      <div className="relative">
        {/* Header */}

        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/6
              bg-white/2.5
            "
          >
            <Moon size={19} strokeWidth={1.4} className="text-indigo-300" />
          </div>

          <span
            className={`
              rounded-full
              border
              px-3
              py-1.5
              text-[9px]
              uppercase
              tracking-[0.16em]
              ${
                isSupermoon
                  ? "border-indigo-300/15 bg-indigo-300/5 text-indigo-200"
                  : isBlueMoon
                    ? "border-violet-300/15 bg-violet-300/5 text-violet-200"
                    : "border-white/7 bg-white/2.5 text-foreground-muted"
              }
            `}
          >
            {eventLabel}
          </span>
        </div>

        {/* Main title */}

        <div className="mt-8">
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-foreground-muted
            "
          >
            {event.traditional_moon ? "Traditional name" : "Lunar event"}
          </p>

          <h3
            className="
              mt-3
              font-display
              text-2xl
              font-medium
            "
          >
            {event.traditional_moon?.name ?? eventLabel}
          </h3>

          <p className="mt-3 text-sm leading-6 text-foreground-secondary">
            {eventDescription}
          </p>
        </div>

        {/* Data */}

        <div
          className="
            mt-8
            grid
            gap-4
            border-t
            border-white/6
            pt-6
            sm:grid-cols-2
          "
        >
          <div>
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-foreground-muted
              "
            >
              Full Moon
            </p>

            <p className="mt-2 text-sm text-foreground-secondary">
              {formatDate(event.date)}
            </p>
          </div>

          <div>
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-foreground-muted
              "
            >
              Distance
            </p>

            <p className="mt-2 text-sm text-foreground-secondary">
              {formatNumber(event.distance_km)} km
            </p>
          </div>
        </div>

        {/* Naming system */}

        {event.traditional_moon && (
          <div className="mt-5">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/6
                bg-white/2.5
                px-3
                py-1.5
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-foreground-muted
              "
            >
              <Sparkles size={11} className="text-indigo-300" />

              {event.traditional_moon.naming_system}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
