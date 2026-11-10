"use client"

import {
  AlertCircle,

  RefreshCw,

} from "lucide-react";

export default function ErrorState({
  message,
  onRetry,
  retrying,
}: {
  message: string;
  onRetry: () => void;
  retrying: boolean;
}) {
  return (
    <section
      role="alert"
      className="relative overflow-hidden rounded-4xl border border-rose-300/15 bg-[#0d111c] px-6 py-14 text-center md:px-12"
    >
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-rose-400/[0.07] blur-3xl" />

      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-300/15 bg-rose-300/6">
        <AlertCircle className="h-7 w-7 text-rose-300" strokeWidth={1.5} />
      </div>

      <p className="relative mt-7 text-xs font-medium uppercase tracking-[0.28em] text-rose-200/70">
        Connection interrupted
      </p>

      <h2 className="relative mt-3 text-2xl font-medium text-white md:text-3xl">
        The universe can wait. Let&apos;s try again.
      </h2>

      <p className="relative mx-auto mt-4 max-w-lg text-sm leading-7 text-white/50">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        disabled={retrying}
        className="relative mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e7c98b] px-7 py-3 text-sm font-semibold text-[#11131a] transition hover:bg-[#f2dca9] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw
          className={`h-4 w-4 ${retrying ? "animate-spin" : ""}`}
        />
        {retrying ? "Trying again..." : "Try Again"}
      </button>

      <p className="relative mt-4 text-xs text-white/30">
        If the problem persists, check your connection or location settings.
      </p>
    </section>
  );
}