"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Rocket, Sparkles, X } from "lucide-react";
import SaveButton from "@/components/ui/exploration/SaveButton";

type MissionItem = {
  mission: {
    mission: string;
  };
  missionName: string;
  image: {
    imageUrl?: string | null;
    title?: string | null;
  };
};

type MissionExplorerProps = {
  missions: MissionItem[];
};

export default function MissionExplorer({ missions }: MissionExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMissions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return missions;

    return missions.filter(({ missionName, image }) => {
      return (
        missionName.toLowerCase().includes(query) ||
        (image.title ?? "").toLowerCase().includes(query)
      );
    });
  }, [missions, searchQuery]);

  return (
    <section
      id="mission-explorer"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
    >
      {/* Header */}

      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#e7c98b]/70">
          Mission Explorer
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Discover the Missions
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
          Search through space missions and explore their associated imagery and
          scientific research.
        </p>
      </div>

      {/* Search */}

      <div className="mb-8">
        <label
          htmlFor="mission-search"
          className="mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-white/45"
        >
          Find a mission
        </label>

        <div className="group relative max-w-2xl">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#e7c98b]"
          />

          <input
            id="mission-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search missions by name..."
            autoComplete="off"
            className="h-14 w-full rounded-2xl border border-white/[0.09] bg-[#0d111c]/80 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/30 hover:border-white/15 focus:border-[#e7c98b]/40 focus:ring-2 focus:ring-[#e7c98b]/10"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div
          className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40"
          aria-live="polite"
        >
          <p>
            {filteredMissions.length}{" "}
            {filteredMissions.length === 1 ? "mission" : "missions"} found
          </p>

          {searchQuery.trim() && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-[#e7c98b] transition-colors hover:text-white"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Results */}

      {filteredMissions.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMissions.map(({ mission, missionName, image }) => {
            const slug = encodeURIComponent(missionName);

            return (
              <article
                key={mission.mission}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.04]"
              >
                {/* Image */}

                <div className="relative aspect-[8/7] overflow-hidden bg-[#0d111c]">
                  <Link
                    href={`/missions/${slug}`}
                    aria-label={`Explore ${missionName}`}
                    className="absolute inset-0"
                    tabIndex={-1}
                  >
                    {image.imageUrl ? (
                      <Image
                        src={image.imageUrl}
                        alt={image.title ?? `${missionName} NASA mission`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_65%)]">
                        <Rocket className="size-10 text-violet-300/30" />
                      </div>
                    )}
                  </Link>

                 {/* Top Actions */}
                  <div className="absolute inset-x-3 top-3 z-20 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/70 backdrop-blur-md">
                      NASA
                    </span>

                    <SaveButton
                      item={{
                        id: mission.mission,
                        type: "mission",
                        title: missionName,
                        image: image.imageUrl ?? undefined,
                        route: `/missions/${slug}`,
                      }}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-transparent" />

           
                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-violet-300/70">
                    <Sparkles className="size-3.5" />
                    Space Mission
                  </div>

                  <h3 className="mt-3 break-words text-lg font-semibold tracking-tight text-white">
                    {missionName}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/40">
                    {image.title && image.title !== missionName
                      ? image.title
                      : "Explore mission information and associated scientific research."}
                  </p>

                  <div className="mt-auto pt-7">
                    <Link
                      href={`/missions/${slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#e7c98b] transition-colors hover:text-white"
                    >
                      Explore Mission
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.015] px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-400/[0.06]">
            <Search className="size-6 text-violet-300/70" />
          </div>

          <h3 className="mt-5 text-lg font-medium text-white">
            No missions found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
            We couldn&apos;t find a mission matching &quot;{searchQuery.trim()}
            &quot;. Try another name or clear your search.
          </p>

          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-5 rounded-xl border border-[#e7c98b]/20 px-4 py-2.5 text-sm text-[#e7c98b] transition-colors hover:bg-[#e7c98b]/[0.06]"
          >
            Show all missions
          </button>
        </div>
      )}
    </section>
  );
}
