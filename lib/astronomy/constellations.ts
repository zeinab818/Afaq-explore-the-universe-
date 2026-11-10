
export type Star = {
  id: string;
  name: string;
  ra: number; // Right ascension in hours
  dec: number; // Declination in degrees
  magnitude: number;
};

export type Constellation = {
  id: string;
  name: string;
  title: string;
  region: "Northern Sky" | "Southern Sky" | "Zodiac";
  description: string;
  brightestStar: string;
  stars: Star[];
  lines: [number, number][];
};

export const constellations: Constellation[] = [
  {
    id: "orion",
    name: "Orion",
    title: "The Hunter",
    region: "Northern Sky",
    description:
      "A striking constellation recognized by its three-star belt. It contains brilliant stars and the Orion Nebula.",
    brightestStar: "Rigel",
    stars: [
      { id: "betelgeuse", name: "Betelgeuse", ra: 5.9195, dec: 7.4071, magnitude: 0.42 },
      { id: "bellatrix", name: "Bellatrix", ra: 5.4189, dec: 6.3497, magnitude: 1.64 },
      { id: "alnitak", name: "Alnitak", ra: 5.6793, dec: -1.9426, magnitude: 1.77 },
      { id: "alnilam", name: "Alnilam", ra: 5.6036, dec: -1.2019, magnitude: 1.69 },
      { id: "mintaka", name: "Mintaka", ra: 5.5334, dec: -0.2991, magnitude: 2.23 },
      { id: "saiph", name: "Saiph", ra: 5.7959, dec: -9.6696, magnitude: 2.07 },
      { id: "rigel", name: "Rigel", ra: 5.2423, dec: -8.2016, magnitude: 0.13 },
    ],
    lines: [
      [0, 1], [0, 2], [1, 4], [2, 3], [3, 4],
      [2, 5], [4, 6], [5, 6],
    ],
  },

  {
    id: "ursa-major",
    name: "Ursa Major",
    title: "The Great Bear",
    region: "Northern Sky",
    description:
      "A large northern constellation famous for the Big Dipper asterism and its useful pointer stars.",
    brightestStar: "Alioth",
    stars: [
      { id: "dubhe", name: "Dubhe", ra: 11.0621, dec: 61.7510, magnitude: 1.79 },
      { id: "merak", name: "Merak", ra: 11.0307, dec: 56.3824, magnitude: 2.37 },
      { id: "phecda", name: "Phecda", ra: 11.8972, dec: 53.6948, magnitude: 2.44 },
      { id: "megrez", name: "Megrez", ra: 12.2571, dec: 57.0326, magnitude: 3.31 },
      { id: "alioth", name: "Alioth", ra: 12.9005, dec: 55.9598, magnitude: 1.77 },
      { id: "mizar", name: "Mizar", ra: 13.3987, dec: 54.9254, magnitude: 2.23 },
      { id: "alkaid", name: "Alkaid", ra: 13.7923, dec: 49.3133, magnitude: 1.86 },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [3, 4], [4, 5], [5, 6],
    ],
  },

  {
    id: "cassiopeia",
    name: "Cassiopeia",
    title: "The Queen",
    region: "Northern Sky",
    description:
      "An easily recognizable W-shaped constellation in the northern celestial hemisphere.",
    brightestStar: "Schedar",
    stars: [
      { id: "caph", name: "Caph", ra: 0.1529, dec: 59.1498, magnitude: 2.28 },
      { id: "schedar", name: "Schedar", ra: 0.6751, dec: 56.5373, magnitude: 2.24 },
      { id: "gamma-cas", name: "Gamma Cassiopeiae", ra: 0.9451, dec: 60.7167, magnitude: 2.47 },
      { id: "ruchbah", name: "Ruchbah", ra: 1.4303, dec: 60.2353, magnitude: 2.68 },
      { id: "egin", name: "Segin", ra: 1.9066, dec: 63.6700, magnitude: 3.37 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },

  {
    id: "taurus",
    name: "Taurus",
    title: "The Bull",
    region: "Zodiac",
    description:
      "A zodiac constellation known for the red giant Aldebaran and the Pleiades star cluster.",
    brightestStar: "Aldebaran",
    stars: [
      { id: "aldebaran", name: "Aldebaran", ra: 4.5987, dec: 16.5093, magnitude: 0.85 },
      { id: "elnath", name: "Elnath", ra: 5.4382, dec: 28.6075, magnitude: 1.65 },
      { id: "alcyone", name: "Alcyone", ra: 3.7914, dec: 24.1050, magnitude: 2.87 },
      { id: "zeta-tau", name: "Zeta Tauri", ra: 5.6274, dec: 21.1425, magnitude: 3.03 },
    ],
    lines: [[2, 0], [0, 1], [0, 3]],
  },

  {
    id: "leo",
    name: "Leo",
    title: "The Lion",
    region: "Zodiac",
    description:
      "A recognizable zodiac constellation featuring the bright star Regulus and a sickle-shaped pattern.",
    brightestStar: "Regulus",
    stars: [
      { id: "regulus", name: "Regulus", ra: 10.1395, dec: 11.9672, magnitude: 1.35 },
      { id: "algieba", name: "Algieba", ra: 10.3329, dec: 19.8415, magnitude: 2.01 },
      { id: "zosma", name: "Zosma", ra: 11.2351, dec: 20.5237, magnitude: 2.56 },
      { id: "denebola", name: "Denebola", ra: 11.8177, dec: 14.5721, magnitude: 2.14 },
      { id: "chertan", name: "Chertan", ra: 11.2373, dec: 15.4296, magnitude: 3.33 },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
    ],
  },

  {
    id: "scorpius",
    name: "Scorpius",
    title: "The Scorpion",
    region: "Zodiac",
    description:
      "A prominent southern constellation with a curved tail and the red supergiant Antares.",
    brightestStar: "Antares",
    stars: [
      { id: "antares", name: "Antares", ra: 16.4901, dec: -26.4320, magnitude: 1.06 },
      { id: "dschubba", name: "Dschubba", ra: 16.0056, dec: -22.6217, magnitude: 2.32 },
      { id: "acrab", name: "Acrab", ra: 16.0906, dec: -19.8050, magnitude: 2.62 },
      { id: "sargas", name: "Sargas", ra: 17.6219, dec: -42.9978, magnitude: 1.86 },
      { id: "shaula", name: "Shaula", ra: 17.5601, dec: -37.1038, magnitude: 1.63 },
      { id: "lesath", name: "Lesath", ra: 17.5307, dec: -37.2958, magnitude: 2.70 },
    ],
    lines: [
      [2, 1], [1, 0], [0, 3], [3, 4], [4, 5],
    ],
  },

  {
    id: "cygnus",
    name: "Cygnus",
    title: "The Swan",
    region: "Northern Sky",
    description:
      "A northern constellation whose brightest stars form the Northern Cross asterism.",
    brightestStar: "Deneb",
    stars: [
      { id: "deneb", name: "Deneb", ra: 20.6905, dec: 45.2803, magnitude: 1.25 },
      { id: "sadr", name: "Sadr", ra: 20.3705, dec: 40.2567, magnitude: 2.23 },
      { id: "gienah", name: "Gienah", ra: 20.7702, dec: 33.9703, magnitude: 2.46 },
      { id: "albireo", name: "Albireo", ra: 19.5120, dec: 27.9597, magnitude: 3.08 },
      { id: "delta-cyg", name: "Delta Cygni", ra: 19.7496, dec: 45.1308, magnitude: 2.87 },
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [1, 4],
    ],
  },

  {
    id: "lyra",
    name: "Lyra",
    title: "The Lyre",
    region: "Northern Sky",
    description:
      "A small northern constellation containing Vega, one of the brightest stars in the night sky.",
    brightestStar: "Vega",
    stars: [
      { id: "vega", name: "Vega", ra: 18.6156, dec: 38.7837, magnitude: 0.03 },
      { id: "sheliak", name: "Sheliak", ra: 18.8347, dec: 33.3627, magnitude: 3.52 },
      { id: "sulafat", name: "Sulafat", ra: 18.9824, dec: 32.6896, magnitude: 3.25 },
    ],
    lines: [[0, 1], [1, 2], [2, 0]],
  },

  {
    id: "pegasus",
    name: "Pegasus",
    title: "The Winged Horse",
    region: "Northern Sky",
    description:
      "A large northern constellation recognized by the Great Square of Pegasus.",
    brightestStar: "Enif",
    stars: [
      { id: "markab", name: "Markab", ra: 23.0793, dec: 15.2053, magnitude: 2.49 },
      { id: "scheat", name: "Scheat", ra: 23.0629, dec: 28.0828, magnitude: 2.42 },
      { id: "algenib", name: "Algenib", ra: 0.2206, dec: 15.1836, magnitude: 2.83 },
      { id: "alpheratz", name: "Alpheratz", ra: 0.1398, dec: 29.0904, magnitude: 2.06 },
    ],
    lines: [[0, 1], [1, 3], [3, 2], [2, 0]],
  },

  {
    id: "andromeda",
    name: "Andromeda",
    title: "The Chained Maiden",
    region: "Northern Sky",
    description:
      "A northern constellation that contains the Andromeda Galaxy, the nearest major galaxy to the Milky Way.",
    brightestStar: "Alpheratz",
    stars: [
      { id: "alpheratz-and", name: "Alpheratz", ra: 0.1398, dec: 29.0904, magnitude: 2.06 },
      { id: "mirach", name: "Mirach", ra: 1.1622, dec: 35.6206, magnitude: 2.05 },
      { id: "almach", name: "Almach", ra: 2.0649, dec: 42.3297, magnitude: 2.10 },
    ],
    lines: [[0, 1], [1, 2]],
  },
];
