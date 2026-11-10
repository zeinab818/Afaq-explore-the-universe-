
import { Moon, Orbit } from "lucide-react";

export default function Loading() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
          <Orbit
            size={64}
            strokeWidth={0.7}
            className="absolute animate-spin text-indigo-300/40"
          />

          <Moon
            size={30}
            strokeWidth={1.2}
            className="text-indigo-200"
          />
        </div>

        <div>
          <p className="font-display text-2xl">
            Mapping the Moon
          </p>

          <p className="mt-3 text-sm text-foreground-secondary">
            Calculating lunar data for your observation...
          </p>
        </div>

        <div
          className="h-1 w-40 overflow-hidden rounded-full bg-white/10"
          aria-hidden="true"
        >
          <div className="h-full w-1/2 animate-pulse rounded-full bg-indigo-300" />
        </div>
      </div>
    </main>
  );
}
