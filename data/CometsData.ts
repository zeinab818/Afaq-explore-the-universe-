import halley from "@/assets/images/comets/halley.jpg";
import haleBopp from "@/assets/images/comets/haleBopp.jpeg";
import neowise from "@/assets/images/comets/neowise.jpg";
import comet67p from "@/assets/images/comets/67p.jpg";
import encke from "@/assets/images/comets/encke.jpg";
import mcnaught from "@/assets/images/comets/mcnaught.jpeg";
import borisov from "@/assets/images/comets/borisov.jpeg";

export const comets = [
  {
    id: "halley",
    name: "Halley's Comet",
    catalog: "1P/Halley",
    type: "Periodic Comet",
    origin: "Solar System",
    composition: "Ice, dust & rocky material",
    distance: "≈ 76 years per orbit",
    description:
      "One of the most famous comets ever observed, Halley's Comet is a periodic visitor that returns to the inner Solar System roughly every 76 years.",
    significance:
      "Its predictable return helped establish that comets are recurring celestial objects rather than one-time atmospheric phenomena.",
    image: halley,
  },

  {
    id: "hale-bopp",
    name: "Hale–Bopp",
    catalog: "C/1995 O1",
    type: "Long-Period Comet",
    origin: "Solar System",
    composition: "Ice, dust & organic compounds",
    distance: "≈ 2,500 years",
    description:
      "A spectacular long-period comet that became one of the most widely observed comets of the 20th century.",
    significance:
      "Its exceptional brightness allowed millions of people to observe a comet without specialized equipment.",
    image: haleBopp,
  },

  {
    id: "neowise",
    name: "C/2020 F3 NEOWISE",
    catalog: "C/2020 F3",
    type: "Long-Period Comet",
    origin: "Solar System",
    composition: "Ice, dust & gas",
    distance: "≈ 6,800 years",
    description:
      "A bright comet that became a spectacular naked-eye object in 2020, displaying a prominent tail across the night sky.",
    significance:
      "NEOWISE became one of the most photographed comets of the modern era.",
    image: neowise,
  },

  {
    id: "67p",
    name: "67P / Churyumov–Gerasimenko",
    catalog: "67P/Churyumov–Gerasimenko",
    type: "Jupiter-Family Comet",
    origin: "Solar System",
    composition: "Ice, dust & organic material",
    distance: "≈ 6.45 years",
    description:
      "An unusual two-lobed comet explored in extraordinary detail by ESA's Rosetta spacecraft.",
    significance:
      "Rosetta provided one of the most detailed views ever obtained of a comet and studied its activity from orbit.",
    image: comet67p,
  },

  {
    id: "encke",
    name: "2P / Encke",
    catalog: "2P/Encke",
    type: "Periodic Comet",
    origin: "Solar System",
    composition: "Ice, dust & rocky material",
    distance: "≈ 3.3 years",
    description:
      "A short-period comet with one of the shortest known orbital periods among comets that regularly approach the Sun.",
    significance:
      "Its frequent returns make it an important object for studying how repeated solar heating changes cometary surfaces.",
    image: encke,
  },

  {
    id: "mcnaught",
    name: "C/2006 P1 McNaught",
    catalog: "C/2006 P1",
    type: "Long-Period Comet",
    origin: "Solar System",
    composition: "Ice, dust & gas",
    distance: "≈ 92,600 years",
    description:
      "A spectacular comet that developed an enormous, sweeping tail and became one of the brightest comets visible from Earth in decades.",
    significance:
      "McNaught demonstrated how dramatically a comet's appearance can change as it approaches the Sun.",
    image: mcnaught,
  },

  {
    id: "borisov",
    name: "2I / Borisov",
    catalog: "2I/Borisov",
    type: "Interstellar Comet",
    origin: "Beyond the Solar System",
    composition: "Ice, dust & volatile materials",
    distance: "Interstellar",
    description:
      "The first confirmed interstellar comet observed passing through our Solar System after traveling from another planetary system.",
    significance:
      "Borisov gave astronomers a rare opportunity to study material formed around a star other than our Sun.",
    image: borisov,
  },
];

export const cometTypes = [
  {
    name: "Periodic Comets",
    description:
      "Comets that return to the inner regions of their planetary systems on predictable orbital timescales.",
  },
  {
    name: "Long-Period Comets",
    description:
      "Comets with extremely elongated orbits that may take centuries or thousands of years to return.",
  },
  {
    name: "Jupiter-Family Comets",
    description:
      "Short-period comets whose orbits are strongly influenced by the gravitational pull of Jupiter.",
  },
  {
    name: "Interstellar Comets",
    description:
      "Rare objects that originated outside our Solar System and pass through interstellar space before encountering another star system.",
  },
];

export const cometAnatomy = [
  {
    id: "nucleus",
    title: "Nucleus",
    description:
      "The solid central body of a comet, composed mainly of frozen gases, dust, rock and organic material.",
  },
  {
    id: "coma",
    title: "Coma",
    description:
      "A vast cloud of gas and dust surrounding the nucleus when solar heating causes volatile material to escape.",
  },
  {
    id: "dust-tail",
    title: "Dust Tail",
    description:
      "A bright stream of dust particles pushed away from the Sun by sunlight and radiation pressure.",
  },
  {
    id: "ion-tail",
    title: "Ion Tail",
    description:
      "A stream of electrically charged particles carried away from the Sun by the solar wind.",
  },
];

export const cometOrigins = [
  {
    title: "Planetary Systems",
    description:
      "Many comets are remnants of the early formation of planetary systems, preserving material from their distant past.",
  },
  {
    title: "Outer Reservoirs",
    description:
      "In our Solar System, distant regions such as the Kuiper Belt and Oort Cloud contain enormous populations of icy bodies.",
  },
  {
    title: "Interstellar Space",
    description:
      "Some comets can escape their original planetary systems and wander through interstellar space.",
  },
];

export const cometLifecycle = [
  {
    step: "01",
    title: "Formation",
    description:
      "Frozen bodies form from leftover material during the early stages of planetary system formation.",
  },
  {
    step: "02",
    title: "Dormancy",
    description:
      "Far from their host star, comets remain extremely cold and inactive for long periods of time.",
  },
  {
    step: "03",
    title: "Approach",
    description:
      "Gravitational interactions can alter a comet's orbit and send it toward the inner regions of its system.",
  },
  {
    step: "04",
    title: "Activation",
    description:
      "Increasing stellar radiation heats the surface, releasing gas and dust and creating the coma and tails.",
  },
  {
    step: "05",
    title: "Departure",
    description:
      "After passing its closest point to the star, the comet cools again and gradually fades from view.",
  },
];