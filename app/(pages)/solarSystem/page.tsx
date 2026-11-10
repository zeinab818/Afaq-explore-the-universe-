import React from "react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import planets from "@/assets/images/planets/planets.jpg";
import sun from "@/assets/images/solarSystem/sun.jpg";
import moon from "@/assets/images/solarSystem/moon.jpg";
import asteroids from "@/assets/images/solarSystem/asteroids.jpg";
import comets from "@/assets/images/solarSystem/comets.jpg";
import dwarfPlanets from "@/assets/images/solarSystem/dwarfPlanets.jpg";
import SaveButton from "@/components/ui/exploration/SaveButton";



const solarSystemItems = [
  {
    title: "Sun",
    slug: "sun",
    description:
      "The star at the heart of our Solar System and the source of its light and energy.",
    image: sun,
    href: "/solarSystem/sun",
  },
  {
    title: "Planets",
    slug: "planets",
    description:
      "Explore the eight planets orbiting the Sun, from Mercury to Neptune.",
    image: planets,
    href: "/solarSystem/planets",
  },
  {
    title: "Moons",
    slug: "moons",
    description:
      "Discover the natural satellites orbiting planets and dwarf planets.",
    image: moon,
    href: "/solarSystem/moons",
  },
  {
    title: "Asteroids",
    slug: "asteroids",
    description:
      "Explore rocky objects that orbit the Sun, including those found in the asteroid belt.",
    image: asteroids,
    href: "/solarSystem/asteroids",
  },
  {
    title: "Comets",
    slug: "comets",
    description:
      "Follow icy bodies that travel through the Solar System on long, elliptical orbits.",
    image: comets,
    href: "/solarSystem/comets",
  },
  {
    title: "Dwarf Planets",
    slug: "dwarf-planets",
    description:
      "Discover worlds such as Pluto, Ceres, Eris, Haumea, and Makemake.",
    image: dwarfPlanets,
    href: "/solarSystem/dwarfPlanets",
  },

];
export default function SolarSystem() {
  return (
    <section className="relative w-full px-6 py-24 md:px-10 lg:px-16">

    {/* Section Heading */}
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-primary">
        Our Solar System
      </p>

      <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        Explore Our Cosmic Neighborhood
      </h2>

      <p className="mt-5 text-base leading-relaxed text-foreground-secondary md:text-lg">
        Discover the Sun, planets, moons, comets, asteroids, and other worlds
        that make up our Solar System.
      </p>
    </div>
   
{/* Cosmic Cards */}
<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
  {solarSystemItems.map((item) => (
    <Card
      key={item.slug}
      className="
        group relative overflow-hidden
        border-white/10 bg-white/4 p-0
        backdrop-blur-md
        transition-all duration-500
        hover:border-white/20
        hover:bg-white/[0.07]
        hover:shadow-2xl
      "
    >
     
    {/* Image & Title */}
    <Link href={item.href}>
      <div className="relative aspect-4/3 cursor-pointer overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Title */}
        <div className="absolute bottom-5 left-5">
          <CardTitle className="text-2xl capitalize text-white">
            {item.title}
          </CardTitle>
        </div>
      </div>
    </Link>

    {/* Save Button */}
    <div className="absolute right-4 top-4 z-10">
      <SaveButton
        item={{
          id: item.slug,
          type: "solar_system_category",
          title: item.title,
          image: typeof item.image === "string" ? item.image : item.image.src,
          route: item.href,
        }}
      />
    </div>


      {/* Description */}
      <CardHeader className="px-5 pt-5">
        <CardDescription className="text-sm leading-relaxed text-white/60">
          {item.description}
        </CardDescription>
      </CardHeader>

      {/* Actions */}
      <CardFooter className="flex items-center gap-3 px-5 pb-5">
        <Link
          href={item.href}
          className="
            group/explore flex flex-1 items-center justify-center
            rounded-xl border border-white/6 bg-white/3
            px-3 py-4 text-center text-sm font-medium
            capitalize text-foreground-secondary
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-primary-light/30
            hover:bg-primary/8
            hover:text-primary-light
            hover:shadow-[0_0_25px_var(--glow-purple)]
          "
        >
          <span>Explore {item.title}</span>

          <span className="ml-2 transition-transform duration-300 group-hover/explore:translate-x-1">
            →
          </span>
        </Link>

       
      </CardFooter>
    </Card>
  ))}
</div>

    </section>
  );
}