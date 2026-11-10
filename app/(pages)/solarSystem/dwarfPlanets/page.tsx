"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  CircleDot,
  Orbit,
  Sparkles,
  Telescope,
  Snowflake,
} from "lucide-react";

import ceres from "@/assets/images/dwarf-planets/ceres.jpg";
import pluto from "@/assets/images/dwarf-planets/pluto.jpg";
import eris from "@/assets/images/dwarf-planets/eris.jpeg";
import haumea from "@/assets/images/dwarf-planets/haumea.jpeg";
import makemake from "@/assets/images/dwarf-planets/makemake.jpeg";
import Link from "next/link";

const dwarfPlanets = [
  {
    name: "Pluto",
    type: "Dwarf Planet",
    region: "Kuiper Belt",
    diameter: "2,377 km",
    year: "248 Earth years",
    description:
      "A distant icy world with mountains, plains, glaciers, and a surprisingly complex atmosphere.",
    image: pluto,
  },
  {
    name: "Ceres",
    type: "Dwarf Planet",
    region: "Asteroid Belt",
    diameter: "940 km",
    year: "4.6 Earth years",
    description:
      "The smallest recognized dwarf planet and the largest object in the asteroid belt.",
    image: ceres,
  },
  {
    name: "Eris",
    type: "Dwarf Planet",
    region: "Scattered Disc",
    diameter: "2,326 km",
    year: "558 Earth years",
    description:
      "One of the most massive known dwarf planets, orbiting far beyond Neptune in the Solar System's outer regions.",
    image: eris,
  },
  {
    name: "Haumea",
    type: "Dwarf Planet",
    region: "Kuiper Belt",
    diameter: "≈1,560 km",
    year: "284 Earth years",
    description:
      "A rapidly rotating world with an elongated shape and a small ring system.",
    image: haumea,
  },
  {
    name: "Makemake",
    type: "Dwarf Planet",
    region: "Kuiper Belt",
    diameter: "≈1,430 km",
    year: "305 Earth years",
    description:
      "A reddish, frozen world located deep within the Kuiper Belt beyond Neptune.",
    image: makemake,
  },
];

const facts = [
  {
    title: "Not Quite Planets",
    description:
      "Dwarf planets orbit the Sun and are massive enough to become nearly round, but they have not cleared their orbital neighborhoods.",
    icon: CircleDot,
  },
  {
    title: "Frozen Worlds",
    description:
      "Most known dwarf planets beyond Neptune are extremely cold and contain mixtures of ice and rock.",
    icon: Snowflake,
  },
  {
    title: "Outer Solar System",
    description:
      "Four of the five officially recognized dwarf planets are located in the distant regions beyond Neptune.",
    icon: Orbit,
  },
];

const timeline = [
  {
    year: "1801",
    title: "Ceres",
    text: "Giuseppe Piazzi discovered Ceres between the orbits of Mars and Jupiter.",
  },
  {
    year: "1930",
    title: "Pluto",
    text: "Pluto was discovered by Clyde Tombaugh and was initially classified as the ninth planet.",
  },
  {
    year: "2003",
    title: "Eris",
    text: "The discovery of Eris helped trigger a major debate about what should count as a planet.",
  },
  {
    year: "2006",
    title: "A New Definition",
    text: "The International Astronomical Union formally established the category of dwarf planet.",
  },
];

export default function DwarfPlanetsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* ========================================================= */}
      {/* AMBIENT BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[150px]" />

        <div className="absolute right-[0%] top-[25%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[170px]" />

        <div className="absolute bottom-[-15%] left-[30%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[170px]" />

        <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] [background-size:75px_75px]" />
      </div>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative flex min-h-screen items-center px-6 pb-20 pt-32 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* HERO TEXT */}

          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                Distant • Icy • Mysterious
              </span>
            </div>

            <h1 className="max-w-3xl font-display text-6xl font-semibold leading-[0.95] tracking-[-0.055em] md:text-7xl lg:text-8xl">
              Dwarf
              <br />
              Planets
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-foreground-secondary md:text-lg">
              Small worlds with planetary personalities, drifting through the
              distant and mysterious regions of our Solar System.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#worlds"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                Explore the Worlds

                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>

              <a
                href="#definition"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-foreground-secondary backdrop-blur-xl transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                What Makes a Dwarf Planet?
              </a>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="relative mx-auto h-[540px] w-full max-w-[620px]">
            {/* Outer orbit */}

            <div className="absolute left-1/2 top-1/2 h-[470px] w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] rounded-[50%] border border-white/[0.05]" />

            <div className="absolute left-1/2 top-1/2 h-[360px] w-[530px] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] rounded-[50%] border border-white/[0.035]" />

            <div className="absolute left-1/2 top-1/2 h-[250px] w-[400px] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] rounded-[50%] border border-primary/[0.08]" />

            {/* Floating glow */}

            <div className="absolute right-[15%] top-[17%] h-[220px] w-[220px] rounded-full bg-primary/15 blur-[100px]" />

            {/* Pluto */}

            <div className="absolute right-[5%] top-1/2 z-10 h-[320px] w-[320px] -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_120px_rgba(120,90,255,0.2)] md:h-[390px] md:w-[390px]">
              <Image
                src={pluto}
                alt="Pluto dwarf planet"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 320px, 390px"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50" />

              <div className="absolute bottom-6 left-25 z-20 rounded-full border border-white/10 bg-black/50 px-4 py-2.5 backdrop-blur-xl">
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/50">
                  Featured World
                </p>

                <p className="mt-1 font-display text-sm font-medium text-white">
                  Pluto
                </p>
              </div>
            </div>

            {/* Small floating labels */}

            <div className="absolute left-[3%] top-[15%] z-20 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Distance
              </p>

              <p className="mt-1 text-sm text-white/90">
                Beyond Neptune
              </p>
            </div>

            <div className="absolute bottom-[12%] left-[12%] z-20 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Orbital Period
              </p>

              <p className="mt-1 text-sm text-white/90">248 years</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTRO */}
      {/* ========================================================= */}

      <section id="definition" className="px-6 py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {facts.map((fact) => {
            const Icon = fact.icon;

            return (
              <div
                key={fact.title}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.045]"
              >
                <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

                <div className="relative">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>

                  <h3 className="font-display text-xl">{fact.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-foreground-muted">
                    {fact.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* FIVE WORLDS */}
      {/* ========================================================= */}

      <section id="worlds" className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
                The Five Worlds
              </p>

              <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
                Dwarf Planets
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-foreground-muted">
              Five officially recognized dwarf planets reveal just how diverse
              the outer Solar System can be.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {dwarfPlanets.map((planet) => (
              <DwarfPlanetCard key={planet.name} planet={planet} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CERES SPECIAL SECTION */}
      {/* ========================================================= */}

      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/[0.08]">
            <Image
              src={ceres}
              alt="Ceres dwarf planet"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/5" />

            <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-xl">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/60">
                Dwarf Planet No. 1
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              The Exception
            </p>

            <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
              Ceres
              <br />
              between the worlds.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-foreground-secondary">
              Ceres is unique among the five recognized dwarf planets. While
              the others inhabit the distant outer Solar System, Ceres lives
              inside the asteroid belt between Mars and Jupiter.
            </p>

            <div className="mt-9 grid max-w-lg grid-cols-2 gap-3">
              <Stat label="Diameter" value="≈940 km" />
              <Stat label="Orbit" value="4.6 years" />
              <Stat label="Location" value="Asteroid Belt" />
              <Stat label="Discovery" value="1801" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* KUIPER BELT */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden px-6 py-32 lg:px-12">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] rotate-[-10deg]" />

        <div className="absolute left-1/2 top-1/2 h-[470px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] rotate-[-10deg]" />

        <div className="absolute left-1/2 top-1/2 h-[340px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/[0.08] rotate-[-10deg]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-primary">
            The Outer Frontier
          </p>

          <h2 className="font-display text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
            Beyond Neptune,
            <br />
            the Solar System changes.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-foreground-secondary">
            The Kuiper Belt is a vast region of icy bodies beyond Neptune. It
            is home to Pluto, Haumea, Makemake, and countless smaller objects.
          </p>

          <div className="mt-12 flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.08]">
                <Orbit className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TIMELINE */}
      {/* ========================================================= */}

      <section className="px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-primary">
              A Changing Definition
            </p>

            <h2 className="font-display text-4xl tracking-[-0.04em] md:text-5xl">
              From planets to dwarf worlds.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[15px] top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:block" />

            <div className="space-y-5">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="grid gap-6 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl md:grid-cols-[110px_1fr] md:pl-10"
                >
                  <div className="font-display text-2xl text-primary/80">
                    {item.year}
                  </div>

                  <div>
                    <h3 className="font-display text-xl">{item.title}</h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground-secondary">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <section className="px-6 pb-32 pt-16 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] px-7 py-16 text-center backdrop-blur-xl md:px-12 md:py-24">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-[110px]" />

          <div className="relative">
            <div className="mx-auto mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Telescope className="h-5 w-5 text-primary" />
            </div>

            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-primary">
              Keep Exploring
            </p>

            <h2 className="mx-auto max-w-3xl font-display text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
              There are still worlds
              <br />
              waiting in the dark.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-foreground-secondary">
              Explore the planets, moons, asteroids, and comets that make our
              cosmic neighborhood endlessly fascinating.
            </p>

            <Link
              href="/solarSystem"
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

function DwarfPlanetCard({
  planet,
}: {
  planet: {
    name: string;
    type: string;
    region: string;
    diameter: string;
    year: string;
    description: string;
    image: any;
  };
}) {
  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.12]">
      <div className="relative h-[280px] overflow-hidden">
        <Image
          src={planet.image}
          alt={planet.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-xl">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
            {planet.region}
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/40">
            {planet.type}
          </p>

          <h3 className="font-display text-2xl text-white">
            {planet.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 grid grid-cols-2 gap-3 border-b border-white/[0.06] pb-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
              Diameter
            </p>

            <p className="mt-1 text-sm text-white/80">
              {planet.diameter}
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
              Year
            </p>

            <p className="mt-1 text-sm text-white/80">{planet.year}</p>
          </div>
        </div>

        <p className="text-sm leading-7 text-foreground-muted">
          {planet.description}
        </p>

    
      </div>
    </article>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <p className="text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-2 text-sm text-white/85">{value}</p>
    </div>
  );
}