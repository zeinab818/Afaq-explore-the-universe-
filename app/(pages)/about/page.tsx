
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
 
  Sparkles,
  Telescope,
} from "lucide-react";

const images = {
  hero: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2200&q=90",
  earth: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1200&q=85",
  galaxy: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=85",
  moon: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=85",
};

const destinations = [
  {
    number: "01",
    title: "The Planets",
    arabic: "Worlds Apart",
    description:
      "Travel across our solar system and explore the worlds that orbit our Sun.",
    href: "/solarSystem/planets",
    image: images.earth,
    className: "md:col-span-7",
  },
  {
    number: "02",
    title: "Missions",
    arabic: "Journeys into the Unknown",
    description:
      "Follow humanity's journey through robotic explorers, spacecraft, and ambitious missions.",
    href: "/missions",
    image: images.moon,
    className: "md:col-span-5 md:mt-24",
  },
  {
    number: "03",
    title: "Discover",
    arabic: "Beyond the Known",
    description:
      "Explore remarkable discoveries, cosmic phenomena, and the questions that move science forward.",
    href: "/discover",
    image: images.galaxy,
    className: "md:col-span-7 md:col-start-3",
  },
];
const principles = [
  {
    number: "I",
    title: "Curiosity first",
    description:
      "Every great discovery begins with a question. We make room for wonder and the search for answers.",
  },
  {
    number: "II",
    title: "Science with context",
    description:
      "Astronomy deserves clear explanations, trustworthy sources, and respect for the complexity of the universe.",
  },
  {
    number: "III",
    title: "Wonder with meaning",
    description:
      "Exploring the cosmos can inspire reflection on our place in creation without confusing scientific findings with interpretation.",
  },
];

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] ${
        light ? "text-white/60" : "text-[#b7a2ed]"
      }`}
    >
      <span className="h-px w-7 bg-[#c9ae79]" />
      {children}
    </div>
  );
}

function OrbitArtwork() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.09] sm:h-[460px] sm:w-[460px] lg:h-[560px] lg:w-[560px]" />
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[410px] -translate-x-1/2 -translate-y-1/2 rotate-[-30deg] rounded-[50%] border border-[#c9ae79]/30 sm:h-[340px] sm:w-[560px] lg:h-[400px] lg:w-[700px]" />
      <div className="absolute left-1/2 top-1/2 h-[190px] w-[390px] -translate-x-1/2 -translate-y-1/2 rotate-[48deg] rounded-[50%] border border-violet-300/20 sm:h-[270px] sm:w-[520px] lg:h-[320px] lg:w-[660px]" />
      <span className="absolute left-[24%] top-[28%] h-2 w-2 rounded-full bg-[#e8d2a3] shadow-[0_0_22px_5px_rgba(232,210,163,0.25)]" />
      <span className="absolute right-[21%] top-[64%] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_20px_5px_rgba(196,167,255,0.3)]" />
    </div>
  );
}

export default function AboutPage() {
  return (
    
    <main className="min-h-screen overflow-hidden bg-[#090a12] text-[#f1ede7] selection:bg-violet-300 selection:text-[#090a12]">
      
      {/* HERO — Editorial cover */}
      <section className="relative flex min-h-[780px] flex-col justify-between border-b border-white/[0.08] lg:min-h-[880px]">
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt="A vast field of distant galaxies in deep space"
            className="h-full w-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090a12] via-[#090a12]/75 to-[#090a12]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a12] via-transparent to-[#090a12]/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pt-10 sm:px-10 lg:px-20">
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <Link
              href="/"
              className="text-sm font-semibold tracking-[0.35em] text-[#e5d0a2]"
            >
              ĀFĀQ<span className="text-white/50">.</span>
            </Link>
            <span className="hidden text-[10px] uppercase tracking-[0.28em] text-white/50 sm:block">
              An observatory for the curious
            </span>
            <span className="text-xs text-white/60">01 / About</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-1 items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:px-20 lg:py-24">
          <div className="relative">
            <Eyebrow light>Explore the universe</Eyebrow>

            <h1 className="mt-9 max-w-4xl text-[clamp(4rem,10vw,9.5rem)] font-light leading-[0.79] tracking-[-0.085em]">
              Beyond
              <br />
              the <span className="font-serif italic text-[#d8c4f7]">known.</span>
            </h1>

            <div className="mt-10 flex max-w-xl gap-5">
              <span className="mt-1 h-16 w-px shrink-0 bg-[#c9ae79]" />
              <div>
                <p className="text-lg leading-8 text-white/80 sm:text-xl">
                  A journey through the wonders of space, the discoveries that
                  reshape our understanding, and the questions that keep us
                  looking up.
                </p>
                <Link
                  href="#our-story"
                  className="mt-7 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#e5d0a2] transition hover:gap-5"
                >
                  Discover our story <ArrowDown size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[390px] items-center justify-center lg:max-w-[480px]">
            <OrbitArtwork />
            <div className="relative h-[45%] w-[45%] overflow-hidden rounded-full border border-white/20 shadow-[0_0_100px_rgba(150,120,220,0.17)]">
              <img
                src={images.earth}
                alt="Planet Earth"
                className="h-full w-full scale-110 object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
            </div>
            <div className="absolute bottom-[10%] left-[2%] max-w-[155px] border-l border-[#c9ae79] pl-4">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/45">
                Our perspective
              </p>
              <p className="mt-2 font-serif text-lg italic text-[#e5d0a2]">
                One universe.
                <br />
                Endless questions.
              </p>
            </div>
            <span className="absolute right-[3%] top-[13%] text-[9px] uppercase tracking-[0.24em] text-white/40">
              29° 58′ N
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 pb-8 sm:px-10 lg:px-20">
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">
            Astronomy · Exploration · Reflection
          </span>
          <span className="font-serif text-sm italic text-white/45">
            Look closer.
          </span>
        </div>
      </section>

      {/* STORY — Magazine spread */}
      <section
        id="our-story"
        className="relative mx-auto max-w-[1500px] px-6 py-28 sm:px-10 sm:py-36 lg:px-20 lg:py-44"
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow>The story of Āfāq</Eyebrow>
            <p className="mt-8 max-w-xs font-serif text-3xl leading-snug text-[#d8c4f7] sm:text-4xl">
              The universe is not just something to observe. It is something
              to understand.
            </p>
            <p className="mt-6 text-xs leading-6 text-white/45">
              Āfāq — آفاق
              <br />
              Horizons, possibilities, and the worlds beyond our own.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.05em] sm:text-6xl">
              Every horizon
              <br />
              <span className="font-serif italic text-[#c9ae79]">
                begins with wonder.
              </span>
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <p className="text-sm leading-8 text-white/65">
                Āfāq is an interactive space-exploration platform created for
                curious minds. It brings astronomy, space imagery, scientific
                discoveries, and space missions into one place, making the
                extraordinary universe easier to explore.
              </p>
              <p className="text-sm leading-8 text-white/65">
                From the worlds of our solar system to the mysteries of distant
                galaxies, our purpose is to make each visit an invitation to
                learn, question, and discover something new.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-6">
              <span className="font-serif text-3xl italic text-[#c9ae79]">
                Ā
              </span>
              <p className="text-[10px] uppercase leading-5 tracking-[0.2em] text-white/40">
                A space for discovery
                <br />
                Built around curiosity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION — Asymmetric editorial layout */}
      <section className="border-y border-white/[0.08] bg-[#0d0d17]">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
          <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden border-b border-white/10 p-8 sm:p-14 lg:border-b-0 lg:border-r lg:p-20">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-violet-300/15" />
            <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-violet-300/10" />
            <Eyebrow>01 / Our vision</Eyebrow>
            <div className="relative mt-16">
              <Sparkles className="mb-8 text-[#c9ae79]" size={25} strokeWidth={1} />
              <h2 className="max-w-md text-5xl font-light leading-[1.03] tracking-[-0.06em] sm:text-7xl">
                A wider
                <br />
                <span className="font-serif italic text-[#d8c4f7]">
                  perspective.
                </span>
              </h2>
              <p className="mt-8 max-w-md text-sm leading-7 text-white/60">
                To inspire a deeper appreciation of the universe by making
                space exploration accessible, engaging, and meaningful to
                everyone.
              </p>
            </div>
            <span className="mt-12 text-[9px] uppercase tracking-[0.24em] text-white/30">
              See beyond the familiar
            </span>
          </div>

          <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden p-8 sm:p-14 lg:p-20">
            <div className="absolute -bottom-32 -right-28 h-96 w-96 rounded-full border border-[#c9ae79]/15" />
            <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full border border-[#c9ae79]/10" />
            <Eyebrow>02 / Our mission</Eyebrow>
            <div className="relative mt-16">
              <Telescope className="mb-8 text-[#c9ae79]" size={25} strokeWidth={1} />
              <h2 className="max-w-md text-5xl font-light leading-[1.03] tracking-[-0.06em] sm:text-7xl">
                Knowledge
                <br />
                <span className="font-serif italic text-[#c9ae79]">
                  into wonder.
                </span>
              </h2>
              <p className="mt-8 max-w-md text-sm leading-7 text-white/60">
                To connect scientific knowledge with immersive experiences,
                thoughtful storytelling, and reliable resources that encourage
                lifelong learning.
              </p>
            </div>
            <span className="mt-12 text-[9px] uppercase tracking-[0.24em] text-white/30">
              Explore with purpose
            </span>
          </div>
        </div>
      </section>

      {/* EXPLORE — Editorial image-led features, not repeated cards */}
      <section className="mx-auto max-w-[1500px] px-6 py-28 sm:px-10 sm:py-36 lg:px-20 lg:py-44">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow>Inside the universe</Eyebrow>
            <h2 className="mt-7 max-w-3xl text-5xl font-light leading-[0.98] tracking-[-0.07em] sm:text-7xl">
              Three ways
              <br />
              <span className="font-serif italic text-[#c9ae79]">
                to look closer.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/50 md:pb-2">
            From nearby planetary worlds to distant cosmic mysteries, choose
            your next horizon.
          </p>
        </div>

        <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          {destinations.map((item, index) => (
            <article
              key={item.number}
              className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${item.className}`}
            >
              <Link
                href={item.href}
                className={`group relative block overflow-hidden ${
                  index === 1
                    ? "md:col-span-6 md:col-start-7 md:row-start-1"
                    : "md:col-span-7"
                }`}
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-[#151321]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a12]/65 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 text-[10px] tracking-[0.25em] text-white/80">
                    ĀFĀQ / {item.number}
                  </span>
                  <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition group-hover:border-[#e5d0a2] group-hover:bg-[#e5d0a2] group-hover:text-[#090a12]">
                    <ArrowUpRight size={19} strokeWidth={1.3} />
                  </span>
                </div>
              </Link>

              <div
                className={`relative ${
                  index === 1
                    ? "md:col-span-5 md:col-start-1 md:row-start-1"
                    : "md:col-span-4"
                }`}
              >
                <span className="font-serif text-sm italic text-[#c9ae79]">
                  {item.number} — {item.arabic}
                </span>
                <h3 className="mt-5 text-4xl font-light tracking-[-0.055em] sm:text-5xl">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-3 border-b border-[#c9ae79]/50 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#e5d0a2] transition hover:gap-5"
                >
                  Explore {item.title} <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* QURAN & THE UNIVERSE */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#100e1b]">
        <div className="absolute inset-0">
          <img
            src={images.galaxy}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100e1b] via-[#100e1b]/95 to-[#100e1b]/65" />
        </div>

        <div className="relative mx-auto grid max-w-[1500px] gap-14 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-8 lg:px-20 lg:py-40">
          <div className="lg:col-span-7">
            <Eyebrow>Science · Reflection · Meaning</Eyebrow>
            <div className="mt-9 font-serif text-5xl leading-[1.45] text-[#e5d0a2] sm:text-7xl">
              وَفِي الْأَرْضِ آيَاتٌ
              <br />
              لِلْمُوقِنِينَ
            </div>
            <p className="mt-5 text-xs tracking-[0.16em] text-white/45">
              سورة الذاريات — 20
            </p>
          </div>

          <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9">
            <BookOpen
              className="mb-7 text-[#c9ae79]"
              size={26}
              strokeWidth={1}
            />
            <h2 className="text-3xl font-light leading-snug tracking-[-0.04em] sm:text-4xl">
              The Qur&apos;an
              <br />
              <span className="font-serif italic text-[#d8c4f7]">
                & the universe.
              </span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/60">
              A space for thoughtful reflection on Qur&apos;anic verses and
              the wonders of creation. We approach this intersection with
              respect for the Qur&apos;an, scientific accuracy, and care in
              distinguishing established findings from interpretation.
            </p>
            <Link
              href="/quran"
              className="mt-8 inline-flex w-fit items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#e5d0a2] transition hover:gap-5"
            >
              Explore Qur&apos;an & Space <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PRINCIPLES — Editorial numbered list */}
      <section className="mx-auto max-w-[1500px] px-6 py-28 sm:px-10 sm:py-36 lg:px-20 lg:py-44">
        <div className="grid gap-14 lg:grid-cols-4 lg:gap-12">
          <div>
            <Eyebrow>Our principles</Eyebrow>
            <h2 className="mt-7 text-4xl font-light leading-tight tracking-[-0.06em] sm:text-5xl">
              What guides
              <br />
              <span className="font-serif italic text-[#c9ae79]">our gaze.</span>
            </h2>
          </div>

          <div className="lg:col-span-3">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="grid gap-4 border-t border-white/15 py-8 sm:grid-cols-[55px_1fr_1.2fr] sm:gap-8 sm:py-10"
              >
                <span className="font-serif text-lg italic text-[#c9ae79]">
                  {principle.number}
                </span>
                <h3 className="text-xl font-light tracking-tight sm:text-2xl">
                  {principle.title}
                </h3>
                <p className="max-w-md text-sm leading-7 text-white/55">
                  {principle.description}
                </p>
              </div>
            ))}
            <div className="border-t border-white/15" />
          </div>
        </div>
      </section>


{/* THE NAME — The inspiration behind Āfāq */}
<section className="relative isolate overflow-hidden border-y border-white/[0.08] bg-[#0d0d17]">
  {/* Subtle background artwork */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-[#c9ae79]/[0.07]"
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-violet-300/[0.07]"
  />

  <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-36">
    <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">

      {/* Main verse */}
      <div className="lg:col-span-7">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#c9ae79]">
          The inspiration behind our name
        </span>

        <div className="mt-12">
          <span className="font-serif text-5xl leading-none text-white/15 sm:text-7xl">
            “
          </span>

          <blockquote
            dir="rtl"
            lang="ar"
            className="mt-3 font-serif text-3xl leading-[2.1] text-[#e5d0a2] sm:text-4xl lg:text-[2.75rem]"
          >
            سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنْفُسِهِمْ
            حَتَّىٰ يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#c9ae79]/70" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">
              Surah Fussilat · 41:53
            </span>
          </div>
        </div>
      </div>

      {/* Name story */}
      <div className="relative lg:col-span-4 lg:col-start-9">
        <div className="mb-8 h-px w-full bg-white/10 lg:hidden" />

        <p className="text-[10px] uppercase tracking-[0.28em] text-violet-300/70">
          A name with meaning
        </p>

        <h2 className="mt-6 font-serif text-5xl italic tracking-[-0.04em] text-[#d8c4f7] sm:text-6xl">
          Āfāq
        </h2>

        <p
          dir="rtl"
          lang="ar"
          className="mt-2 text-2xl text-[#e5d0a2]"
        >
          آفاق
        </p>

        <p className="mt-7 text-sm leading-8 text-white/60">
          The name Āfāq is inspired by the Qur&apos;anic word
          <span className="text-[#e5d0a2]"> الآفاق </span>
          — the horizons.
        </p>

        <p className="mt-4 text-sm leading-8 text-white/60">
          It reflects the spirit behind this project: exploring the universe,
          discovering its wonders, and reflecting on the signs around us.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="font-serif text-lg italic text-white/55">
            Beyond what we see.
            <br />
            Beyond what we know.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* SOURCES & CLOSING */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full border border-violet-300/[0.08]" />
        <div className="absolute -right-20 top-20 h-[340px] w-[340px] rounded-full border border-[#c9ae79]/10" />

        <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Eyebrow>Keep looking up</Eyebrow>
              <h2 className="mt-8 max-w-3xl text-5xl font-light leading-[0.95] tracking-[-0.075em] sm:text-7xl lg:text-8xl">
                The next
                <br />
                <span className="font-serif italic text-[#d8c4f7]">
                  discovery
                </span>
                <br />
                starts here.
              </h2>
              <Link
                href="/discover"
                className="mt-10 inline-flex items-center gap-4 rounded-full border border-[#c9ae79]/50 px-6 py-4 text-xs uppercase tracking-[0.16em] text-[#e5d0a2] transition hover:bg-[#e5d0a2] hover:text-[#090a12]"
              >
                Begin exploring <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <div className="flex items-center gap-3">
                <Compass className="text-[#c9ae79]" size={18} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/65">
                  Our sources
                </span>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/55">
                We value reliable scientific information and responsible
                interpretation. Explore astronomy resources from established
                space agencies, alongside Qur&apos;anic references and
                reputable tafsir for the reflection section.
              </p>

              <div className="mt-7 space-y-0">
                <a
                  href="https://science.nasa.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-t border-white/10 py-4 text-sm text-white/70 transition hover:text-[#e5d0a2]"
                >
                  NASA — Science
                  <ArrowUpRight
                    size={15}
                    className="text-white/40 transition group-hover:text-[#e5d0a2]"
                  />
                </a>
                <a
                  href="https://www.esa.int/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-t border-white/10 py-4 text-sm text-white/70 transition hover:text-[#e5d0a2]"
                >
                  European Space Agency
                  <ArrowUpRight
                    size={15}
                    className="text-white/40 transition group-hover:text-[#e5d0a2]"
                  />
                </a>
                <Link
                  href="/quran"
                  className="group flex items-center justify-between border-y border-white/10 py-4 text-sm text-white/70 transition hover:text-[#e5d0a2]"
                >
                  Qur&apos;an & Space
                  <ArrowUpRight
                    size={15}
                    className="text-white/40 transition group-hover:text-[#e5d0a2]"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-24 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="text-sm font-semibold tracking-[0.35em] text-[#e5d0a2]"
            >
              ĀFĀQ.
            </Link>
            <p className="font-serif text-sm italic text-white/45">
              A journey beyond the known.
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
              Astronomy · Exploration · Reflection
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
