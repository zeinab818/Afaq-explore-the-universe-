"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  CircleDot,

  Sparkles,
  Star,
  Telescope,
  Zap,
} from "lucide-react";

import sun from "@/assets/images/stars/sun.jpg";
import sizeComparison from "@/assets/images/stars/compared-sun-sirius-spica.jpeg";
import Orbits from "@/components/ui/Orbit/Orbits";

import StarsBackground from "@/components/ui/starsBacground/StarsBackground";
import { starsNames ,lifeStages, spectralClasses, stars ,finalDestinations,starsNum,StarLifeImages} from "@/data/StarsData";

import SunIcon from "@/components/ui/SunIcon/SunIcon";


export default function StarsPage() {
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
                  Deep Space · Stellar Objects
                </span>
              </div>

              <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
                Stars
                <span className="mt-2 block bg-linear-to-r from-foreground via-foreground/80 to-foreground-muted bg-clip-text text-transparent">
                  The lights that
                </span>
                <span className="block text-primary">shape the universe.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-8 text-foreground-secondary sm:text-lg">
                Massive spheres of plasma, forged by gravity and powered by
                nuclear fusion. Stars illuminate galaxies, create elements, and
                shape the cosmos around them.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#showcase"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]"
                >
                  Explore the stars
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </Link>

                <div className="flex items-center gap-3 px-2 text-sm text-foreground-muted">
                  <CircleDot className="h-4 w-4" />
                  <span>From our Sun to stellar giants</span>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-140">
              <div className="absolute inset-[-15%] rounded-full bg-primary/10 blur-[100px]" />

              <div className="relative aspect-square">
               <Orbits/>
                {/* Sun image */}
                <div className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/10 shadow-[0_0_90px_rgba(255,160,60,0.2)]">
                  <Image
                    src={sun}
                    alt="The Sun"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 65vw, 420px"
                  />

                  <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/30" />
                </div>

                {/* Label */}
                <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full border border-white/8 bg-black/40 px-5 py-3 text-center backdrop-blur-xl">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-foreground-muted">
                    Our star
                  </p>
                  <p className="mt-1 font-display text-sm text-white">The Sun</p>
                </div>
              </div>
            </div>
          </div>
        </div>

     
         <Link  href="#showcase" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground-muted">
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
          {starsNum.map(([value, label]) => (
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
          STELLAR SHOWCASE
      ========================================================= */}
      <section id="showcase" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                01 · Stellar Showcase
              </span>
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Meet the stars
              <span className="block text-foreground-muted">
                that light our sky.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-foreground-secondary">
              From nearby stellar neighbors to enormous supergiants, every
              star tells a different story of temperature, mass, distance, and
              evolution.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stars.map((star, index) => (
              <article
                key={star.name}
                className={`group relative overflow-hidden rounded-4xl border border-white/[0.07] bg-white/2.5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14] ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "aspect-video" : "aspect-4/3"
                  }`}
                >
                  <Image
                    src={star.image}
                    alt={star.name}
                    fill
                    className="object-contain transition duration-700 group-hover:scale-105"
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-xl">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-white/70">
                      {star.type}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">
                      {star.subtitle}
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-white sm:text-3xl">
                      {star.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-foreground-secondary">
                    {star.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/6 bg-white/2.5 p-3">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                        Distance
                      </p>
                      <p className="mt-1 text-sm">{star.distance}</p>
                    </div>

                    <div className="rounded-2xl border border-white/6 bg-white/2.5 p-3">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                        Temperature
                      </p>
                      <p className="mt-1 text-sm">{star.temperature}</p>
                    </div>

                    <div className="rounded-2xl border border-white/6 bg-white/2.5 p-3">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                        Magnitude
                      </p>
                      <p className="mt-1 text-sm">{star.magnitude}</p>
                    </div>

                    <div className="rounded-2xl border border-white/6 bg-white/2.5 p-3">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
                        Class
                      </p>
                      <p className="mt-1 text-sm">{star.type}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SIZE COMPARISON
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="absolute inset-0 bg-linear-to-b from-primary/2.5 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  02 · Stellar Scale
                </span>
              </div>

              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Our Sun is huge.
                <span className="mt-2 block text-foreground-muted">
                  But it is not a giant.
                </span>
              </h2>

              <p className="mt-6 leading-7 text-foreground-secondary">
                The Sun may dominate our sky, but compared with many stars,
                especially massive stars, it is relatively modest in size.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3">
                    <SunIcon />
                  </div>
                  <div>
                    <p className="text-sm font-medium">The Sun</p>
                    <p className="mt-1 text-xs leading-5 text-foreground-muted">
                      A G-type main-sequence star and the center of our Solar
                      System.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sirius</p>
                    <p className="mt-1 text-xs leading-5 text-foreground-muted">
                      A brilliant white star that is significantly larger than
                      our Sun.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Spica</p>
                    <p className="mt-1 text-xs leading-5 text-foreground-muted">
                      A massive, extremely hot stellar system that dwarfs the
                      Sun.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-white/2.5 p-3 shadow-2xl">
              <div className="relative overflow-hidden rounded-4xl">
                <Image
                  src={sizeComparison}
                  alt="Size comparison between the Sun, Sirius and Spica"
                  width={1600}
                  height={900}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-white/5" />
              </div>

              <div className="absolute bottom-7 left-7 rounded-full border border-white/10 bg-black/45 px-4 py-2.5 backdrop-blur-xl">
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/60">
                  Stellar size comparison
                </p>
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
              Read a star
              <span className="block text-foreground-muted">
                by its color.
              </span>
            </h2>

            <p className="mt-6 leading-7 text-foreground-secondary">
              Astronomers classify stars primarily by their spectral type.
              The sequence runs from the hottest blue stars to the coolest red
              stars.
            </p>
          </div>

          {/* Main sequence */}
          <div className="relative mb-10 overflow-hidden rounded-4xl border border-white/[0.07] bg-white/2.5 p-6 backdrop-blur-xl sm:p-10">
            <div className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-white/5 via-white/20 to-white/5" />

            <div className="relative grid grid-cols-7 gap-2">
              {spectralClasses.map((item) => (
                <div key={item.type} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] font-display text-xl sm:h-16 sm:w-16 sm:text-2xl">
                    {item.type}
                  </div>

                  <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-foreground-muted sm:text-[10px]">
                    {item.color}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-foreground-muted">
              <span>Hotter</span>
              <span>Cooler</span>
            </div>
          </div>

          {/* Classification cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {spectralClasses.map((item) => (
              <div
                key={item.type}
                className={`rounded-2xl border border-white/6 bg-white/2 p-5 ${
                  item.type === "G" ? "ring-1 ring-primary/20" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl">{item.type}</span>

                  {item.type === "G" && (
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-primary">
                      Sun
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs font-medium">{item.color}</p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.13em] text-foreground-muted">
                  {item.temperature}
                </p>

                <p className="mt-4 text-xs leading-5 text-foreground-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          LIFE CYCLE
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                04 · Stellar Evolution
              </span>
            </div>

            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              Every star has
              <span className="block text-foreground-muted">
                a story to tell.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-foreground-secondary">
              Stars are born, evolve, and eventually die. Their fate depends
              largely on one thing: their mass.
            </p>
          </div>

         
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lifeStages.map((stage, index) => {
          const Icon = stage.icon;
          const image = StarLifeImages[index];
          const isFinal = index === lifeStages.length - 1;

          return (
            <article
              key={stage.number}
              className="group relative isolate min-h-110 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D16] transition-all duration-700 hover:-translate-y-1 hover:border-violet-300/30"
            >
              {/* Background image */}
              <Image
                src={image.src}
                alt={stage.title}
                loading="lazy"
                fill
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-linear-to-b from-[#080A13]/20 via-[#080A13]/30 to-[#080A13] opacity-95 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute inset-0 bg-linear-to-tr from-violet-950/30 via-transparent to-[#D6BC91]/4" />

              {/* Soft image glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-400/10 blur-[90px] transition-all duration-700 group-hover:bg-violet-400/20" />

              {/* Card content */}
              <div className="relative flex min-h-110 flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-4xl text-[#F5F0E8]/80">
                      {stage.number}
                    </span>

                    <span className="h-px w-7 bg-[#D6BC91]/60" />

                    <span className="text-[9px] uppercase tracking-[0.28em] text-white/65">
                      Stage {stage.number}
                    </span>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[#E4D0AB] backdrop-blur-md transition-all duration-500 group-hover:border-violet-300/50 group-hover:bg-violet-400/10 group-hover:text-violet-200">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.3} />
                  </div>
                </div>

                <div className="mt-auto pt-24">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#D6BC91]" />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#D6BC91]">
                      {isFinal ? "The final chapter" : "Stellar evolution"}
                    </span>
                  </div>

                  <h3 className="max-w-sm font-serif text-3xl leading-tight tracking-tight text-[#F5F0E8] sm:text-4xl">
                    {stage.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
                    {stage.description}
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    <div className="h-px w-10 bg-linear-to-r from-[#D6BC91] to-violet-400 transition-all duration-500 group-hover:w-16" />
                    <span className="text-[9px] uppercase tracking-[0.24em] text-white/45">
                      {isFinal
                        ? "Different destinies"
                        : "A journey through the stars"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle frame */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/4" />
            </article>
          );
        })}
      </div>

        </div>
      </section>

      {/* =========================================================
          STELLAR DEATH
      ========================================================= */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-white/2.5">
            <div className="absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-purple-500/5" />

            <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                    05 · Stellar Death
                  </span>
                </div>

                <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                  Some stars
                  <span className="block text-foreground-muted">
                    don&apos;t fade quietly.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl leading-7 text-foreground-secondary">
                  Massive stars can end their lives in spectacular
                  supernovae—brief but unimaginably powerful explosions that
                  scatter newly forged elements across space.
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {finalDestinations.map((destination) => (
                    <div
                      key={destination.title}
                      className="rounded-2xl border border-white/6 bg-black/10 p-4"
                    >
                      <p className="font-display text-base">
                        {destination.title}
                      </p>
                      <p className="mt-2 text-[11px] leading-5 text-foreground-muted">
                        {destination.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supernova visual */}
              <div className="relative mx-auto aspect-square w-full max-w-105">
                <div className="absolute inset-0 rounded-full bg-primary/8 blur-[80px]" />

                <div className="absolute inset-[15%] rounded-full border border-white/5" />
                <div className="absolute inset-[27%] rounded-full border border-white/5" />
                <div className="absolute inset-[39%] rounded-full border border-white/4" />

                <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_60px_25px_rgba(255,255,255,0.25)]" />

                <div className="absolute left-1/2 top-1/2 h-[75%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-linear-to-b from-transparent via-white/30 to-transparent" />

                <div className="absolute left-1/2 top-1/2 h-[75%] w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-linear-to-b from-transparent via-white/20 to-transparent" />

                <div className="absolute left-[14%] top-[20%] h-2 w-2 rounded-full bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.6)]" />
                <div className="absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]" />
                <div className="absolute bottom-[17%] left-[22%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]" />
                <div className="absolute bottom-[22%] right-[19%] h-2 w-2 rounded-full bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAMOUS STARS
      ========================================================= */}
      <section className="border-t border-white/6 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  06 · Sky Highlights
                </span>
              </div>

              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Stars worth knowing.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-foreground-secondary">
              These stellar landmarks have guided observers, inspired
              mythology, and helped astronomers understand our universe.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {starsNames.map((item) => (
              <div
                key={item.name}
                className="group relative aspect-4/5 overflow-hidden rounded-4xl border border-white/[0.07]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">
                    {item.tag}
                  </p>

                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="font-display text-2xl text-white">
                      {item.name}
                    </h3>

                
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          NEXT DESTINATION
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
            Stars are only
            <span className="block text-foreground-muted">
              the beginning.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-foreground-secondary">
            Beyond individual stars lie enormous clouds of gas and dust,
            stellar nurseries, and some of the most beautiful structures in
            the cosmos.
          </p>

          <Link
            href="/nebulas"
            className="group mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-white/[0.1] bg-white/3 px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition duration-300 hover:border-white/[0.18] hover:bg-white/6"
          >
            Discover Nebulae
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <div className="mt-16 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.2em] text-foreground-muted">
            <span className="text-white">Stars</span>
            <span>→</span>
            <span>Nebulae</span>
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

