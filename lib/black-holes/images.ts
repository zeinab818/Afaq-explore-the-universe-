import type { StaticImageData } from "next/image";

import m87 from "@/assets/images/black-holes/m87.jpeg";
import sagittarius from "@/assets/images/black-holes/sagittarius-a.jpeg";
import faceOn from "@/assets/images/black-holes/black-hole-face-on.jpeg";
import cygnus from "@/assets/images/black-holes/cygnus-x1.jpeg";
import accretionJet from "@/assets/images/black-holes/accretion-jet.jpeg";
import blackHoleHero from "@/assets/images/black-holes/black-hole-hero.png";
export type BlackHoleImage = {
  src: StaticImageData;
  alt: string;
  credit: string;
  kind: "observation" | "illustration";
  sourceUrl: string;
};

export const blackHoleImages = {
 hero: {
  src: blackHoleHero,
  alt: "Artistic visualization of a black hole with a glowing accretion disk and relativistic jets",
  credit: "Āfāq — AI-generated artwork",
  kind: "illustration",
  sourceUrl: "/discover/black-holes",
},
m87: {
    src: m87,
    alt: "The shadow of the supermassive black hole in Messier 87",
    credit: "Event Horizon Telescope Collaboration",
    kind: "observation",
    sourceUrl: "https://eventhorizontelescope.org/",
  },

  sagittarius: {
    src: sagittarius,
    alt: "The black hole at the center of the Milky Way, Sagittarius A*",
    credit: "Event Horizon Telescope Collaboration",
    kind: "observation",
    sourceUrl: "https://eventhorizontelescope.org/",
  },

  faceOn: {
    src: faceOn,
    alt: "Scientific illustration of a black hole and its surrounding disk",
    credit: "NASA",
    kind: "illustration",
    sourceUrl: "https://science.nasa.gov/universe/black-holes/",
  },

  cygnus: {
    src: cygnus,
    alt: "Illustration of the Cygnus X-1 black hole system",
    credit: "NASA / CXC / M. Weiss",
    kind: "illustration",
    sourceUrl: "https://chandra.harvard.edu/",
  },

  accretionJet: {
    src: accretionJet,
    alt: "A high-energy jet associated with a black hole system",
    credit: "ESO image archive",
    kind: "illustration",
    sourceUrl: "https://www.eso.org/public/images/eso1907m/",
  },
} satisfies Record<string, BlackHoleImage>;

export function getBlackHoleImage(slug: string): BlackHoleImage {
  const normalizedSlug = slug.toLowerCase();

  if (
    normalizedSlug.includes("sagittarius") ||
    normalizedSlug.includes("sgr-a") ||
    normalizedSlug.includes("milky-way")
  ) {
    return blackHoleImages.sagittarius;
  }

  if (
    normalizedSlug.includes("cygnus") ||
    normalizedSlug.includes("x-1")
  ) {
    return blackHoleImages.cygnus;
  }

  if (
    normalizedSlug.includes("quasar") ||
    normalizedSlug.includes("ton-618") ||
    normalizedSlug.includes("jet")
  ) {
    return blackHoleImages.accretionJet;
  }

  if (
    normalizedSlug.includes("illustration") ||
    normalizedSlug.includes("simulation")
  ) {
    return blackHoleImages.faceOn;
  }

  if (
    normalizedSlug.includes("m87") ||
    normalizedSlug.includes("messier-87") ||
    normalizedSlug.includes("virgo-a")
  ) {
    return blackHoleImages.m87;
  }

  // Safe fallback when the catalog does not identify a matching image.
  return blackHoleImages.faceOn;
}