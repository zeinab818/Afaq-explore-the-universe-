import perseids from "@/assets/images/meteors/perseids.jpg";
import geminids from "@/assets/images/meteors/geminids.jpeg";
import leonids from "@/assets/images/meteors/leonids.jpeg";
import orionids from "@/assets/images/meteors/orionids.jpeg";
import etaAquariids from "@/assets/images/meteors/etaAquariids.jpeg";
import quadrantids from "@/assets/images/meteors/quadrantids.jpeg";

export const meteors = [
  {
    id: "perseids",
    name: "Perseids",
    peak: "August",
    parent: "109P / Swift–Tuttle",
    speed: "≈ 59 km/s",
    origin: "Comet debris",
    description:
      "One of the most famous annual meteor showers, produced as Earth passes through dust and debris left behind by Comet Swift–Tuttle.",
    significance:
      "Known for bright, fast meteors and frequent activity, making it one of the most spectacular meteor showers visible from Earth.",
    image: perseids,
  },

  {
    id: "geminids",
    name: "Geminids",
    peak: "December",
    parent: "3200 Phaethon",
    speed: "≈ 35 km/s",
    origin: "Asteroid-associated debris",
    description:
      "A powerful annual meteor shower associated with the unusual object 3200 Phaethon rather than a traditional comet.",
    significance:
      "Geminids are often exceptionally bright and numerous, making them one of the strongest meteor showers of the year.",
    image: geminids,
  },

  {
    id: "leonids",
    name: "Leonids",
    peak: "November",
    parent: "55P / Tempel–Tuttle",
    speed: "≈ 71 km/s",
    origin: "Comet debris",
    description:
      "A fast meteor shower created by debris from Comet Tempel–Tuttle as Earth crosses its orbital trail.",
    significance:
      "The Leonids are famous for producing spectacular meteor storms during particularly dense debris encounters.",
    image: leonids,
  },

  {
    id: "orionids",
    name: "Orionids",
    peak: "October",
    parent: "1P / Halley's Comet",
    speed: "≈ 66 km/s",
    origin: "Comet debris",
    description:
      "An annual meteor shower produced by particles released by Halley's Comet along its enormous orbit around the Sun.",
    significance:
      "The Orionids allow Earth to encounter ancient material shed by one of the most famous comets known to humanity.",
    image: orionids,
  },

  {
    id: "eta-aquariids",
    name: "Eta Aquariids",
    peak: "May",
    parent: "1P / Halley's Comet",
    speed: "≈ 66 km/s",
    origin: "Comet debris",
    description:
      "A meteor shower formed from the same stream of debris associated with Halley's Comet that also produces the Orionids.",
    significance:
      "Its fast meteors can create long-lasting trails across the sky, especially when observed from favorable locations.",
    image: etaAquariids,
  },

  {
    id: "quadrantids",
    name: "Quadrantids",
    peak: "January",
    parent: "2003 EH1",
    speed: "≈ 41 km/s",
    origin: "Asteroid-like parent body",
    description:
      "A strong meteor shower with a remarkably narrow peak, associated with the near-Earth object 2003 EH1.",
    significance:
      "Its short but intense peak makes the Quadrantids one of the most distinctive annual meteor showers.",
    image: quadrantids,
  },
];

export const meteorTypes = [
  {
    id: "meteoroid",
    title: "Meteoroid",
    description:
      "A small rocky or metallic body traveling through space before entering a planetary atmosphere.",
  },
  {
    id: "meteor",
    title: "Meteor",
    description:
      "The streak of light produced when a meteoroid enters an atmosphere at high speed and heats and ionizes the surrounding gas.",
  },
  {
    id: "fireball",
    title: "Fireball",
    description:
      "An exceptionally bright meteor that can briefly outshine much of the night sky.",
  },
  {
    id: "meteorite",
    title: "Meteorite",
    description:
      "A fragment of the original meteoroid that survives atmospheric passage and reaches the surface.",
  },
];

export const meteorAnatomy = [
  {
    id: "meteoroid",
    number: "01",
    title: "Meteoroid",
    description:
      "The solid body begins its journey through space as a small piece of rock or metal.",
  },
  {
    id: "atmosphere",
    number: "02",
    title: "Atmospheric Entry",
    description:
      "When it encounters an atmosphere, the meteoroid collides with molecules of gas at enormous speed.",
  },
  {
    id: "plasma",
    number: "03",
    title: "Glowing Plasma",
    description:
      "The surrounding gas becomes excited and ionized, producing the brilliant streak we call a meteor.",
  },
  {
    id: "meteorite",
    number: "04",
    title: "Meteorite",
    description:
      "If part of the original body survives the journey, the remaining material can reach the planetary surface.",
  },
];

export const meteorOrigins = [
  {
    id: "comets",
    title: "Comets",
    description:
      "As comets travel around their stars, they release dust and rocky particles that can form enormous debris streams.",
  },
  {
    id: "asteroids",
    title: "Asteroids",
    description:
      "Collisions, fragmentation, and surface processes can produce streams of particles associated with asteroid-like bodies.",
  },
  {
    id: "planetary-systems",
    title: "Planetary Systems",
    description:
      "Small bodies and debris exist throughout planetary systems, creating potential sources of meteoroids.",
  },
  {
    id: "interplanetary-space",
    title: "Interplanetary Space",
    description:
      "Tiny fragments can remain in orbit around their star for enormous periods before eventually encountering a planet.",
  },
];

export const meteorLifecycle = [
  {
    step: "01",
    title: "Formation",
    description:
      "A fragment is produced by a comet, asteroid, collision, or another process in a planetary system.",
  },
  {
    step: "02",
    title: "Journey",
    description:
      "The meteoroid travels through space along an orbit determined by gravity.",
  },
  {
    step: "03",
    title: "Encounter",
    description:
      "Its trajectory brings it into the path of a planet and its atmosphere.",
  },
  {
    step: "04",
    title: "Atmospheric Entry",
    description:
      "The meteoroid enters the atmosphere at tremendous speed and begins interacting with atmospheric gases.",
  },
  {
    step: "05",
    title: "Meteor",
    description:
      "The resulting luminous phenomenon briefly paints a streak across the sky.",
  },
  {
    step: "06",
    title: "Meteorite",
    description:
      "If enough material survives, fragments can reach the surface and become meteorites.",
  },
];

export const meteorShowers = [
  {
    name: "Perseids",
    month: "August",
    parent: "109P / Swift–Tuttle",
  },
  {
    name: "Orionids",
    month: "October",
    parent: "1P / Halley",
  },
  {
    name: "Leonids",
    month: "November",
    parent: "55P / Tempel–Tuttle",
  },
  {
    name: "Geminids",
    month: "December",
    parent: "3200 Phaethon",
  },
  {
    name: "Quadrantids",
    month: "January",
    parent: "2003 EH1",
  },
  {
    name: "Eta Aquariids",
    month: "May",
    parent: "1P / Halley",
  },
];

export const meteorFacts = [
  {
    value: "≈ 11–72",
    unit: "km/s",
    label: "Typical atmospheric-entry speeds",
  },
  {
    value: "3",
    unit: "names",
    label: "Meteoroid · Meteor · Meteorite",
  },
  {
    value: "6",
    unit: "major showers",
    label: "Featured in this explorer",
  },
  {
    value: "∞",
    unit: "debris",
    label: "Particles crossing planetary space",
  },
];