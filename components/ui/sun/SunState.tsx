
"use client";

import {
  Orbit,
  Sun,
  RefreshCw,
  MapPin,
  MapPinned,
  LoaderCircle,
} from "lucide-react";

interface SunStateProps {
  type: "location" | "loading" | "error";
  message?: string;
  onRequestLocation?: () => void;
  onUseDefaultLocation?: () => void;
  onRetry?: () => void;
  loading?: boolean;
}

export default function SunState({
  type,
  message,
  onRequestLocation,
  onUseDefaultLocation,
  onRetry,
  loading = false,
}: SunStateProps) {
  const isLoading = type === "loading";
  const isLocation = type === "location";

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070a12] px-4 py-16 text-[#f4efe6] sm:px-6"
      aria-busy={isLoading || loading}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[90px] sm:size-[360px]"
      />

      <div
        className="relative w-full max-w-lg text-center"
        aria-live="polite"
      >
        <div className="mb-10 flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-[#e7c98b] sm:text-xs sm:tracking-[0.25em]">
          <Orbit className="size-5 shrink-0" />
          <span>ĀFĀQ / SOLAR OBSERVATORY</span>
        </div>

        <div className="relative mx-auto mb-8 flex size-28 items-center justify-center rounded-full border border-violet-300/25 bg-[#141626] shadow-[0_0_70px_rgba(167,139,250,0.12)]">
          <div
            aria-hidden="true"
            className="absolute inset-2 rounded-full border border-[#e7c98b]/15"
          />

          {isLocation ? (
            <MapPin
              aria-hidden="true"
              className="size-12 text-[#e7c98b]"
              strokeWidth={1.2}
            />
          ) : (
            <Sun
              aria-hidden="true"
              className={`size-12 text-[#e7c98b] ${
                isLoading
                  ? "animate-pulse motion-reduce:animate-none"
                  : ""
              }`}
              strokeWidth={1.2}
            />
          )}
        </div>

        <p className="mb-3 text-[10px] tracking-[0.25em] text-violet-300/80 sm:text-xs sm:tracking-[0.3em]">
          {isLocation
            ? "LOCATION ACCESS"
            : isLoading
              ? "OBSERVATION IN PROGRESS"
              : "OBSERVATION INTERRUPTED"}
        </p>

        <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {isLocation
            ? "Find Your Sky"
            : isLoading
              ? "Observing Our Star"
              : "Lost the Signal"}
        </h1>

        <p className="mx-auto mt-4 max-w-sm break-words text-sm leading-7 text-white/55">
          {message ??
            (isLocation
              ? "Allow location access to calculate the Sun's position and solar times for your location."
              : isLoading
                ? "Calculating the Sun's position and preparing solar data..."
                : "We couldn't retrieve the solar data. Please try again.")}
        </p>

        {isLocation ? (
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onRequestLocation}
              disabled={loading}
              className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#e7c98b] px-6 py-3 text-sm font-medium text-[#070a12] transition-colors hover:bg-[#f1dba9] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c98b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a12]"
            >
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <MapPinned className="size-4" />
              )}
              {loading
                ? "Detecting your location..."
                : "Detect my location"}
            </button>

            <button
              type="button"
              onClick={onUseDefaultLocation}
              disabled={loading}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 transition-colors hover:border-[#e7c98b]/50 hover:text-[#e7c98b] disabled:opacity-50"
            >
              Continue with Cairo
            </button>
          </div>
        ) : isLoading ? (
          <div
            className="mx-auto mt-8 h-px w-40 overflow-hidden bg-white/10"
            role="progressbar"
            aria-label="Loading solar data"
          >
            <div className="h-full w-1/2 animate-pulse bg-linear-to-r from-violet-400 to-[#e7c98b] motion-reduce:animate-none" />
          </div>
        ) : (
          onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7c98b]/30 px-6 py-3 text-sm text-[#e7c98b] transition-colors hover:border-[#e7c98b] hover:bg-[#e7c98b]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c98b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a12]"
            >
              <RefreshCw className="size-4" />
              Retry observation
            </button>
          )
        )}

        <div className="mt-12 flex items-center justify-center gap-3 text-[9px] tracking-[0.15em] text-white/25 sm:text-[10px] sm:tracking-[0.2em]">
          <span className="h-px w-8 bg-white/10" />
          <span>EXPLORE THE UNIVERSE</span>
          <span className="h-px w-8 bg-white/10" />
        </div>
      </div>
    </main>
  );
}
