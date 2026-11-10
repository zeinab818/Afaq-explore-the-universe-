import sirius from "@/assets/images/stars/sirius.jpeg";
import betelgeuse from "@/assets/images/stars/betelgeuse.jpeg";
import rigel from "@/assets/images/stars/rigel.jpeg";
import aldebaran from "@/assets/images/stars/aldebaran.jpeg";
import vega from "@/assets/images/stars/vega.jpeg";
import spica from "@/assets/images/stars/spica.jpeg";
import antares from "@/assets/images/stars/antares.jpeg";

import starLife1 from "@/assets/images/stars/1.jpeg";
import starLife2 from "@/assets/images/stars/2.jpeg";
import starLife3 from "@/assets/images/stars/3.jpeg";
import starLife4 from "@/assets/images/stars/4.jpeg";
import starLife5 from "@/assets/images/stars/5.jpeg";


import {

  Orbit,
  Sparkles,
  Star,
  Flame,

} from "lucide-react";

export const StarLifeImages = [
  starLife1,
  starLife2,
  starLife3,
  starLife4,
  starLife5,
];
export const starsNames=[
              { name: "Sirius", image: sirius, tag: "Brightest" },
              { name: "Betelgeuse", image: betelgeuse, tag: "Red Supergiant" },
              { name: "Vega", image: vega, tag: "Summer Triangle" },
              { name: "Antares", image: antares, tag: "Scorpius" },
            ]
export const starsNum=[
            ["100+ billion", "Stars in the Milky Way"],
            ["≈ 5,500 K", "Sun's surface temperature"],
            ["8.6 light-years", "Sirius distance"],
            ["≈ 13.8 B years", "Age of the universe"],
          ]
export const stars = [
  {
    name: "Sirius",
    subtitle: "The Brightest Star in the Night Sky",
    image: sirius,
    type: "A-type",
    distance: "8.6 ly",
    temperature: "9,940 K",
    magnitude: "-1.46",
    description:
      "Sirius is the brightest star visible from Earth at night and one of our closest stellar neighbors.",
  },
  {
    name: "Betelgeuse",
    subtitle: "A Red Supergiant",
    image: betelgeuse,
    type: "M-type",
    distance: "≈640 ly",
    temperature: "≈3,500 K",
    magnitude: "0.42",
    description:
      "Betelgeuse is an enormous red supergiant in the constellation Orion, nearing the final stages of its stellar life.",
  },
  {
    name: "Rigel",
    subtitle: "A Blue Supergiant",
    image: rigel,
    type: "B-type",
    distance: "≈860 ly",
    temperature: "≈12,100 K",
    magnitude: "0.13",
    description:
      "Rigel is a brilliant blue supergiant and the brightest star in the constellation Orion.",
  },
  {
    name: "Aldebaran",
    subtitle: "The Eye of Taurus",
    image: aldebaran,
    type: "K-type",
    distance: "≈65 ly",
    temperature: "≈3,900 K",
    magnitude: "0.86",
    description:
      "Aldebaran is an orange giant that appears as the eye of Taurus, one of the most recognizable stars in the sky.",
  },
  {
    name: "Vega",
    subtitle: "The Blue-White Beacon",
    image: vega,
    type: "A-type",
    distance: "25 ly",
    temperature: "≈9,600 K",
    magnitude: "0.03",
    description:
      "Vega is one of the brightest stars in the northern sky and forms part of the famous Summer Triangle.",
  },
  {
    name: "Spica",
    subtitle: "A Brilliant Stellar System",
    image: spica,
    type: "B-type",
    distance: "≈250 ly",
    temperature: "≈22,400 K",
    magnitude: "0.97",
    description:
      "Spica is a spectacular binary star system in Virgo, composed of two massive, hot stars.",
  },
  {
    name: "Antares",
    subtitle: "The Heart of Scorpius",
    image: antares,
    type: "M-type",
    distance: "≈550 ly",
    temperature: "≈3,600 K",
    magnitude: "0.96",
    description:
      "Antares is a massive red supergiant whose reddish glow gives it its name, meaning rival of Mars.",
  },
];

export const spectralClasses = [
  {
    type: "O",
    color: "Blue",
    temperature: "> 30,000 K",
    description: "Extremely hot and massive",
  },
  {
    type: "B",
    color: "Blue-White",
    temperature: "10,000–30,000 K",
    description: "Hot and luminous",
  },
  {
    type: "A",
    color: "White",
    temperature: "7,500–10,000 K",
    description: "Bright white stars",
  },
  {
    type: "F",
    color: "Yellow-White",
    temperature: "6,000–7,500 K",
    description: "Intermediate stars",
  },
  {
    type: "G",
    color: "Yellow",
    temperature: "5,200–6,000 K",
    description: "Sun-like stars",
  },
  {
    type: "K",
    color: "Orange",
    temperature: "3,700–5,200 K",
    description: "Cooler orange stars",
  },
  {
    type: "M",
    color: "Red",
    temperature: "< 3,700 K",
    description: "Cool red stars",
  },
];

export const lifeStages = [
  {
    number: "01",
    title: "Stellar Nebula",
    icon: Sparkles,
    description:
      "A star's journey begins in a vast cloud of gas and dust. Under gravity, dense regions collapse and begin forming new stars.",
  },
  {
    number: "02",
    title: "Protostar",
    icon: Orbit,
    description:
      "As gravity pulls material inward, the forming star grows hotter and denser. It is not yet powered by stable hydrogen fusion in its core.",
  },
  {
    number: "03",
    title: "Main Sequence",
    icon: Star,
    description:
      "The star enters its longest stable phase, fusing hydrogen into helium in its core. How long this stage lasts depends largely on its mass.",
  },
  {
    number: "04",
    title: "Red Giant or Supergiant",
    icon: Flame,
    description:
      "As core hydrogen runs out, the star evolves. Sun-like stars become red giants, while massive stars can become red supergiants.",
  },
  {
    number: "05",
    title: "The Final Fate",
    icon: Sparkles,
    description:
      "A Sun-like star sheds its outer layers, forming a planetary nebula and leaving a white dwarf. A massive star may explode as a supernova, leaving a neutron star or black hole.",
  },
];
export const finalDestinations = [
  {
    title: "White Dwarf",
    description: "The dense remnant of a lower-mass star.",
  },
  {
    title: "Neutron Star",
    description: "An ultra-dense remnant left after a massive stellar explosion.",
  },
  {
    title: "Black Hole",
    description: "The collapsed core of the most massive stars.",
  },
];