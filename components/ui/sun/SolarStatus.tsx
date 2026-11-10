
"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Sunrise,
  Sunset,
  Sun,
  Moon,
  Clock3,
} from "lucide-react";

import type { SolarTimes } from "@/types/sunI";

interface SolarStatusProps {
  solarTimes: SolarTimes;
  timezone: string;
}

type SolarPhase =
  | "night"
  | "dawn"
  | "day"
  | "golden-hour"
  | "dusk";

interface SolarEvent {
  name: string;
  time: number;
  icon: ReactNode;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const GOLDEN_HOUR_MS = 60 * 60 * 1000;

function toTimestamp(value?: string | null): number | null {
  if (!value) return null;

  const timestamp = new Date(value).getTime();

  return Number.isFinite(timestamp) ? timestamp : null;
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

function formatTime(timestamp: number, timezone: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(timestamp));
  } catch {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(timestamp));
  }
}

function getPhase(
  now: number,
  solarTimes: SolarStatusProps["solarTimes"]
): SolarPhase {
  const sunrise = toTimestamp(solarTimes.sunrise);
  const sunset = toTimestamp(solarTimes.sunset);
  const dawn = toTimestamp(solarTimes.dawn);
  const dusk = toTimestamp(solarTimes.dusk);

  if (sunrise === null || sunset === null) {
    return "night";
  }

  if (dawn !== null && now >= dawn && now < sunrise) {
    return "dawn";
  }

  if (now < sunrise) {
    return "night";
  }

  if (now >= sunrise && now < sunrise + GOLDEN_HOUR_MS) {
    return "golden-hour";
  }

  if (now < sunset - GOLDEN_HOUR_MS) {
    return "day";
  }

  if (now < sunset) {
    return "golden-hour";
  }

  if (dusk !== null && now < dusk) {
    return "dusk";
  }

  return "night";
}

const phaseDetails: Record<
  SolarPhase,
  { label: string; description: string; icon: ReactNode }
> = {
  night: {
    label: "Night",
    description: "The Sun is below the horizon.",
    icon: <Moon className="size-5" />,
  },
  dawn: {
    label: "Dawn",
    description: "Sunrise is approaching.",
    icon: <Sunrise className="size-5" />,
  },
  day: {
    label: "Daylight",
    description: "The Sun is above the horizon.",
    icon: <Sun className="size-5" />,
  },
  "golden-hour": {
    label: "Golden Hour",
    description: "Soft sunlight near the horizon.",
    icon: <Sun className="size-5" />,
  },
  dusk: {
    label: "Dusk",
    description: "Daylight is fading.",
    icon: <Sunset className="size-5" />,
  },
};

export default function SolarStatus({
  solarTimes,
  timezone,
}: SolarStatusProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(Date.now());

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const sunrise = toTimestamp(solarTimes.sunrise);
  const sunset = toTimestamp(solarTimes.sunset);
  const solarNoon = toTimestamp(solarTimes.solarNoon);

  const phase =
    now !== null ? getPhase(now, solarTimes) : "night";

  const phaseData = phaseDetails[phase];

  const events = useMemo<SolarEvent[]>(() => {
    const items: SolarEvent[] = [];

    const sunriseTime = toTimestamp(solarTimes.sunrise);
    const noonTime = toTimestamp(solarTimes.solarNoon);
    const sunsetTime = toTimestamp(solarTimes.sunset);

    if (sunriseTime !== null) {
      items.push({
        name: "Sunrise",
        time: sunriseTime,
        icon: <Sunrise className="size-4" />,
      });
    }

    if (noonTime !== null) {
      items.push({
        name: "Solar Noon",
        time: noonTime,
        icon: <Sun className="size-4" />,
      });
    }

    if (sunsetTime !== null) {
      items.push({
        name: "Sunset",
        time: sunsetTime,
        icon: <Sunset className="size-4" />,
      });
    }

    return items.sort((a, b) => a.time - b.time);
  }, [solarTimes]);

  const nextEvent = useMemo(() => {
    if (now === null || events.length === 0) return null;

    const upcoming = events.find((event) => event.time > now);

    if (upcoming) return upcoming;

    // The available events belong to the requested solar date.
    // If today's events have passed, estimate the next occurrence
    // using the same event's time on the following day.
    const firstEvent = events[0];

    return {
      ...firstEvent,
      time: firstEvent.time + DAY_MS,
    };
  }, [events, now]);

  const progress = useMemo(() => {
    if (now === null || sunrise === null || sunset === null) {
      return 0;
    }

    if (sunset <= sunrise) return 0;

    return Math.min(
      100,
      Math.max(0, ((now - sunrise) / (sunset - sunrise)) * 100)
    );
  }, [now, sunrise, sunset]);

  return (
    <section className="mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-6">
        {/* Current state */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/40">
              Solar Status
            </p>

            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {phaseData.icon}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  {now === null ? "Calculating..." : phaseData.label}
                </h3>

                <p className="mt-1 text-sm text-white/50">
                  {now === null
                    ? "Preparing solar information."
                    : phaseData.description}
                </p>
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-wider text-white/30">
              Local Time
            </p>

            <p className="mt-1 font-mono text-lg tabular-nums text-white">
              {now === null ? "--:-- --" : formatTime(now, timezone)}
            </p>

            <p className="mt-1 text-xs text-white/30">
              {timezone}
            </p>
          </div>
        </div>

        {/* Next event */}
        <div className="rounded-2xl border border-white/8 bg-black/20 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-white/40">
            <Clock3 className="size-4" />

            <span className="text-xs uppercase tracking-[0.2em]">
              Next Solar Event
            </span>
          </div>

          {nextEvent && now !== null ? (
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary">
                  {nextEvent.icon}
                  <span className="text-xs text-white/40">
                    Upcoming
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {nextEvent.name}
                </p>

                <p className="mt-1 text-sm text-white/40">
                  {formatTime(nextEvent.time, timezone)}
                </p>
              </div>

              <div className="font-mono text-2xl tracking-tight text-primary tabular-nums sm:text-right">
                {formatCountdown(nextEvent.time - now)}
                <p className="mt-1 text-xs font-normal tracking-normal text-white/30">
                  HH : MM : SS
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/50">
              Solar event times are unavailable for this date.
            </p>
          )}
        </div>

        {/* Timeline */}
        <div>
          <div className="mb-4 flex items-center justify-between gap-3 text-xs text-white/40">
            <span>
              Sunrise
              <span className="mt-1 block font-mono text-white/70">
                {sunrise !== null
                  ? formatTime(sunrise, timezone)
                  : "--:--"}
              </span>
            </span>

            {solarNoon !== null && (
              <span className="text-center">
                Solar Noon
                <span className="mt-1 block font-mono text-white/70">
                  {formatTime(solarNoon, timezone)}
                </span>
              </span>
            )}

            <span className="text-right">
              Sunset
              <span className="mt-1 block font-mono text-white/70">
                {sunset !== null
                  ? formatTime(sunset, timezone)
                  : "--:--"}
              </span>
            </span>
          </div>

          <div
            className="relative h-1.5 rounded-full bg-white/10"
            role="progressbar"
            aria-label="Daylight progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary/60 transition-[width] duration-1000"
              style={{ width: `${progress}%` }}
            />

            <div className="absolute left-0 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white" />

            {solarNoon !== null &&
              sunrise !== null &&
              sunset !== null &&
              sunset > sunrise && (
                <div
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-[#0d111c]"
                  style={{
                    left: `${
                      ((solarNoon - sunrise) / (sunset - sunrise)) * 100
                    }%`,
                  }}
                />
              )}

            <div className="absolute right-0 top-1/2 size-3 translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white" />
          </div>

          <p className="mt-3 text-right text-xs text-white/30">
            {sunrise !== null &&
            sunset !== null &&
            now !== null &&
            now >= sunrise &&
            now <= sunset
              ? `${Math.round(progress)}% of daylight elapsed`
              : now !== null && sunrise !== null && now < sunrise
                ? "Before sunrise"
                : "After sunset"}
          </p>
        </div>
      </div>
    </section>
  );
}
