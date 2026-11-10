
export default function PlanetLoading() {
  return (
    <main className="min-h-screen w-full animate-pulse bg-background text-foreground">
      
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden">
        
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-100 w-100 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-1/4 top-1/2 h-75 w-75 rounded-full bg-purple-500/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-32 lg:px-8">
          
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">

            {/* Text Skeleton */}
            <div>
              <div className="mb-5 h-4 w-24 rounded-full bg-white/10" />

              <div className="h-20 w-72 rounded-2xl bg-white/10 md:h-28 md:w-96" />

              <div className="mt-5 h-6 w-52 rounded-full bg-white/10" />

              <div className="mt-8 space-y-3">
                <div className="h-4 w-full max-w-xl rounded-full bg-white/8" />
                <div className="h-4 w-5/6 max-w-xl rounded-full bg-white/8" />
                <div className="h-4 w-2/3 max-w-xl rounded-full bg-white/8" />
              </div>
            </div>

            {/* Planet Skeleton */}
            <div className="relative flex min-h-125 items-center justify-center">

              {/* Glow */}
              <div className="absolute h-96 w-96 rounded-full bg-primary/10 blur-[110px]" />

              {/* Orbit */}
              <div
                className="
                  absolute
                  h-80
                  w-120
                  rotate-18
                  rounded-[50%]
                  border
                  border-white/8
                  md:h-96
                  md:w-136
                "
              />

              {/* Fake Planet */}
              <div
                className="
                  relative
                  z-10
                  aspect-square
                  w-full
                  max-w-105
                  rounded-3xl
                  border
                  border-white/8
                  bg-white/5
                  shadow-[0_0_70px_var(--glow-purple)]
                  backdrop-blur-sm
                "
              >
                <div className="absolute inset-10 rounded-full bg-white/8 blur-md" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-12">
            <div className="h-4 w-32 rounded-full bg-white/10" />

            <div className="mt-4 h-10 w-80 rounded-xl bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <StatSkeleton key={index} />
            ))}
          </div>

        </div>
      </section>

      {/* ================= ORBIT ================= */}
      <section className="relative overflow-hidden py-24">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

          {/* Text */}
          <div>
            <div className="h-4 w-20 rounded-full bg-white/10" />

            <div className="mt-4 h-10 w-72 rounded-xl bg-white/10" />

            <div className="mt-7 space-y-3">
              <div className="h-4 w-full max-w-lg rounded-full bg-white/8" />
              <div className="h-4 w-5/6 max-w-lg rounded-full bg-white/8" />
              <div className="h-4 w-2/3 max-w-lg rounded-full bg-white/8" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <StatSkeleton key={index} />
            ))}
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <section className="border-t border-white/6 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="rounded-3xl border border-white/6 bg-white/2 p-8 backdrop-blur-xl md:p-12">

            <div className="h-4 w-16 rounded-full bg-white/10" />

            <div className="mt-5 h-8 w-80 rounded-xl bg-white/10 md:w-96" />

            <div className="mt-5 space-y-3">
              <div className="h-4 w-full max-w-2xl rounded-full bg-white/8" />
              <div className="h-4 w-4/5 max-w-2xl rounded-full bg-white/8" />
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

function StatSkeleton() {
  return (
    <div className="bg-background/60 p-6 backdrop-blur-xl">
      <div className="h-3 w-20 rounded-full bg-white/10" />

      <div className="mt-4 h-7 w-28 rounded-lg bg-white/10" />
    </div>
  );
}

