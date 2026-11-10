import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Orbit,
  
  Telescope,

} from "lucide-react";

import { blackHolesCatalog } from "@/lib/black-holes/catalog";
import {
  blackHoleImages,
  getBlackHoleImage,
} from "@/lib/black-holes/images";
import {
  formatClass,
  formatDistance,
  formatMass,
} from "@/lib/black-holes/formatters";
import BlackHoleHero from "@/components/ui/black-holes/BlackHoleHero";
import {storyImages} from "@/data/BlackHolesStories"

function ImageCredit({
  credit,
  sourceUrl,
}: {
  credit: string;
  sourceUrl: string;
}) {
  return (
    <Link
      href={sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-[10px] leading-5 text-white/45 transition hover:text-amber-200"
    >
      {credit}
      <ArrowUpRight className="h-3 w-3 shrink-0" />
    </Link>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-amber-200/80">
      {children}
    </p>
  );
}
export default function BlackHolesPage() {
  const featured = blackHolesCatalog[0];
if (!featured) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070910] px-6 text-center text-white">
      <div>
        <p className="text-sm text-white/50">
          The discovery archive is currently empty.
        </p>
        <Link
          href="/discover"
          className="mt-5 inline-flex items-center gap-2 text-sm text-amber-200"
        >
          Back to Discover
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
 const heroImage = blackHoleImages.hero;
 

  return (
    <main className="min-h-screen overflow-hidden bg-[#06070c] text-white">
      <BlackHoleHero featured={featured} heroImage={heroImage} />

      {/* Intro */}
      <section
        id="black-hole-science"
        className="relative px-6 py-24 md:px-12 md:py-36 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionEyebrow>First, understand the mystery</SectionEyebrow>

            <h2 className="max-w-xl text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
              Not cosmic vacuums.
              <span className="mt-2 block text-white/40">
                Not just science fiction.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-2xl text-base leading-8 text-white/65 md:text-lg md:leading-9">
              A black hole is a region of spacetime whose gravity is so strong
              that, beyond its event horizon, nothing can escape to the
              outside—not even light.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
              We study black holes through their effects on nearby matter,
              light, and stars, and through observations that test our
              understanding of gravity.
            </p>

            <Link
              href="https://science.nasa.gov/universe/black-holes/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-amber-200/30 pb-2 text-sm text-amber-200 transition hover:border-amber-200"
            >
              Read the science
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Visual stories */}
      <section className="px-6 pb-28 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionEyebrow>Look closer</SectionEyebrow>
              <h2 className="text-3xl font-light tracking-tight md:text-5xl">
                Evidence in the darkness.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/45">
              Every image has a story. Some are observations; others are
              scientific illustrations that help explain what the data suggest.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {storyImages.map((story) => {
              const StoryIcon = story.icon;

              return (
                <article
                  key={story.number}
                  className="group overflow-hidden rounded-2xl border border-white/9 bg-white/2.5 transition duration-500 hover:border-white/20"
                >
                  <div className="relative aspect-5/4 overflow-hidden bg-[#10131e]">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#070910] via-transparent to-black/10" />

                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-md">
                      <StoryIcon className="h-3.5 w-3.5 text-amber-200" />
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/80">
                        {story.eyebrow}
                      </span>
                    </div>

                    <span className="absolute bottom-5 right-5 text-5xl font-light tracking-tighter text-white/30">
                      {story.number}
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="max-w-md text-2xl font-light leading-snug tracking-tight md:text-3xl">
                      {story.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
                      {story.description}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5">
                      <ImageCredit
                        credit={story.image.credit}
                        sourceUrl={story.image.sourceUrl}
                      />

                      <Link
                        href={story.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-fit items-center gap-2 text-sm text-amber-200 transition hover:text-white"
                      >
                        {story.linkLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section
        id="black-hole-archive"
        className="border-t border-white/8 bg-[#090b12] px-6 py-24 md:px-12 md:py-32 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>The discovery archive</SectionEyebrow>

              <h2 className="text-4xl font-light tracking-[-0.04em] md:text-6xl">
                Worlds of extreme gravity.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">
                From stellar remnants to supermassive giants, explore the
                objects that help us understand the most extreme environments
                in the universe.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/40">
              <Orbit className="h-4 w-4 text-amber-200/70" />
              {blackHolesCatalog.length} discoveries
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {blackHolesCatalog.map((item, index) => {
              const image = getBlackHoleImage(item.slug);

              return (
                <article
                  key={item.slug}
                  id={`black-hole-${item.slug}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/9 bg-[#0e111b] transition duration-300 hover:-translate-y-1 hover:border-amber-200/30"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-[#111521]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#0e111b] via-transparent to-black/10" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
                      {formatClass(item.class)}
                    </div>

                    <span className="absolute bottom-4 right-4 text-sm tabular-nums text-white/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/65">
                      {item.subtitle}
                    </p>

                    <h3 className="mt-3 text-2xl font-light tracking-tight">
                      {item.name}
                    </h3>

                    <p className="mt-3 line-clamp-4 text-sm leading-7 text-white/50">
                      {item.summary}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 border-y border-white/[0.08] py-4">
                      <div className="min-w-0">
                        <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-white/35">
                          Mass
                        </p>
                        <p className="wrap-break-words text-sm text-white/80">
                          {formatMass(item.massSolar)}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-white/35">
                          Distance
                        </p>
                        <p className="wrap-break-words text-sm text-white/80">
                          {formatDistance(item.distanceLightYears)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <div className="mb-4">
                        <ImageCredit
                          credit={image.credit}
                          sourceUrl={image.sourceUrl}
                        />
                      </div>

                      {item.sources.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {item.sources.map((source) => (
                            <a
                              key={`${item.slug}-${source.url}`}
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/60 transition hover:border-amber-200/30 hover:text-amber-200"
                            >
                              {source.label}
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-white/30">
                          Sources coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[100px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/3">
            <Telescope className="h-5 w-5 text-amber-200" />
          </div>

          <SectionEyebrow>Keep looking up</SectionEyebrow>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.04em] md:text-6xl">
            The universe is still
            <span className="block text-white/40">keeping its secrets.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 md:text-base">
            Every observation gives us another piece of the picture. The next
            discovery may change how we understand gravity itself.
          </p>

          <Link
            href="/discover"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition hover:border-amber-200/40 hover:text-amber-200"
          >
            Continue exploring
            <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}