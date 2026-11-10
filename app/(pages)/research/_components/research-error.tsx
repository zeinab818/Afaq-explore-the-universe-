"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

type ResearchErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
  backHref?: string;
};

export default function ResearchError({
  error,
  reset,
  backHref = "/research",
}: ResearchErrorProps) {
  useEffect(() => {
    console.error("Research section error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#070a12] px-6 py-24 text-[#f5e9df]">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-[450px] rounded-full bg-violet-500/[0.06] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-[#e7c98b]/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-rose-300/15 bg-rose-300/[0.06] text-rose-200">
          <AlertTriangle className="size-7" />
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
          Āfāq / Research Archive
        </p>

        <h1 className="mt-5 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
          Something went
          <span className="text-[#e7c98b]"> wrong.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/45">
          We couldn&apos;t load the research data right now.
          Please try again in a moment.
        </p>

        {error.digest && (
          <p className="mt-4 text-[10px] text-white/20">
            Error reference: {error.digest}
          </p>
        )}

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#e7c98b] px-7 text-xs font-semibold uppercase tracking-wider text-[#070a12] transition-colors hover:bg-[#f2dba9]"
          >
            <RefreshCw className="size-4" />
            Try Again
          </button>

          <Link
            href={backHref}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/10 px-7 text-xs uppercase tracking-wider text-white/60 transition-colors hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Research
          </Link>
        </div>
      </div>
    </main>
  );
}