
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import type { BlackHoleImage } from "@/lib/black-holes/images";

type FeaturedBlackHole = {
  slug: string;
  name: string;
  summary: string;
  subtitle?: string;
  massSolar?: number | null;
  distanceLightYears?: number | null;
};

type Props = {
  featured: FeaturedBlackHole;
  heroImage: BlackHoleImage;
};

export default function BlackHoleHero({
  featured,
  heroImage,
}: Props) {
  return (
    <section className="relative isolate min-h-190 overflow-hidden bg-[#06070c] text-white sm:min-h-[820px]">
      {/* Full-bleed cinematic artwork */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      {/* Keep the headline readable without hiding the artwork */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#06070c] via-[#06070c]/80 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#06070c] via-transparent to-[#06070c]/30" />

      <div className="mx-auto flex min-h-190 max-w-[1600px] flex-col justify-between px-6 pb-8 pt-28 sm:min-h-[820px] sm:px-10 sm:pb-10 lg:px-20">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/discover"
            className="text-[10px] uppercase tracking-[0.28em] text-white/50 transition hover:text-white"
          >
            Āfāq <span className="mx-2 text-white/20">/</span> Discover
          </Link>

          <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e7c98b]" />
            Deep space archive
          </span>
        </div>

        <div className="grid flex-1 items-center py-20 lg:grid-cols-[1fr_0.7fr]">
          <div className="max-w-180">
            <p className="mb-7 text-[10px] uppercase tracking-[0.38em] text-[#e7c98b] sm:text-xs">
              The architecture of darkness
            </p>

            <h1 className="text-[clamp(4.5rem,10vw,9.5rem)] font-light leading-[0.82] tracking-[-0.085em]">
              Black
              <span className="mt-3 block text-white/65">Holes.</span>
            </h1>

            <p className="mt-9 max-w-110 text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Where gravity reshapes spacetime, light bends beyond
              recognition, and the invisible leaves its mark on the universe.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="#black-hole-archive"
                className="group inline-flex items-center gap-3 border-b border-[#e7c98b]/70 pb-3 text-xs uppercase tracking-[0.15em] text-[#e7c98b] transition hover:border-white hover:text-white"
              >
                Explore the archive
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Link>

              <Link
                href="#black-hole-science"
                className="inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-white"
              >
                The science
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Deliberately empty on the right: let the black hole dominate */}
          <div className="hidden lg:block" />
        </div>

        <div className="grid gap-5 border-t border-white/15 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/40">
              Featured discovery
            </p>
            <h2 className="text-lg font-light tracking-wide sm:text-xl">
              {featured.name}
            </h2>
            <p className="mt-1 max-w-xl text-xs leading-6 text-white/45">
              {featured.summary}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
