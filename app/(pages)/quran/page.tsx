
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { articles, moreVerses } from "@/data/QuranData";




const categories = [
  "ALL",
  ...Array.from(new Set(articles.map((article) => article.category))),
];

type ReadingTab = "reflection" | "science" | "research";

export default function SpaceAndQuranPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] =
    useState<ReadingTab>("reflection");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const activeArticle = articles[activeIndex];

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatch =
        activeCategory === "ALL" ||
        article.category === activeCategory;

      const searchMatch =
        !query ||
        [
          article.title,
          article.question,
          article.category,
          article.reference,
          article.tag,
        ].some((value) => value.toLowerCase().includes(query));

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const chooseArticle = (number: string) => {
    const nextIndex = articles.findIndex(
      (article) => article.number === number
    );

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
      setActiveTab("reflection");
    }
  };

  const nextArticle = () => {
    setActiveIndex((current) => (current + 1) % articles.length);
    setActiveTab("reflection");
  };

  return (
    <main
      id="top"
      className="min-h-screen overflow-hidden bg-[#080910] text-[#f4efe7] selection:bg-[#c7a7ff]/30 selection:text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute -right-48 -top-40 h-[38rem] w-[38rem] rounded-full bg-violet-600/[0.12] blur-[150px]" />
        <div className="absolute -left-48 top-[48%] h-[34rem] w-[34rem] rounded-full bg-pink-500/[0.07] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#fff_0.6px,transparent_0.6px)] [background-size:30px_30px]" />
      </div>

      <div className="relative">
        <header className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-white/[0.08] px-5 py-5 sm:px-8 lg:px-14">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Āfāq home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e7c98b]/40 text-lg text-[#e7c98b]">
              ✳
            </span>

            <span>
              <span className="block text-sm font-semibold tracking-[0.32em]">
                ĀFĀQ
              </span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.25em] text-white/35">
                A space for wonder
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.16em] text-white/45 md:flex">
            <Link
              href="/solarsystem/planets"
              className="transition hover:text-white"
            >
              Solar system
            </Link>
            <Link
              href="/missions"
              className="transition hover:text-white"
            >
              Missions
            </Link>
            <Link
              href="/discover"
              className="transition hover:text-white"
            >
              Discover
            </Link>
            <span className="text-[#e7c98b]">
              Qur’an & cosmos
            </span>
          </nav>

          <a
            href="#atlas"
            className="rounded-full border border-white/15 px-4 py-2 text-[9px] uppercase tracking-[0.16em] text-white/70 transition hover:border-[#e7c98b]/60 hover:text-[#e7c98b]"
          >
            Begin exploring ↘
          </a>
        </header>

        {/* Immersive editorial opening */}
        <section className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-14 lg:pb-28">
          <div className="relative z-10">
            <p className="flex items-center gap-3 text-[9px] uppercase tracking-[0.34em] text-[#e7c98b]">
              <span className="h-px w-9 bg-[#e7c98b]/70" />
              Revelation · Reflection · The cosmos
            </p>

            <h1 className="mt-8 max-w-3xl font-serif text-[clamp(3.6rem,8vw,7.8rem)] leading-[0.88] tracking-[-0.055em] text-[#f4efe7]">
              When the
              <br />
              <span className="italic text-[#c8b5ed]">
                heavens
              </span>
              <br />
              invite us to think.
            </h1>

            <p className="mt-8 max-w-lg text-sm leading-8 text-white/55">
              A considered journey through Qur’anic verses,
              trusted tafsir, and the discoveries of astronomy.
              Different ways of knowing, brought together with
              curiosity and care.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#atlas"
                className="group inline-flex items-center gap-4 rounded-full bg-[#e7c98b] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#17131a] transition hover:bg-[#f2ddb0]"
              >
                Explore the atlas
                <span className="transition group-hover:translate-y-1">
                  ↓
                </span>
              </a>

              <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                {articles.length.toString().padStart(2, "0")} guided explorations
              </span>
            </div>

            <div className="mt-16 grid max-w-lg grid-cols-3 border-t border-white/10 pt-5">
              <div>
                <p className="font-serif text-2xl text-[#e7c98b]">
                  01
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.17em] text-white/35">
                  Read the verse
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-[#c8b5ed]">
                  02
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.17em] text-white/35">
                  Understand context
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-[#f0a9c7]">
                  03
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.17em] text-white/35">
                  Explore the science
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[760px]">
            <div className="absolute -inset-5 rounded-[48%] border border-[#c8b5ed]/15" />
            <div className="absolute -inset-10 rounded-[48%] border border-white/[0.06]" />

            <div className="relative aspect-[1.08/1] overflow-hidden rounded-[46%_46%_3rem_3rem] border border-white/10 bg-[#111421]">
              <Image
              fill
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=90"
                alt="A luminous field of distant galaxies and stars"
                className="h-full w-full object-cover opacity-75"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080910] via-[#080910]/10 to-[#080910]/5" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-12">
                <p className="text-[8px] uppercase tracking-[0.32em] text-[#e7c98b]">
                  A moment for contemplation
                </p>

                <p
                  dir="rtl"
                  className="mt-5 font-serif text-2xl leading-[2] text-[#f3dfb9] sm:text-3xl"
                >
                  إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ
                  وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ
                  لِأُولِي الْأَلْبَابِ
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/50">
                  Āl ‘Imrān · 3:190
                </p>

                <a
                  href="https://quran.com/3/190"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex border-b border-[#e7c98b]/50 pb-1 text-[9px] uppercase tracking-[0.18em] text-[#e7c98b] transition hover:text-white"
                >
                  Read in context ↗
                </a>
              </div>
            </div>

            <div className="absolute -left-3 top-[18%] hidden rounded-full border border-white/10 bg-[#111421]/85 px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-white/65 shadow-2xl backdrop-blur sm:block">
              Wonder begins with a question
            </div>

            <div className="absolute -right-3 bottom-[23%] hidden rounded-full border border-[#e7c98b]/25 bg-[#111421]/90 px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-[#e7c98b] shadow-2xl backdrop-blur sm:block">
              Explore · Reflect · Learn
            </div>
          </div>
        </section>

        {/* Methodology strip */}
        <section className="border-y border-white/[0.08] bg-white/[0.018]">
          <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-8 sm:px-8 md:grid-cols-3 lg:px-14">
            <div className="flex gap-4">
              <span className="font-serif text-3xl text-[#e7c98b]">
                I.
              </span>
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/85">
                  Qur’anic text & tafsir
                </h2>
                <p className="mt-2 text-xs leading-6 text-white/40">
                  The verse, its context, and recognized explanations—without taking words out of context.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="font-serif text-3xl text-[#c8b5ed]">
                II.
              </span>
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/85">
                  Science
                </h2>
                <p className="mt-2 text-xs leading-6 text-white/40">
                  Established observations, scientific models, and what current evidence can actually tell us.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="font-serif text-3xl text-[#f0a9c7]">
                III.
              </span>
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/85">
                  Research & sources
                </h2>
                <p className="mt-2 text-xs leading-6 text-white/40">
                  Follow the evidence to primary institutions and research material. Distinguish findings from open questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive atlas */}
        <section
          id="atlas"
          className="mx-auto max-w-[1500px] scroll-mt-10 px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
        >
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.32em] text-[#e7c98b]">
                The Āfāq field guide
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
                Choose a question.
                <br />
                <span className="italic text-white/40">
                  Follow it further.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-xs leading-7 text-white/45">
              Select a subject from the index. Its verse, interpretive
              context, scientific perspective, and further reading
              will unfold beside it.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-y border-white/10 py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-3.5 py-2 text-[8px] uppercase tracking-[0.13em] transition ${
                    activeCategory === category
                      ? "bg-[#e7c98b] text-[#17131a]"
                      : "border border-white/10 text-white/45 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {category === "ALL" ? "All subjects" : category}
                </button>
              ))}
            </div>

            <label className="flex w-full items-center gap-3 border-b border-white/20 pb-2 text-white/40 transition focus-within:border-[#e7c98b]/70 md:max-w-xs">
              <span className="text-lg">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find a subject or verse..."
                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
              />
            </label>
          </div>

          <div className="mt-10 grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:gap-14">
            <aside>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[8px] uppercase tracking-[0.25em] text-white/35">
                  Exploration index
                </p>
                <p className="text-[8px] tabular-nums text-white/30">
                  {filteredArticles.length} / {articles.length}
                </p>
              </div>

              <div className="max-h-[760px] overflow-y-auto border-t border-white/10 pr-2 [scrollbar-color:#6f6385_transparent] [scrollbar-width:thin]">
                {filteredArticles.map((article) => {
                  const isActive =
                    article.number === activeArticle.number;

                  return (
                    <button
                      key={article.number}
                      type="button"
                      onClick={() => chooseArticle(article.number)}
                      className={`group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/[0.08] py-5 text-left transition ${
                        isActive
                          ? "bg-white/[0.045]"
                          : "hover:bg-white/[0.025]"
                      }`}
                    >
                      <span
                        className={`font-serif text-lg ${
                          isActive
                            ? "text-[#e7c98b]"
                            : "text-white/25 group-hover:text-white/55"
                        }`}
                      >
                        {article.number}
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block truncate font-serif text-lg ${
                            isActive
                              ? "text-white"
                              : "text-white/65 group-hover:text-white"
                          }`}
                        >
                          {article.title}
                        </span>
                        <span className="mt-1 block truncate text-[8px] uppercase tracking-[0.16em] text-white/30">
                          {article.category} · {article.reference}
                        </span>
                      </span>

                      <span
                        className={`text-lg transition ${
                          isActive
                            ? "translate-x-0 text-[#e7c98b]"
                            : "-translate-x-1 text-white/20 group-hover:translate-x-0 group-hover:text-white/70"
                        }`}
                      >
                        ↗
                      </span>
                    </button>
                  );
                })}

                {!filteredArticles.length && (
                  <p className="py-12 text-center text-xs text-white/40">
                    No subjects found. Try another search.
                  </p>
                )}
              </div>
            </aside>

            <article className="min-w-0 border border-white/10 bg-[#10121d]">
              <div className="relative min-h-[270px] overflow-hidden sm:min-h-[360px]">
                <Image
                  key={activeArticle.number}
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-65"
                  fill
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#10121d] via-[#10121d]/65 to-[#10121d]/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10121d] via-transparent to-black/10" />

                <div className="relative flex min-h-[270px] flex-col justify-between p-6 sm:min-h-[360px] sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="border border-white/20 bg-black/20 px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-white/75 backdrop-blur">
                      {activeArticle.tag}
                    </span>
                    <span className="font-serif text-4xl text-white/60">
                      {activeArticle.number}
                    </span>
                  </div>

                  <div className="max-w-xl">
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#e7c98b]">
                      Start with a question
                    </p>
                    <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
                      {activeArticle.question}
                    </h3>
                    <p className="mt-4 max-w-lg text-xs leading-7 text-white/65">
                      {activeArticle.summary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-white/10 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                  <p className="text-[8px] uppercase tracking-[0.25em] text-[#e7c98b]">
                    The Qur’anic passage
                  </p>

                  <blockquote
                    dir="rtl"
                    className="mt-6 text-right font-serif text-2xl leading-[2.1] text-[#f0d9aa]"
                  >
                    {activeArticle.verse}
                  </blockquote>

                  <p className="mt-4 text-right text-[9px] uppercase tracking-[0.15em] text-white/35">
                    {activeArticle.reference}
                  </p>

                  <a
                    href={activeArticle.quran}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center gap-2 border-b border-[#e7c98b]/40 pb-1 text-[9px] uppercase tracking-[0.16em] text-[#e7c98b] transition hover:text-white"
                  >
                    Read the complete passage ↗
                  </a>
                </div>

                <div className="p-6 sm:p-9">
                  <div className="flex flex-wrap gap-5 border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveTab("reflection")}
                      className={`relative pb-4 text-[8px] uppercase tracking-[0.15em] transition ${
                        activeTab === "reflection"
                          ? "text-[#e7c98b]"
                          : "text-white/35 hover:text-white"
                      }`}
                    >
                      Tafsir & context
                      {activeTab === "reflection" && (
                        <span className="absolute inset-x-0 bottom-0 h-px bg-[#e7c98b]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("science")}
                      className={`relative pb-4 text-[8px] uppercase tracking-[0.15em] transition ${
                        activeTab === "science"
                          ? "text-[#c8b5ed]"
                          : "text-white/35 hover:text-white"
                      }`}
                    >
                      Scientific view
                      {activeTab === "science" && (
                        <span className="absolute inset-x-0 bottom-0 h-px bg-[#c8b5ed]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("research")}
                      className={`relative pb-4 text-[8px] uppercase tracking-[0.15em] transition ${
                        activeTab === "research"
                          ? "text-[#f0a9c7]"
                          : "text-white/35 hover:text-white"
                      }`}
                    >
                      Research notes
                      {activeTab === "research" && (
                        <span className="absolute inset-x-0 bottom-0 h-px bg-[#f0a9c7]" />
                      )}
                    </button>
                  </div>

                  <div
                    className="min-h-[190px] py-7"
                    aria-live="polite"
                  >
                    {activeTab === "reflection" && (
                      <>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-[#e7c98b]">
                          Meaning before comparison
                        </p>
                        <p className="mt-4 text-xs leading-8 text-white/65">
                          {activeArticle.tafsirNote}
                        </p>
                      </>
                    )}

                    {activeTab === "science" && (
                      <>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-[#c8b5ed]">
                          What astronomy tells us
                        </p>
                        <p className="mt-4 text-xs leading-8 text-white/65">
                          {activeArticle.scienceNote}
                        </p>

                        <div className="mt-5 border-l border-pink-300/50 pl-4">
                          <p className="text-[8px] uppercase tracking-[0.18em] text-pink-200">
                            A necessary distinction
                          </p>
                          <p className="mt-2 text-[11px] leading-6 text-white/45">
                            {activeArticle.boundary}
                          </p>
                        </div>
                      </>
                    )}

                    {activeTab === "research" && (
                      <>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-[#f0a9c7]">
                          Continue beyond this page
                        </p>

                        <p className="mt-4 text-xs leading-7 text-white/55">
                          Use the source links to explore the topic further.
                          Scientific research is a process of testing and
                          revising explanations; a source is not proof of
                          a connection to a verse by itself.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href={activeArticle.science}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-white/15 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/70 transition hover:border-[#c8b5ed]/60 hover:text-[#c8b5ed]"
                          >
                            Science overview ↗
                          </a>

                          <a
                            href={activeArticle.research}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-white/15 px-4 py-2.5 text-[8px] uppercase tracking-[0.14em] text-white/70 transition hover:border-[#f0a9c7]/60 hover:text-[#f0a9c7]"
                          >
                            Research source ↗
                          </a>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-[8px] uppercase tracking-[0.16em] text-white/25">
                      {activeIndex + 1} of {articles.length}
                    </span>

                    <button
                      type="button"
                      onClick={nextArticle}
                      className="group inline-flex items-center gap-3 text-[8px] uppercase tracking-[0.16em] text-[#e7c98b] transition hover:text-white"
                    >
                      Next exploration
                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Additional verses */}
        <section className="border-t border-white/[0.08] bg-[#0d0e17]">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-14 lg:py-24">
            <div>
              <p className="text-[8px] uppercase tracking-[0.3em] text-[#e7c98b]">
                Keep exploring
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Verses to
                <br />
                <span className="italic text-white/40">
                  return to.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-xs leading-7 text-white/40">
                A reading list for further reflection. Explore each
                passage in its full context and consult reliable tafsir.
              </p>
            </div>

            <div className="grid gap-x-10 sm:grid-cols-2">
              {moreVerses.map((item, index) => (
                <a
                  key={item.reference}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-t border-white/10 py-5 transition hover:border-[#e7c98b]/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl text-[#e7c98b]/70">
                      0{index + 1}
                    </span>
                    <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-[#e7c98b]">
                      ↗
                    </span>
                  </div>

                  <p
                    dir="rtl"
                    className="mt-4 text-right font-serif text-lg leading-[2] text-[#ead7b2]"
                  >
                    {item.verse}
                  </p>

                  <p className="mt-2 text-[8px] uppercase tracking-[0.15em] text-white/50">
                    {item.reference}
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-white/30">
                    {item.theme}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-14">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-3 text-[8px] uppercase tracking-[0.18em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} Āfāq — Explore the Universe
            </span>
            <span>
              Contemplation · Reliable tafsir · Evidence-led astronomy
            </span>
            <a
              href="#top"
              className="transition hover:text-[#e7c98b]"
            >
              Return to the beginning ↑
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
