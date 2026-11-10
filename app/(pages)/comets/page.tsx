"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CircleDot,
  Globe2,
  Orbit,
  Sparkles,
  Telescope,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  comets,
  cometTypes,
  cometAnatomy,
  cometOrigins,
  cometLifecycle,
} from "@/data/CometsData";

export default function CometsPage() {
 return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[5%] top-[8%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />

        <div className="absolute right-[-5%] top-[30%] h-[550px] w-[550px] rounded-full bg-purple-500/10 blur-[170px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[160px]" />

        <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:70px_70px]" />
      </div>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative flex min-h-screen items-center px-6 pb-20 pt-32 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* TEXT */}

          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                Ice • Dust • Cosmos
              </span>
            </div>

            <h1 className="max-w-3xl font-display text-6xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-7xl lg:text-8xl">
              Comets
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-foreground-secondary md:text-lg">
              Frozen wanderers carrying ancient material through space —
              remnants of planetary formation, cosmic encounters, and worlds
              beyond our own.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link 
                href="#explore"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                Explore Comets

                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Link >

              <Link 
                href="#anatomy"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-foreground-secondary backdrop-blur-xl transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                Understand Them
              </Link >
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="relative mx-auto h-[500px] w-full max-w-[620px]">
            {/* Orbital rings */}

            <div className="absolute left-1/2 top-1/2 h-[440px] w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-white/[0.06]" />

            <div className="absolute left-1/2 top-1/2 h-[340px] w-[520px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-white/[0.04]" />

            <div className="absolute left-1/2 top-1/2 h-[220px] w-[400px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[50%] border border-primary/10" />

            {/* Tail glow */}

            <div className="absolute left-[0%] top-[39%] h-[180px] w-[72%] -rotate-[16deg] rounded-full bg-gradient-to-r from-transparent via-purple-300/10 to-white/20 blur-3xl" />

            <div className="absolute left-[7%] top-[45%] h-[2px] w-[65%] -rotate-[16deg] bg-gradient-to-r from-transparent via-white/10 to-white/50 blur-[1px]" />

            {/* Orbiting particles */}

            <div className="absolute left-[19%] top-[18%] h-2 w-2 rounded-full bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />

            <div className="absolute bottom-[18%] left-[27%] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_18px_rgba(150,100,255,0.9)]" />

            <div className="absolute right-[14%] top-[16%] h-1.5 w-1.5 rounded-full bg-white/50" />

            {/* Comet */}

            <div className="absolute right-[1%] top-1/2 z-10 h-[300px] w-[300px] -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_120px_rgba(140,100,255,0.2)] md:h-[370px] md:w-[370px]">
              <Image
                src={comets[2].image}
                alt={comets[2].name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 300px, 370px"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50" />

              <div className="absolute bottom-5 left-5 z-20 rounded-full border border-white/10 bg-black/50 px-4 py-2.5 backdrop-blur-xl">
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/50">
                  Featured
                </p>

                <p className="mt-1 font-display text-sm font-medium text-white">
                  NEOWISE
                </p>
              </div>
            </div>

            {/* Floating information */}

            <div className="absolute left-[4%] top-[15%] z-20 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Composition
              </p>

              <p className="mt-1 text-sm text-white/90">
                Ice + Dust
              </p>
            </div>

            <div className="absolute bottom-[10%] left-[9%] z-20 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Origin
              </p>

              <p className="mt-1 text-sm text-white/90">
                Cosmic Remnants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTRO STATS */}
      {/* ========================================================= */}

      <section className="border-y border-white/[0.06] px-6 lg:px-12">
        <div className="mx-auto grid max-w-7xl md:grid-cols-4">
          <Stat
            icon={CircleDot}
            label="Core"
            value="Nucleus"
          />

          <Stat
            icon={Sparkles}
            label="Atmosphere"
            value="Coma"
          />

          <Stat
            icon={Wind}
            label="Tail"
            value="Dust + Ion"
          />

          <Stat
            icon={Globe2}
            label="Origin"
            value="Planetary Systems"
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTRO */}
      {/* ========================================================= */}

      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              01 · Cosmic Wanderers
            </p>

            <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
              Ancient fragments traveling through the dark.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base leading-8 text-foreground-secondary">
              Comets are among the most primitive objects found in planetary
              systems. Their frozen interiors preserve material from the early
              stages of cosmic formation, making them natural time capsules of
              planetary evolution.
            </p>

            <p className="mt-6 text-base leading-8 text-foreground-muted">
              Most known comets belong to our Solar System, but the discovery
              of interstellar visitors has revealed that comet-like bodies can
              also travel between stars.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* COMET SHOWCASE */}
      {/* ========================================================= */}

      <section id="explore" className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
                02 · Cosmic Travelers
              </p>

              <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
                Comets worth knowing.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-foreground-muted">
              From famous periodic visitors to rare interstellar travelers,
              each comet tells a different story about cosmic evolution.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {comets.map((comet) => (
              <CometCard key={comet.id} comet={comet} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TYPES */}
      {/* ========================================================= */}

      <section className="px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              03 · Classification
            </p>

            <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
              Not every comet travels the same way.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cometTypes.map((type, index) => (
              <div
                key={type.name}
                className="group relative overflow-hidden rounded-[1.7rem] border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.045]"
              >
                <div className="absolute right-[-40px] top-[-40px] h-36 w-36 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

                <div className="relative">
                  <span className="text-[10px] tracking-[0.25em] text-white/20">
                    0{index + 1}
                  </span>

                  <h3 className="mt-12 font-display text-xl">
                    {type.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-muted">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ANATOMY */}
      {/* ========================================================= */}

      <section id="anatomy" className="relative px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
                04 · Anatomy
              </p>

              <h2 className="max-w-lg font-display text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                A frozen body transformed by starlight.
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-8 text-foreground-secondary">
                Far from a star, a comet can remain frozen and inactive. As it
                approaches intense radiation, its surface begins releasing
                gas and dust, revealing one of the most beautiful structures
                in astronomy.
              </p>

              <div className="mt-10 h-px w-24 bg-primary/40" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                const icons: LucideIcon[] = [CircleDot, Sparkles, Wind, Orbit];
                const Icon = icons[index] ?? Sparkles;
                
              {cometAnatomy.map((item, index) => {
                const icons = [CircleDot, Sparkles, Wind, Orbit];
                const Icon = icons[index] ?? Sparkles;

                return (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.045]"
                  >
                    <div className="absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

                    <div className="relative">
                      <div className="mb-8 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>

                        <span className="text-[10px] tracking-[0.2em] text-white/20">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="font-display text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-foreground-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ORIGINS */}
      {/* ========================================================= */}

      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              05 · Origins
            </p>

            <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
              Where do comets come from?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {cometOrigins.map((origin, index) => (
              <div
                key={origin.title}
                className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-8 backdrop-blur-xl"
              >
                <span className="text-[10px] tracking-[0.3em] text-primary">
                  0{index + 1}
                </span>

                <h3 className="mt-20 font-display text-2xl">
                  {origin.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-foreground-muted">
                  {origin.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTERSTELLAR */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden px-6 py-32 lg:px-12">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] rotate-[-12deg]" />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/10 rotate-[-12deg]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-primary">
            06 · Beyond Our System
          </p>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>

          <h2 className="mt-8 font-display text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
            Some comets
            <br />
            come from elsewhere.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-foreground-secondary">
            The discovery of interstellar comet 2I/Borisov revealed that
            objects formed around other stars can cross through our cosmic
            neighborhood, offering a glimpse into planetary systems beyond
            the Sun.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl">
            <Orbit className="h-3.5 w-3.5 text-primary" />
            Interstellar Visitor
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* LIFECYCLE */}
      {/* ========================================================= */}

      <section className="px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              07 · The Journey
            </p>

            <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
              A comet's life is a cosmic cycle.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[18px] top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:block" />

            <div className="space-y-5">
              {cometLifecycle.map((item) => (
                <div
                  key={item.step}
                  className="group relative grid gap-6 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] md:grid-cols-[90px_1fr] md:pl-12"
                >
                  <div className="font-display text-2xl text-primary/80">
                    {item.step}
                  </div>

                  <div>
                    <h3 className="font-display text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FINAL ORBIT */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden px-6 py-32 lg:px-12">
        <div className="absolute left-1/2 top-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] rotate-[-15deg]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/10 rotate-[-15deg]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <Telescope className="mx-auto h-6 w-6 text-primary" />

          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-primary">
            Endless Journeys
          </p>

          <h2 className="mt-5 font-display text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
            Every comet carries
            <br />
            a piece of cosmic history.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-foreground-secondary">
            Frozen in time, shaped by stars, and sometimes traveling between
            them — comets are among the oldest storytellers in the universe.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <section className="px-6 pb-32 pt-16 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] px-7 py-16 text-center backdrop-blur-xl md:px-12 md:py-24">
          <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />

          <div className="relative">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-primary">
              Keep Exploring
            </p>

            <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
              The universe is far larger than the worlds we call home.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-foreground-secondary">
              Continue beyond comets and discover the stars, nebulae, galaxies,
              and other wonders scattered across deep space.
            </p>

            <Link
              href="/galaxies"
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-white/[0.09]"
            >
              Explore Galaxies

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =============================================================== */
/* COMPONENTS */
/* =============================================================== */

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="border-white/[0.06] p-7 md:border-r md:last:border-r-0">
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <p className="text-[9px] uppercase tracking-[0.25em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-2 font-display text-lg text-white/90">
        {value}
      </p>
    </div>
  );
}

function CometCard({
  comet,
}: {
  comet: (typeof comets)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.12]">
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={comet.image}
          alt={comet.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-xl">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
            {comet.type}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="font-display text-2xl text-white">
            {comet.name}
          </h3>

          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
            {comet.origin}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 grid grid-cols-2 gap-3 border-b border-white/[0.06] pb-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
              Catalog
            </p>

            <p className="mt-1 text-xs text-white/70">
              {comet.catalog}
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
              Composition
            </p>

            <p className="mt-1 text-xs text-white/70">
              {comet.composition}
            </p>
          </div>
        </div>

        <p className="text-sm leading-7 text-foreground-muted">
          {comet.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/50">
          <span>Significance</span>

          <span className="h-px w-8 bg-white/10" />
        </div>

        <p className="mt-3 text-xs leading-6 text-white/40">
          {comet.significance}
        </p>
      </div>
    </article>
  );
}