
"use client";

import { telescopes } from "@/data/TelecopesData";
import { useState } from "react";
import {
  Telescope,
  Sparkles,
  ArrowDown,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

import Link from "next/link"; 
import Image from "next/image";
import telescopeHero from "@/assets/images/telescopes/telescope2.jpeg"

const comparisonImage =
  "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2022/10/STScI-01GFNQZAFP4YXE5X0JB9SXBFD9.png?fit=clip&h=966&w=2000";

const comparisonTelescopeIds = ["hubble", "webb"];

export default function SpaceTelescopesPage() {
  const [position, setPosition] = useState(50);
  const [revealed, setRevealed] = useState(false);

  const [selectedTelescope, setSelectedTelescope] = useState(
    telescopes.find((telescope) => telescope.id === "webb")?.id ??
      telescopes[0]?.id ??
      ""
  );

  const activeTelescope =
    telescopes.find(
      (telescope) => telescope.id === selectedTelescope
    ) ?? telescopes[0];

  const canCompare =
    activeTelescope &&
    comparisonTelescopeIds.includes(activeTelescope.id);

  if (!activeTelescope) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070a12] px-6 text-white">
        <p className="text-white/60">
          No telescope data is available yet.
        </p>
      </main>
    );
  }

  const newLocal = "−";
  return (
    <main className="min-h-screen overflow-hidden bg-[#070a12] text-white">
     
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/6 bg-[#070a12]">
        {/* Background image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={telescopeHero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
        </div>

        {/* Atmospheric overlays */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#070a12] via-[#070a12]/85 to-[#070a12]/25" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#070a12] via-transparent to-[#070a12]/30" />

        <div className="mx-auto grid min-h-162.5 max-w-7xl items-center gap-14 px-5 py-24 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-32">
          {/* Main content */}
          <div>
            <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#e7c98b]">
              <Telescope size={17} strokeWidth={1.5} />
              <span>Āfāq / Deep Space</span>
            </div>

            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-white/45 sm:text-xs">
              A different way of seeing the universe
            </p>

            <h1 className="max-w-3xl text-5xl font-light leading-[1.08] tracking-tight sm:text-7xl xl:text-8xl">
              The universe,
              <br />
              <span className="font-normal text-[#e7c98b]">
                unveiled in light.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-8 text-white/60 sm:text-base">
              From ancient cosmic light to the invisible energies
              of black holes, every observatory reveals a universe
              we could never see with our eyes alone.
            </p>

            <Link
              href="#choose-telescope"
              className="group mt-9 inline-flex min-h-12 items-center gap-4 border-b border-[#e7c98b]/50 pb-3 text-sm text-[#e7c98b] transition hover:border-[#e7c98b] hover:text-white"
            >
              Explore the observatories
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />
            </Link>
          </div>

          {/* Wavelength panel */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-sm border-l border-white/15 pl-7">
              <p className="mb-7 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Beyond visible light
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="h-8 w-px bg-[#e7c98b]" />
                  <div>
                    <p className="text-sm text-white/90">Infrared</p>
                    <p className="mt-1 text-xs text-white/40">
                      See through cosmic dust
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="h-8 w-px bg-violet-400" />
                  <div>
                    <p className="text-sm text-white/90">X-ray</p>
                    <p className="mt-1 text-xs text-white/40">
                      Reveal extreme cosmic energy
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="h-8 w-px bg-sky-300" />
                  <div>
                    <p className="text-sm text-white/90">Gamma-ray</p>
                    <p className="mt-1 text-xs text-white/40">
                      Explore the most energetic events
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-9 border-t border-white/10 pt-5 text-xs leading-6 text-white/35">
                One universe. Many windows into the unknown.
              </p>
            </div>
          </div>
        </div>
      </section>


    
    {/* Telescope Selection */}
    <section
      id="choose-telescope"
      className="mx-auto max-w-7xl scroll-mt-10 px-5 py-16 sm:px-10 sm:py-24"
    >
      {/* Section heading */}
      <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-[10px] tracking-[0.3em] text-violet-300 sm:text-xs">
            THE OBSERVATORIES
          </p>

          <h2 className="text-3xl font-light leading-tight sm:text-5xl">
            One universe.
            <br />
            <span className="text-[#e7c98b]">
              Different ways to see it.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-white/45">
          Choose an observatory to discover what it observes,
          which cosmic mysteries it investigates, and how it
          reveals what human eyes cannot see.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)]">
        {/* Observatory navigation */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          aria-label="Choose an observatory"
        >
          {telescopes.map((telescope, index) => {
            const isActive =
              selectedTelescope === telescope.id;

            const color = telescope.color || "#e7c98b";

            return (
              <button
                key={telescope.id}
                type="button"
                onClick={() => {
                  setSelectedTelescope(telescope.id);
                  setRevealed(false);
                }}
                aria-pressed={isActive}
                className={`group relative min-w-52 flex-1 overflow-hidden rounded-xl border p-4 text-left transition duration-300 lg:min-w-0 ${
                  isActive
                    ? "border-white/20 bg-white/[0.07]"
                    : "border-white/[0.07] bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.04]"
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 w-[2px]"
                    style={{ backgroundColor: color }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg border text-lg"
                    style={{
                      color,
                      borderColor: `${color}35`,
                      backgroundColor: `${color}0d`,
                    }}
                  >
                    {telescope.icon || "✧"}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white/90">
                      {telescope.name}
                    </p>

                    <p
                      className="mt-1 truncate text-[9px] tracking-[0.12em]"
                      style={{ color }}
                    >
                      {telescope.type}
                    </p>
                  </div>

                  <span
                    className={`text-sm transition ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                    style={{ color }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected observatory */}
        <div
          key={activeTelescope.id}
          aria-live="polite"
          className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f19] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
        >
          {/* Visual header */}
          <div className="relative flex min-h-48 items-end overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(ellipse_at_75%_25%,rgba(167,139,250,0.16),transparent_55%),linear-gradient(135deg,#111827,#080b13)] p-6 sm:min-h-60 sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-16 size-64 rounded-full border border-white/[0.06]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 top-0 size-48 rounded-full border border-white/[0.06]"
            />

            <div className="relative">
              <p
                className="mb-3 text-[10px] tracking-[0.3em]"
                style={{
                  color: activeTelescope.color || "#e7c98b",
                }}
              >
                OBSERVATORY {String(
                  telescopes.findIndex(
                    (item) => item.id === activeTelescope.id
                  ) + 1
                ).padStart(2, "0")}
              </p>

              <h3 className="max-w-2xl text-3xl font-light leading-tight sm:text-5xl">
                {activeTelescope.name}
              </h3>

              <p className="mt-2 max-w-xl text-sm text-white/45">
                {activeTelescope.fullName}
              </p>
            </div>

            <span
              className="absolute right-6 top-6 text-4xl opacity-70 sm:right-9 sm:top-9 sm:text-5xl"
              style={{
                color: activeTelescope.color || "#e7c98b",
              }}
              aria-hidden="true"
            >
              {activeTelescope.icon || "✧"}
            </span>
          </div>

          {/* Information */}
          <div className="p-6 sm:p-9">
            <p
              className="mb-3 text-[10px] tracking-[0.22em]"
              style={{
                color: activeTelescope.color || "#e7c98b",
              }}
            >
              {activeTelescope.type}
            </p>

            <h4 className="max-w-2xl text-xl font-light leading-relaxed sm:text-2xl">
              {activeTelescope.headline || activeTelescope.name}
            </h4>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              {activeTelescope.description}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/8 bg-white/2 p-4">
                <p className="text-[9px] tracking-[0.2em] text-white/35">
                  OBSERVES
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {activeTelescope.sees || "Cosmic radiation"}
                </p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/2 p-4">
                <p className="text-[9px] tracking-[0.2em] text-white/35">
                  MISSION
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {activeTelescope.mission || "Space observatory"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6">
              <p className="max-w-sm text-xs leading-6 text-white/35">
                Every wavelength reveals a different piece
                of the cosmic story.
              </p>

              {activeTelescope.canCompare ? (
                <Link
                  href="#comparison"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7c98b]/35 px-5 py-3 text-xs text-[#e7c98b] transition hover:border-[#e7c98b] hover:bg-[#e7c98b]/10"
                >
                  Compare observatories
                  <ArrowUpRight size={15} />
                </Link>
              ) : (
                <span className="text-xs text-white/30">
                  Dedicated observation experience
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

{/* Interactive Hubble and Webb Comparison */}
      <section
        id="comparison"
        className="mx-auto max-w-6xl scroll-mt-10 px-5 py-12 sm:px-10 sm:py-20"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs tracking-[0.25em] text-violet-300">
              OBSERVATION 001
            </p>

            <h2 className="text-3xl font-light sm:text-4xl">
              Pillars of Creation
            </h2>

            <p className="mt-3 text-sm text-white/50">
              Eagle Nebula · Approximately 6,500 light-years away
            </p>
          </div>

          <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50">
            Hubble vs. Webb
          </span>
        </div>

        <p className="mb-6 max-w-2xl text-sm leading-7 text-white/55">
          Move the divider to compare the visible-light and infrared
          views of this star-forming region.
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d111c]">
          <div className="relative aspect-square w-full select-none overflow-hidden sm:aspect-[4/3]">
            <div
              role="img"
              aria-label="Hubble and Webb views of the Pillars of Creation"
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${comparisonImage}")`,
                backgroundSize: "200% 100%",
                backgroundPosition: "left center",
              }}
            />

            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${comparisonImage}")`,
                backgroundSize: "200% 100%",
                backgroundPosition: "right center",
                clipPath: `inset(0 0 0 ${position}%)`,
              }}
            />

            <div className="absolute left-3 top-3 z-10 rounded-lg border border-white/15 bg-black/60 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6">
              <p className="text-xs font-medium text-white">
                HUBBLE
              </p>
              <p className="mt-1 text-[10px] text-white/60">
                Visible light
              </p>
            </div>

            <div className="absolute right-3 top-3 z-10 rounded-lg border border-[#e7c98b]/30 bg-black/60 px-3 py-2 text-right backdrop-blur-md sm:right-6 sm:top-6">
              <p className="text-xs font-medium text-[#e7c98b]">
                JAMES WEBB
              </p>
              <p className="mt-1 text-[10px] text-white/60">
                Infrared
              </p>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-white"
              style={{ left: `${position}%` }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-[#0d111c]/90 shadow-xl">
                <span className="text-lg text-[#e7c98b]">
                  ↔
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(event) =>
                setPosition(Number(event.target.value))
              }
              aria-label="Move the divider to compare Hubble and Webb"
              className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-4 sm:px-6">
            <span className="text-xs text-white/50">
              Hubble view
            </span>

            <span className="text-center text-xs text-[#e7c98b]">
              Drag to reveal
            </span>

            <span className="text-xs text-white/50">
              Webb view
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs leading-6 text-white/35">
          NASA's official side-by-side comparison image. The slider
          reveals the two halves of the published image; it does not
          process telescope data.
        </p>
      </section>

      {/* Scientific Explanation */}
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e7c98b]/20 bg-[#e7c98b]/5 text-[#e7c98b]">
              <Sparkles size={22} />
            </div>

            <p className="mb-3 text-xs tracking-[0.25em] text-violet-300">
              THE SCIENCE BEHIND THE IMAGE
            </p>

            <h2 className="text-3xl font-light leading-tight sm:text-4xl">
              What was hidden
              <br />
              in the dust?
            </h2>

            <p className="mt-5 leading-8 text-white/55">
              The same cosmic landscape can reveal different details
              depending on the wavelengths of light we observe.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-medium text-white">
                  Hubble
                </p>

                <p className="text-sm leading-7 text-white/55">
                  Hubble's visible-light observations reveal intricate
                  layers of gas and dust in the pillars, while dense
                  regions can obscure stars forming within them.
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-[#e7c98b]">
                  James Webb
                </p>

                <p className="text-sm leading-7 text-white/55">
                  Webb's infrared observations reveal additional stars
                  and structures within and around the dusty pillars,
                  helping astronomers study star formation.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setRevealed((current) => !current)
              }
              aria-expanded={revealed}
              className="mt-8 flex w-full items-center justify-between rounded-xl border border-violet-300/20 px-4 py-4 text-left text-sm transition hover:bg-violet-300/5"
            >
              <span>
                {revealed
                  ? "Hide the discovery"
                  : "Reveal the discovery"}
              </span>

              <span className="text-[#e7c98b]">
                {revealed ? newLocal : "+"}
              </span>
            </button>

            {revealed && (
              <div className="mt-5 border-l border-[#e7c98b]/50 pl-4">
                <p className="text-sm leading-7 text-white/70">
                  The Pillars of Creation are part of the Eagle Nebula,
                  a region where stars form from gas and dust. Infrared
                  observations can reveal features that visible light
                  cannot easily show through dense dust. The two
                  telescopes provide complementary views, rather than
                  one simply replacing the other.
                </p>
              </div>
            )}
          </div>
        </div>

        <Link
          href="https://science.nasa.gov/asset/webb/pillars-of-creation-hubble-and-webb-images-side-by-side/"
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-[#e7c98b]"
        >
          Explore the original NASA source
          <ExternalLink size={14} />
        </Link>
      </section>
    </main>
  );
}
