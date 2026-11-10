"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Flame,
  Globe2,
  Orbit,
  Sparkles,
  Telescope,
  Zap,
} from "lucide-react";

import {
  meteors,
  meteorTypes,
  meteorAnatomy,
  meteorOrigins,
  meteorLifecycle,
  meteorShowers,
  meteorFacts,
} from "@/data/MeteorsData";

export default function MeteorsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.05] blur-[140px]" />
        <div className="absolute right-[-10%] top-[30%] h-[600px] w-[600px] rounded-full bg-primary/[0.06] blur-[160px]" />
        <div className="absolute bottom-[5%] left-[30%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.04] blur-[150px]" />
      </div>

      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center px-6 pb-24 pt-32 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Text */}
          <div>
            <div className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
              <span className="h-px w-10 bg-primary/60" />
              Meteors
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              A flash of light
              <span className="block text-foreground-muted">
                across the night.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-foreground-secondary sm:text-lg">
              Meteors are brief cosmic encounters — tiny pieces of rock and
              metal entering an atmosphere at tremendous speed and transforming
              into streaks of light across the sky.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#showers"
                className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-3 text-sm transition hover:bg-white/[0.08]"
              >
                Explore meteor showers
                <ArrowDown
                  size={16}
                  className="transition-transform group-hover:translate-y-1"
                />
              </Link>

              <Link
                href="/comets"
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm text-foreground-muted transition hover:text-foreground"
              >
                Explore comets
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <div className="absolute inset-[7%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[17%] rounded-full border border-white/[0.05]" />
            <div className="absolute inset-[29%] rounded-full border border-white/[0.04]" />

            <div className="absolute inset-0 rounded-full bg-orange-500/[0.04] blur-3xl" />

            <div className="absolute inset-[14%] overflow-hidden rounded-full border border-white/[0.08] bg-black/30 shadow-2xl">
              <Image
                src={meteors[0].image}
                alt={meteors[0].name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 500px"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-transparent" />
            </div>

            {/* Meteor trajectory */}
            <div className="absolute left-[3%] top-[25%] h-px w-[55%] rotate-[27deg] bg-gradient-to-r from-transparent via-orange-200/70 to-transparent blur-[1px]" />

            <div className="absolute left-[27%] top-[37%] h-2 w-2 rounded-full bg-white shadow-[0_0_25px_8px_rgba(255,190,100,0.35)]" />

            <div className="absolute bottom-[12%] right-[8%] rounded-2xl border border-white/[0.08] bg-black/50 px-4 py-3 backdrop-blur-xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground-muted">
                Atmospheric entry
              </div>
              <div className="mt-1 text-sm font-medium">A cosmic flash</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative border-y border-white/[0.06]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.06] sm:grid-cols-4">
          {meteorFacts.map((fact) => (
            <Stat
              key={fact.label}
              value={fact.value}
              unit={fact.unit}
              label={fact.label}
            />
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="relative px-6 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionLabel number="01" label="The phenomenon" />

          <div>
            <h2 className="max-w-4xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
              A meteor is not the object.
              <span className="text-foreground-muted">
                {" "}
                It is the light it creates.
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-base leading-8 text-foreground-secondary sm:text-lg">
              Before entering an atmosphere, the object is called a
              <span className="text-foreground"> meteoroid</span>. Once it
              plunges through atmospheric gases and produces a luminous streak,
              we call the phenomenon a
              <span className="text-foreground"> meteor</span>. If fragments
              survive and reach the ground, they become
              <span className="text-foreground"> meteorites</span>.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {meteorTypes.map((type, index) => (
                <div
                  key={type.id}
                  className="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.02] p-6 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.04]"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs text-foreground-muted">
                      0{index + 1}
                    </span>

                    <Sparkles
                      size={17}
                      className="text-primary/70"
                    />
                  </div>

                  <h3 className="text-xl font-medium">{type.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SHOWERS */}
      <section
        id="showers"
        className="relative px-6 py-28 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel number="02" label="Meteor showers" />

              <h2 className="mt-7 max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl">
                Earth moves through
                <span className="text-foreground-muted">
                  {" "}
                  ancient debris.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-foreground-secondary">
              Meteor showers happen when Earth passes through streams of
              particles left behind by comets or asteroid-like bodies.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meteors.map((meteor, index) => (
              <MeteorCard key={meteor.id} meteor={meteor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* TYPES / ORIGINS */}
      <section className="relative border-y border-white/[0.06] px-6 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-2">
          {/* Origins */}
          <div>
            <SectionLabel number="03" label="Where they come from" />

            <h2 className="mt-7 text-4xl font-medium tracking-tight sm:text-5xl">
              Cosmic debris
              <span className="text-foreground-muted">
                {" "}
                finds a path.
              </span>
            </h2>

            <div className="mt-12 space-y-3">
              {meteorOrigins.map((origin, index) => (
                <div
                  key={origin.id}
                  className="group rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
                >
                  <div className="flex gap-5">
                    <span className="text-xs text-foreground-muted">
                      0{index + 1}
                    </span>

                    <div>
                      <h3 className="text-lg font-medium">
                        {origin.title}
                      </h3>

                      <p className="mt-2 max-w-lg text-sm leading-7 text-foreground-secondary">
                        {origin.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atmospheric visual */}
          <div className="relative min-h-[600px] overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-white/[0.02]">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.04] via-transparent to-primary/[0.05]" />

            <div className="absolute inset-x-[15%] top-[13%] h-px bg-white/[0.08]" />
            <div className="absolute inset-x-[22%] top-[33%] h-px bg-white/[0.06]" />
            <div className="absolute inset-x-[10%] top-[55%] h-px bg-white/[0.05]" />
            <div className="absolute inset-x-[25%] top-[75%] h-px bg-white/[0.04]" />

            <div className="absolute left-[18%] top-[8%] text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
              Space
            </div>

            <div className="absolute left-[18%] top-[30%] text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
              Upper atmosphere
            </div>

            <div className="absolute left-[18%] top-[53%] text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
              Atmosphere
            </div>

            <div className="absolute left-[18%] bottom-[16%] text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
              Surface
            </div>

            {/* Trajectory */}
            <div className="absolute left-[38%] top-[5%] h-[72%] w-1 rotate-[22deg] origin-top bg-gradient-to-b from-transparent via-orange-300/70 to-white blur-[1px]" />

            <div className="absolute left-[43%] top-[53%] h-4 w-4 rounded-full bg-white shadow-[0_0_35px_12px_rgba(255,180,80,0.35)]" />

            <div className="absolute bottom-[8%] left-[50%] h-28 w-28 -translate-x-1/2 rounded-full border border-primary/20 bg-primary/[0.05] shadow-[0_0_80px_rgba(255,150,50,0.08)]" />

            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/[0.07] bg-black/40 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Flame size={17} className="text-primary" />
                <span className="text-sm font-medium">
                  Atmospheric interaction
                </span>
              </div>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary">
                The brilliant streak comes from intense interactions between
                the incoming body and the atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ANATOMY */}
      <section className="relative px-6 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionLabel number="04" label="The journey" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">
                From stone
                <span className="text-foreground-muted">
                  {" "}
                  to starlight.
                </span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-foreground-secondary">
                Every visible meteor is the final stage of a much longer
                journey through space.
              </p>
            </div>

            <div className="space-y-3">
              {meteorAnatomy.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-[1.75rem] border border-white/[0.06] bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
                >
                  <div className="flex gap-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-xs text-primary">
                      {item.number}
                    </div>

                    <div>
                      <h3 className="text-xl font-medium">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOWERS EXPLORER */}
      <section className="relative border-y border-white/[0.06] px-6 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <SectionLabel number="05" label="Year-round sky" />

              <h2 className="mt-7 text-4xl font-medium tracking-tight sm:text-5xl">
                A calendar of
                <span className="text-foreground-muted">
                  {" "}
                  cosmic encounters.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-foreground-secondary">
                Meteor showers return each year as Earth crosses familiar
                debris streams along its orbit.
              </p>

              <div className="mt-8 flex gap-3">
                <div className="rounded-full border border-white/[0.07] px-4 py-2 text-xs text-foreground-muted">
                  Annual
                </div>

                <div className="rounded-full border border-white/[0.07] px-4 py-2 text-xs text-foreground-muted">
                  Orbital
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {meteorShowers.map((shower, index) => (
                <div
                  key={shower.name}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-foreground-muted">
                      0{index + 1}
                    </span>

                    <Orbit
                      size={17}
                      className="text-primary/60 transition group-hover:rotate-45"
                    />
                  </div>

                  <h3 className="mt-10 text-2xl font-medium">
                    {shower.name}
                  </h3>

                  <div className="mt-5 space-y-2 text-xs text-foreground-secondary">
                    <div className="flex justify-between gap-4">
                      <span>Peak</span>
                      <span className="text-foreground">
                        {shower.month}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>Parent</span>
                      <span className="text-right text-foreground">
                        {shower.parent}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIFE CYCLE */}
      <section className="relative px-6 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionLabel number="06" label="Meteor lifecycle" />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {meteorLifecycle.map((step, index) => (
              <div
                key={step.step}
                className={`relative overflow-hidden rounded-[2rem] border border-white/[0.06] p-7 ${
                  index === 3
                    ? "bg-primary/[0.04]"
                    : "bg-white/[0.02]"
                }`}
              >
                <span className="text-xs tracking-[0.2em] text-primary">
                  {step.step}
                </span>

                <h3 className="mt-12 text-xl font-medium">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                  {step.description}
                </p>

                {index < meteorLifecycle.length - 1 && (
                  <div className="absolute right-6 top-8 hidden h-px w-12 bg-white/[0.08] lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIREBALL FEATURE */}
      <section className="relative px-6 pb-28 lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-white/[0.025] p-8 sm:p-12 lg:p-16">
            <div className="absolute right-[-10%] top-[-30%] h-[400px] w-[400px] rounded-full bg-orange-500/[0.08] blur-[120px]" />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
                  <Zap size={15} />
                  Fireballs
                </div>

                <h2 className="mt-7 max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl">
                  Some meteors
                  <span className="text-foreground-muted">
                    {" "}
                    burn brighter than worlds.
                  </span>
                </h2>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-foreground-secondary sm:text-base">
                  Fireballs are exceptionally bright meteors. For a brief
                  moment, a tiny incoming body can become one of the brightest
                  objects in the night sky.
                </p>
              </div>

              <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.04]">
                <div className="absolute inset-5 rounded-full border border-primary/10" />

                <Flame
                  size={42}
                  strokeWidth={1.2}
                  className="text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-6 pb-32 pt-10 lg:px-12 lg:pb-44">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
            <Telescope size={21} className="text-primary" />
          </div>

          <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">
            Look up.
            <span className="block text-foreground-muted">
              The sky is moving.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-foreground-secondary sm:text-base">
            Every meteor is a reminder that Earth is constantly moving through
            a much larger cosmic environment.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/stars"
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-3 text-sm transition hover:bg-white/[0.08]"
            >
              Explore stars
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/nebulas"
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm text-foreground-muted transition hover:text-foreground"
            >
              Explore nebulae
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-foreground-muted">
      <span className="text-primary">{number}</span>
      <span className="h-px w-8 bg-white/[0.12]" />
      <span>{label}</span>
    </div>
  );
}

function Stat({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="flex items-end gap-2">
        <span className="text-2xl font-medium tracking-tight sm:text-3xl">
          {value}
        </span>

        <span className="pb-1 text-xs text-primary">{unit}</span>
      </div>

      <p className="mt-2 text-[10px] uppercase leading-5 tracking-[0.18em] text-foreground-muted">
        {label}
      </p>
    </div>
  );
}

function MeteorCard({
  meteor,
  index,
}: {
  meteor: (typeof meteors)[number];
  index: number;
}) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] transition duration-500 hover:-translate-y-1 hover:bg-white/[0.04]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={meteor.image}
          alt={meteor.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full border border-white/[0.1] bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
          0{index + 1}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-xs uppercase tracking-[0.2em] text-white/60">
            {meteor.peak}
          </div>

          <h3 className="mt-2 text-2xl font-medium text-white">
            {meteor.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 grid grid-cols-2 gap-3 text-xs">
          <InfoItem label="Parent" value={meteor.parent} />
          <InfoItem label="Speed" value={meteor.speed} />
          <InfoItem label="Origin" value={meteor.origin} />
        </div>

        <p className="text-sm leading-7 text-foreground-secondary">
          {meteor.description}
        </p>

        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-primary">
            Why it matters
          </div>

          <p className="mt-2 text-xs leading-6 text-foreground-secondary">
            {meteor.significance}
          </p>
        </div>
      </div>
    </article>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </div>

      <div className="mt-1 text-xs text-foreground">{value}</div>
    </div>
  );
}