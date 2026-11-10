
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Bookmark,
  BookmarkX,
  Trash2,
  Telescope,
  Orbit,
  Rocket,
  Sparkles,
  Newspaper,
  CalendarDays,
  ImageIcon,
  Moon,
  ChevronRight,
} from "lucide-react";

import type { SavedItem } from "@/lib/exploration/types";

import {
  getSavedItems,
  removeFromSaved,
  clearSavedItems,
  subscribeToSavedItems,
} from "@/lib/exploration/storage";

const categoryInfo: Record<
  string,
  { title: string; icon: typeof Bookmark; description: string }
> = {
  solar_system_category: {
    title: "Solar System",
    icon: Orbit,
    description: "Your saved corners of our solar system.",
  },
  planet: {
    title: "Planets",
    icon: Orbit,
    description: "Worlds waiting to be explored.",
  },
  moon: {
    title: "Moons",
    icon: Moon,
    description: "Natural satellites and their stories.",
  },
  mission: {
    title: "Space Missions",
    icon: Rocket,
    description: "Humanity's journey beyond Earth.",
  },
  discovery: {
    title: "Discoveries",
    icon: Sparkles,
    description: "Remarkable discoveries across the universe.",
  },
  article: {
    title: "Space Articles",
    icon: Newspaper,
    description: "Stories and knowledge worth revisiting.",
  },
  apod: {
    title: "Pictures of the Day",
    icon: ImageIcon,
    description: "A collection of your favorite cosmic views.",
  },
  nasa_image: {
    title: "NASA Images",
    icon: ImageIcon,
    description: "Images from NASA's archives.",
  },
  astronomy_event: {
    title: "Space Events",
    icon: CalendarDays,
    description: "Astronomical events you want to remember.",
  },
};

const formatDate = (date?: string) => {
  if (!date) return "Previously saved";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Previously saved";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

export default function MyExplorationPage() {
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    const syncItems = () => {
      setItems(getSavedItems());
    };

    syncItems();

    return subscribeToSavedItems(syncItems);
  }, []);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const dateA = a.savedAt
        ? new Date(a.savedAt).getTime()
        : 0;

      const dateB = b.savedAt
        ? new Date(b.savedAt).getTime()
        : 0;

      return dateB - dateA;
    });
  }, [items]);

  const groups = useMemo(() => {
    const grouped = new Map<string, SavedItem[]>();

    sortedItems.forEach((item) => {
      const current = grouped.get(item.type) ?? [];
      grouped.set(item.type, [...current, item]);
    });

    return Array.from(grouped.entries());
  }, [sortedItems]);

  const handleRemove = (item: SavedItem) => {
    removeFromSaved(item.id, item.type);
  };

  const handleClearAll = () => {
    if (window.confirm("Remove all saved items from your collection?")) {
      clearSavedItems();
    }
  };

  return (
    <main className="min-h-screen pt-20 overflow-hidden bg-[#070a12] px-5 py-12 text-white md:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="relative pt-5 mb-14 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-[#17142b] via-[#0d111c] to-[#090d17] px-7 py-10 md:px-12 md:py-14">

          <div className="pointer-events-none absolute -right-20 -top-32 size-80 rounded-full bg-purple-600/10 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-[#e7c98b]/[0.06] blur-[100px]" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>
              <div className="mb-5 flex items-center gap-2 text-[#a78bfa]">
                <Telescope size={19} />

                <span className="text-[10px] uppercase tracking-[0.25em]">
                  Your Personal Universe
                </span>
              </div>

              <h1 className="font-serif text-4xl tracking-wide text-white md:text-6xl">
                My Exploration
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/45">
                A personal collection of the worlds, discoveries,
                and stories you want to explore again.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-white/50">
                <span className="flex items-center gap-2">
                  <Bookmark size={15} className="text-[#e7c98b]" />
                  {items.length} Saved Items
                </span>

                <span className="size-1 rounded-full bg-white/20" />

                <span>
                  {groups.length} Categories
                </span>
              </div>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="flex w-fit items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.04] px-4 py-3 text-xs text-red-300/80 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300"
              >
                <Trash2 size={15} />
                Clear Collection
              </button>
            )}
          </div>
        </header>

        {/* Empty State */}
        {items.length === 0 ? (
          <section className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-white/[0.015] px-6 text-center">

            <div className="mb-6 flex size-20 items-center justify-center rounded-full border border-purple-400/15 bg-purple-500/[0.08] text-purple-300">
              <BookmarkX size={34} />
            </div>

            <h2 className="font-serif text-2xl text-white">
              Your universe is waiting
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/40">
              You haven't saved anything yet. Explore the universe
              and collect the things that inspire your curiosity.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-6 py-3 text-xs tracking-wider text-purple-200 transition hover:bg-purple-500/20"
            >
              Start Exploring
              <ChevronRight size={15} />
            </Link>
          </section>
        ) : (
          <div className="space-y-16">

            {/* Categories */}
            {groups.map(([type, categoryItems]) => {
              const info = categoryInfo[type] ?? {
                title: type.replaceAll("_", " "),
                icon: Bookmark,
                description: "Your saved explorations.",
              };

              const Icon = info.icon;

              return (
                <section key={type}>

                  {/* Category Header */}
                  <div className="mb-7 flex items-end justify-between gap-4 border-b border-white/[0.07] pb-5">

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-[#a78bfa]">
                        <Icon size={17} />

                        <span className="text-[9px] uppercase tracking-[0.22em]">
                          Collection
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl text-white md:text-3xl">
                        {info.title}
                      </h2>

                      <p className="mt-2 text-xs text-white/35">
                        {info.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-wider text-white/50">
                      {categoryItems.length} ITEMS
                    </span>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {categoryItems.map((item) => (
                      <article
                        key={`${item.type}-${item.id}`}
                        className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d111c] transition-all duration-500 hover:-translate-y-1 hover:border-purple-400/30 hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)]"
                      >

                        {/* Image */}
                        <Link
                          href={item.route}
                          className="relative block aspect-[16/10] overflow-hidden bg-[#141a28]"
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-purple-300/30">
                              <Icon size={35} />
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a12]/70 via-transparent to-transparent" />

                          <span className="absolute bottom-3 left-4 text-[9px] uppercase tracking-[0.2em] text-white/60">
                            {info.title}
                          </span>
                        </Link>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => handleRemove(item)}
                          aria-label={`Remove ${item.title}`}
                          title="Remove from collection"
                          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/65 backdrop-blur-md transition hover:border-red-400/40 hover:bg-red-400/15 hover:text-red-300"
                        >
                          <BookmarkX size={16} />
                        </button>

                        {/* Information */}
                        <div className="p-4">
                          <Link
                            href={item.route}
                            className="block truncate font-serif text-lg text-white/90 transition-colors hover:text-[#e7c98b]"
                          >
                            {item.title}
                          </Link>

                          <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
                            <span className="text-[9px] uppercase tracking-wider text-white/30">
                              Saved on
                            </span>

                            <span className="text-[10px] text-white/45">
                              {formatDate(item.savedAt)}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}

                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
