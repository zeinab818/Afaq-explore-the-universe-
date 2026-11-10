
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Moon,
  Orbit,
} from "lucide-react";

import {
  featuredMoons,
  moonSystems,
} from "@/data/MoonsData";

interface PlanetsMoonsProps {
  planetName: string;
}

export default function PlanetsMoons({
  planetName,
}: PlanetsMoonsProps) {
  const system =
    moonSystems[
      planetName as keyof typeof moonSystems
    ];

  if (!system) {
    return null;
  }

  const famousMoons = featuredMoons.filter((moon) =>
    system.famous.includes(moon.name as never)
  );

  const hasMoons = system.count > 0;

  return (
    <section className="border-t border-white/6 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-indigo-300">
              <Moon
                size={15}
                strokeWidth={1.5}
              />

              <span>Natural Satellites</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Moons of {planetName}
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-foreground-secondary">
              {hasMoons
                ? `Explore the moons orbiting ${planetName} and discover some of its most remarkable natural satellites.`
                : `${planetName} has no known natural satellites.`}
            </p>
          </div>

          {/* COUNT */}
          <div className="shrink-0 rounded-2xl border border-white/8 bg-white/4 px-6 py-4 backdrop-blur-xl">

            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
              Known Moons
            </p>

            <p className="mt-1 font-display text-3xl font-semibold text-primary">
              {system.count}
            </p>

          </div>
        </div>

        {/* NO MOONS */}
        {!hasMoons && (
          <div className="rounded-3xl border border-white/6 bg-white/3 p-10 text-center backdrop-blur-xl">

            <Orbit
              size={30}
              strokeWidth={1.3}
              className="mx-auto text-foreground-muted"
            />

            <h3 className="mt-5 font-display text-xl font-medium">
              No Known Moons
            </h3>

            <p className="mx-auto mt-3 max-w-md leading-7 text-foreground-secondary">
              {planetName} does not have any known natural satellites.
            </p>

          </div>
        )}

        {/* EARTH → MOON PAGE */}
        {planetName === "Earth" && (
          <div className="mb-8 rounded-3xl border border-indigo-300/10 bg-indigo-400/5 p-6 backdrop-blur-xl">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">
                  Earth&apos;s Natural Satellite
                </p>

                <h3 className="mt-2 font-display text-2xl font-medium">
                  The Moon
                </h3>

                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  Explore the Moon&apos;s phases, position,
                  moonrise, moonset, illumination, and
                  orbital data.
                </p>
              </div>

              <Link
                href="/solarSystem/moons"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-300/20
                  bg-indigo-400/10
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-indigo-200
                  transition-all
                  duration-300
                  hover:border-indigo-300/40
                  hover:bg-indigo-400/20
                  hover:text-white
                "
              >
                Explore the Moon

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                />
              </Link>

            </div>
          </div>
        )}

        {/* FAMOUS MOONS */}
        {famousMoons.length > 0 && (
          <div>

            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-foreground-muted">
                  Featured Satellites
                </p>

                <h3 className="mt-2 font-display text-2xl font-medium">
                  Notable Moons
                </h3>
              </div>

              <p className="text-sm text-foreground-muted">
                {famousMoons.length} featured
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {famousMoons.map((moon) => (
                <article
                  key={moon.name}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/6
                    bg-white/5
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-indigo-300/20
                    hover:bg-indigo-400/10
                  "
                >

                  <div className="relative aspect-square overflow-hidden">

                    <Image
                      src={moon.image}
                      alt={`${moon.name} moon`}
                      fill
                      sizes="(max-width: 768px) 90vw, 300px"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-linear-to-t
                        from-black
                        via-black/10
                        to-transparent
                      "
                    />

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
                        border-white/10
                        bg-black/30
                        backdrop-blur-xl
                      "
                    >
                      <Orbit
                        size={15}
                        strokeWidth={1.4}
                        className="text-indigo-200"
                      />
                    </div>

                    <div className="absolute bottom-5 left-5">
                      <p className="font-display text-2xl font-medium">
                        {moon.name}
                      </p>
                    </div>

                  </div>

                  <div className="p-5">

                    <p className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                      Diameter
                    </p>

                    <div className="mt-2 flex items-center justify-between">

                      <p className="font-display text-lg">
                        {moon.diameter}
                      </p>

                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.4}
                        className="
                          text-foreground-muted
                          transition-all
                          duration-300
                          group-hover:-translate-y-1
                          group-hover:translate-x-1
                          group-hover:text-indigo-300
                        "
                      />

                    </div>

                  </div>

                </article>
              ))}

            </div>
          </div>
        )}

        {/* ALL MOONS INFO */}
        {hasMoons && (
          <div className="mt-10 rounded-2xl border border-white/6 bg-white/3 px-6 py-5">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-foreground-secondary">
                {planetName} has{" "}
                <span className="font-medium text-foreground">
                  {system.count} known moons
                </span>
                .
              </p>

              {system.famous.length > 0 && (
                <p className="text-sm text-foreground-muted">
                  Famous:{" "}
                  <span className="text-indigo-200">
                    {system.famous.join(", ")}
                  </span>
                </p>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
