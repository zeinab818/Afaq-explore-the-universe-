"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  CircleDot,
  Gem,
  Orbit,
  Sparkles,
  Telescope,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import halley from "@/assets/images/comets/halley.jpg";
import haleBopp from "@/assets/images/comets/hale-bopp.jpg";
import neowise from "@/assets/images/comets/neowise.jpg";
import comet67p from "@/assets/images/comets/67p.jpg";
import encke from "@/assets/images/comets/encke.jpg";
import mcnaught from "@/assets/images/comets/mcnaught.jpeg";
import Link from "next/link";

const comets = [
  {
    name: "Halley's Comet",
    type: "Periodic Comet",
    period: "≈ 76 years",
    description:
      "One of the most famous comets in history, returning to the inner Solar System roughly every 76 years.",
    image: halley,
  },
  {
    name: "Hale–Bopp",
    type: "Long-Period Comet",
    period: "≈ 2,500 years",
    description:
      "A spectacular comet that became one of the most widely observed comets of the 20th century.",
    image: haleBopp,
  },
  {
    name: "C/2020 F3 NEOWISE",
    type: "Long-Period Comet",
    period: "≈ 6,800 years",
    description:
      "The bright comet that became a spectacular naked-eye object across the northern sky in 2020.",
    image: neowise,
  },
  {
    name: "67P / Churyumov–Gerasimenko",
    type: "Jupiter-Family Comet",
    period: "≈ 6.45 years",
    description:
      "The irregularly shaped comet explored in detail by ESA's Rosetta mission.",
    image: comet67p,
  },
  {
    name: "2P / Encke",
    type: "Periodic Comet",
    period: "≈ 3.3 years",
    description:
      "A short-period comet with one of the shortest known orbital periods.",
    image: encke,
  },
  {
    name: "C/2006 P1 McNaught",
    type: "Long-Period Comet",
    period: "≈ 92,600 years",
    description:
      "A spectacular comet famous for its enormous, sweeping tail visible from Earth in 2007.",
    image: mcnaught,
  },
];

const anatomy = [
  {
    title: "Nucleus",
    description:
      "The solid core of a comet, made primarily of ice, dust, and rocky material.",
    icon: CircleDot,
  },
  {
    title: "Coma",
    description:
      "A glowing cloud of gas and dust that forms around the nucleus as the comet approaches the Sun.",
    icon: Sparkles,
  },
  {
    title: "Dust Tail",
    description:
      "A bright tail of dust pushed away from the Sun by sunlight and solar radiation pressure.",
    icon: Wind,
  },
  {
    title: "Ion Tail",
    description:
      "A bluish stream of charged particles carried directly away from the Sun by the solar wind.",
    icon: Orbit,
  },
];

const missions = [
  {
    year: "1986",
    title: "Giotto",
    target: "Halley's Comet",
    description:
      "ESA's Giotto spacecraft flew close to Halley's nucleus and returned some of the first detailed images of a comet.",
  },
  {
    year: "2005",
    title: "Deep Impact",
    target: "Tempel 1",
    description:
      "NASA's mission released an impactor into comet Tempel 1 to study material beneath its surface.",
  },
  {
    year: "2014",
    title: "Rosetta",
    target: "67P",
    description:
      "ESA's Rosetta became the first spacecraft to orbit a comet and delivered the Philae lander to its surface.",
  },
];

export default function CometsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[8%] top-[8%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute right-[5%] top-[35%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[35%] h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[160px]" />

        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:70px_70px]" />
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
                Ice • Dust • Orbit
              </span>
            </div>

            <h1 className="max-w-3xl font-display text-6xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
              Comets
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-foreground-secondary md:text-lg">
              Ancient travelers of the Solar System, carrying frozen remnants
              of the material that formed our cosmic neighborhood billions of
              years ago.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#featured"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                Explore Comets

                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>

              <a
                href="#anatomy"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-foreground-secondary backdrop-blur-xl transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                How a Comet Works
              </a>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="relative mx-auto h-[500px] w-full max-w-[620px]">
            {/* Orbit */}

            <div className="absolute left-1/2 top-1/2 h-[440px] w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-[-17deg] rounded-[50%] border border-white/[0.06]" />

            <div className="absolute left-1/2 top-1/2 h-[340px] w-[540px] -translate-x-1/2 -translate-y-1/2 rotate-[-17deg] rounded-[50%] border border-white/[0.04]" />

            {/* Comet tail */}

            <div className="absolute left-[4%] top-[42%] h-[150px] w-[68%] -rotate-[14deg] rounded-full bg-gradient-to-r from-transparent via-purple-300/10 to-white/20 blur-2xl" />

            <div className="absolute left-[10%] top-[44%] h-[3px] w-[58%] -rotate-[14deg] bg-gradient-to-r from-transparent via-white/10 to-white/50 blur-[1px]" />

            {/* Comet image */}

            <div className="absolute right-[2%] top-1/2 z-10 h-[300px] w-[300px] -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_100px_rgba(140,100,255,0.2)] md:h-[370px] md:w-[370px]">
              <Image
                src={neowise}
                alt="Comet NEOWISE"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 300px, 370px"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />

              <div className="absolute bottom-5 left-5 z-20 rounded-full border border-white/10 bg-black/50 px-4 py-2.5 backdrop-blur-xl">
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/50">
                  Featured
                </p>

                <p className="mt-1 font-display text-sm font-medium text-white">
                  NEOWISE
                </p>
              </div>
            </div>

            {/* Small floating labels */}

            <div className="absolute left-[7%] top-[17%] z-20 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Tail
              </p>

              <p className="mt-1 text-sm text-white/90">Millions of km</p>
            </div>

            <div className="absolute bottom-[12%] left-[14%] z-20 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Composition
              </p>

              <p className="mt-1 text-sm text-white/90">Ice + Dust</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTRO STATS */}
      {/* ========================================================= */}

      <section className="px-6 py-24 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <InfoCard
            icon={Gem}
            label="Composition"
            value="Ice + Dust + Rock"
          />

          <InfoCard
            icon={Orbit}
            label="Orbital Types"
            value="Short & Long Period"
          />

          <InfoCard
            icon={Telescope}
            label="Closest Approach"
            value="Near the Sun"
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURED COMETS */}
      {/* ========================================================= */}

      <section id="featured" className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
                Cosmic Travelers
              </p>

              <h2 className="font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">
                Famous Comets
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-foreground-muted">
              From legendary periodic visitors to spectacular objects seen
              only once in thousands of years.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {comets.map((comet) => (
              <CometCard key={comet.name} comet={comet} />
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
            {/* LEFT */}

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
                Anatomy of a Comet
              </p>

              <h2 className="max-w-lg font-display text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                A frozen world that comes alive near the Sun.
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-8 text-foreground-secondary">
                A comet can transform dramatically as sunlight warms its icy
                surface. Gas and dust escape from the nucleus, creating the
                glowing coma and magnificent tails we see from Earth.
              </p>

              <div className="mt-10 h-px w-24 bg-primary/40" />
            </div>

            {/* RIGHT */}

            <div className="grid gap-4 sm:grid-cols-2">
              {anatomy.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
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
      {/* MISSIONS */}
      {/* ========================================================= */}

      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              Humanity Beyond Earth
            </p>

            <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
              Missions to the Comets
            </h2>
          </div>

          <div className="relative">
            {/* timeline */}

            <div className="absolute left-[15px] top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:block" />

            <div className="space-y-6">
              {missions.map((mission) => (
                <div
                  key={mission.title}
                  className="group relative grid gap-6 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] md:grid-cols-[100px_1fr_auto] md:items-center md:pl-10"
                >
                  <div className="font-display text-2xl text-primary/80">
                    {mission.year}
                  </div>

                  <div>
                    <h3 className="font-display text-xl">
                      {mission.title}
                    </h3>

                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground-muted">
                      {mission.target}
                    </p>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground-secondary">
                      {mission.description}
                    </p>
                  </div>

                  <ArrowUpRight className="hidden h-5 w-5 text-white/20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ORBIT VISUAL */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden px-6 py-32 lg:px-12">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] rotate-[-12deg]" />

        <div className="absolute left-1/2 top-1/2 h-[440px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] rotate-[-12deg]" />

        <div className="absolute left-1/2 top-1/2 h-[280px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/10 rotate-[-12deg]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-primary">
            Endless Journeys
          </p>

          <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
            Every comet follows
            <br />
            its own path.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-foreground-secondary">
            Some return within a few years. Others disappear into the darkness
            for thousands of years before their next encounter with the Sun.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-2xl" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
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
              The Solar System is full of stories waiting to be discovered.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-foreground-secondary">
              Follow the paths of planets, asteroids, comets, and the worlds
              beyond them.
            </p>

            <Link
              href="/solarSystem/"
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-white/[0.09]"
            >
              Explore the Solar System

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

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04]">
      <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <p className="text-[10px] uppercase tracking-[0.25em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-2 font-display text-xl text-white/90">{value}</p>
    </div>
  );
}

function CometCard({
  comet,
}: {
  comet: {
    name: string;
    type: string;
    period: string;
    description: string;
    image: any;
  };
}) {
  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.12]">
      <div className="relative h-[270px] overflow-hidden">
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
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
            Orbital Period
          </span>

          <span className="text-sm text-white/80">{comet.period}</span>
        </div>

        <p className="text-sm leading-7 text-foreground-muted">
          {comet.description}
        </p>

        <button className="group/btn mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white">
          Explore

          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}