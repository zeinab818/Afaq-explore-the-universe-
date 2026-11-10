import orion from "@/assets/images/nebulas/OrionNebula.jpg";
import carina from "@/assets/images/nebulas/CarinaNebula.jpg";
import eagle from "@/assets/images/nebulas/EagleNebula.jpg";
import crab from "@/assets/images/nebulas/CrabNebula.jpg";
import ring from "@/assets/images/nebulas/RingNebula.jpg";
import helix from "@/assets/images/nebulas/HelixNebula.jpg";
import lagoon from "@/assets/images/nebulas/LagoonNebula.jpg";
import horsehead from "@/assets/images/nebulas/HorseheadNebula.jpg";
import butterfly from "@/assets/images/nebulas/ButterflyNebula.jpeg";
import catsEye from "@/assets/images/nebulas/CatsEyeNebula.jpeg";
import tarantula from "@/assets/images/nebulas/TarantulaNebula.jpeg";
import ant from "@/assets/images/nebulas/AntNebula.jpeg";
import littleGhost from "@/assets/images/nebulas/LittleGhostNebula.jpeg";
import eskimo from "@/assets/images/nebulas/EskimoNebula.jpeg";
import veil from "@/assets/images/nebulas/VeilNebula.jpeg";
import heart from "@/assets/images/nebulas/HeartNebula.jpeg";

const nebulae = [
  {
    id: 1,
    name: "Orion Nebula",
    catalog: "M42",
    type: "Emission Nebula",
    distance: "1,344 light-years",
    constellation: "Orion",
    size: "24 light-years",
    image: orion,
    description:
      "One of the brightest and most famous stellar nurseries in the night sky, where new stars are being born from vast clouds of gas and dust.",
  },
  {
    id: 2,
    name: "Carina Nebula",
    catalog: "NGC 3372",
    type: "Emission Nebula",
    distance: "7,500 light-years",
    constellation: "Carina",
    size: "460 light-years",
    image: carina,
    description:
      "A colossal stellar nursery containing some of the most massive and luminous stars known in our galaxy.",
  },
  {
    id: 3,
    name: "Eagle Nebula",
    catalog: "M16",
    type: "Emission Nebula",
    distance: "6,500 light-years",
    constellation: "Serpens",
    size: "70 light-years",
    image: eagle,
    description:
      "A spectacular region of star formation famous for the towering Pillars of Creation.",
  },
  {
    id: 4,
    name: "Crab Nebula",
    catalog: "M1",
    type: "Supernova Remnant",
    distance: "6,500 light-years",
    constellation: "Taurus",
    size: "11 light-years",
    image: crab,
    description:
      "The expanding remains of a massive stellar explosion observed by astronomers in the year 1054.",
  },
  {
    id: 5,
    name: "Ring Nebula",
    catalog: "M57",
    type: "Planetary Nebula",
    distance: "2,200 light-years",
    constellation: "Lyra",
    size: "1 light-year",
    image: ring,
    description:
      "A glowing shell of gas expelled by a dying star, creating one of the most recognizable nebulae in the sky.",
  },
  {
    id: 6,
    name: "Helix Nebula",
    catalog: "NGC 7293",
    type: "Planetary Nebula",
    distance: "655 light-years",
    constellation: "Aquarius",
    size: "2.5 light-years",
    image: helix,
    description:
      "One of the closest planetary nebulae to Earth, often called the Eye of God because of its striking appearance.",
  },
  {
    id: 7,
    name: "Lagoon Nebula",
    catalog: "M8",
    type: "Emission Nebula",
    distance: "4,100 light-years",
    constellation: "Sagittarius",
    size: "110 light-years",
    image: lagoon,
    description:
      "A huge cloud of gas and dust where intense star formation is taking place.",
  },
  {
    id: 8,
    name: "Horsehead Nebula",
    catalog: "Barnard 33",
    type: "Dark Nebula",
    distance: "1,375 light-years",
    constellation: "Orion",
    size: "7 light-years",
    image: horsehead,
    description:
      "A dense cloud of cosmic dust silhouetted against glowing hydrogen gas, creating its famous horsehead shape.",
  },
  
{
  id: 9,
  name: "Butterfly Nebula",
  catalog: "NGC 6302",
  type: "Planetary Nebula",
  distance: "About 3,400 light-years",
  constellation: "Scorpius",
  size: "About 3 light-years",
  image: butterfly,
  description:
    "A dying star has cast off its outer layers, creating enormous glowing wings of gas shaped by powerful stellar outflows.",
},
{
  id: 10,
  name: "Cat's Eye Nebula",
  catalog: "NGC 6543",
  type: "Planetary Nebula",
  distance: "About 3,000 light-years",
  constellation: "Draco",
  size: "Complex expanding shells",
  image: catsEye,
  description:
    "Concentric shells, fast-moving jets, and intricate knots of gas reveal the complex final evolution of a dying star.",
},
{
  id: 11,
  name: "Tarantula Nebula",
  catalog: "30 Doradus",
  type: "Star-forming Region",
  distance: "About 160,000 light-years",
  constellation: "Dorado",
  size: "Hundreds of light-years",
  image: tarantula,
  description:
    "A vast and intensely active stellar nursery, filled with massive young stars that illuminate the surrounding clouds.",
},
{
  id: 12,
  name: "Ant Nebula",
  catalog: "Menzel 3",
  type: "Bipolar Nebula",
  distance: "Distance estimates vary",
  constellation: "Norma",
  size: "Varies by measurement",
  image: ant,
  description:
    "Twin lobes of glowing gas stream away from a dying star, creating a striking shape reminiscent of an ant.",
},
{
  id: 13,
  name: "Little Ghost Nebula",
  catalog: "NGC 6369",
  type: "Planetary Nebula",
  distance: "Estimates vary",
  constellation: "Ophiuchus",
  size: "Varies by measurement",
  image: littleGhost,
  description:
    "A compact, glowing shell of gas released during the late evolution of a star similar to the Sun.",
},
{
  id: 14,
  name: "Eskimo Nebula",
  catalog: "NGC 2392",
  type: "Planetary Nebula",
  distance: "About 5,000 light-years",
  constellation: "Gemini",
  size: "Varies by measurement",
  image: eskimo,
  description:
    "Layered shells and intricate streams of gas surround a dying star, producing a face-like appearance.",
},
{
  id: 15,
  name: "Veil Nebula",
  catalog: "NGC 6960",
  type: "Supernova Remnant",
  distance: "About 2,400 light-years",
  constellation: "Cygnus",
  size: "Tens of light-years",
  image: veil,
  description:
    "Delicate filaments trace shock waves and glowing debris from a stellar explosion thousands of years ago.",
},
{
  id: 16,
  name: "Heart Nebula",
  catalog: "IC 1805",
  type: "Emission Nebula",
  distance: "About 7,500 light-years",
  constellation: "Cassiopeia",
  size: "About 200 light-years",
  image: heart,
  description:
    "A sprawling cloud of glowing gas and dust where energetic young stars shape the surrounding interstellar material.",
},

];

const nebulaTypes = [
  {
    title: "Emission",
    description:
      "Clouds of ionized gas that glow brightly as their atoms release energy.",
    image: nebulae[0].image,
  },
  {
    title: "Dark",
    description:
      "Dense clouds of dust that block the light coming from objects behind them.",
    image: nebulae[7].image,
  },
  {
    title: "Planetary",
    description:
      "Expanding shells of gas released by dying stars similar to our Sun.",
    image: nebulae[4].image,
  },
  {
    title: "Supernova Remnants",
    description:
      "The spectacular remains left behind after a massive star explodes.",
    image: nebulae[3].image,
  },
];

const nebulaFewDetails=[
            ["4+", "Major nebula categories"],
            ["≈ 1,300 ly", "Orion Nebula distance"],
            ["Millions", "Of stars can form"],
            ["13.8 B years", "Age of the universe"],
          ]
export { nebulae, nebulaTypes,nebulaFewDetails };