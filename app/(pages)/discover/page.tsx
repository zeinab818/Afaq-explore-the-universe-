import Image from "next/image";
import Link from "next/link";
import { discoveries, discoveryImages } from "@/data/DiscoveriesData";
import { ArrowRight, Sparkles } from "lucide-react";
import SaveButton from "@/components/ui/exploration/SaveButton";



export default function DiscoverPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070a12] text-[#f5f1ff]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-112 w-3xl -translate-x-1/2 rounded-full bg-violet-500/9 blur-[140px]" />
        <div className="absolute -right-40 top-220 h-96 w-96 rounded-full bg-fuchsia-500/6 blur-[120px]" />
      </div>

      <section className="relative isolate mx-auto max-w-7xl px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full bg-size[auto_100%] bg-top-right bg-no-repeat opacity-80 md:w-[70%]"
          style={{ backgroundImage: "url('/images/discoveries/discover-hero.webp')" }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#070a12] via-[#070a12]/90 to-[#070a12]/20" />

        <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-violet-300">
          <Sparkles size={15} /> Explore the unknown
        </div>

        <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.04] tracking-tight sm:text-7xl lg:text-8xl">
          Discoveries
          <br />
          beyond <span className="italic text-violet-300">the stars.</span>
        </h1>

        <p className="mt-7 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
          Explore the mysteries of the cosmos, uncover extraordinary astronomical phenomena, and discover the science behind the universe we call home.
        </p>

        <div className="mt-9 flex flex-wrap gap-3 text-xs text-white/75">
          <span className="rounded-full border border-violet-200/20 bg-black/25 px-4 py-2.5 backdrop-blur">✧ &nbsp; {discoveries.length} topics to explore</span>
          <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2.5 backdrop-blur">Space&nbsp; · &nbsp;Science&nbsp; · &nbsp;Cosmos</span>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-10 sm:pb-32">
        <div className="mb-9 flex items-end justify-between gap-4 border-t border-white/10 pt-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-violet-300">The collection</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-5xl">Explore discoveries</h2>
          </div>
          <span className="mb-1 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">{discoveries.length} topics</span>
        </div>

        
      {discoveries.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {discoveries.map((item, index) => {
            const image = discoveryImages[index % discoveryImages.length];
            const route = item.href ?? `/discover/${item.slug}`;

            return (
              <article
                key={item.slug}
                className="
                  group relative flex min-w-0 flex-col overflow-hidden
                  rounded-2xl border border-white/10
                  bg-[#0b1020]/75
                  transition duration-300
                  hover:border-violet-300/35
                  hover:shadow-[0_18px_55px_rgba(120,80,220,0.12)]
                "
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden">

                  <Link href={route} className="absolute inset-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#0b1020] via-transparent to-black/15" />
                  </Link>

                  {/* Number */}
                  <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] tabular-nums text-white/85 backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Save */}
                  <div className="absolute right-4 top-4 z-20">
                    <SaveButton
                      item={{
                        id: item.slug,
                        type: "discovery",
                        title: item.name,
                        image: image.src,
                        route,
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-5 pb-5 pt-1">

                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/8 text-lg text-violet-200 transition group-hover:bg-violet-400/15">
                    {item.icon}
                  </div>

                  <h3 className="font-display text-lg font-medium text-white transition-colors group-hover:text-violet-200">
                    {item.name}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-white/55">
                    {item.description}
                  </p>

                  {/* Explore */}
                  <Link
                    href={route}
                    className="
                      mt-5 flex items-center justify-between
                      border-t border-white/8 pt-4
                    "
                  >
                    <span className="text-xs text-white/55 transition-colors group-hover:text-violet-200">
                      Explore topic
                    </span>

                    <span className="
                      flex size-8 items-center justify-center
                      rounded-full border border-violet-200/25
                      text-white/80 transition
                      group-hover:border-violet-200/60
                      group-hover:bg-violet-300/10
                      group-hover:text-violet-100
                    ">
                      <ArrowRight size={15} />
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/2 px-6 py-16 text-center">
          <Sparkles size={28} className="mx-auto text-violet-300" />

          <h3 className="mt-5 font-display text-xl font-semibold">
            New discoveries are on the way
          </h3>

          <p className="mt-3 text-sm text-white/55">
            There are no discoveries to display yet. Check back soon.
          </p>
        </div>
      )}

      </section>

      <section className="relative isolate overflow-hidden border-t border-white/6 px-6 py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cover bg-center opacity-75" style={{ backgroundImage: "url('/images/discoveries/cosmic-horizon.webp')" }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#070a12] via-[#070a12]/75 to-[#070a12]/25" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Sparkles size={22} className="text-violet-200" />
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight sm:text-6xl">
              Curiosity has <span className="italic text-violet-300">no horizon.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              Every answer reveals another question. Keep exploring the extraordinary universe around you.
            </p>
            <Link href="/solarSystem/planets" className="mt-8 inline-flex items-center gap-3 rounded-full border border-violet-200/30 bg-violet-400/15 px-5 py-3 text-sm text-white transition hover:border-violet-200/60 hover:bg-violet-400/25">
              Explore the planets <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
