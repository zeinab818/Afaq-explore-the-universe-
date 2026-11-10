
import spaceFactsHero from "@/assets/images/discovers/hero.jpeg";
import jupiterFact from "@/assets/images/discovers/jupiter-red-spot.jpeg";
import neutronStar from "@/assets/images/discovers/neutron-star.jpeg";
import distantGalaxy from "@/assets/images/discovers/distant-galaxy.jpeg";
import sun from "@/assets/images/discovers/sun-surface.jpeg";
import earth from "@/assets/images/discovers/earth-horizon.jpeg";
import milkyWay from "@/assets/images/discovers/milky-way-quran.jpeg";

import venus from "@/assets/images/discovers/venus.jpeg";
import moon from "@/assets/images/discovers/moon.jpeg";
import blackHole from "@/assets/images/discovers/black-hole.jpeg";


export const SPACE_IMAGES = {
  hero: spaceFactsHero,
  jupiter: jupiterFact,
  neutronStar,
  distantGalaxy,
  sun,
  earth,
  milkyWay,
  venus,
  moon,
  blackHole,
};

export const categories = [
  {
    id: "planets",
    name: "Planets & Moons",
    description: "Worlds full of surprises.",
    image: SPACE_IMAGES.jupiter,
    href: "/solarSystem",
  },
  {
    id: "black-holes",
    name: "Black Holes",
    description: "Where gravity challenges our imagination.",
    image: SPACE_IMAGES.blackHole,
    href: "/discover/black-holes",
  },
  {
    id: "stars-galaxies",
    name: "Stars & Galaxies",
    description: "Explore the distant cosmos.",
    image: SPACE_IMAGES.distantGalaxy,
    href: "/#cosmicOverview",
  },
  {
    id: "missions",
    name: "Space Missions",
    description: "Humanity's journey beyond Earth.",
    image: SPACE_IMAGES.earth,
    href: "/missions",
  },
  {
    id: "universe",
    name: "The Universe",
    description: "Discover the scale of the cosmos.",
    image: SPACE_IMAGES.milkyWay,
    href: "/#cosmicOverview",
  },
  {
    id: "moon",
    name: "The Moon",
    description: "Our nearest cosmic neighbor.",
    image: SPACE_IMAGES.moon,
    href: "/solarSystem",
  },
];

export const facts = [
  {
    id: "venus-day",
    category: "PLANETS",
    categoryId: "planets",
    title: "A rotation on Venus takes longer than its year.",
    description:
      "Venus takes about 243 Earth days to rotate once on its axis, while one orbit around the Sun takes about 225 Earth days.",
    highlight: "243",
    highlightLabel: "EARTH DAYS TO ROTATE",
    image: SPACE_IMAGES.venus,
    alt: "Venus, the planet with a thick cloudy atmosphere",
    source: "NASA Solar System Exploration",
  },
  {
    id: "sunlight",
    category: "OUR SUN",
    categoryId: "stars-galaxies",
    title: "Sunlight takes about 8 minutes to reach Earth.",
    description:
      "Sunlight travels through space at about 300,000 kilometers per second, taking roughly 8 minutes and 20 seconds to reach us.",
    highlight: "8m 20s",
    highlightLabel: "SUNLIGHT TRAVEL TIME",
    image: SPACE_IMAGES.sun,
    alt: "The glowing surface of the Sun",
    source: "NASA",
  },
  {
    id: "look-back-time",
    category: "GALAXIES",
    categoryId: "stars-galaxies",
    title: "Looking into space means looking into the past.",
    description:
      "Light takes time to travel. When we observe distant galaxies, we see light that began its journey long ago.",
    highlight: "PAST",
    highlightLabel: "WRITTEN IN STARLIGHT",
    image: SPACE_IMAGES.distantGalaxy,
    alt: "A distant field of galaxies",
    source: "NASA Hubble Space Telescope",
  },
  {
    id: "neutron-star-density",
    category: "NEUTRON STARS",
    categoryId: "stars-galaxies",
    title: "A neutron star can pack enormous mass into a tiny space.",
    description:
      "These stellar remnants are extraordinarily dense and can be only around 20 kilometers across.",
    highlight: "~20 km",
    highlightLabel: "TYPICAL DIAMETER",
    image: SPACE_IMAGES.neutronStar,
    alt: "Scientific visualization of a neutron star",
    source: "NASA",
  },
  {
    id: "black-hole-gravity",
    category: "BLACK HOLES",
    categoryId: "black-holes",
    title: "Beyond a black hole's event horizon, escape is impossible.",
    description:
      "The event horizon marks the boundary beyond which nothing can escape to the outside, not even light.",
    highlight: "EVENT",
    highlightLabel: "HORIZON",
    image: SPACE_IMAGES.blackHole,
    alt: "A black hole surrounded by a glowing accretion disk",
    source: "NASA",
  },
  {
    id: "moonlight",
    category: "THE MOON",
    categoryId: "moon",
    title: "The Moon does not make its own visible light.",
    description:
      "The Moon appears bright because its surface reflects sunlight toward Earth.",
    highlight: "REFLECTED",
    highlightLabel: "SUNLIGHT",
    image: SPACE_IMAGES.moon,
    alt: "The Moon illuminated by sunlight",
    source: "NASA Moon Exploration",
  },
  
  {
    id: "jupiter-great-red-spot",
    category: "JUPITER",
    categoryId: "planets",
    title: "Jupiter's Great Red Spot is a storm larger than Earth.",
    description:
      "This enormous atmospheric storm has raged for centuries. Its size and appearance change over time as powerful winds swirl through Jupiter's atmosphere.",
    highlight: "EARTH+",
    highlightLabel: "STORM LARGER THAN EARTH",
    image: SPACE_IMAGES.jupiter,
    alt: "Jupiter's Great Red Spot and swirling cloud bands",
    source: "NASA Solar System Exploration",
  },
  {
    id: "mars-olympus-mons",
    category: "MARS",
    categoryId: "planets",
    title: "Mars is home to the largest known volcano in the Solar System.",
    description:
      "Olympus Mons rises about 22 kilometers above the surrounding terrain, making it a giant even compared with Earth's tallest mountains.",
    highlight: "~22 km",
    highlightLabel: "VOLCANO HEIGHT",
    image: SPACE_IMAGES.earth,
    alt: "A view of a planetary horizon",
    source: "NASA Mars Exploration",
  },
  {
    id: "mercury-extreme-temperatures",
    category: "MERCURY",
    categoryId: "planets",
    title: "Mercury's nights can be colder than you might expect.",
    description:
      "Despite being closest to the Sun, Mercury has almost no atmosphere to retain heat. Temperatures can plunge dramatically after sunset.",
    highlight: "-179°C",
    highlightLabel: "APPROXIMATE NIGHT LOW",
    image: SPACE_IMAGES.sun,
    alt: "The glowing surface of the Sun",
    source: "NASA Planetary Fact Sheet",
  },
  {
    id: "saturn-ring-thickness",
    category: "SATURN",
    categoryId: "planets",
    title: "Saturn's rings are enormous but remarkably thin.",
    description:
      "The ring system spans hundreds of thousands of kilometers, yet some regions are only around 10 meters thick.",
    highlight: "~10 m",
    highlightLabel: "THICKNESS IN SOME REGIONS",
    image: SPACE_IMAGES.jupiter,
    alt: "A planetary atmosphere with swirling cloud bands",
    source: "NASA Solar System Exploration",
  },
  {
    id: "mars-day",
    category: "MARS",
    categoryId: "planets",
    title: "A day on Mars is remarkably close to an Earth day.",
    description:
      "Mars completes one rotation in about 24 hours and 37 minutes. Scientists call a Martian solar day a sol.",
    highlight: "24h 37m",
    highlightLabel: "MARTIAN SOL",
    image: SPACE_IMAGES.earth,
    alt: "A view of a planetary horizon",
    source: "NASA Mars Facts",
  },
  {
    id: "venus-retrograde",
    category: "VENUS",
    categoryId: "planets",
    title: "Venus rotates in the opposite direction to most planets.",
    description:
      "Venus has retrograde rotation, meaning it spins in the opposite direction to most planets in our Solar System.",
    highlight: "REVERSE",
    highlightLabel: "RETROGRADE ROTATION",
    image: SPACE_IMAGES.venus,
    alt: "Venus beneath its thick cloudy atmosphere",
    source: "NASA Planetary Fact Sheet Notes",
  },
  {
    id: "black-hole-light-bending",
    category: "BLACK HOLES",
    categoryId: "black-holes",
    title: "A black hole can bend light from objects behind it.",
    description:
      "Extreme gravity can distort the path of light, creating gravitational lensing that helps astronomers study otherwise difficult-to-see objects.",
    highlight: "LENSING",
    highlightLabel: "GRAVITY BENDS LIGHT",
    image: SPACE_IMAGES.blackHole,
    alt: "A black hole surrounded by a glowing accretion disk",
    source: "NASA Black Holes",
  },
  {
    id: "galaxy-scale",
    category: "GALAXIES",
    categoryId: "stars-galaxies",
    title: "Some galaxies contain trillions of stars.",
    description:
      "Galaxies range from small systems with thousands of stars to enormous galaxies containing trillions, all held together by gravity.",
    highlight: "TRILLIONS",
    highlightLabel: "STARS IN SOME GALAXIES",
    image: SPACE_IMAGES.distantGalaxy,
    alt: "A distant field of galaxies",
    source: "NASA Galaxies",
  },
  {
    id: "galaxy-age",
    category: "GALAXIES",
    categoryId: "stars-galaxies",
    title: "Some galaxies formed when the universe was very young.",
    description:
      "Astronomers observe distant galaxies as they were billions of years ago, helping them investigate how galaxies formed and evolved.",
    highlight: "BILLIONS",
    highlightLabel: "OF YEARS IN THE PAST",
    image: SPACE_IMAGES.milkyWay,
    alt: "A view of the Milky Way beneath a dark sky",
    source: "NASA Galaxies",
  },
  {
    id: "neutron-star-size",
    category: "NEUTRON STARS",
    categoryId: "stars-galaxies",
    title: "A neutron star can squeeze stellar mass into a city-sized sphere.",
    description:
      "After certain massive stars collapse, their remnants can be only about 20 kilometers across while containing more mass than the Sun.",
    highlight: "~20 km",
    highlightLabel: "TYPICAL DIAMETER",
    image: SPACE_IMAGES.neutronStar,
    alt: "Scientific visualization of a neutron star",
    source: "NASA",
  },
  {
    id: "moon-recession",
    category: "THE MOON",
    categoryId: "moon",
    title: "The Moon is slowly moving away from Earth.",
    description:
      "Laser measurements show that the Moon's average distance from Earth increases by about 3.8 centimeters per year.",
    highlight: "3.8 cm",
    highlightLabel: "AVERAGE DISTANCE INCREASE PER YEAR",
    image: SPACE_IMAGES.moon,
    alt: "The Moon illuminated by sunlight",
    source: "NASA Moon Exploration",
  },
  {
    id: "earth-atmosphere",
    category: "OUR PLANET",
    categoryId: "stars-galaxies",
    title: "Earth's atmosphere protects the surface in several ways.",
    description:
      "The atmosphere helps regulate temperature and shields the surface from much of the Sun's harmful ultraviolet radiation.",
    highlight: "PROTECTION",
    highlightLabel: "OUR PLANETARY SHIELD",
    image: SPACE_IMAGES.earth,
    alt: "Earth's horizon and atmospheric glow",
    source: "NASA Earth Observatory",
  },

];
