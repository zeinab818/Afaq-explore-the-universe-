import type { StaticImageData } from "next/image";

import phobos from "@/assets/images/moons/phobos.jpg";
import deimos from "@/assets/images/moons/deimos.jpg";
import titan from "@/assets/images/moons/titan.jpg";
import enceladus from "@/assets/images/moons/enceladus.jpg";
import io from "@/assets/images/moons/io.jpg";
import europa from "@/assets/images/moons/europa.jpg";
import ganymede from "@/assets/images/moons/ganymede.jpg";
import callisto from "@/assets/images/moons/callisto.jpg";
import triton from "@/assets/images/moons/triton.jpg";


export interface PlanetMoon {
  name: string;
  diameter: string;
  image: string | StaticImageData | null;
}

export interface PlanetMoonsData {
  count: number;
  moons: PlanetMoon[];
}

const PlanetMoons: Record<string, PlanetMoonsData> = {
  /* =========================================================
     MERCURY
  ========================================================= */

  Mercury: {
    count: 0,
    moons: [],
  },

  /* =========================================================
     VENUS
  ========================================================= */

  Venus: {
    count: 0,
    moons: [],
  },

  /* =========================================================
     EARTH
  ========================================================= */

  Earth: {
    count: 1,
    moons: [
      {
        name: "Moon",
        diameter: "3,474 km",
        image: null,
      },
    ],
  },

  /* =========================================================
     MARS
  ========================================================= */

  Mars: {
    count: 2,
    moons: [
      {
        name: "Phobos",
        diameter: "22.4 km",
        image: phobos,
      },
      {
        name: "Deimos",
        diameter: "12.4 km",
        image: deimos,
      },
    ],
  },

  /* =========================================================
     JUPITER
  ========================================================= */

  Jupiter: {
    count: 95,
    moons: [
      {
        name: "Io",
        diameter: "3,643 km",
        image: io,
      },
      {
        name: "Europa",
        diameter: "3,122 km",
        image: europa,
      },
      {
        name: "Ganymede",
        diameter: "5,268 km",
        image: ganymede,
      },
      {
        name: "Callisto",
        diameter: "4,821 km",
        image: callisto,
      },
    ],
  },

  /* =========================================================
     SATURN
  ========================================================= */

  Saturn: {
    count: 274,
    moons: [
      {
        name: "Titan",
        diameter: "5,150 km",
        image: titan,
      },
      {
        name: "Enceladus",
        diameter: "504 km",
        image: enceladus,
      },
    ],
  },

  /* =========================================================
     URANUS
  ========================================================= */

  Uranus: {
    count: 28,
    moons: [],
  },

  /* =========================================================
     NEPTUNE
  ========================================================= */

  Neptune: {
    count: 16,
    moons: [
      {
        name: "Triton",
        diameter: "2,707 km",
        image: triton,
      },
    ],
  },
};

export default PlanetMoons;
