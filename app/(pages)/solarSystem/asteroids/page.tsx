
import Image from "next/image";
import {
  CircleDot,
  Orbit,
  Sparkles,
  ArrowDown,
  ArrowUpRight,
  Telescope,
  Gem,
} from "lucide-react";

import bennu from "@/assets/images/asteroids/bennu.jpg";
import ceres from "@/assets/images/asteroids/ceres.jpg";
import vesta from "@/assets/images/asteroids/vesta.jpg";
import pallas from "@/assets/images/asteroids/pallas.jpg";
import hygiea from "@/assets/images/asteroids/hygiea.jpg";
import ryugu from "@/assets/images/asteroids/ryugu.jpeg";

const asteroids = [
  {
    name: "Ceres",
    image: ceres,
    type: "Dwarf Planet",
    description:
      "The largest object in the asteroid belt and the only dwarf planet in the inner Solar System.",
  },
  {
    name: "Vesta",
    image: vesta,
    type: "Protoplanet",
    description:
      "A massive rocky body with a complex geological history and a giant impact crater at its south pole.",
  },
  {
    name: "Pallas",
    image: pallas,
    type: "Asteroid",
    description:
      "One of the largest asteroids in the Solar System, following an unusually tilted and inclined orbit.",
  },
  {
    name: "Hygiea",
    image: hygiea,
    type: "Asteroid",
    description:
      "A large, dark asteroid considered one of the principal bodies of the main asteroid belt.",
  },
  {
    name: "Ryugu",
    image: ryugu,
    type: "Near-Earth Asteroid",
    description:
      "A diamond-shaped rubble-pile asteroid explored in detail by Japan's Hayabusa2 mission.",
  },
  {
    name: "Bennu",
    image: bennu,
    type: "Near-Earth Asteroid",
    description:
      "A carbon-rich asteroid carrying material that may preserve clues about the early Solar System.",
  },
];

export default function AsteroidsPage() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-[25%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />

          <div className="absolute right-[-5%] top-[15%] h-[400px] w-[400px] rounded-full bg-orange-400/5 blur-[140px]" />

          <div className="absolute bottom-[-15%] left-[45%] h-[350px] w-[350px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        {/* Stars / particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 45 }).map((_, index) => (
            <span
              key={index}
              className="absolute h-[2px] w-[2px] rounded-full bg-white/30"
              style={{
                left: `${(index * 37) % 100}%`,
                top: `${(index * 61) % 100}%`,
                opacity: ((index * 17) % 70) / 100 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* ================= TEXT ================= */}
            <div className="relative z-20">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
                <CircleDot size={15} strokeWidth={1.5} />

                <span>Solar System</span>
              </div>

              <h1 className="mt-6 max-w-3xl font-display text-6xl font-semibold tracking-tight md:text-8xl">
                Asteroids
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-secondary">
                Ancient fragments of the early Solar System, orbiting the Sun
                and preserving clues about how our planetary neighborhood
                began.
              </p>

              {/* Quick information */}
              <div className="mt-10 flex flex-wrap gap-4">
                <InfoCard
                  label="Main Region"
                  value="Asteroid Belt"
                />

                <InfoCard
                  label="Location"
                  value="Mars → Jupiter"
                />
              </div>

              {/* Explore hint */}
              <div className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                <Telescope size={16} strokeWidth={1.3} />

                <span>Explore ancient worlds</span>
              </div>
            </div>

            {/* ================= VISUAL ================= */}
            <div className="relative flex min-h-[550px] items-center justify-center">
              {/* Large glow */}
              <div className="absolute h-[420px] w-[420px] rounded-full bg-primary/10 blur-[130px]" />

              {/* Main orbit */}
              <div className="absolute h-[390px] w-[540px] rotate-[-18deg] rounded-[50%] border border-white/8" />

              <div className="absolute h-[460px] w-[610px] rotate-[8deg] rounded-[50%] border border-white/[0.04]" />

              {/* Main asteroid */}
              <div className="relative z-10 h-[390px] w-[390px] overflow-hidden rounded-[46%] border border-white/10 shadow-[0_0_100px_rgba(120,80,255,0.18)] md:h-[450px] md:w-[450px]">
                <Image
                  src={ryugu}
                  alt="Ryugu asteroid"
                  fill
                  priority
                  className="object-cover scale-[1.08] transition-transform duration-1000 hover:scale-[1.14]"
                  sizes="(max-width: 768px) 390px, 450px"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5" />

        
              </div>

              {/* Floating asteroid — Bennu */}
              <div className="absolute left-[3%] top-[15%] z-20 h-20 w-20 overflow-hidden rounded-[42%] border border-white/10 shadow-[0_0_35px_rgba(255,255,255,0.08)]">
                <Image
                  src={bennu}
                  alt="Bennu asteroid"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Floating asteroid — Vesta */}
              <div className="absolute bottom-[13%] right-[3%] z-20 h-24 w-24 overflow-hidden rounded-[42%] border border-white/10 shadow-[0_0_35px_rgba(255,255,255,0.08)]">
                <Image
                  src={vesta}
                  alt="Vesta asteroid"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Small orbit marker */}
              <div className="absolute right-[10%] top-[18%] h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_var(--glow-purple)]" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-foreground-muted">
          <span className="cursor-pointer text-[10px] uppercase tracking-[0.3em]">
            Explore
          </span>

          <ArrowDown
            size={16}
            strokeWidth={1.5}
            className="animate-bounce"
          />
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ===================================================== */}
      <section className="border-t border-white/6 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
            {/* Text */}
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">
                Overview
              </p>

              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
                Leftovers from a
                <br />
                forming Solar System.
              </h2>

              <p className="mt-7 max-w-xl leading-8 text-foreground-secondary">
                Asteroids are rocky remnants from the early formation of our
                Solar System. Most of them orbit the Sun within the region
                between Mars and Jupiter known as the asteroid belt.
              </p>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
                <AsteroidStat
                  label="Primary Region"
                  value="Asteroid Belt"
                />

                <AsteroidStat
                  label="Main Location"
                  value="Mars — Jupiter"
                />

                <AsteroidStat
                  label="Largest Object"
                  value="Ceres"
                />

                <AsteroidStat
                  label="System"
                  value="Solar System"
                />
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-primary/10 blur-[100px]" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
                <Image
                  src={ceres}
                  alt="Ceres"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-7 left-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Largest object
                  </p>

                  <h3 className="mt-2 font-display text-3xl font-semibold">
                    Ceres
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/60">
                    A world between a planet and an asteroid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED ASTEROIDS
      ===================================================== */}
      <section className="relative overflow-hidden border-t border-white/6 py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <Gem
                size={20}
                strokeWidth={1.3}
                className="text-primary"
              />

              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Featured Worlds
              </p>
            </div>

            <h2 className="mt-5 font-display text-4xl font-semibold md:text-6xl">
              Ancient worlds,
              <br />
              each with a different story.
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-foreground-secondary">
              From dwarf planets and protoplanets to near-Earth asteroids,
              every body reveals a different chapter in the history of our
              cosmic neighborhood.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {asteroids.map((asteroid) => (
              <AsteroidCard
                key={asteroid.name}
                asteroid={asteroid}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ASTEROID BELT
      ===================================================== */}
      <section className="relative overflow-hidden border-t border-white/6 py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <Orbit
                size={22}
                strokeWidth={1.3}
                className="text-primary"
              />
            </div>

            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-primary">
              The Asteroid Belt
            </p>

            <h2 className="mt-4 font-display text-4xl font-semibold md:text-6xl">
              A region filled with
              <br />
              ancient worlds.
            </h2>

            <p className="mt-6 leading-8 text-foreground-secondary">
              The asteroid belt lies between the orbits of Mars and Jupiter,
              containing countless rocky bodies orbiting the Sun.
            </p>
          </div>

          {/* Belt visualization */}
          <div className="relative mt-20 h-[520px] overflow-hidden rounded-[2rem] border border-white/8 bg-black/20">
            {/* Large orbital rings */}
            <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />

            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />

            <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />

            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6" />

            {/* Asteroid belt particles */}
            {Array.from({ length: 80 }).map((_, index) => {
              const angle = (index / 80) * Math.PI * 2;
              const radius = 210 + ((index * 47) % 100);

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius * 0.62;

              const size = 2 + ((index * 13) % 5);

              return (
                <span
                  key={index}
                  className="absolute left-1/2 top-1/2 rounded-full bg-white/30"
                  style={{
                    width: size,
                    height: size,
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                />
              );
            })}

            {/* Sun */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/20 shadow-[0_0_100px_var(--glow-purple)]">
              <div className="absolute inset-2 rounded-full bg-primary/20 blur-md" />

              <Sparkles
                size={30}
                strokeWidth={1.2}
                className="relative text-primary"
              />
            </div>

            {/* Labels */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground-muted">
                Inner
              </p>

              <p className="mt-2 font-display text-lg">Mars</p>
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground-muted">
                Outer
              </p>

              <p className="mt-2 font-display text-lg">Jupiter</p>
            </div>

            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-5 py-2.5 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                Main Asteroid Belt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="border-t border-white/6 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.02] p-10 backdrop-blur-xl md:p-16">
            <div className="pointer-events-none absolute right-[-10%] top-[-50%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

            <div className="relative">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">
                Āfāq
              </p>

              <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
                Small worlds.
                <br />
                Ancient stories.
              </h2>

              <p className="mt-6 max-w-2xl leading-8 text-foreground-secondary">
                Every asteroid carries a fragment of the Solar System&apos;s
                history, preserving material from the time when planets were
                still taking shape.
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground-muted">
                <span>Explore the Solar System</span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   INFO CARD
============================================================ */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-2 font-display text-lg">{value}</p>
    </div>
  );
}

/* ============================================================
   STAT COMPONENT
============================================================ */

function AsteroidStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
      <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-3 font-display text-xl font-medium md:text-2xl">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   ASTEROID CARD
============================================================ */

function AsteroidCard({
  asteroid,
}: {
  asteroid: (typeof asteroids)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.025] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/15 hover:bg-white/[0.05]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={asteroid.image}
          alt={asteroid.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-xl">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/70">
            {asteroid.type}
          </p>
        </div>

        <div className="absolute bottom-4 left-5">
          <h3 className="font-display text-2xl font-semibold">
            {asteroid.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm leading-7 text-foreground-secondary">
          {asteroid.description}
        </p>

    
      </div>
    </article>
  );
}

