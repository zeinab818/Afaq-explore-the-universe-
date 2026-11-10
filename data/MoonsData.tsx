
import phobos from "@/assets/images/moons/phobos.jpg";
import deimos from "@/assets/images/moons/deimos.jpg";
import titan from "@/assets/images/moons/titan.jpg";
import enceladus from "@/assets/images/moons/enceladus.jpg";
import io from "@/assets/images/moons/io.jpg";
import europa from "@/assets/images/moons/europa.jpg";
import ganymede from "@/assets/images/moons/ganymede.jpg";
import callisto from "@/assets/images/moons/callisto.jpg";
import triton from "@/assets/images/moons/triton.jpg";
import charon from "@/assets/images/moons/charon.jpg";

/* ============================================================
   FEATURED MOONS
============================================================ */

export const featuredMoons = [
  {
    name: "Phobos",
    planet: "Mars",
    diameter: "22.4 km",
    image: phobos,
  },

  {
    name: "Deimos",
    planet: "Mars",
    diameter: "12.4 km",
    image: deimos,
  },

  {
    name: "Io",
    planet: "Jupiter",
    diameter: "3,643 km",
    image: io,
  },

  {
    name: "Europa",
    planet: "Jupiter",
    diameter: "3,122 km",
    image: europa,
  },

  {
    name: "Ganymede",
    planet: "Jupiter",
    diameter: "5,268 km",
    image: ganymede,
  },

  {
    name: "Callisto",
    planet: "Jupiter",
    diameter: "4,821 km",
    image: callisto,
  },

  {
    name: "Titan",
    planet: "Saturn",
    diameter: "5,150 km",
    image: titan,
  },

  {
    name: "Enceladus",
    planet: "Saturn",
    diameter: "504 km",
    image: enceladus,
  },

  {
    name: "Triton",
    planet: "Neptune",
    diameter: "2,707 km",
    image: triton,
  },

  {
    name: "Charon",
    planet: "Pluto",
    diameter: "1,212 km",
    image: charon,
  },
];

/* ============================================================
   MOON SYSTEMS
============================================================ */

export const moonSystems = {
  Mercury: {
    count: 0,
    famous: [],
  },

  Venus: {
    count: 0,
    famous: [],
  },

  Earth: {
    count: 1,
    famous: ["The Moon"],
  },

  Mars: {
    count: 2,
    famous: ["Phobos", "Deimos"],
  },

  Jupiter: {
    count: 115,
    famous: [
      "Io",
      "Europa",
      "Ganymede",
      "Callisto",
    ],
  },

  Saturn: {
    count: 293,
    famous: [
      "Titan",
      "Enceladus",
    ],
  },

  Uranus: {
    count: 29,
    famous: [],
  },

  Neptune: {
    count: 16,
    famous: ["Triton"],
  },

  Pluto: {
    count: 5,
    famous: ["Charon"],
  },
} as const;

/* ============================================================
   GET FEATURED MOONS FOR PLANET
============================================================ */

export function getMoonsDataForPlanet(
  planetName: string
) {
  const system =
    moonSystems[
      planetName as keyof typeof moonSystems
    ];

  if (!system) {
    return [];
  }

  return featuredMoons.filter((moon) =>
    system.famous.includes(
      moon.name as never
    )
  );
}

