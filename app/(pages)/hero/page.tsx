import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen  ">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="font-sans text-sm font-semibold tracking-[0.3em] text-primary">
            A JOURNEY BEYOND THE KNOWN
          </p>

          <h1 className="mt-6 max-w-4xl font-display text-6xl font-semibold leading-[0.95] text-foreground md:text-7xl lg:text-8xl">
            Explore the Universe.
          </h1>

          <p className="mt-6 max-w-xl font-sans text-xl leading-7 text-foreground-secondary">
            Discover planets, explore extraordinary missions, and experience
            the universe through data, imagery, and stories from space.
          </p>

          <Link
            href="/explore"
            className="mt-8 inline-flex items-center justify-center cursor-pointer rounded-full bg-primary px-7 py-3 font-sans font-medium text-background transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_30px_var(--glow-primary)]"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </section>
  );
}
