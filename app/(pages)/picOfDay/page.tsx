
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Expand,
  Image as ImageIcon,
  
  Orbit,
  Telescope,
} from "lucide-react";

import type { ApodResponse } from "@/types/pics";
import Link from "next/link";

export default function ApodPage() {
  const [data, setData] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [plainExplanation, setPlainExplanation] = useState("");
const [photographer, setPhotographer] = useState<{
  name: string;
  url: string | null;
} | null>(null);
  useEffect(() => {
    let active = true;

    async function fetchApod() {
      try {
        setLoading(true);
        setError("");

        // Keep the existing API behavior: today's APOD only.
        const response = await fetch("/api/picOfDay", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to retrieve today's astronomy picture.");
        }

        const result: ApodResponse = await response.json();

        if (active) {
          setData(result);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading APOD."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchApod();

    return () => {
      active = false;
    };
  }, []);

  // NASA's explanation may contain HTML.
  // Extract readable text without rendering untrusted HTML.
  useEffect(() => {
    if (!data?.explanation) return;

    const parser = new DOMParser();
    const document = parser.parseFromString(
      data.explanation,
      "text/html"
    );

    setPlainExplanation(
      document.body.textContent?.replace(/\s+/g, " ").trim() ?? ""
    );
  }, [data?.explanation]);

  useEffect(() => {
  const credit = data?.copyright || data?.credit;

  if (!credit) return;

  const parser = new DOMParser();
  const doc = parser.parseFromString(credit, "text/html");

  const anchor = doc.querySelector("a");
  const name = doc.body.textContent?.trim() || "";

  let url: string | null = null;

  if (anchor?.href) {
    try {
      const parsedUrl = new URL(anchor.href);

      if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
        url = parsedUrl.href;
      }
    } catch {
      url = null;
    }
  }

  setPhotographer({ name, url });
}, [data?.copyright, data?.credit]);
  const formattedDate = data?.date
    ? new Date(`${data.date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#070710] text-white">
        <div className="flex min-h-[75vh] flex-col items-center justify-center">
          <div className="relative mb-7 flex size-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full border border-[#e7c98b]/20" />
            <div className="absolute inset-2 rounded-full border border-[#a78bfa]/30" />
            <Telescope className="size-7 text-[#e7c98b]" />
          </div>

          <p className="text-[10px] uppercase tracking-[0.35em] text-[#e7c98b]/70">
            Āfāq Observatory
          </p>

          <p className="mt-4 text-sm text-white/45">
            Discovering today's universe...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#070710] px-6 text-white">
        <div className="max-w-md text-center">
          <Orbit className="mx-auto mb-6 size-10 text-[#e7c98b]" />

          <p className="text-xs uppercase tracking-[0.3em] text-[#e7c98b]">
            Signal lost
          </p>

          <h1 className="mt-4 font-serif text-3xl">
            The universe is out of reach.
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/45">
            {error || "APOD data is currently unavailable."}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-8 border border-[#e7c98b]/40 px-6 py-3 text-xs uppercase tracking-widest text-[#e7c98b] transition hover:bg-[#e7c98b]/10"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const isVideo = data.media_type === "video";
  const imageUrl = data.hdurl || data.url;

  return (
<main className="relative min-h-screen overflow-hidden bg-[#070710] pt-15 text-[#f5e9df] selection:bg-[#a78bfa]/30">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-48 top-[15%] size-140 rounded-full bg-violet-700/9 blur-[150px]" />
        <div className="absolute -right-48 top-[40%] size-140 rounded-full bg-pink-500/6 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 0.7px, transparent 0.7px)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      {/* ================= TOP NAVIGATION ================= */}

 <header className="relative z-0 mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-7 md:px-12 lg:px-16">
        <Link href="/" className="group flex items-center gap-4">
          <span className="inline-block text-3xl text-[#e7c98b] transition-transform duration-500 group-hover:rotate-45">
  ✳
</span>

          <span>
            <span className="block font-serif text-2xl tracking-[0.12em]">
              ĀFĀQ
            </span>

            <span className="mt-0.5 block text-[9px] tracking-[0.2em] text-white/45">
              EXPLORE THE UNIVERSE
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <span className="text-xs text-white/40">
            A daily window into the cosmos
          </span>

          <span className="h-8 w-px bg-white/15" />

          <span className="font-serif text-sm tracking-[0.2em] text-[#e7c98b]">
            01 / APOD
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 md:hidden">
          NASA APOD
        </span>
      </header>

      {/* ================= CINEMATIC HERO ================= */}

      <section className="relative min-h-190 lg:min-h-212.5">

        {/* Orbit decorations */}

        <div className="pointer-events-none absolute right-[-12%] top-[5%] h-155 w-[90%] rounded-[50%] border border-[#e7c98b]/10 rotate-[-18deg] lg:right-[-5%] lg:w-[75%]" />

        <div className="pointer-events-none absolute
         right-[3%] top-[13%] h-132.5 w-[68%]
          rounded-[50%] border border-violet-300/8 rotate-22" />

        {/* Main image */}

        <div className="absolute inset-0">
          {isVideo ? (
            <iframe
              src={data.url}
              title={data.title}
              className="absolute right-0 top-0 h-full w-full object-cover opacity-75 lg:w-[75%]"
              allowFullScreen
            />
          ) : (
            <Image
              src={imageUrl}
              alt={data.title}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-center opacity-80"
            />
          )}

          <div className="absolute inset-0 bg-linear-to-r from-[#070710] via-[#070710]/75 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#070710] via-transparent to-[#070710]/50" />
          <div className="absolute inset-0 bg-[#070710]/10" />
        </div>

        {/* Hero content */}

        <div className="relative z-10 mx-auto flex min-h-190 max-w-[1600px] items-center px-6 pb-32 pt-16 md:px-12 lg:min-h-212.5 lg:px-16">

          <div className="max-w-2xl">

            <div className="mb-9 inline-flex items-center gap-3 border border-[#e7c98b]/50 px-5 py-2">
              <span className="size-1.5 rounded-full bg-[#e7c98b] shadow-[0_0_12px_#e7c98b]" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
                NASA Astronomy Picture of the Day
              </span>
            </div>

            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/45">
              {formattedDate}
            </p>

            <h1 className="max-w-3xl wrap-break-word font-serif text-6xl leading-[0.95] tracking-[-0.045em] text-[#f8e7df] sm:text-7xl md:text-8xl lg:text-[clamp(5rem,8vw,8.5rem)]">
              {data.title}
            </h1>

            <div className="mt-9 flex items-center gap-5">
              <span className="h-px w-20 bg-linear-to-r from-[#e7c98b] to-transparent" />

              <span className="font-serif text-lg italic text-[#e7c98b]/90">
                A glimpse beyond our world.
              </span>
            </div>

            <Link
              href="#story"
              className="mt-16 inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/65 transition hover:text-[#e7c98b]"
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-white/25 transition hover:border-[#e7c98b]">
                <ArrowDown size={16} />
              </span>

              Scroll to explore
            </Link>

          </div>
        </div>

        {/* Image indicator */}

        <div className="absolute bottom-14 right-8 z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40 lg:flex">
          <span className="size-1.5 rounded-full bg-[#e7c98b]" />
          {isVideo ? "Astronomical video" : "Astronomical imagery"}
        </div>
      </section>

      {/* ================= STORY SECTION ================= */}

      <section
        id="story"
        className="relative z-10 -mt-12 overflow-hidden rounded-t-[3rem] border-t border-[#e7c98b]/20 bg-[#090914]/95 px-6 pb-24 pt-16 backdrop-blur-2xl md:px-12 lg:px-16"
      >

        {/* Decorative glow */}

        <div className="pointer-events-none absolute -right-40 top-0 size-140 rounded-full bg-violet-500/6 blur-[130px]" />

        <div className="relative mx-auto max-w-362.5">

          {/* Section heading */}

          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-linear-to-r from-[#e7c98b] to-transparent" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
                  Beyond the photograph
                </span>
              </div>

              <h2 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                The story behind
                <span className="block italic text-white/40">
                  the image.
                </span>
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-7 text-white/40">
              Every image holds a story. Every detail opens a new way
              to understand the universe.
            </p>
          </div>

          {/* Asymmetric content */}

          <div className="grid gap-12 lg:grid-cols-[1.05fr_1.3fr_0.7fr] lg:gap-14">

            {/* Explanation */}

            <article className="relative">

              <div className="mb-7 flex items-center gap-3">
                <Telescope className="size-5 text-[#e7c98b]" />

                <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  Cosmic perspective
                </span>
              </div>

              <p
                className={`text-sm leading-8 text-white/65 transition-all duration-500 ${
                  expanded ? "" : "line-clamp-10"
                }`}
              >
                {plainExplanation || data.explanation}
              </p>

              {plainExplanation.length > 650 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-7 inline-flex items-center gap-3 border-b border-[#e7c98b]/50 pb-2 text-xs text-[#e7c98b] transition hover:border-[#e7c98b] hover:text-white"
                >
                  {expanded ? "Read less" : "Read full explanation"}

                  <ArrowUpRight
                    size={14}
                    className={expanded ? "rotate-180" : ""}
                  />
                </button>
              )}
            </article>

            {/* Image detail */}

            <div className="relative">

              <div className="group relative aspect-4/3 overflow-hidden border border-white/15 bg-[#11111e]">

                {isVideo ? (
                  <iframe
                    src={data.url}
                    title={data.title}
                    className="h-full w-full"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt={data.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition duration-1000 group-hover:scale-105"
                  />
                )}

                {!isVideo && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                )}

                {!isVideo && (
                  <button
                    onClick={() => setShowOriginal(true)}
                    aria-label="View original image"
                    className="absolute bottom-5 right-5 flex size-11 items-center justify-center border border-white/40 bg-black/30 text-white backdrop-blur-md transition hover:border-[#e7c98b] hover:text-[#e7c98b]"
                  >
                    <Expand size={17} />
                  </button>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-xs text-white/35">
                  {data.title}
                </p>

                {data.hdurl && (
                  <a
                    href={data.hdurl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-widest text-[#e7c98b] transition hover:text-white"
                  >
                    HD Image
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>

            {/* Image details */}

            <aside className="border-t border-white/15 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

              <h3 className="mb-8 font-serif text-2xl">
                Image details
              </h3>

              <div className="space-y-7">

                <div className="flex items-start gap-4">
                  <Camera className="mt-0.5 size-4 shrink-0 text-[#e7c98b]" />

                 <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                  Photographer / Credit
                </p>

                {photographer ? (
                  photographer.url ? (
                    <Link
                      href={photographer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-white/75 underline decoration-white/20 underline-offset-4 transition hover:text-[#e7c98b] hover:decoration-[#e7c98b]"
                    >
                      {photographer.name}
                    </Link>
                  ) : (
                    <p className="mt-2 text-sm text-white/75">
                      {photographer.name}
                    </p>
                  )
                ) : (
                  <p className="mt-2 text-sm text-white/75">
                    Not specified
                  </p>
                )}
              </div>
                </div>

                <div className="flex items-start gap-4">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-[#e7c98b]" />

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                      Published
                    </p>

                    <p className="mt-2 text-sm text-white/75">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ImageIcon className="mt-0.5 size-4 shrink-0 text-[#e7c98b]" />

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                      Media type
                    </p>

                    <p className="mt-2 text-sm capitalize text-white/75">
                      {data.media_type || "Image"}
                    </p>
                  </div>
                </div>
              </div>

              {data.permalink && (
                <Link
                  href={data.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-3 border-b border-[#e7c98b]/50 pb-2 text-xs text-[#e7c98b] transition hover:border-white hover:text-white"
                >
                  View NASA original
                  <ArrowUpRight size={14} />
                </Link>
              )}

            </aside>
          </div>

          {/* ================= FOOTER ================= */}

          <footer className="mt-28 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end">

            <div className="flex items-center gap-4">
              <span className="text-3xl text-[#e7c98b]">✳</span>

              <div>
                <p className="font-serif text-xl tracking-[0.15em]">
                  ĀFĀQ
                </p>

                <p className="mt-1 text-[9px] tracking-[0.2em] text-white/35">
                  NASA ASTRONOMY PICTURE OF THE DAY
                </p>
              </div>
            </div>

            <p className="font-serif text-sm italic tracking-wider text-[#e7c98b]/70">
              Discover. Explore. Be Inspired.
            </p>

          </footer>
        </div>
      </section>

      {/* ================= IMAGE LIGHTBOX ================= */}

      {showOriginal && !isVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-5 backdrop-blur-xl"
          onClick={() => setShowOriginal(false)}
        >
          <button
            onClick={() => setShowOriginal(false)}
            className="absolute right-7 top-7 text-sm text-white/60 transition hover:text-[#e7c98b]"
          >
            Close ✕
          </button>

          <div className="relative h-[85vh] w-full max-w-6xl">
            <Image
              src={imageUrl}
              alt={data.title}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

    </main>
  );
}
