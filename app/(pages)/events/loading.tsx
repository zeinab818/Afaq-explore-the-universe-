"use client"

import {

  Compass,


} from "lucide-react";

export default function LoadingState() {
  return (
    <section
      role="status"
      aria-live="polite"
      className="relative flex min-h-95 flex-col items-center justify-center overflow-hidden rounded-4xl border border-white/8 bg-[#0d111c]/80 px-6 py-16 text-center"
    >
      <div className="absolute h-56 w-56 animate-pulse rounded-full bg-violet-500/9 blur-3xl" />

      <div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#e7c98b]/20 bg-[#e7c98b]/5">
        <div className="absolute inset-2 animate-spin rounded-full border border-dashed border-[#e7c98b]/40" />
        <Compass className="h-8 w-8 text-[#e7c98b]" strokeWidth={1.2} />
      </div>

      <p className="relative text-xs font-medium uppercase tracking-[0.3em] text-[#e7c98b]">
        Scanning the skies
      </p>

      <h2 className="relative mt-4 text-2xl font-medium text-white md:text-3xl">
        Looking for your next cosmic moment.
      </h2>

      <p className="relative mt-3 max-w-md text-sm leading-7 text-white/45">
        Getting your location and searching for upcoming celestial events.
      </p>

      <div className="relative mt-8 h-px w-40 overflow-hidden bg-white/10">
        <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] bg-[#e7c98b]" />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </section>
  );
}
