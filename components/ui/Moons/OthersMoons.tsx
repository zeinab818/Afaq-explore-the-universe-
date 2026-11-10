
import React from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Moon,
  Orbit,
} from "lucide-react";
import { MoonsImages } from "@/data/MoonsImages";


export default function OthersMoons() {
  return (
    <section className="border-t border-white/6 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ==================================================
            SECTION HEADING
        ================================================== */}

        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-indigo-300">
            <Moon
              size={15}
              strokeWidth={1.5}
            />

            <span>Other Moons</span>
          </div>

          <h2
            className="
              mt-4
              font-display
              text-3xl
              font-semibold
              tracking-tight
              md:text-5xl
            "
          >
            Moons Across the Solar System
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              leading-8
              text-foreground-secondary
            "
          >
            Earth&apos;s Moon is only one of many
            natural satellites orbiting worlds
            across our Solar System.
          </p>
        </div>

        {/* ==================================================
            MOONS GRID
        ================================================== */}

        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
          "
        >
          {MoonsImages.map((moon) => (
            <article
              key={moon.name}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/6
                bg-white/[0.018]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-indigo-300/18
                hover:bg-indigo-400/2.5
              "
            >
              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div className="relative aspect-square overflow-hidden">

                <Image
                  src={moon.image}
                  alt={`${moon.name}, moon of ${moon.planet}`}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    20vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black
                    via-black/20
                    to-transparent
                  "
                />

                {/* Subtle glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    bg-[radial-gradient(circle_at_50%_20%,rgba(165,180,252,0.14),transparent_55%)]
                  "
                />

                {/* Orbit icon */}

                <div
                  className="
                    absolute
                    right-4
                    top-4
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/1
                    bg-black/30
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    group-hover:border-indigo-200/20
                    group-hover:bg-indigo-300/8
                  "
                >
                  <Orbit
                    size={15}
                    strokeWidth={1.4}
                    className="
                      text-indigo-200/80
                      transition-colors
                      duration-300
                      group-hover:text-indigo-200
                    "
                  />
                </div>

                {/* Moon name */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                  "
                >
                  <p
                    className="
                      font-display
                      text-2xl
                      font-medium
                    "
                  >
                    {moon.name}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      uppercase
                      tracking-[0.18em]
                      text-white/60
                    "
                  >
                    Moon of {moon.planet}
                  </p>
                </div>
              </div>

              {/* ==================================================
                  INFORMATION
              ================================================== */}

              <div className="p-5">
                <div className="flex items-end justify-between gap-3">

                  <div>
                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-foreground-muted
                      "
                    >
                      Diameter
                    </p>

                    <p
                      className="
                        mt-2
                        font-display
                        text-lg
                      "
                    >
                      {moon.diameter}
                    </p>
                  </div>

             
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
