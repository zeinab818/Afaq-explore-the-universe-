
import Link from "next/link";
import { ArrowLeft, Orbit } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground">
      
      {/* ================= BACKGROUND GLOW ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-white/60 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

        <div className="absolute right-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/50 shadow-[0_0_12px_rgba(255,255,255,0.7)]" />

        <div className="absolute bottom-[20%] left-[25%] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_15px_var(--glow-purple)]" />

        <div className="absolute bottom-[30%] right-[15%] h-2 w-2 rounded-full bg-white/40" />
      </div>

      {/* ================= ORBIT ================= */}
      <div
        className="
          pointer-events-none
          absolute
          h-80
          w-120
          rotate-12
          rounded-[50%]
          border
          border-white/6
          md:h-100
          md:w-150
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          h-65
          w-100
          -rotate-25
          rounded-[50%]
          border
          border-primary/10
          md:h-80
          md:w-125
        "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center">

        {/* Icon */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/4 backdrop-blur-xl">
          <Orbit
            className="h-8 w-8 text-primary"
            strokeWidth={1.5}
          />
        </div>

        {/* 404 */}
        <p className="font-display text-8xl font-semibold tracking-tight text-primary/80 md:text-9xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Lost somewhere in the universe.
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-lg text-base leading-7 text-foreground-secondary md:text-lg">
          The page you&apos;re looking for doesn&apos;t seem to exist.
          Maybe it drifted beyond our observable universe.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="
            group
            mt-10
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-primary/20
            bg-primary/10
            px-6
            py-3
            text-sm
            font-medium
            text-primary
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-primary/40
            hover:bg-primary/15
            hover:shadow-[0_0_30px_var(--glow-purple)]
          "
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to Āfāq
        </Link>

      </div>
    </main>
  );
}

