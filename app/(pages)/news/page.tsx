
"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Loader2,
  Orbit,
  Telescope,
} from "lucide-react";

import {
  SpaceNewsArticle,
  SpaceNewsResponse,
} from "@/types/news";
import Link from "next/link";
import Image from "next/image";
import SaveButton from "@/components/ui/exploration/SaveButton";

export default function SpaceNewsPage() {
  const [articles, setArticles] = useState<SpaceNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/spaceNews", {
          cache: "no-store",
        });

        const data: SpaceNewsResponse = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch space news");
        }

        setArticles(data.results ?? []);
      } catch (error) {
        console.error("Space News fetch error:", error);
        setError("Unable to load space news.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070710] pt-15 text-[#f5e9df] selection:bg-[#a78bfa]/30">

      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-52 top-[15%] size-140 rounded-full bg-violet-700/[0.07] blur-[150px]" />
        <div className="absolute -right-52 top-[55%] size-140 rounded-full bg-pink-500/[0.035] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 0.7px, transparent 0.7px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

    {/* Cinematic Space Hero */}
    <section className="relative isolate min-h-155 overflow-hidden bg-[#070710] md:min-h-185">

      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-position-[center_45%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=90&w=2400&auto=format&fit=crop')",
        }}
      />

      {/* Image overlays */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#070710] via-[#070710]/75 to-[#070710]/10" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#070710] via-transparent to-[#070710]/35" />

      {/* Subtle atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 0.7px, transparent 0.7px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto flex min-h-155 max-w-[1600px] flex-col px-6 md:min-h-185 md:px-12 lg:px-16">

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/15 py-6">
          <div className="flex items-center gap-3">
            <span className="text-xl text-[#e7c98b]">✳</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#f5e9df]">
              Āfāq Space News
            </span>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.25em] text-white/45 sm:block">
            Space · Science · Latest Updates
          </span>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col justify-center py-20 md:py-24">

          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e7c98b]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
              Latest Space News & Updates
            </span>
          </div>

          <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[1.08] tracking-[-0.04em] text-[#f5e9df] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            What's Happening
            <br />
            <span className="italic text-[#e7c98b]">
              in Space?
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-sm leading-8 text-white/65 md:text-base">
            Get the latest updates from across the universe — from
            groundbreaking discoveries and space missions to scientific
            developments shaping our understanding of space.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Link
              href="#latest-stories"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#e7c98b] transition-colors hover:text-white"
            >
              Explore Latest News
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" />
            </Link>

            <span className="h-5 w-px bg-white/20" />

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Your window to the latest in space
            </span>
          </div>
        </div>

        {/* Bottom information */}
        <div className="grid grid-cols-2 gap-6 border-t border-white/15 py-6 md:grid-cols-3">

          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
              Discover
            </p>
            <p className="mt-2 font-serif text-lg text-white/80">
              Latest discoveries
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
              Follow
            </p>
            <p className="mt-2 font-serif text-lg text-white/80">
              Space missions
            </p>
          </div>

          <div className="hidden md:block">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
              Explore
            </p>
            <p className="mt-2 font-serif text-lg text-white/80">
              Science & technology
            </p>
          </div>

        </div>
      </div>
    </section>

      {/* News content */}
      <section  id="latest-stories" className="relative z-10 border-t border-white/8">
        <div  className=" mx-auto max-w-[1600px] px-6 py-16 md:px-12 lg:px-16 lg:py-24">

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[45vh] flex-col items-center justify-center gap-5">
              <Loader2 className="size-8 animate-spin text-[#e7c98b]" />

              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Receiving signals from space...
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex min-h-[35vh] flex-col items-center justify-center text-center">
              <Orbit className="mb-6 size-10 text-[#fb7185]" />

              <p className="font-serif text-2xl">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 border-b border-[#e7c98b]/50 pb-2 text-xs text-[#e7c98b] transition hover:text-white"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <div className="flex min-h-[35vh] flex-col items-center justify-center text-center">
              <Telescope className="mb-6 size-10 text-[#e7c98b]" />

              <p className="font-serif text-2xl">
                Silence from the universe.
              </p>

              <p className="mt-3 text-sm text-white/40">
                No space news available right now.
              </p>
            </div>
          )}

          {!loading && !error && featuredArticle && (
            <>
              {/* Featured article */}
              <article >
                <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#e7c98b]" />

                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#e7c98b]">
                      Featured story
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                    {featuredArticle.news_site}
                  </span>
                </div>

                <div className="group relative isolate min-h-130 overflow-hidden bg-[#11111e] md:min-h-162.5">

                 {featuredArticle.image_url && (
                  <Image
                    fill
                    src={featuredArticle.image_url}
                    alt={featuredArticle.title}
                    className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-1400 group-hover:scale-[1.035]"
                  />
                )}

                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#070710] via-[#070710]/55 to-[#070710]/5" />

                  <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#070710]/45 via-transparent to-transparent" />

                  <div className="flex min-h-130 flex-col justify-end p-7 md:min-h-162.5 md:p-12 lg:max-w-5xl lg:p-16">

                    <div className="mb-6 flex items-center gap-3">
                      <span className="size-1.5 rounded-full bg-[#e7c98b]" />

                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#e7c98b]">
                        {featuredArticle.news_site}
                      </span>
                    </div>

                    <h2 className="max-w-4xl font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                      {featuredArticle.title}
                    </h2>

                    <p className="mt-6 line-clamp-3 max-w-2xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
                      {featuredArticle.summary}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">

                      <span className="flex items-center gap-2 text-xs text-white/50">
                        <CalendarDays className="size-4 text-[#e7c98b]" />
                        {formatDate(featuredArticle.published_at)}
                      </span>

                      <Link
                        href={featuredArticle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-b border-[#e7c98b]/50 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#e7c98b] transition-colors hover:border-white hover:text-white"
                      >
                        Explore story
                        <ArrowUpRight className="size-4" />
                      </Link>
                        
                    </div>
                  </div>
                </div>
              </article>

              {/* Latest stories */}
              {latestArticles.length > 0 && (
                <section className="mt-24 md:mt-32">

                  <div className="mb-10 grid gap-6 border-b border-white/9 pb-8 md:grid-cols-[1fr_auto] md:items-end">

                    <div>
                      <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-8 bg-[#a78bfa]" />

                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#a78bfa]">
                          More from the universe
                        </span>
                      </div>

                      <h2 className="font-serif text-4xl leading-tight md:text-6xl">
                        Across the{" "}
                        <span className="italic text-white/45">
                          cosmos.
                        </span>
                      </h2>
                    </div>

                    <p className="max-w-xs text-sm leading-7 text-white/40">
                      New perspectives, discoveries, and missions
                      worth looking up for.
                    </p>
                  </div>

                  <div>
                    {latestArticles.map((article, index) => (
                      <article
                        key={article.id}
                        className="group grid gap-6 border-b border-white/8 py-8 transition-colors duration-300 hover:border-[#e7c98b]/30 md:grid-cols-[65px_1fr_220px] md:items-center lg:grid-cols-[90px_1fr_280px] lg:gap-10 lg:py-10"
                      >

                        {/* Number */}
                        <div className="flex items-center gap-3 md:block">
                          <span className="font-serif text-3xl text-white/20 transition-colors group-hover:text-[#e7c98b] md:text-4xl">
                            {String(index + 2).padStart(2, "0")}
                          </span>

                          <span className="text-[9px] uppercase tracking-[0.15em] text-white/25 md:mt-3 md:block">
                            Story
                          </span>
                        </div>

                        {/* Article information */}
                        <div>
                          <div className="mb-4 flex flex-wrap items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-white/35">
                            <span className="text-[#a78bfa]">
                              {article.news_site}
                            </span>

                            <span className="size-1 rounded-full bg-white/20" />

                            <span>
                              {formatDate(article.published_at)}
                            </span>
                          </div>

                          <h3 className="max-w-3xl font-serif text-2xl leading-snug transition-colors duration-300 group-hover:text-[#e7c98b] md:text-3xl lg:text-4xl">
                            {article.title}
                          </h3>

                          <p className="mt-4 line-clamp-2 max-w-2xl text-sm leading-7 text-white/40">
                            {article.summary}
                          </p>

                         <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            <Link
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#a78bfa] transition-colors hover:text-[#e7c98b]"
                            >
                              Read the story
                              <ArrowUpRight className="size-3.5" />
                            </Link>

                            <SaveButton
                              item={{
                                id: article.id.toString(),
                                type: "article",
                                title: article.title,
                                image: article.image_url ?? undefined,
                                route: `/news/${article.slug}`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-16/10 overflow-hidden bg-[#11111e] md:aspect-4/3">
                          {article.image_url ? (
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="size-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center">
                              <Orbit className="size-9 text-white/20" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-linear-to-t from-[#070710]/30 to-transparent" />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Closing section */}
              <section className="relative mt-28 overflow-hidden border-y border-white/9 py-16 md:mt-36 md:py-24">

                <div className="pointer-events-none absolute -right-24 top-1/2 size-80 -translate-y-1/2 rounded-full border border-[#a78bfa]/10" />

                <div className="pointer-events-none absolute -right-12 top-1/2 size-56 -translate-y-1/2 rounded-full border border-[#e7c98b]/10" />

                <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-center">
                  <div>
                    <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-[#e7c98b]">
                      Keep looking up
                    </p>

                    <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
                      The universe is
                      <span className="block italic text-[#a78bfa]">
                        still unfolding.
                      </span>
                    </h2>
                  </div>

                  <div className="flex items-center gap-4 text-white/40">
                    <span className="flex size-12 items-center justify-center rounded-full border border-white/15">
                      <ArrowDown className="size-4" />
                    </span>

                    <span className="max-w-32 text-[9px] uppercase leading-5 tracking-[0.2em]">
                      Stay curious. Discover more.
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/8 px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#e7c98b]">✳</span>

            <span className="font-serif text-lg tracking-[0.15em]">
              ĀFĀQ
            </span>
          </div>

          <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
            Exploring the universe, one discovery at a time.
          </p>

          <Link
            href="https://www.spaceflightnewsapi.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white/35 transition hover:text-[#e7c98b]"
          >
            News source API
            <ExternalLink className="size-3" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
