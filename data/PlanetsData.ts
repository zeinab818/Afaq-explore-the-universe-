import mercury from "@/assets/images/planets/mercury.jpg";
import venus from "@/assets/images/planets/venus.jpg";
import earth from "@/assets/images/planets/earth.jpg";
import mars from "@/assets/images/planets/mars.jpg";
import jupiter from "@/assets/images/planets/jupiter.jpg";
import saturn from "@/assets/images/planets/saturn.jpg";
import uranus from "@/assets/images/planets/uranus.jpg";
import neptune from "@/assets/images/planets/neptune.jpg";

export const planets = [
  {
    name: "Mercury",
    slug: "mercury",
    description:
      "The smallest planet and the closest world to the Sun.",
    image: mercury,
  },
  {
    name: "Venus",
    slug: "venus",
    description:
      "A world of intense heat, thick clouds, and a runaway greenhouse effect.",
    image: venus,
  },
  {
    name: "Earth",
    slug: "earth",
    description:
      "Our home planet, rich with oceans, life, and a remarkable atmosphere.",
    image: earth,
  },
  {
    name: "Mars",
    slug: "mars",
    description:
      "The Red Planet, marked by ancient landscapes and the possibility of past water.",
    image: mars,
  },
  {
    name: "Jupiter",
    slug: "jupiter",
    description:
      "The largest planet in our Solar System, known for its enormous storms.",
    image: jupiter,
  },
  {
    name: "Saturn",
    slug: "saturn",
    description:
      "A gas giant surrounded by a spectacular system of icy rings.",
    image: saturn,
  },
  {
    name: "Uranus",
    slug: "uranus",
    description:
      "An ice giant rotating on its side with a pale blue atmosphere.",
    image: uranus,
  },
  {
    name: "Neptune",
    slug: "neptune",
    description:
      "The distant blue ice giant with some of the fastest winds in the Solar System.",
    image: neptune,
  },
];

export default planets;