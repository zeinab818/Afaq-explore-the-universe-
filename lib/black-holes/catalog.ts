

import type { BlackHoleCatalogEntry } from "@/types/blackHoleCatalog";
export const blackHolesCatalog: BlackHoleCatalogEntry[] = [
  {
    slug: "m87-star",
    name: "M87*",
    subtitle: "A supermassive black hole",
    summary:
      "At the center of galaxy Messier 87 lies a supermassive black hole. The Event Horizon Telescope collaboration released its first image in 2019.",
    class: "supermassive",
    massSolar: 6.5e9,
    distanceLightYears: 55_000_000,
    discoveryYear: 2019,
    images: [],
    sources: [
      {
        label: "Event Horizon Telescope",
        url: "https://eventhorizontelescope.org/press-release-april-10-2019-astronomers-capture-first-image-black-hole",
        supports: [
          "First published image in 2019",
          "Estimated mass",
        ],
      },
    ],
  },
  {
    slug: "sagittarius-a-star",
    name: "Sagittarius A*",
    subtitle: "The black hole at our galactic center",
    summary:
      "Sagittarius A* is the supermassive black hole at the center of the Milky Way. Its first image was released by the Event Horizon Telescope collaboration in 2022.",
    class: "supermassive",
    massSolar: 4.3e6,
    distanceLightYears: 26_000,
    discoveryYear: null,
    images: [],
    sources: [
      {
        label: "Event Horizon Telescope",
        url: "https://eventhorizontelescope.org/blog/astronomers-reveal-first-image-black-hole-heart-our-galaxy",
        supports: [
          "First published image in 2022",
          "Black hole at the center of the Milky Way",
        ],
      },
    ],
  },
];

export function getBlackHoleBySlug(slug: string) {
  return blackHolesCatalog.find((item) => item.slug === slug);
}