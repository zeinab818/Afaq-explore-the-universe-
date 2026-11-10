type ResearchLoadingProps = {
  variant?: "list" | "details";
};

export default function ResearchLoading({
  variant = "list",
}: ResearchLoadingProps) {
  const isDetails = variant === "details";

  return (
    <main className="min-h-screen overflow-hidden bg-[#070a12] text-[#f5e9df]">
      {/* Hero skeleton */}
      <section className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-violet-500/[0.06] blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-[#e7c98b]/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-6 pb-16 pt-24 md:px-12 md:pb-20 lg:px-16 lg:pt-32">
          <div className="mb-8 h-3 w-40 animate-pulse rounded bg-[#e7c98b]/15" />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-5">
              <div className="h-3 w-56 animate-pulse rounded bg-white/10" />
              <div className="space-y-3">
                <div className="h-14 w-4/5 animate-pulse rounded-lg bg-white/[0.07] sm:h-20" />
                <div className="h-14 w-3/5 animate-pulse rounded-lg bg-[#e7c98b]/10 sm:h-20" />
              </div>
            </div>

            <div className="space-y-3 lg:pb-3">
              <div className="size-12 animate-pulse rounded-full bg-violet-300/10" />
              <div className="h-3 w-full animate-pulse rounded bg-white/[0.07]" />
              <div className="h-3 w-11/12 animate-pulse rounded bg-white/[0.07]" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-white/[0.07]" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
            {Array.from({ length: isDetails ? 4 : 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#0c111d] p-6 md:p-7"
              >
                <div className="size-11 shrink-0 animate-pulse rounded-xl bg-[#e7c98b]/10" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-20 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-28 animate-pulse rounded bg-white/[0.07]" />
                  <div className="h-2.5 w-24 animate-pulse rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <div className="mb-12 space-y-4">
          <div className="h-3 w-40 animate-pulse rounded bg-[#e7c98b]/15" />
          <div className="h-9 w-72 max-w-full animate-pulse rounded bg-white/[0.07]" />
          <div className="h-3 w-96 max-w-full animate-pulse rounded bg-white/[0.05]" />
        </div>

        {isDetails ? (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-36 animate-pulse rounded-2xl border border-white/[0.07] bg-[#0c111d]"
                />
              ))}
            </div>

            <div className="mt-12 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-xl border border-white/[0.07] bg-[#0c111d]"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-h-80 animate-pulse rounded-2xl border border-white/[0.07] bg-[#0c111d] p-7"
              >
                <div className="size-12 rounded-xl bg-violet-300/10" />
                <div className="mt-10 h-3 w-28 rounded bg-white/10" />
                <div className="mt-4 h-7 w-3/4 rounded bg-white/[0.07]" />
                <div className="mt-5 h-3 w-full rounded bg-white/[0.05]" />
                <div className="mt-3 h-3 w-4/5 rounded bg-white/[0.05]" />
                <div className="mt-8 h-8 w-28 rounded bg-[#e7c98b]/10" />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}