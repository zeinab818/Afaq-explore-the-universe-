
"use client";

import { useCallback, useEffect, useState } from "react";
import type { ISSData } from "@/types/issI";
import {
  Activity,
  ArrowUpRight,
  Globe2,
  MapPin,
  Orbit,
  Radio,
  RefreshCw,
  Satellite,
  Sun,
  Waves,
  Zap,
} from "lucide-react";
import Link from "next/link";
export default function ISSTracker() {
  const [data, setData] = useState<ISSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchISS = useCallback(async () => {
    try {
      setRefreshing(true);
      setError("");

      const response = await fetch("/api/iss", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to retrieve ISS telemetry.");
      }

      const result: ISSData = await response.json();

      setData(result);
      setLastUpdated(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    } catch (err) {
      console.error("ISS tracking error:", err);

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
    fetchISS();

    const intervalId = window.setInterval(fetchISS, 5000);

    return () => window.clearInterval(intervalId);
  }, [fetchISS]);

  if (loading) {
    return (
      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-[#0d111c]">
            <div className="relative flex size-16 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-violet-400/10" />
              <Satellite className="relative size-8 animate-pulse text-[#e7c98b]" />
            </div>

            <p className="mt-6 text-sm font-medium text-white/80">
              Establishing orbital connection
            </p>

            <p className="mt-2 text-xs text-white/35">
              Receiving ISS telemetry...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0d111c] p-10 text-center">
            <Satellite className="mx-auto size-9 text-white/30" />

            <h3 className="mt-5 text-lg font-medium text-white">
              Orbital connection unavailable
            </h3>

            <p className="mt-2 text-sm text-white/40">
              {error || "ISS tracking data is unavailable."}
            </p>

            <button
              onClick={fetchISS}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#e7c98b]/20 px-5 py-3 text-sm text-[#e7c98b] transition-colors hover:bg-[#e7c98b]/[0.06]"
            >
              <RefreshCw className="size-4" />
              Reconnect
            </button>
          </div>
        </div>
      </section>
    );
  }

  const latitude = Number(data.latitude);
  const longitude = Number(data.longitude);
  const altitude = Number(data.altitude);
  const velocity = Number(data.velocity);
  const footprint = Number(data.footprint);
  const solarLat = Number(data.solar_lat);
  const solarLon = Number(data.solar_lon);

  const formatCoordinate = (value: number) =>
    Number.isFinite(value) ? value.toFixed(2) : "—";

  const formatNumber = (value: number) =>
    Number.isFinite(value)
      ? value.toLocaleString("en-US", {
          maximumFractionDigits: 0,
        })
      : "—";

  const isVisible = data.visibility?.toLowerCase() === "daylight"
    ? "Daylight"
    : data.visibility;

  const visibilityIsDaylight =
    String(data.visibility).toLowerCase() === "daylight";

  const telemetry = [
    {
      label: "Altitude",
      value: formatNumber(altitude),
      unit: "km",
      icon: Orbit,
      description: "Height above Earth's surface",
    },
    {
      label: "Orbital Velocity",
      value: formatNumber(velocity),
      unit: "km/h",
      icon: Zap,
      description: "Current orbital speed",
    },
    {
      label: "Ground Footprint",
      value: formatNumber(footprint),
      unit: "km",
      icon: Globe2,
      description: "Surface coverage diameter",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.06] py-24">
      {/* Background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-40 top-0 size-[500px] rounded-full bg-violet-500/[0.07] blur-[140px]" />

        <div className="absolute -left-40 bottom-0 size-[450px] rounded-full bg-[#e7c98b]/[0.045] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(231,201,139,0.8) 0.7px, transparent 1px)",
            backgroundSize: "78px 78px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}

        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/[0.07] text-violet-200">
                <Satellite className="size-5" />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e7c98b]">
                  Live Space Tracking
                </p>

                <p className="mt-1 text-xs text-white/35">
                  International Space Station · ISS-25544
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Humanity&apos;s
              <span className="block bg-gradient-to-r from-[#f0dcae] via-[#e7c98b] to-violet-300 bg-clip-text text-transparent">
                home in orbit.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
              Track the International Space Station as it
              travels around our planet, carrying astronauts
              and scientific experiments through low Earth orbit.
            </p>
          </div>

          {/* Connection status */}

          <div className="flex items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/[0.04] px-4 py-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300/60" />
              <span className="relative size-2 rounded-full bg-emerald-300" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-200/80">
              Telemetry received
            </span>
          </div>
        </div>

        {/* Main dashboard */}

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Position panel */}

          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0d111c]/85 p-7 backdrop-blur-xl sm:p-9">
            <div className="absolute -right-24 -top-24 size-80 rounded-full border border-violet-300/[0.07]" />
            <div className="absolute -right-12 -top-12 size-56 rounded-full border border-[#e7c98b]/[0.08]" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
                  <MapPin className="size-4 text-[#e7c98b]" />
                  Current Position
                </div>

                <Globe2 className="size-5 text-violet-300/60" />
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Latitude
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {formatCoordinate(latitude)}
                    <span className="ml-1 text-xl text-[#e7c98b]">°</span>
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Longitude
                  </p>

                  <p className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {formatCoordinate(longitude)}
                    <span className="ml-1 text-xl text-[#e7c98b]">°</span>
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Radio className="size-4 text-violet-300/70" />
                  Orbital coordinates
                </div>

                <Link
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#e7c98b] transition-colors hover:text-white"
                >
                  View coordinates
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Visibility panel */}

          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0d111c]/85 p-7 backdrop-blur-xl">
            <div className="absolute -bottom-20 -right-16 size-56 rounded-full bg-violet-500/[0.09] blur-[75px]" />

            <div className="relative">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
                <Sun className="size-4 text-[#e7c98b]" />
                Orbital Visibility
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className={`flex size-14 items-center justify-center rounded-2xl border ${
                  visibilityIsDaylight
                    ? "border-[#e7c98b]/20 bg-[#e7c98b]/[0.07] text-[#e7c98b]"
                    : "border-violet-300/20 bg-violet-400/[0.07] text-violet-200"
                }`}>
                  <Sun className="size-7" />
                </div>

                <div>
                  <p className="text-2xl font-semibold capitalize text-white">
                    {isVisible}
                  </p>

                  <p className="mt-1 text-xs text-white/35">
                    Current visibility status
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-10 border-t border-white/[0.07] pt-5">
              <p className="text-xs leading-6 text-white/40">
                The station continuously moves between sunlight
                and Earth's shadow as it orbits our planet.
              </p>
            </div>
          </div>
        </div>

        {/* Telemetry */}

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {telemetry.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-3xl border border-white/[0.08] bg-[#0d111c]/75 p-6 transition-all duration-300 hover:border-violet-300/20 hover:bg-white/[0.025]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                    {item.label}
                  </p>

                  <Icon className="size-5 text-violet-300/70 transition-colors group-hover:text-[#e7c98b]" />
                </div>

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {item.value}
                  </span>

                  <span className="mb-1 text-sm text-white/35">
                    {item.unit}
                  </span>
                </div>

                <p className="mt-3 text-xs text-white/35">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Solar coordinates */}

        <div className="mt-5 rounded-3xl border border-white/[0.08] bg-[#0d111c]/65 p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/40">
                <Sun className="size-4 text-[#e7c98b]" />
                Solar Position
              </div>

              <p className="mt-2 text-xs text-white/35">
                Solar coordinates associated with the ISS location.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Latitude
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  {formatCoordinate(solarLat)}°
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Longitude
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  {formatCoordinate(solarLon)}°
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
          <div className="flex items-center gap-2 text-xs text-white/35">
            <Activity className="size-3.5 text-violet-300/70" />
            ISS NORAD ID · 25544
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/30">
            <span>
              Last fetched: {lastUpdated}
            </span>

            <button
              type="button"
              onClick={fetchISS}
              disabled={refreshing}
              className="inline-flex items-center gap-2 text-[#e7c98b]/75 transition-colors hover:text-[#e7c98b] disabled:opacity-50"
            >
              <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
