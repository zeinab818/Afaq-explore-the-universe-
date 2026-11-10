
import { Rocket, Sparkles } from "lucide-react";

export default function MissionsLoading() {
  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      {/* Hero Skeleton */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="animate-pulse">
          <div className="mb-4 h-9 w-40 rounded-full bg-white/[0.06]" />

          <div className="h-12 w-72 rounded-xl bg-white/[0.07]" />

          <div className="mt-4 h-4 w-full max-w-2xl rounded bg-white/[0.05]" />
          <div className="mt-2 h-4 w-3/4 max-w-xl rounded bg-white/[0.04]" />
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <MissionCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

function MissionCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025]">
      {/* Image */}
      <div className="relative aspect-[16/7] animate-pulse bg-[#0d111c]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.025]">
            <Rocket className="size-7 animate-pulse text-violet-300/20" />
          </div>
        </div>

        <div className="absolute right-3 top-3 h-6 w-14 rounded-full bg-white/[0.06]" />
      </div>

      {/* Content */}
      <div className="animate-pulse p-5">
        <div className="h-3 w-20 rounded bg-white/[0.05]" />

        <div className="mt-3 h-6 w-3/4 rounded bg-white/[0.07]" />

        <div className="mt-4 h-3 w-full rounded bg-white/[0.04]" />
        <div className="mt-2 h-3 w-5/6 rounded bg-white/[0.04]" />

        <div className="mt-6 h-4 w-32 rounded bg-white/[0.06]" />
      </div>
    </article>
  );
}

