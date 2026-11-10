
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,

  ChevronRight,

  Orbit,
  RotateCcw,
  Search,
  Sparkles,

  Zap,
} from "lucide-react";
import { SPACE_IMAGES, categories, facts } from "@/data/SpaceFactsData";
import CosmicQuestions from "@/components/ui/cosmicQuestions/CosmicQuestions";

export default function SpaceFactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFactId, setExpandedFactId] = useState<string | null>(null);

  const featuredFact =
    facts.find((fact) => fact.id === "sunlight") ?? facts[0];

  const categoryFilters = useMemo(() => {
    const unique = new Map<string, string>();

    facts.forEach((fact) => {
      if (!unique.has(fact.categoryId)) {
        unique.set(fact.categoryId, fact.category);
      }
    });

    return Array.from(unique, ([id, label]) => ({ id, label }));
  }, []);

const filteredFacts = useMemo(() => {
  const query = searchQuery.trim().toLowerCase();

  return facts.filter((fact) => {
    const matchesCategory =
      activeCategory === "all" ||
      fact.categoryId === activeCategory;

    const searchableText = [
      fact.title,
      fact.description,
      fact.category,
      fact.highlight ?? "",
      fact.highlightLabel ?? "",
      fact.source,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);

    return matchesCategory && matchesSearch;
  });
}, [searchQuery, activeCategory]);
  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070a12] text-white selection:bg-violet-400/30">
      {/* HERO — A WINDOW INTO THE UNIVERSE */}
      <section className="relative isolate flex min-h-170 items-center overflow-hidden sm:min-h-195">
        <Image
          src={SPACE_IMAGES.hero}
          alt="Saturn and its rings in the depths of space"
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[58%_center]"
        />

        <div className="absolute inset-0 -z-20 bg-linear-to-r from-[#070a12] via-[#070a12]/75 to-[#070a12]/10" />
        <div className="absolute inset-0 -z-20 bg-linear-to-t from-[#070a12] via-transparent to-[#070a12]/20" />

        <div className="absolute right-[8%] top-[18%] -z-10 hidden h-64 w-64 rounded-full border border-white/8 lg:block" />
        <div className="absolute right-[12%] top-[22%] -z-10 hidden h-48 w-48 rounded-full border border-[#e7c98b]/10 lg:block" />

        <div className="mx-auto w-full max-w-360 px-6 pb-24 pt-32 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7c98b]/30 bg-black/20 text-[#e7c98b]">
                <Orbit size={17} />
              </span>
              <div>
                <p className="text-[11px] tracking-[0.28em] text-[#e7c98b]">
                  ĀFĀQ / FIELD NOTES
                </p>
                <p className="mt-1 text-xs text-white/50">
                  A little closer to the extraordinary
                </p>
              </div>
            </div>

            <h1 className="max-w-3xl text-5xl font-medium leading-[1.08] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
              Reality is more
              <span className="block font-serif italic font-normal text-[#e7c98b]">
                extraordinary
              </span>
              than fiction.
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              From worlds where a day outlasts a year to stars that compress
              the unimaginable into a tiny space — the universe never stops
              surprising us.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#discover"
                className="group inline-flex items-center gap-3 rounded-full bg-[#e7c98b] px-6 py-3.5 text-sm font-semibold text-[#11121a] transition hover:bg-[#f1ddb0]"
              >
                Begin exploring
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#cosmic-numbers"
                className="inline-flex items-center gap-2 px-2 py-3 text-sm text-white/75 transition hover:text-white"
              >
                Take a closer look
                <ArrowDown size={15} />
              </Link>
            </div>
          </div>

          <div className="mt-20 flex max-w-3xl flex-wrap items-end justify-between gap-5 border-t border-white/15 pt-5">
            <div>
              <p className="text-[10px] tracking-[0.22em] text-white/40">
                YOUR UNIVERSE, REIMAGINED
              </p>
              <p className="mt-2 text-sm text-white/70">
                Observe · Question · Discover
              </p>
            </div>
            <p className="text-xs tracking-[0.12em] text-white/40">
              01 — ENDLESS CURIOSITY
            </p>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-violet-300">
              THE UNIVERSE, IN PERSPECTIVE
            </p>
            <h2 className="mt-5 max-w-md text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
              Some truths sound
              <span className="font-serif italic text-[#e7c98b]">
                {" "}impossible.
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-8 text-white/55 md:justify-self-end md:text-base">
            Space is not just a collection of planets and stars. It is a place
            of extreme distances, unexpected physics, and phenomena that
            challenge our intuition. Here are a few reasons to look up again.
          </p>
        </div>
      </section>

      {/* COSMIC NUMBERS — EDITORIAL, NOT A GRID OF CARDS */}
      <section
        id="cosmic-numbers"
        className="border-y border-white/8 bg-[#0b0e18] px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[11px] tracking-[0.24em] text-[#e7c98b]">
                A DIFFERENT SCALE OF REALITY
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                Let the numbers speak.
              </h2>
            </div>
            <span className="text-xs text-white/40">
              SELECTED COSMIC FACTS
            </span>
          </div>

          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {facts.slice(0, 3).map((fact, index) => (
              <article
                key={fact.id}
                className={`relative py-8 ${
                  index !== 0 ? "border-t border-white/10 sm:border-t-0" : ""
                } ${
                  index === 2
                    ? "sm:col-span-2 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-8"
                    : ""
                }`}
              >
                <span className="text-[10px] tracking-[0.22em] text-violet-300">
                  0{index + 1} / {fact.category}
                </span>

                <p className="mt-7 wrap-break-words text-4xl font-medium tracking-[-0.045em] text-[#e7c98b] sm:text-5xl">
                  {fact.highlight ?? "∞"}
                </p>

                <p className="mt-3 text-[10px] tracking-[0.16em] text-white/40">
                  {fact.highlightLabel ?? "A COSMIC DISCOVERY"}
                </p>

                <p className="mt-6 max-w-xs text-sm leading-7 text-white/65">
                  {fact.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE STORY */}
      {featuredFact && (
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <Sparkles size={16} className="text-[#e7c98b]" />
              <p className="text-[11px] tracking-[0.24em] text-[#e7c98b]">
                ONE THING WORTH KNOWING
              </p>
            </div>

            <article className="grid overflow-hidden rounded-4xlborder border-white/10 bg-[#0d111c] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-75 overflow-hidden sm:min-h-110">
                <Image
                  src={featuredFact.image}
                  alt={featuredFact.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition duration-700 hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0d111c]/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-md">
                  <Zap size={14} className="text-[#e7c98b]" />
                  <span className="text-[10px] tracking-[0.16em]">
                    COSMIC SPOTLIGHT
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-[10px] tracking-[0.22em] text-violet-300">
                  {featuredFact.category}
                </p>

                <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  {featuredFact.title}
                </h2>

                <p className="mt-5 text-sm leading-8 text-white/55">
                  {featuredFact.description}
                </p>

                {featuredFact.highlight && (
                  <div className="mt-8 border-l border-[#e7c98b]/50 pl-4">
                    <p className="text-2xl font-medium text-[#e7c98b]">
                      {featuredFact.highlight}
                    </p>
                    {featuredFact.highlightLabel && (
                      <p className="mt-1 text-[10px] tracking-[0.16em] text-white/40">
                        {featuredFact.highlightLabel}
                      </p>
                    )}
                  </div>
                )}

                <p className="mt-8 text-xs text-white/35">
                  Source: {featuredFact.source}
                </p>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* CATEGORY EXPLORER */}
      <section
        id="discover"
        className="border-y border-white/8 bg-[#0b0e18] px-6 py-20 sm:px-10 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] tracking-[0.24em] text-violet-300">
                CHOOSE YOUR DESTINATION
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
                Where will curiosity take you?
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/45">
              Each corner of the cosmos has its own mysteries. Pick a path
              and follow it.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {categories.map((category, index) => {
              const featured = index === 0 || index === 3;

              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`group relative isolate min-h-62.5 overflow-hidden rounded-2xl border border-white/10 bg-[#111522] sm:min-h-72.5 ${
                    featured
                      ? "lg:col-span-7"
                      : "lg:col-span-5"
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#070a12] via-[#070a12]/25 to-transparent" />
                  <div className="absolute inset-0 bg-[#070a12]/10 transition group-hover:bg-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="mb-3 text-[10px] tracking-[0.2em] text-[#e7c98b]">
                          DESTINATION / 0{index + 1}
                        </p>
                        <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                          {category.name}
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                          {category.description}
                        </p>
                      </div>

                      <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 transition group-hover:border-[#e7c98b] group-hover:bg-[#e7c98b] group-hover:text-[#070a12]">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEARCHABLE FACT LIBRARY */}
      <section
        id="facts"
        className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-[11px] tracking-[0.24em] text-violet-300">
                THE FIELD GUIDE
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
                Collect moments of wonder.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                Search the collection, explore a subject, and find a fact
                you have never heard before.
              </p>
            </div>


          <label
            htmlFor="cosmic-fact-search"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d111c] px-4 py-4 transition focus-within:border-violet-300/50"
          >
            <Search
              size={18}
              aria-hidden="true"
              className="shrink-0 text-white/40"
            />

            <input
              id="cosmic-fact-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search planets, stars, mysteries..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-violet-300"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="shrink-0 text-white/50 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                
              </button>
            )}
          </label>

          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-3">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs transition ${
                activeCategory === "all"
                  ? "border-[#e7c98b] bg-[#e7c98b] text-[#070a12]"
                  : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              All discoveries
            </button>

            {categoryFilters.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs transition ${
                  activeCategory === category.id
                    ? "border-violet-300 bg-violet-300 text-[#070a12]"
                    : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-b border-white/10 pb-4">
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-xs text-white/45"
            >
              {filteredFacts.length}{" "}
              {filteredFacts.length === 1 ? "discovery" : "discoveries"} found
            </p>
            {(searchQuery || activeCategory !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 text-xs text-violet-300 transition hover:text-[#e7c98b]"
              >
                <RotateCcw size={13} />
                Reset filters
              </button>
            )}
          </div>

        
        {filteredFacts.map((fact, index) => {
          const isExpanded = expandedFactId === fact.id;
          const detailsId = `fact-details-${fact.id}`;

          return (
            <article
              key={fact.id}
              className="group border-b border-white/8 py-7 sm:py-9"
            >
              <div className="grid gap-5 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:gap-8">
                <div className="relative h-24 overflow-hidden rounded-xl">
                  <Image
                    src={fact.image}
                    alt={fact.alt}
                    fill
                    sizes="100px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] tracking-[0.18em] text-[#e7c98b]">
                      {fact.category}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-white/25"
                    />

                    <span className="text-[10px] text-white/35">
                      DISCOVERY {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-medium leading-snug sm:text-xl">
                    {fact.title}
                  </h3>


                  <p className="mt-2 max-w-3xl text-sm leading-7 text-white/55">
                    {fact.description}
                  </p>

                  {fact.highlight && (
                    <p className="mt-3 text-xs text-[#e7c98b]">
                      {fact.highlight}
                      {fact.highlightLabel && ` — ${fact.highlightLabel}`}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                  onClick={() =>
                    setExpandedFactId(isExpanded ? null : fact.id)
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 self-center rounded-full border border-white/15 px-4 text-xs text-white/70 transition hover:border-[#e7c98b]/60 hover:text-[#e7c98b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7c98b] sm:min-w-28"
                >
                  {isExpanded ? "Show less" : "Explore fact"}

                  <ChevronRight
                    aria-hidden="true"
                    size={16}
                    className={`transition-transform duration-300 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>

              {isExpanded && (
                <div
                  id={detailsId}
                  className="mt-6 rounded-2xl border border-white/10 bg-[#0d111c] p-5 sm:ml-33 sm:p-7"
                >
                  <p className="text-[10px] tracking-[0.2em] text-violet-300">
                    BEYOND THE DISCOVERY
                  </p>

                  <p className="mt-3 text-sm leading-8 text-white/70">
                    {fact.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="text-xs text-white/40">
                      Source: {fact.source}
                    </span>

                  </div>
                </div>
              )}
            </article>
          );
        })}

        </div>
      </section>

      {/* COSMIC CHECK — A REAL INTERACTION */}
        <CosmicQuestions/>
      {/* CLOSING */}
      <footer className="border-t border-white/8 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="text-sm font-medium tracking-[0.18em] text-[#e7c98b]"
          >
            ĀFĀQ
          </Link>
          <p className="max-w-md text-xs leading-6 text-white/35 sm:text-right">
            The more we discover, the more there is to wonder about.
            Keep looking up.
          </p>
        </div>
      </footer>
    </main>
  );
}
