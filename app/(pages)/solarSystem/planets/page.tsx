import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,

} from "@/components/ui/card";
import { planets } from "@/data/PlanetsData";
import SaveButton from "@/components/ui/exploration/SaveButton";
import PlanetStat from "@/components/ui/PlanetStat/PlanetStat";



export default function Planets() {
  return (
    <section className="min-h-screen w-full py-32">
      {/* Header */}
      <div className="mx-auto mb-16 w-full max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-primary">
          Our Solar System
        </p>

        <h1 className="font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          Explore the Planets
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground-secondary md:text-lg">
          Journey across the eight worlds orbiting our Sun and discover what
          makes each planet unique.
        </p>
      </div>

      {/* Planets Grid */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {planets.map((planet) => (
          <Card
            key={planet.slug}
            className="
              group
              relative
              overflow-hidden
              border-white/6
              bg-white/3
              p-0
              backdrop-blur-md

              transition-all
              duration-500

       
              hover:border-primary-light/20
            hover:bg-white/5
              hover:shadow-[0_0_35px_var(--glow-purple)]
            "
          >
            
            
        {/* Planet Image */}
        <div className="relative aspect-square overflow-hidden">

          <Link href={`/solarSystem/planets/${planet.slug}`}>
            <Image
              src={planet.image}
              alt={planet.name}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                25vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />

            {/* Dark Overlay */}
            <div
              className="
                absolute inset-0
                bg-linear-to-t
                from-black/80
                via-black/10
                to-transparent
              "
            />

            {/* Hover Glow */}
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]
                opacity-0
                transition-opacity duration-500
                group-hover:opacity-100
              "
            />

            {/* Planet Name */}
            <div className="absolute bottom-5 left-5">
              <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-white/50">
                Planet
              </p>

              <h2 className="font-display text-2xl font-semibold text-white">
                {planet.name}
              </h2>
            </div>
          </Link>

          {/* Save Button */}
          <div className="absolute right-4 top-4 z-10">
            <SaveButton
              item={{
                id: planet.slug,
                type: "planet",
                title: planet.name,
                image:
                  typeof planet.image === "string"
                    ? planet.image
                    : planet.image.src,
                route: `/solarSystem/planets/${planet.slug}`,
              }}
            />
          </div>
        </div>

        {/* Planet Stats */}                
            {/* Content */}
            <CardHeader className="px-5 pt-5">
              <CardDescription className="min-h-15 text-sm leading-relaxed text-white/60">
                {planet.description}
              </CardDescription>
            </CardHeader>

            {/* Explore */}
            <CardFooter className="px-5 pb-5">
              <Button
                variant="ghost"
                className="
                  group/button
                  h-auto
                  w-full
                  rounded-xl
                  border
                  border-white/6
                  bg-white/3
                  px-4
                  py-3

                  text-sm
                  font-medium
                  text-foreground-secondary

                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:border-primary-light/30
                  hover:bg-primary/8
                  hover:text-primary-light
                  hover:shadow-[0_0_25px_var(--glow-purple)]
                "
              >
               <Link href={`/solarSystem/planets/${planet.slug}`}>
                  <span>Explore {planet.name}</span>

                  <span
                    className="
                      ml-2
                      inline-block
                      transition-transform
                      duration-300
                      group-hover/button:translate-x-1
                    "
                  >
                    →
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}