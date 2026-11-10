
import {
  ScanEye,
  Waves,
  Orbit,
  Telescope,
  Sparkles,
  CircleDot,
} from "lucide-react";

import { blackHoleImages } from "@/lib/black-holes/images";

export const storyImages = [
  {
    number: "01",
    eyebrow: "A shadow in the dark",
    title: "We didn't photograph the darkness.",
    description:
      "A black hole does not emit light for us to photograph directly. The famous images reveal a dark central shadow against glowing material surrounding the black hole.",
    image: blackHoleImages.m87,
    link: "https://eventhorizontelescope.org/",
    linkLabel: "Explore the Event Horizon Telescope",
    icon: ScanEye,
  },
  {
    number: "02",
    eyebrow: "The invisible revealed",
    title: "Can we find something we cannot see?",
    description:
      "Gas can heat up as it moves through a black hole's surroundings. Stars can also orbit an unseen massive object. Astronomers combine these clues to investigate what cannot be observed directly.",
    image: blackHoleImages.cygnus,
    link: "https://science.nasa.gov/universe/black-holes/",
    linkLabel: "How astronomers study black holes",
    icon: Waves,
  },
  {
    number: "03",
    eyebrow: "A galaxy's hidden giant",
    title: "What lies at the heart of a galaxy?",
    description:
      "At the center of the galaxy M87 lies a supermassive black hole. By observing the motion of matter and the light around it, astronomers can investigate objects millions or billions of times more massive than the Sun.",
    image: blackHoleImages.faceOn,
    link: "https://science.nasa.gov/universe/black-holes/",
    linkLabel: "Discover supermassive black holes",
    icon: Orbit,
  },
  {
    number: "04",
    eyebrow: "The edge of no return",
    title: "Where does the point of no return begin?",
    description:
      "A black hole's event horizon marks the boundary beyond which nothing can escape to the outside universe—not even light. It is not a solid surface, but a boundary in spacetime.",
    image: blackHoleImages.accretionJet,
    link: "https://science.nasa.gov/universe/black-holes/",
    linkLabel: "Understand the event horizon",
    icon: CircleDot,
  },
  {
    number: "05",
    eyebrow: "Light under gravity",
    title: "Can gravity change the path of light?",
    description:
      "A black hole's intense gravity bends the paths of light traveling nearby. This effect, called gravitational lensing, can distort the appearance of objects behind it and produce remarkable visual patterns.",
    image: blackHoleImages.cygnus,
    link: "https://science.nasa.gov/universe/black-holes/",
    linkLabel: "Explore black hole gravity",
    icon: Sparkles,
  },
  {
    number: "06",
    eyebrow: "Cosmic jets",
    title: "How can a black hole launch enormous jets?",
    description:
      "Some black holes are surrounded by powerful magnetic fields and disks of hot material. These environments can help launch narrow jets of particles at speeds approaching the speed of light. The jets are powered by the surrounding system, not by matter escaping from inside the event horizon.",
    image: blackHoleImages.sagittarius,
    link: "https://eventhorizontelescope.org/",
    linkLabel: "Explore black hole observations",
    icon: Telescope,
  },
];
