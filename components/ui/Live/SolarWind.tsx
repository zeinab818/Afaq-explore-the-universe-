
"use client";

import { useEffect, useState } from "react";
import type { SolarWindData } from "@/types/solarWindI";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Compass,
  Radio,
  RefreshCw,
  Waves,
  Zap,
} from "lucide-react";

export default function SolarWind() {
  const [data, setData] = useState<SolarWindData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchSolarWind = async () => {
    try {
      setError("");

      const response = await fetch("/api/solar-wind", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to retrieve solar wind measurements.");
      }

      const result: SolarWindData = await response.json();

      if (!result.speed?.length || !result.magneticField?.length) {
        throw new Error("Solar wind measurements are currently unavailable.");
      }

      setData(result);
      setLastUpdated(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }));
    } catch (err) {
      console.error("Solar wind error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolarWind();

    const intervalId = window.setInterval(fetchSolarWind, 5 * 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const speed = data?.speed?.[0];
  const magneticField = data?.magneticField?.[0];

  const bz = Number(magneticField?.bz_gsm);
  const isBzNegative = Number.isFinite(bz) && bz < 0;

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    const number = Number(value);

    return Number.isFinite(number)
      ? number.toLocaleString("en-US", {
          maximumFractionDigits: 1,
        })
      : "—";
  };

  if (loading) {
    return (
      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex min-h-72 flex-col items-center justify-center gap-5 rounded-3xl border border-white/[0.07] bg-[#0d111c]/60">
            <div className="relative flex size-14 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-violet-400/10" />
              <Activity className="relative size-7 animate-pulse text-[#e7c98b]" />
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-white/80">
                Connecting to solar wind data
              </p>
              <p className="mt-2 text-xs text-white/35">
                Receiving measurements from NOAA SWPC...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !speed || !magneticField) {
    return (
      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0d111c] p-8 text-center">
            <Activity className="mx-auto size-8 text-white/30" />

            <h3 className="mt-4 text-lg font-medium text-white">
              Solar wind data unavailable
            </h3>

            <p className="mt-2 text-sm text-white/40">
              {error || "We couldn't retrieve the latest measurements."}
            </p>

            <button
              onClick={fetchSolarWind}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#e7c98b]/20 px-5 py-3 text-sm text-[#e7c98b] transition-colors hover:bg-[#e7c98b]/[0.06]"
            >
              <RefreshCw className="size-4" />
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.06] py-24">
      {/* Background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-40 top-0 size-[500px] rounded-full bg-orange-400/[0.06] blur-[140px]" />
        <div className="absolute -left-40 bottom-0 size-[400px] rounded-full bg-violet-500/[0.06] blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(231,201,139,0.8) 0.7px, transparent 1px)",
            backgroundSize: "75px 75px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}

        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-orange-300/20 bg-orange-400/[0.07] text-orange-200">
                <Waves className="size-5" />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e7c98b]">
                  Space Weather Observatory
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Solar wind monitoring
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              The Sun,
              <span className="block bg-gradient-to-r from-[#f0dcae] via-[#e7c98b] to-orange-300 bg-clip-text text-transparent">
                in motion.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
              A continuous stream of charged particles travels
              from the Sun, carrying energy and magnetic fields
              across interplanetary space.
            </p>
          </div>

          {/* Live status */}

          <div className="flex items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/[0.04] px-4 py-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300/60" />
              <span className="relative size-2 rounded-full bg-emerald-300" />
            </span>

            <span className="text-xs font-medium tracking-wide text-emerald-200/80">
              DATA RECEIVED
            </span>
          </div>
        </div>

        {/* Main dashboard */}

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Solar wind speed */}

          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0d111c]/80 p-7 backdrop-blur-xl sm:p-9">
            <div className="absolute -right-20 -top-24 size-72 rounded-full bg-orange-400/[0.07] blur-[90px]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  <Zap className="size-4 text-[#e7c98b]" />
                  Solar Wind Speed
                </div>

                <span className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/35">
                  Plasma flow
                </span>
              </div>

              <div className="mt-12 flex flex-wrap items-end gap-3">
                <span className="text-6xl font-semibold tracking-[-0.06em] text-white sm:text-8xl">
                  {formatValue(speed.proton_speed)}
                </span>

                <span className="mb-3 text-sm text-white/40">
                  km/s
                </span>
              </div>

              <p className="mt-4 max-w-sm text-xs leading-6 text-white/35">
                Speed of solar wind protons measured by
                spacecraft monitoring near-Earth space.
              </p>

              <div className="mt-10 h-px bg-gradient-to-r from-[#e7c98b]/40 via-violet-400/20 to-transparent" />

              <div className="mt-5 flex items-center gap-2 text-xs text-white/35">
                <Radio className="size-3.5 text-[#e7c98b]/70" />
                Proton speed measurement
              </div>
            </div>
          </div>

          {/* Magnetic measurements */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {/* Bt */}

            <div className="rounded-3xl border border-white/[0.09] bg-[#0d111c]/80 p-7 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/40">
                <Compass className="size-4 text-violet-300" />
                Magnetic Field
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {formatValue(magneticField.bt)}
                </span>

                <span className="mb-1 text-sm text-white/35">
                  nT
                </span>
              </div>

              <p className="mt-3 text-xs text-white/35">
                Total magnetic field strength (Bt).
              </p>
            </div>

            {/* Bz */}

            <div className="rounded-3xl border border-white/[0.09] bg-[#0d111c]/80 p-7 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/40">
                  <Activity className="size-4 text-violet-300" />
                  Bz Component
                </div>

                {Number.isFinite(bz) && (
                  <span className={`flex items-center gap-1 text-[10px] uppercase tracking-wider ${
                    isBzNegative ? "text-orange-200/80" : "text-violet-200/80"
                  }`}>
                    {isBzNegative ? (
                      <ArrowDown className="size-3" />
                    ) : (
                      <ArrowUp className="size-3" />
                    )}
                    {isBzNegative ? "Southward" : "Northward"}
                  </span>
                )}
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-white">
                  {formatValue(magneticField.bz_gsm)}
                </span>

                <span className="mb-1 text-sm text-white/35">
                  nT
                </span>
              </div>

              <p className="mt-3 text-xs text-white/35">
                North–south magnetic field component (GSM).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
          <div className="flex items-center gap-2 text-xs text-white/35">
            <span className="size-1.5 rounded-full bg-emerald-300/70" />
            NOAA Space Weather Prediction Center
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/30">
            <span>
              Last fetched: {lastUpdated}
            </span>

            <button
              onClick={fetchSolarWind}
              className="inline-flex items-center gap-2 text-[#e7c98b]/70 transition-colors hover:text-[#e7c98b]"
            >
              <RefreshCw className="size-3.5" />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
