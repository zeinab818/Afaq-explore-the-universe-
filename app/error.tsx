"use client";


import { RotateCcw, Orbit, Sparkles } from "lucide-react";

export default function Error({
  error,
 
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
 
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070a12] px-5 py-16 text-white selection:bg-violet-400/30">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-600/12 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[130px]" />

        {/* Stars */}
        <span className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_12px_white]" />
        <span className="absolute left-[28%] top-[72%] h-1.5 w-1.5 rounded-full bg-violet-300/60" />
        <span className="absolute right-[18%] top-[24%] h-1 w-1 rounded-full bg-amber-200/70 shadow-[0_0_12px_#e7c98b]" />
        <span className="absolute bottom-[18%] right-[25%] h-1 w-1 rounded-full bg-white/50" />

        {/* Orbital rings */}
        <div className="absolute left-1/2 top-1/2 h-110 w-110 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] sm:h-150 sm:w-150" />
        <div className="absolute left-1/2 top-1/2 h-85 w-85 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.07] sm:h-115 sm:w-115" />
      </div>

      {/* Error content */}
      <section className="relative z-10 w-full max-w-2xl">
        <div className="rounded-4xl border border-white/8 bg-[#0d111c]/80 px-6 py-12 text-center shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-12 sm:py-16">
          {/* Cosmic illustration */}
          <div className="relative mx-auto mb-9 flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-2xl" />

            <div className="absolute inset-2 rounded-full border border-violet-300/20" />

            <div className="absolute inset-0 rotate-[-30deg] rounded-[50%] border border-amber-200/30" />

            <div className="relative flex h-18 w-18 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-violet-400/20 via-[#141a28] to-[#070a12] shadow-[inset_0_0_28px_rgba(167,139,250,0.12)]">
              <Orbit
                className="h-9 w-9 text-violet-200"
                strokeWidth={1.2}
                aria-hidden="true"
              />

              <Sparkles
                className="absolute -right-1 -top-1 h-5 w-5 text-[#e7c98b]"
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-violet-300/80 sm:text-xs">
            An Unexpected Anomaly
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Lost in the{" "}
            <span className="bg-linear-to-r from-violet-300 via-purple-200 to-[#e7c98b] bg-clip-text text-transparent">
              Cosmos
            </span>
            <span className="text-[#e7c98b]">.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/50 sm:text-base">
            Something unexpected interrupted our journey through the
            universe. Let’s try again and get you back on course.
          </p>

          {error.digest && (
            <p className="mt-5 text-xs text-white/25">
              Reference: {error.digest}
            </p>
          )}

          <button
            type="button"
          onClick={() => window.location.reload()}
            className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-violet-300/25 bg-violet-400/8 px-7 py-3 text-sm font-medium text-white transition duration-300 hover:border-violet-300/50 hover:bg-violet-400/[0.15] hover:shadow-[0_0_32px_rgba(139,92,246,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a12]"
          >
            <RotateCcw
              className="h-4 w-4 text-violet-200 transition-transform duration-300 group-hover:-rotate-45"
              aria-hidden="true"
            />
            Try Again
          </button>
          <div className="mx-auto mt-10 h-px w-24 bg-linear-to-r from-transparent via-violet-300/40 to-transparent" />

          <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-white/25">
            Āfāq · Explore the Universe
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/25">
          The universe is vast. Every journey deserves another chance.
        </p>
      </section>
    </main>
  );
}