"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PlanetImages from "@/data/PlanetImages";
import type { PlanetI } from "@/types/planetsI";
import PlanetLoading from "./loading"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import PlanetsMoons from "@/components/ui/Planets/PlanetsMoons";
import AppErrorPage from "@/app/error";
import PlanetStat from "@/components/ui/PlanetStat/PlanetStat";
export default function PlanetDetails() {
  const params = useParams<{ planetName: string }>();
  const router = useRouter();

  const planetName = params.planetName;

  const [planet, setPlanet] = useState<PlanetI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        setLoading(true);
        setError(null);

        const formattedPlanetName =
          planetName.charAt(0).toUpperCase() + planetName.slice(1);

        const response = await fetch(
          `/api/planets?name=${encodeURIComponent(formattedPlanetName)}`,
          { cache: "no-store" }
        );

        if (response.status === 404) {
          router.replace("/not-found");
          return;
        }

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: PlanetI = await response.json();
        setPlanet(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Something went wrong")
        );
      } finally {
        setLoading(false);
      }
    };

    if (planetName) {
      void fetchPlanet();
    }
  }, [planetName, router]);

 if(loading){
  return <PlanetLoading/>
  
 }
  if (!planet) {
    return (
      <AppErrorPage
        error={new Error("Planet data could not be loaded")}
        reset={() => router.refresh()}
      />
    );
  }

  const images =
    PlanetImages[planet.name as keyof typeof PlanetImages] ?? [];

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-100 w-100 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-1/4 top-1/2 h-75 w-75 rounded-full bg-purple-500/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-32 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-primary">
                Planet
              </p>

              <h1 className="font-display text-6xl font-semibold tracking-tight md:text-8xl">
                {planet.name}
              </h1>

              <p className="mt-4 font-display text-xl text-primary-light">
                Explore the planet
              </p>

              <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-secondary">
                Discover the physical and orbital characteristics of{" "}
                {planet.name}, and explore its place within the universe.
              </p>
            </div>

<div className="relative flex min-h-125 items-center justify-center">

  {/* Outer Glow */}
  <div
    className="
      pointer-events-none
      absolute
      h-96
      w-96
      rounded-full
      bg-primary/15
      blur-[110px]
    "
  />

  {/* Orbit Ring */}
  <div
    className="
      pointer-events-none
      absolute
      z-0
      h-80
      w-120
      rotate-18
      rounded-[50%]
      border
      border-white/8
      md:h-96
      md:w-136
    "
  />

  {/* Orbit Point */}
  <div
    className="
      pointer-events-none
      absolute
      left-[18%]
      top-[25%]
      z-0
      h-2
      w-2
      rounded-full
      bg-primary
      shadow-[0_0_15px_var(--glow-purple)]
    "
  />

  {/* Carousel */}
  <Carousel
    opts={{
      align: "center",
      loop: true,
    }}
    className="relative z-10 w-full max-w-xl"
  >

    <CarouselContent>

      {images.map((image, index) => (
        <CarouselItem
          key={index}
          className="flex justify-center"
        >

          <div
            className="
              group
              bg-black/20
              relative
              aspect-square
              w-full
              max-w-105
              overflow-hidden
              rounded-3xl
              border
              border-white/8
              shadow-[0_0_70px_var(--glow-purple)]
              backdrop-blur-sm
            "
          >

            <Image
              src={image}
              alt={`${planet.name} ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 90vw, 420px"
              className="
                object-contain
                p-2
                transition-transform
                duration-700
                group-hover:scale-[1.02]
              "
            />

            {/* Soft atmospheric overlay */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.10),transparent_30%)]
              "
            />

            {/* Vignette */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.45)_100%)]
              "
            />

          </div>

        </CarouselItem>
      ))}

    </CarouselContent>

    <CarouselPrevious
      className="
        left-2
        border-white/10
        bg-background/60
        text-foreground-secondary
        backdrop-blur-xl
        hover:border-primary/30
        hover:bg-primary/10
        hover:text-primary
        md:-left-5
      "
    />

    <CarouselNext
      className="
        right-2
        border-white/10
        bg-background/60
        text-foreground-secondary
        backdrop-blur-xl
        hover:border-primary/30
        hover:bg-primary/10
        hover:text-primary
        md:-right-5
      "
    />

  </Carousel>

</div>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Planet Overview
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              {planet.name} at a glance
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/[ md:grid-cols-4">
            <PlanetStat
              label="Mass"
              value={`${planet.mass} Jupiter`}
            />

            <PlanetStat
              label="Radius"
              value={`${planet.radius} Jupiter`}
            />

            <PlanetStat
              label="Orbital Period"
              value={`${planet.period} days`}
            />

           <PlanetStat
          label="Temperature"
          value={`${(planet.temperature - 273.15).toFixed(2)} °C`}
        />
          </div>
        </div>
      </section>

      {/* ================= ORBIT ================= */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Orbit
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              A world in motion
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-foreground-secondary">
              Explore the orbital properties of {planet.name} and its
              relationship with its host star.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <PlanetStat
              label="Semi-major Axis"
              value={`${planet.semi_major_axis} AU`}
            />

            <PlanetStat
              label="Distance from Earth"
              value={`${planet.distance_light_year} ly`}
            />

            <PlanetStat
          label="Host Star Mass"
          value={`${planet.host_star_mass} M☉`}
        />
            <PlanetStat
  label="Host Star Temperature"
  value={`${(planet.host_star_temperature - 273.15).toFixed(2)} °C`}
/>
          </div>
        </div>
      </section>

      {/* ================= MOONS ================= */}

      <PlanetsMoons planetName={planet.name} />


      {/* ================= FOOTER INFO ================= */}
      <section className="border-t border-white/6 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-white/6 bg-white/2 p-8 backdrop-blur-xl md:p-12">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Āfāq
            </p>

            <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
              There is always more to discover.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-foreground-secondary">
              Every world carries a story written in distance, motion,
              temperature, and time. Keep exploring the universe.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

