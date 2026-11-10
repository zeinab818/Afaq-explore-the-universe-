"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Circle,
  CircleDot,
  Orbit,
  Sparkles,
  Star,
  Telescope,
  Zap,
} from "lucide-react";

import {
  galaxies,
  galaxyTypes,
  galaxyAnatomy,
  galaxyEvolution,
  GalaxiesFewDetails,
} from "@/data/GalaxiesData";
import StarsBackground from "@/components/ui/starsBacground/StarsBackground";
import Orbits from "@/components/ui/Orbit/Orbits";
import InfoCard from "@/components/ui/InfoCard/InfoCard";
import EvolutionItem from "@/components/ui/MiniStat/MiniStat";
import AnatomyHotspot from "@/components/ui/AnatomyHotspot/AnatomyHotspot";
import MiniStat from "@/components/ui/MiniStat/MiniStat";

export default function GalaxiesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeGalaxy = galaxies[activeIndex];

  const nextGalaxy = () => {
    setActiveIndex((current) => (current + 1) % galaxies.length);
  };

  const previousGalaxy = () => {
    setActiveIndex(
      (current) => (current - 1 + galaxies.length) % galaxies.length,
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-screen overflow-hidden">
        <StarsBackground />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
            {/* Hero content */}
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/2.5 px-4 py-2 backdrop-blur-xl">
                <Orbit className="h-3.5 w-3.5 text-primary" />

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground-muted">
                  Deep Space · Galactic Worlds
                </span>
              </div>

              <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
                Galaxies
                <span className="mt-2 block bg-linear-to-r from-foreground via-foreground/80 to-foreground-muted bg-clip-text text-transparent">
                  Islands of stars
                </span>
                <span className="block text-primary">across the universe.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-8 text-foreground-secondary sm:text-lg">
                Vast cosmic structures containing stars, planets, gas, dust,
                black holes, and dark matter — all bound together by gravity
                across unimaginable distances.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#showcase"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]"
                >
                  Explore galaxies
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </Link>

                <div className="flex items-center gap-3 px-2 text-sm text-foreground-muted">
                  <CircleDot className="h-4 w-4" />

                  <span>From our Milky Way to distant worlds</span>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-140">
              <div className="absolute inset-[-15%] rounded-full bg-primary/8 blur-[110px]" />

              <div className="relative aspect-square">
                <Orbits />
                {/* Galaxy */}
                <div className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_100px_rgba(150,100,255,0.22)]">
                  <Image
                    src={galaxies[0].image}
                    alt={galaxies[0].name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, 450px"
                  />

                  <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/30" />
                </div>

                {/* Label */}
                <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 rounded-full border border-white/8 bg-black/40 px-5 py-3 text-center backdrop-blur-xl">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-foreground-muted">
                    Our home galaxy
                  </p>

                  <p className="mt-1 font-display text-sm text-white">
                    {galaxies[0].name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <Link
          href="#showcase"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground-muted"
        >
          <span className="text-[9px] uppercase tracking-[0.35em]">
            Scroll to explore
          </span>

          <ArrowDown className="h-4 w-4 animate-bounce" />
        </Link>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="border-y border-white/6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/6 lg:grid-cols-4">
          {GalaxiesFewDetails.map(([value, label]) => (
            <div key={label} className="px-6 py-8 text-center sm:px-10">
              <p className="font-display text-xl tracking-tight sm:text-2xl">
                {value}
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SHOWCASE
      ========================================================= */}
      <section id="showcase" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                01 · Galactic Showcase
              </span>
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Worlds of stars
              <span className="block text-foreground-muted">
                beyond our own.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-foreground-secondary">
              Every galaxy has its own structure, history, and character.
              Explore some of the most remarkable galaxies known to us.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {galaxies.slice(0, 6).map((galaxy, index) => (
              <article
                key={galaxy.id}
                className={`group overflow-hidden rounded-4xl border border-white/[0.07] bg-white/2.5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14] ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "aspect-video" : "aspect-4/3"
                  }`}
                >
                  <Image
                    src={galaxy.image}
                    alt={galaxy.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-xl">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-white/70">
                      {galaxy.type}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-white/50">
                      {galaxy.catalog}
                    </p>

                    <h3 className="font-display text-2xl text-white sm:text-3xl">
                      {galaxy.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-foreground-secondary">
                    {galaxy.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <MiniStat label="Distance" value={galaxy.distance} />

                    <MiniStat label="Size" value={galaxy.size} />

                    <MiniStat
                      label="Constellation"
                      value={galaxy.constellation}
                    />

                    <MiniStat label="Age" value={galaxy.age} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          GALAXY TYPES
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="absolute inset-0 bg-linear-to-b from-primary/2 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                02 · Classification
              </span>

              <span className="h-px w-8 bg-primary/60" />
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Four ways
              <span className="block text-foreground-muted">
                to shape a galaxy.
              </span>
            </h2>

            <p className="mt-6 leading-7 text-foreground-secondary">
              Galaxies come in several major forms, each revealing something
              about its history and evolution.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galaxyTypes.map((type, index) => (
              <article
                key={type.id}
                className="group relative overflow-hidden rounded-4xl border border-white/[0.07] bg-white/2.5"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute left-5 top-5">
                    <span className="font-display text-3xl text-white/50">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-2xl text-white">
                      {type.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs leading-6 text-foreground-secondary">
                    {type.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ANATOMY
      ========================================================= */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                03 · Galactic Anatomy
              </span>
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Inside a galaxy
              <span className="block text-foreground-muted">
                is an entire universe.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-foreground-secondary">
              A galaxy is not simply a collection of stars. It is a complex
              gravitational system made of many interconnected structures.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Galaxy visual */}
            <div className="relative aspect-16/10 overflow-hidden rounded-4xl border border-white/[0.07] bg-white/2.5">
              <Image
                src={galaxies[1].image}
                alt={`${galaxies[1].name} anatomy`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <div className="absolute inset-0 bg-black/10" />

              <AnatomyHotspot
                className="left-[50%] top-[49%]"
                title="Galactic Core"
              />

              <AnatomyHotspot className="left-[36%] top-[45%]" title="Bulge" />

              <AnatomyHotspot
                className="left-[72%] top-[36%]"
                title="Spiral Arms"
              />

              <AnatomyHotspot
                className="left-[22%] top-[70%]"
                title="Galactic Disk"
              />

              <AnatomyHotspot className="right-[8%] top-[12%]" title="Halo" />
            </div>

            {/* Anatomy details */}
            <div className="space-y-3">
              {galaxyAnatomy.map((item, index) => {
                const icons = [Sparkles, Circle, Orbit, Star, CircleDot, Zap];

                const Icon = icons[index % icons.length];

                return (
                  <div
                    key={item.id}
                    className="group rounded-3xl border border-white/6 bg-white/2.5 p-5 transition duration-300 hover:border-white/13"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3">
                        <Icon className="h-4 w-4 text-white/70" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] tracking-[0.2em] text-foreground-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <h3 className="font-display text-lg">{item.title}</h3>
                        </div>

                        <p className="mt-2 text-xs leading-6 text-foreground-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GALAXY EVOLUTION
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                04 · Galactic Evolution
              </span>

              <span className="h-px w-8 bg-primary/60" />
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Galaxies are
              <span className="block text-foreground-muted">
                constantly changing.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-7 text-foreground-secondary">
              Their structures evolve over billions of years through star
              formation, gravitational interactions, and galactic mergers.
            </p>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-1/2" />

            {galaxyEvolution.map((item) => (
              <EvolutionItem
                key={item.number}
                label={item.title}
                value={item.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          GALAXY EXPLORER
      ========================================================= */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  05 · Galaxy Explorer
                </span>
              </div>

              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Travel between galaxies.
              </h2>
            </div>

            <span className="hidden text-sm text-foreground-muted sm:block">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(galaxies.length).padStart(2, "0")}
            </span>
          </div>

          <div className="overflow-hidden rounded-4xl border border-white/[0.07] bg-white/2.5 backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              {/* Image */}
              <div className="relative min-h-120 overflow-hidden lg:min-h-150">
                <Image
                  key={activeGalaxy.id}
                  src={activeGalaxy.image}
                  alt={activeGalaxy.name}
                  fill
                  className="object-cover transition duration-700"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 sm:bottom-10 sm:left-10">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                    {activeGalaxy.type}
                  </p>

                  <h3 className="mt-3 font-display text-4xl text-white sm:text-6xl">
                    {activeGalaxy.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    {activeGalaxy.catalog}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-foreground-muted">
                    Galaxy Profile
                  </p>

                  <p className="mt-7 text-sm leading-7 text-foreground-secondary">
                    {activeGalaxy.description}
                  </p>

                  <div className="mt-10 grid grid-cols-2 gap-3">
                    <InfoCard label="Type" value={activeGalaxy.type} />

                    <InfoCard label="Distance" value={activeGalaxy.distance} />

                    <InfoCard
                      label="Constellation"
                      value={activeGalaxy.constellation}
                    />

                    <InfoCard label="Size" value={activeGalaxy.size} />

                    <InfoCard label="Age" value={activeGalaxy.age} />

                    <InfoCard label="Catalog" value={activeGalaxy.catalog} />
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-12 flex items-center justify-between border-t border-white/6 pt-6">
                  <button
                    onClick={previousGalaxy}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
                    aria-label="Previous galaxy"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {galaxies.map((galaxy, index) => (
                      <button
                        key={galaxy.id}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to ${galaxy.name}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? "w-8 bg-white"
                            : "w-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextGalaxy}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
                    aria-label="Next galaxy"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED GALAXIES
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  06 · Visual Archive
                </span>
              </div>

              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                A universe of shapes.
              </h2>
            </div>

            <ArrowUpRight className="hidden text-foreground-muted sm:block" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {galaxies.slice(2, 6).map((galaxy) => (
              <div
                key={galaxy.id}
                className="group relative aspect-4/5 overflow-hidden rounded-4xl border border-white/[0.07]"
              >
                <Image
                  src={galaxy.image}
                  alt={galaxy.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">
                    {galaxy.type}
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl text-white">
                      {galaxy.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/6 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Telescope className="mx-auto h-7 w-7 text-primary" />

          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-foreground-muted">
            Beyond the galaxies
          </p>

          <h2 className="mt-5 font-display text-5xl tracking-[-0.04em] sm:text-6xl">
            Some galaxies
            <span className="block text-foreground-muted">
              hide something darker.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-foreground-secondary">
            At the hearts of many galaxies lie some of the most extreme objects
            in the universe — supermassive black holes.
          </p>

          <Link
            href="/discover/black-holes"
            className="group mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition duration-300 hover:border-white/[0.18] hover:bg-white/6"
          >
            Discover Black Holes
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
            <span>Nebulae</span>

            <span>→</span>

            <span className="text-white">Galaxies</span>

            <span>→</span>

            <span>Black Holes</span>
          </div>
        </div>
      </section>
    </main>
  );
}
