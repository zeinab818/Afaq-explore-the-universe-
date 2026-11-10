import milkyway from "@/assets/images/galaxies/MilkyWay.jpg";
import andromeda from "@/assets/images/galaxies/AndromedaGalaxy.jpg";
import triangulum from "@/assets/images/galaxies/TriangulumGalaxy.jpg";
import whirlpool from "@/assets/images/galaxies/WhirlpoolGalaxy.jpg";
import sombrero from "@/assets/images/galaxies/SombreroGalaxy.jpg";
import elliptical from "@/assets/images/galaxies/EllipticalGalaxy.jpg";
import lmc from "@/assets/images/galaxies/LargeMagellanicCloud.jpg";
import centaurus from "@/assets/images/galaxies/CentaurusA.jpg";
import spiral from "@/assets/images/galaxies/SpiralGalaxi.jpg";

import lenticular from "@/assets/images/galaxies/lenticular.jpg";
import irregular from "@/assets/images/galaxies/irregular.jpg";

export const galaxies = [
  {
    id: 1,
    name: "Milky Way",
    catalog: "Our Galaxy",
    type: "Spiral Galaxy",
    image: milkyway,
    description:
      "The Milky Way is the galaxy that contains our Solar System. It is a vast spiral galaxy filled with hundreds of billions of stars, gas, dust, and dark matter.",
    distance: "Our home",
    constellation: "Sagittarius",
    size: "≈ 100,000 light-years",
    age: "≈ 13.6 billion years",
  },

  {
    id: 2,
    name: "Andromeda Galaxy",
    catalog: "M31",
    type: "Spiral Galaxy",
    image: andromeda,
    description:
      "The Andromeda Galaxy is the nearest major galaxy to the Milky Way and one of the most prominent members of the Local Group.",
    distance: "≈ 2.5 million light-years",
    constellation: "Andromeda",
    size: "≈ 260,000 light-years",
    age: "≈ 10 billion years",
  },

  {
    id: 3,
    name: "Triangulum Galaxy",
    catalog: "M33",
    type: "Spiral Galaxy",
    image: triangulum,
    description:
      "The Triangulum Galaxy is a smaller spiral galaxy in the Local Group, known for its active regions of star formation and beautiful spiral structure.",
    distance: "≈ 2.7 million light-years",
    constellation: "Triangulum",
    size: "≈ 60,000 light-years",
    age: "≈ 10 billion years",
  },

  {
    id: 4,
    name: "Whirlpool Galaxy",
    catalog: "M51",
    type: "Spiral Galaxy",
    image: whirlpool,
    description:
      "The Whirlpool Galaxy is a classic spiral galaxy interacting with a smaller companion galaxy, creating its distinctive and dramatic spiral structure.",
    distance: "≈ 23 million light-years",
    constellation: "Canes Venatici",
    size: "≈ 76,000 light-years",
    age: "≈ 400 million years of active interaction",
  },

  {
    id: 5,
    name: "Sombrero Galaxy",
    catalog: "M104",
    type: "Spiral Galaxy",
    image: sombrero,
    description:
      "The Sombrero Galaxy is famous for its bright central bulge and prominent dark dust lane, giving it an appearance resembling a wide-brimmed hat.",
    distance: "≈ 28 million light-years",
    constellation: "Virgo",
    size: "≈ 50,000 light-years",
    age: "≈ 9 billion years",
  },

  {
    id: 6,
    name: "Messier 87",
    catalog: "M87",
    type: "Elliptical Galaxy",
    image: elliptical,
    description:
      "Messier 87 is a giant elliptical galaxy at the center of the Virgo Cluster. Its enormous central black hole became famous through the first direct image of a black hole.",
    distance: "≈ 55 million light-years",
    constellation: "Virgo",
    size: "≈ 120,000 light-years",
    age: "≈ 13 billion years",
  },

  {
    id: 7,
    name: "Large Magellanic Cloud",
    catalog: "LMC",
    type: "Irregular Galaxy",
    image: lmc,
    description:
      "The Large Magellanic Cloud is an irregular dwarf galaxy and one of the closest galaxies to the Milky Way, containing many active regions of star formation.",
    distance: "≈ 163,000 light-years",
    constellation: "Dorado",
    size: "≈ 14,000 light-years",
    age: "≈ 13 billion years",
  },

  {
    id: 8,
    name: "Centaurus A",
    catalog: "NGC 5128",
    type: "Lenticular Galaxy",
    image: centaurus,
    description:
      "Centaurus A is a peculiar galaxy with a dramatic dark dust lane across its center. It is also a powerful source of radio emission.",
    distance: "≈ 12 million light-years",
    constellation: "Centaurus",
    size: "≈ 60,000 light-years",
    age: "≈ 13 billion years",
  },
];

/* =========================================================
   GALAXY TYPES
========================================================= */

export const galaxyTypes = [
  {
    id: 1,
    title: "Spiral",
    description:
      "Spiral galaxies have a flattened disk, a central bulge, and distinctive arms where many new stars are formed.",
    image: spiral,
  },

  {
    id: 2,
    title: "Elliptical",
    description:
      "Elliptical galaxies range from nearly spherical to highly elongated shapes and are generally dominated by older stars.",
    image: elliptical,
  },

  {
    id: 3,
    title: "Lenticular",
    description:
      "Lenticular galaxies have a central bulge and disk but lack the prominent spiral arms seen in spiral galaxies.",
    image: lenticular,
  },

  {
    id: 4,
    title: "Irregular",
    description:
      "Irregular galaxies do not have a clear regular shape and often show signs of gravitational interactions or active star formation.",
    image: irregular,
  },
];

/* =========================================================
   GALAXY ANATOMY
========================================================= */

export const galaxyAnatomy = [
  {
    id: 1,
    title: "Galactic Core",
    description:
      "The dense central region of a galaxy, often containing a supermassive black hole.",
  },

  {
    id: 2,
    title: "Bulge",
    description:
      "A concentrated region of stars surrounding the galactic center.",
  },

  {
    id: 3,
    title: "Galactic Disk",
    description:
      "The flattened region containing stars, gas, dust, and in spiral galaxies, prominent spiral arms.",
  },

  {
    id: 4,
    title: "Spiral Arms",
    description:
      "Bright regions of a spiral galaxy where gas, dust, and young stars gather.",
  },

  {
    id: 5,
    title: "Galactic Halo",
    description:
      "A huge diffuse region surrounding the visible galaxy and containing old stars, globular clusters, and dark matter.",
  },

  {
    id: 6,
    title: "Dark Matter",
    description:
      "Invisible matter whose gravitational influence plays a major role in holding galaxies together.",
  },
];

/* =========================================================
   GALAXY EVOLUTION
========================================================= */

export const galaxyEvolution = [
  {
    number: "01",
    title: "Formation",
    text: "Gravity gathers matter together, creating the early structures from which galaxies develop.",
  },

  {
    number: "02",
    title: "First Stars",
    text: "The earliest generations of stars ignite inside growing galactic structures.",
  },

  {
    number: "03",
    title: "Growth",
    text: "Galaxies grow by forming new stars and gathering gas, dust, and smaller structures.",
  },

  {
    number: "04",
    title: "Interaction",
    text: "Gravity can bring galaxies close together, triggering changes and bursts of star formation.",
  },

  {
    number: "05",
    title: "Mergers",
    text: "Galaxies can merge into larger systems, dramatically reshaping their structures.",
  },

  {
    number: "06",
    title: "Evolution",
    text: "Over billions of years, galaxies continue changing as stars form, evolve, and return material to space.",
  },
];

export const GalaxiesFewDetails=[
            ["4", "Major galaxy types"],
            ["100,000 ly", "Milky Way diameter"],
            ["2.5 M ly", "Andromeda distance"],
            ["Billions", "Of stars in galaxies"],
          ]