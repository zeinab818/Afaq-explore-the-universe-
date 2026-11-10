
import {
  CalendarDays,
  Clock3,
  Database,
  FlaskConical,
  Rocket,
  Satellite,
  Sparkles,
} from "lucide-react";

export default function MissionDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 size-[520px] rounded-full bg-violet-500/10 blur-[130px]" />
          <div className="absolute -bottom-40 -left-40 size-[420px] rounded-full bg-[#e7c98b]/5 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
          {/* Back button */}
          <div className="h-5 w-32 animate-pulse rounded bg-white/[0.05]" />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Image */}
            <div className="relative aspect-[16/9] animate-pulse overflow-hidden rounded-3xl border border-white/8 bg-[#0d111c]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-20 items-center justify-center rounded-3xl border border-white/5 bg-white/[0.025]">
                  <Rocket className="size-10 animate-pulse text-violet-300/20" />
                </div>
              </div>

              <div className="absolute right-5 top-5 h-7 w-16 rounded-full bg-white/[0.06]" />
            </div>

            {/* Content */}
            <div className="animate-pulse">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded bg-white/[0.06]" />
                <div className="h-4 w-32 rounded bg-white/[0.06]" />
              </div>

              <div className="mt-5 h-12 w-full max-w-md rounded-xl bg-white/[0.07]" />

              <div className="mt-5 h-4 w-full max-w-xl rounded bg-white/[0.04]" />
              <div className="mt-2 h-4 w-4/5 rounded bg-white/[0.04]" />

              <div className="mt-5 h-4 w-3/5 rounded bg-white/[0.03]" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoSkeleton icon={<CalendarDays />} />
          <InfoSkeleton icon={<CalendarDays />} />
          <InfoSkeleton icon={<Clock3 />} />
          <InfoSkeleton icon={<Database />} />
        </div>
      </section>

      {/* Components */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <SectionHeading />

        <div className="grid gap-6 lg:grid-cols-2">
          <LargeSkeleton icon={<Rocket />} />
          <LargeSkeleton icon={<Satellite />} />
        </div>
      </section>

      {/* Research */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="animate-pulse rounded-3xl border border-white/8 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
              <FlaskConical className="size-5 text-[#e7c98b]/20" />
            </div>

            <div className="flex-1">
              <div className="h-6 w-64 rounded bg-white/[0.06]" />

              <div className="mt-3 h-4 w-full max-w-2xl rounded bg-white/[0.04]" />
              <div className="mt-2 h-4 w-4/5 max-w-xl rounded bg-white/[0.04]" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading() {
  return (
    <div className="mb-10 animate-pulse">
      <div className="h-3 w-32 rounded bg-[#e7c98b]/10" />
      <div className="mt-3 h-8 w-56 rounded bg-white/[0.06]" />
      <div className="mt-3 h-4 w-full max-w-2xl rounded bg-white/[0.035]" />
    </div>
  );
}

function InfoSkeleton({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <div className="animate-pulse rounded-2xl border border-white/8 bg-white/[0.025] p-5">
      <div className="text-violet-300/20">
        {icon}
      </div>

      <div className="mt-4 h-3 w-20 rounded bg-white/[0.04]" />

      <div className="mt-3 h-5 w-32 rounded bg-white/[0.06]" />
    </div>
  );
}

function LargeSkeleton({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <div className="animate-pulse rounded-3xl border border-white/8 bg-white/[0.025] p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-white/[0.04]">
          {icon}
        </div>

        <div>
          <div className="h-3 w-20 rounded bg-white/[0.04]" />
          <div className="mt-2 h-6 w-32 rounded bg-white/[0.06]" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <div className="h-8 w-24 rounded-full bg-white/[0.04]" />
        <div className="h-8 w-32 rounded-full bg-white/[0.04]" />
        <div className="h-8 w-20 rounded-full bg-white/[0.04]" />
      </div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-white/7 bg-white/[0.02] p-4">
      <div className="h-3 w-16 animate-pulse rounded bg-white/[0.04]" />
      <div className="mt-3 h-8 w-12 animate-pulse rounded bg-white/[0.06]" />
    </div>
  );
}

