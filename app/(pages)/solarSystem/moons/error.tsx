
"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface MoonErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MoonError({
  error,
  reset,
}: MoonErrorProps) {
  useEffect(() => {
    console.error("Moon page error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-rose-500/5 blur-[120px]" />

      <section
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-center backdrop-blur-xl md:p-12"
        role="alert"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-300/15 bg-rose-300/5">
          <AlertTriangle
            size={28}
            className="text-rose-300"
            strokeWidth={1.4}
          />
        </div>

        <p className="mt-7 text-xs uppercase tracking-[0.25em] text-rose-300">
          Observatory interrupted
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold">
          We lost the lunar signal
        </h1>

        <p className="mt-4 text-sm leading-7 text-foreground-secondary">
          We couldn&apos;t retrieve the Moon&apos;s data.
          Please try again in a moment.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-300/10 px-6 py-3 text-sm transition-colors hover:bg-indigo-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </section>
    </main>
  );
}
