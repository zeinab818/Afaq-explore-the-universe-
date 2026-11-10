
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  CalendarDays,
  Clock3,
  Radio,
  RefreshCw,
  Satellite,
  Sun,
  Waves,
} from "lucide-react";

import type {
  SpaceWeatherData,
  SpaceWeatherDay,
  SpaceWeatherScale,
} from "@/types/spaceWeatherI";

const REFRESH_INTERVAL = 5 * 60 * 1000;

type MetricConfig = {
  id: "R" | "S" | "G";
  title: string;
  subtitle: string;
  icon: typeof Radio;
  accent: string;
  description: string;
};

const metrics: MetricConfig[] = [
  {
    id: "R",
    title: "Radio Blackout",
    subtitle: "Radio Communications",
    icon: Radio,
    accent: "#e7c98b",
    description:
      "Disruptions to high-frequency radio communications.",
  },
  {
    id: "S",
    title: "Solar Radiation",
    subtitle: "Energetic Particles",
    icon: Sun,
    accent: "#a78bfa",
    description:
      "Solar energetic particles that can affect spacecraft and astronauts.",
  },
  {
    id: "G",
    title: "Geomagnetic Storm",
    subtitle: "Earth's Magnetic Field",
    icon: Activity,
    accent: "#fb7185",
    description:
      "Disturbances in Earth's magnetic field caused by solar activity.",
  },
];

function getActivityLevel(scale: string | null) {
  if (scale === null || scale.trim() === "") return null;

  const match = scale.match(/\d+/);

  return match ? Number(match[0]) : null;
}

function getLevelLabel(level: number | null) {
  if (level === null) return "Unavailable";
  if (level === 0) return "No storm detected";
  if (level <= 2) return "Minor activity";
  if (level === 3) return "Strong activity";
  return "Severe activity";
}

function getLevelWidth(level: number | null) {
  if (level === null) return "0%";

  return `${Math.min(100, Math.max(0, (level / 5) * 100))}%`;
}

function getProbability(value: string | null) {
  if (value === null || value.trim() === "") return null;

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) return timestamp;

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function ActivityCard({
  metric,
  value,
}: {
  metric: MetricConfig;
  value: SpaceWeatherScale;
}) {
  const Icon = metric.icon;
  const level = getActivityLevel(value.Scale);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/8 bg-[#101522]/80 p-7 transition duration-300 hover:-translate-y-1 hover:border-white/15">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full opacity-[0.07] blur-3xl transition group-hover:opacity-[0.15]"
        style={{ backgroundColor: metric.accent }}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className="flex size-12 items-center justify-center rounded-2xl border"
            style={{
              color: metric.accent,
              borderColor: `${metric.accent}30`,
              backgroundColor: `${metric.accent}0D`,
            }}
          >
            <Icon size={21} />
          </div>

          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white/35">
            {metric.id} Scale
          </span>
          
        </div>

        <p className="mt-7 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
          {metric.subtitle}
        </p>

        <h3 className="mt-2 text-lg font-medium text-white">
          {metric.title}
        </h3>

        <p className="mt-2 min-h-10 text-xs leading-5 text-white/35">
          {metric.description}
        </p>

        <div className="mt-7 flex items-end gap-3">
          <span
            className="text-5xl font-semibold tracking-tight"
            style={{ color: metric.accent }}
          >
            {level === null ? "—" : `${metric.id}${level}`}
          </span>

          <span className="mb-2 text-xs text-white/40">
            {getLevelLabel(level)}
          </span>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-[10px] text-white/30">
            <span>Activity level</span>
            <span>{level === null ? "—" : `${level} / 5`}</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: getLevelWidth(level),
                backgroundColor: metric.accent,
              }}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-white/[0.07] pt-5">
          <p className="text-xs leading-6 text-white/50">
            {value.Text || "No additional information available."}
          </p>
        </div>
      </div>
    </article>
  );
}

function ProbabilityBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number | null;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs">
        <span className="text-white/45">{label}</span>

        <span className="text-white/75">
          {value === null ? "—" : `${value}%`}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width:
              value === null
                ? "0%"
                : `${Math.min(100, Math.max(0, value))}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Description */}
      <p className="mt-2 text-[10px] text-white/30">
        Probability reported by NOAA
      </p>
    </div>
  );
}
function ForecastCard({
  day,
  index,
}: {
  day: SpaceWeatherDay;
  index: number;
}) {
  const radioMinor = getProbability(day.R.MinorProb);
  const radioMajor = getProbability(day.R.MajorProb);
  const solarProbability = getProbability(day.S.Prob);

  const geomagneticLevel = getActivityLevel(day.G.Scale);

  return (
    <article className="rounded-3xl border border-white/8 bg-[#101522]/80 p-6 transition hover:border-[#a78bfa]/25">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#a78bfa]/10 text-[#a78bfa]">
            <CalendarDays size={18} />
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              {formatDate(day.DateStamp)}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/30">
              Forecast {index + 1}
            </p>
          </div>
        </div>

        <span className="text-[10px] text-white/30">
          NOAA
        </span>
      </div>

      <div className="mt-7 space-y-6">
        <ProbabilityBar
          label="Radio blackout · Minor"
          value={radioMinor}
          color="#e7c98b"
        />

        <ProbabilityBar
          label="Radio blackout · Major"
          value={radioMajor}
          color="#e7c98b"
        />

        <ProbabilityBar
          label="Solar radiation"
          value={solarProbability}
          color="#a78bfa"
        />
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/30">
            Geomagnetic forecast
          </p>

          <p className="mt-2 text-lg font-semibold text-[#fb7185]">
            {geomagneticLevel === null
              ? "—"
              : `G${geomagneticLevel}`}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-white/30">
            {getLevelLabel(geomagneticLevel)}
          </p>

          <p className="mt-2 text-xs text-white/45">
            {day.G.Text || "No description"}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function SpaceWeather() {
  const [data, setData] = useState<SpaceWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchSpaceWeather = useCallback(async () => {
    try {
      setError("");

      const response = await fetch("/api/space-weather", {
        cache: "no-store",
      });



      if (!response.ok) {
        throw new Error("Unable to retrieve space weather data.");
      }

      const result: SpaceWeatherData = await response.json();

      if (!result?.["0"]) {
        throw new Error("Current space weather data is unavailable.");
      }

      setData(result);
    } catch (err) {
      console.error("Space weather error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const initialFetchTimer = window.setTimeout(() => {
      void fetchSpaceWeather();
    }, 0);

    const interval = window.setInterval(() => {
      setRefreshing(true);
      void fetchSpaceWeather();
    }, REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(initialFetchTimer);
      window.clearInterval(interval);
    };
  }, [fetchSpaceWeather]);

  const handleRefresh = () => {
    if (refreshing) return;

    setRefreshing(true);
    void fetchSpaceWeather();
  };

  const current = data?.["0"];

  const forecast = ["1", "2", "3"]
    .map((key) => data?.[key])
    .filter((day): day is SpaceWeatherDay => Boolean(day));

  if (loading) {
    return (
      <section className="border-t border-white/6 py-24">
        <div className="mx-auto flex min-h-72 max-w-7xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-[#e7c98b]/20 bg-[#e7c98b]/5">
              <RefreshCw className="size-6 animate-spin text-[#e7c98b]" />
            </div>

            <p className="text-sm text-white/50">
              Receiving space weather data...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!data || !current) {
    return (
      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-[#fb7185]/20 bg-[#fb7185]/5 p-8 text-center">
            <AlertCircle className="mx-auto mb-4 size-8 text-[#fb7185]" />

            <p className="text-sm text-white/70">
              {error || "Space weather data is unavailable."}
            </p>

            <button
              onClick={handleRefresh}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-xs text-[#e7c98b] transition hover:bg-white/5"
            >
              <RefreshCw size={14} />
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-t border-white/6 py-24">
      {/* Background */}
      <div className="pointer-events-none absolute -right-40 top-20 size-96 rounded-full bg-[#a78bfa]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-96 rounded-full bg-[#e7c98b]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#e7c98b]" />

              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#e7c98b]">
                Space Weather Observatory
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              The Sun&apos;s influence
              <span className="block text-white/35">
                on Earth.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 md:text-base">
              Monitor solar activity and its effects on
              Earth&apos;s magnetic environment, radio
              communications, and space radiation.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}

            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/3 px-5 py-3 text-xs text-white/65 transition hover:border-[#e7c98b]/40 hover:text-[#e7c98b] disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh data
          </button>
        </div>

        {/* Status */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/2 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="size-2.5 rounded-full bg-[#e7c98b]" />

            <span className="text-xs text-white/60">
              Current space weather conditions
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/35">
            <Clock3 size={13} />

            <span>
              {current.TimeStamp
                ? `${current.TimeStamp} UTC`
                : "Timestamp unavailable"}
            </span>
          </div>
        </div>

        {error && (
          <p className="mb-5 text-xs text-[#fb7185]/80">
            Refresh failed. Displaying the last available data.
          </p>
        )}

        {/* Current conditions */}
        <div className="grid gap-5 md:grid-cols-3">
          {metrics.map((metric) => (
            <ActivityCard
              key={metric.id}
              metric={metric}
              value={current[metric.id]}
            />
          ))}
        </div>

        {/* Forecast */}
        <div className="mt-24">
          <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 bg-[#a78bfa]" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-[#a78bfa]">
                  Solar Activity Outlook
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white md:text-3xl">
                What&apos;s coming next?
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                NOAA&apos;s forecast for radio blackouts,
                solar radiation, and geomagnetic activity.
              </p>
            </div>

            <span className="text-xs text-white/30">
              3-day outlook
            </span>
          </div>

          {forecast.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {forecast.map((day, index) => (
                <ForecastCard
                  key={day.DateStamp || index}
                  day={day}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/8 bg-white/2 p-8 text-center">
              <CalendarDays className="mx-auto mb-3 size-7 text-white/30" />

              <p className="text-sm text-white/45">
                Forecast data is currently unavailable.
              </p>
            </div>
          )}
        </div>

        {/* Explanation */}
        <div className="mt-12 grid gap-5 rounded-3xl border border-white/[0.07] bg-white/2 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <div className="flex items-center gap-2 text-[#e7c98b]">
              <Waves size={16} />

              <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                Understanding the scales
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/45">
              NOAA uses three independent scales: R measures
              radio blackouts, S measures solar radiation
              storms, and G measures geomagnetic storms.
              Each scale ranges from 1 to 5 for storm levels.
              Higher values indicate stronger events.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/35">
            <Satellite size={17} className="text-[#a78bfa]" />
            <span>Source: NOAA SWPC</span>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-wider text-white/20">
          DATA PROVIDED BY NOAA SPACE WEATHER PREDICTION CENTER
        </p>
      </div>
    </section>
  );
}
