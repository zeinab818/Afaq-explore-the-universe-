"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StarsBackground from "@/components/ui/starsBacground/StarsBackground";
import Orbits from "@/components/ui/Orbit/Orbits";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Circle,
  CircleDot,
  Flame,
  Orbit,
  Sparkles,
  Star,
  Telescope,
  Zap,
} from "lucide-react";

import { nebulae, nebulaTypes ,nebulaFewDetails} from "@/data/NebulaeData";
import TimelineItem from "@/components/ui/TimelineItem/TimelineItem";
import InfoCard from "@/components/ui/InfoCard/InfoCard";
import Hotspot from "@/components/ui/Hotspot/Hotspot";
import AnatomyItem from "@/components/ui/AnatomyItem/AnatomyItem";
import ConnectionItem from "@/components/ui/ConnectionItem/ConnectionItem";
export default function NebulaePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeNebula = nebulae[activeIndex];

  const nextNebula = () => {
    setActiveIndex((current) => (current + 1) % nebulae.length);
  };

  const previousNebula = () => {
    setActiveIndex(
      (current) => (current - 1 + nebulae.length) % nebulae.length
    );
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-screen overflow-hidden">
        
        <StarsBackground/>
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
            {/* Hero content */}
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/2.5 px-4 py-2 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-primary" />

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground-muted">
                  Deep Space · Cosmic Clouds
                </span>
              </div>

              <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
                Nebulae

                <span className="mt-2 block bg-linear-to-r from-foreground via-foreground/80 to-foreground-muted bg-clip-text text-transparent">
                  Where stars
                </span>

                <span className="block text-primary">
                  are born and remembered.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-8 text-foreground-secondary sm:text-lg">
                Vast clouds of gas and dust drifting through interstellar
                space. Some give birth to new stars, while others preserve the
                remains of stellar lives long past.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#showcase"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]"
                >
                  Explore nebulae

                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </a>

                <div className="flex items-center gap-3 px-2 text-sm text-foreground-muted">
                  <CircleDot className="h-4 w-4" />

                  <span>Stellar nurseries & cosmic remnants</span>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-140">
              <div className="absolute inset-[-15%] rounded-full bg-primary/10 blur-[100px]" />

              <div className="relative aspect-square">
                <Orbits/>
                {/* Nebula */}
                <div className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_90px_rgba(150,100,255,0.2)]">
                  <Image
                    src={nebulae[8].image}
                    alt={nebulae[8].name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, 450px"
                  />

                  <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/30" />
                </div>

                {/* Label */}
                <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full border border-white/8 bg-black/40 px-5 py-3 text-center backdrop-blur-xl">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-foreground-muted">
                    Cosmic cloud
                  </p>

                  <p className="mt-1 font-display text-sm text-white">
                    {nebulae[8].name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll */}
        <Link href="#showcase" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground-muted">
          <span className="text-[9px] uppercase tracking-[0.35em]">
            Scroll to explore
          </span>

          <ArrowDown className="h-4 w-4 animate-bounce" />
        </Link>
      </section>

      {/* =========================================================
          INTRO STATS
      ========================================================= */}
      <section className="border-y border-white/6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/6 lg:grid-cols-4">
          {nebulaFewDetails.map(([value, label]) => (
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
          NEBULA SHOWCASE
      ========================================================= */}
      <section id="showcase" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                01 · Nebula Showcase
              </span>
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Meet the clouds

              <span className="block text-foreground-muted">
                that shape the cosmos.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-foreground-secondary">
              From glowing stellar nurseries to the silent remnants of
              exploded stars, nebulae take many forms across the universe.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {nebulaTypes.map((type, index) => (
              <article
                key={type.title}
                className={`group relative overflow-hidden rounded-4xl border border-white/7 bg-white/2.5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/14 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "aspect-video" : "aspect-4/3"
                  }`}
                >
                  <Image
                    src={type.image}
                    alt={type.title}
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
                      Nebula Type
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-display text-2xl text-white sm:text-3xl">
                      {type.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-foreground-secondary">
                    {type.description}
                  </p>

              
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          NEBULA EXPLORER
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="absolute inset-0 bg-linear-to-b from-primary/2.5 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  02 · Deep Space
                </span>
              </div>

              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Explore the nebulae

                <span className="block text-foreground-muted">
                  hidden across space.
                </span>
              </h2>
            </div>

            <span className="hidden text-sm text-foreground-muted sm:block">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(nebulae.length).padStart(2, "0")}
            </span>
          </div>

          <div className="overflow-hidden rounded-4xl border border-white/7 bg-white/2.5 backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              {/* Image */}
              <div className="relative min-h-120 overflow-hidden lg:min-h-150">
                <Image
                  key={activeNebula.image.src}
                  src={activeNebula.image}
                  alt={activeNebula.name}
                  fill
                  className="object-cover transition duration-700"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 sm:bottom-10 sm:left-10">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                    {activeNebula.type}
                  </p>

                  <h3 className="mt-3 font-display text-4xl text-white sm:text-6xl">
                    {activeNebula.name}
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    {activeNebula.catalog}
                  </p>
                </div>
              </div>

              {/* Information */}
              <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-foreground-muted">
                    Nebula Profile
                  </p>

                  <p className="mt-7 text-sm leading-7 text-foreground-secondary">
                    {activeNebula.description}
                  </p>

                  <div className="mt-10 grid grid-cols-2 gap-3">
                    <InfoCard
                      label="Type"
                      value={activeNebula.type}
                    />

                    <InfoCard
                      label="Distance"
                      value={activeNebula.distance}
                    />

                    <InfoCard
                      label="Constellation"
                      value={activeNebula.constellation}
                    />

                    <InfoCard
                      label="Approx. Size"
                      value={activeNebula.size}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-12 flex items-center justify-between border-t border-white/6 pt-6">
                  <button
                    onClick={previousNebula}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
                    aria-label="Previous nebula"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {nebulae.map((nebula, index) => (
                      <button
                        key={nebula.id}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to ${nebula.name}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? "w-8 bg-white"
                            : "w-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextNebula}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
                    aria-label="Next nebula"
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
          CLASSIFICATION
      ========================================================= */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                03 · Classification
              </span>

              <span className="h-px w-8 bg-primary/60" />
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Not every nebula

              <span className="block text-foreground-muted">
                tells the same story.
              </span>
            </h2>

            <p className="mt-6 leading-7 text-foreground-secondary">
              Nebulae are classified according to how they form, interact with
              light, and evolve through the life cycles of stars.
            </p>
          </div>

          {/* Classification visual */}
          <div className="relative mb-10 overflow-hidden rounded-4xl border border-white/7 bg-white/2.5 p-6 backdrop-blur-xl sm:p-10">
            <div className="absolute inset-x-10 top-1/2 hidden h-px -translate-y-1/2 bg-linear-to-r from-white/5 via-white/20 to-white/5 sm:block" />

            <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
              {nebulaTypes.map((type, index) => (
                <div key={type.title} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] sm:h-20 sm:w-20">
                    {index === 0 && (
                      <Sparkles className="h-6 w-6 text-primary" />
                    )}

                    {index === 1 && (
                      <Flame className="h-6 w-6 text-primary" />
                    )}

                    {index === 2 && (
                      <Orbit className="h-6 w-6 text-primary" />
                    )}

                    {index === 3 && (
                      <Zap className="h-6 w-6 text-primary" />
                    )}
                  </div>

                  <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-foreground-muted sm:text-[10px]">
                    {type.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Classification cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nebulaTypes.map((type, index) => (
              <div
                key={type.title}
                className={`rounded-2xl border border-white/6 bg-white/2.5 p-5 transition duration-300 hover:border-white/13 ${
                  index === 0 ? "ring-1 ring-primary/20" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl">
                    0{index + 1}
                  </span>

                  {index === 0 && (
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-primary">
                      Stellar
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm font-medium">
                  {type.title}
                </p>

                <p className="mt-4 text-xs leading-5 text-foreground-secondary">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ANATOMY
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                04 · Inside the Cloud
              </span>
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              A nebula is more

              <span className="block text-foreground-muted">
                than a cloud of color.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-foreground-secondary">
              Within these enormous structures are regions of gas, dust,
              dense cores, radiation, and young stars.
            </p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Visual */}
            <div className="relative aspect-16/10 overflow-hidden rounded-4xl border border-white/7 bg-white/2.5">
              <Image
                src={activeNebula.image}
                alt={`${activeNebula.name} anatomy`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />

              <div className="absolute inset-0 bg-black/20" />

              <Hotspot
                className="left-[25%] top-[30%]"
                title="Gas Clouds"
              />

              <Hotspot
                className="left-[58%] top-[25%]"
                title="Dust Lanes"
              />

              <Hotspot
                className="left-[72%] top-[62%]"
                title="Young Stars"
              />

              <Hotspot
                className="left-[40%] top-[68%]"
                title="Dense Core"
              />
            </div>

            {/* Information */}
            <div className="space-y-3">
              <AnatomyItem
                number="01"
                title="Gas Clouds"
                text="Vast regions of hydrogen, helium, and other elements form the main body of many nebulae."
                icon={Sparkles}
              />

              <AnatomyItem
                number="02"
                title="Dust Lanes"
                text="Tiny particles of cosmic dust absorb and scatter light, creating dramatic dark structures."
                icon={Circle}
              />

              <AnatomyItem
                number="03"
                title="Young Stars"
                text="Dense regions can collapse under gravity and eventually ignite new stars."
                icon={Star}
              />

              <AnatomyItem
                number="04"
                title="Dense Cores"
                text="Some of the coldest and densest regions become stellar nurseries."
                icon={Orbit}
              />
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-foreground-muted">
            Explore the structures hidden within these enormous cosmic clouds.
          </p>
        </div>
      </section>

      {/* =========================================================
          FORMATION TIMELINE
      ========================================================= */}
      <section className="relative py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-20 text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/60" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                05 · Cosmic Evolution
              </span>

              <span className="h-px w-8 bg-primary/60" />
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              How nebulae

              <span className="block text-foreground-muted">
                come to exist.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-7 text-foreground-secondary">
              Nebulae can be both the beginning and the aftermath of stellar
              evolution.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-1/2" />

            <TimelineItem
              number="01"
              title="Gas & Dust"
              text="Vast clouds of gas and microscopic dust drift through interstellar space."
              side="left"
            />

            <TimelineItem
              number="02"
              title="Gravity"
              text="Gravity gathers material into denser regions, creating the conditions for stars to form."
              side="right"
            />

            <TimelineItem
              number="03"
              title="Star Formation"
              text="Dense cores collapse and heat up until young stars begin to ignite."
              side="left"
            />

            <TimelineItem
              number="04"
              title="Stellar Evolution"
              text="Newly formed stars illuminate and reshape the surrounding gas and dust."
              side="right"
            />

            <TimelineItem
              number="05"
              title="Stellar Death"
              text="Some stars return their material to space through stellar winds or spectacular supernova explosions."
              side="left"
            />

            <TimelineItem
              number="06"
              title="A New Cosmic Cloud"
              text="The released material enriches space and can eventually become part of the next generation of stars."
              side="right"
              last
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          STELLAR CONNECTION
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  06 · Stellar Connection
                </span>
              </div>

              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Stars and nebulae

                <span className="block text-foreground-muted">
                  are part of one story.
                </span>
              </h2>

              <p className="mt-6 leading-7 text-foreground-secondary">
                Stars are born inside nebulae, spend their lives changing the
                material around them, and eventually return enriched material
                to space.
              </p>

              <div className="mt-10 space-y-5">
                <ConnectionItem
                  icon={Sparkles}
                  title="Nebula"
                  text="The birthplace of many stars."
                />

                <ConnectionItem
                  icon={Star}
                  title="Protostar"
                  text="A young star forming inside collapsing material."
                />

                <ConnectionItem
                  icon={Flame}
                  title="Main Sequence"
                  text="The long stable phase of a star's life."
                />

                <ConnectionItem
                  icon={Zap}
                  title="Stellar Death"
                  text="The moment a star transforms its surroundings."
                />
              </div>
            </div>

            {/* Visual */}
            <div className="relative mx-auto aspect-square w-full max-w-140">
              <div className="absolute inset-[8%] rounded-full border border-white/5" />

              <div className="absolute inset-[18%] rounded-full border border-white/4" />

              <div className="absolute inset-[28%] rounded-full border border-white/3.5" />

              <div className="absolute inset-[38%] rounded-full border border-white/3" />

              {/* Nebula center */}
              <div className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_90px_rgba(150,100,255,0.25)]">
                <Image
                  src={activeNebula.image}
                  alt={activeNebula.name}
                  fill
                  className="object-cover"
                  sizes="250px"
                />

                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Floating points */}
              <div className="absolute left-[12%] top-[35%] flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-black/40 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-white/70" />
              </div>

              <div className="absolute right-[12%] top-[25%] flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-black/40 backdrop-blur-xl">
                <Star className="h-4 w-4 text-white/70" />
              </div>

              <div className="absolute bottom-[15%] left-[18%] flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-black/40 backdrop-blur-xl">
                <Flame className="h-4 w-4 text-white/70" />
              </div>

              <div className="absolute bottom-[22%] right-[15%] flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-black/40 backdrop-blur-xl">
                <Zap className="h-4 w-4 text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY
      ========================================================= */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  07 · Visual Archive
                </span>
              </div>

              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Nebulae worth knowing.
              </h2>
            </div>

       
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {nebulae.slice(0, 4).map((nebula) => (
              <div
                key={nebula.id}
                className="group relative aspect-4/5 overflow-hidden rounded-4xl border border-white/7"
              >
                <Image
                  src={nebula.image}
                  alt={nebula.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">
                    {nebula.catalog}
                  </p>

                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="font-display text-2xl text-white">
                      {nebula.name}
                    </h3>

                  
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden border-t border-white/6 py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/6 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Telescope className="mx-auto h-7 w-7 text-primary" />

          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-foreground-muted">
            The universe continues
          </p>

          <h2 className="mt-5 font-display text-5xl tracking-[-0.04em] sm:text-6xl">
            Beyond the clouds

            <span className="block text-foreground-muted">
              lies an entire universe.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-foreground-secondary">
            From stellar nurseries to enormous galaxies and mysterious black
            holes, every discovery reveals another layer of the cosmos.
          </p>

          <Link
            href="/galaxies"
            className="group mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition duration-300 hover:border-white/[0.18] hover:bg-white/6"
          >
            Discover Galaxies

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
            <span>Stars</span>

            <span>→</span>

            <span className="text-white">Nebulae</span>

            <span>→</span>

            <span>Galaxies</span>

            <span>→</span>

            <span>Black Holes</span>
          </div>
        </div>
      </section>
    </main>
  );
}





