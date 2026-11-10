
import {

  Compass,
  Database,
  Rocket,

  Sparkles,
} from "lucide-react";

import {
  getMissions,
  getMissionImage,
  getMissionName,
} from "@/lib/missions";
import MissionExplorer from "./MissionExplorer";
export const revalidate = 3600;

export default async function MissionsPage() {
  const { data: missions } = await getMissions();

  /*
   * Fetch NASA images for all missions.
   * Promise.all keeps the page dynamic while
   * allowing image requests to run in parallel.
   */
  const missionsWithImages = await Promise.all(
    missions.map(async (mission) => {
      const missionName = getMissionName(
        mission.mission
      );

      const image = await getMissionImage(
        missionName
      );

      return {
        mission,
        missionName,
        image,
      };
    })
  );

  return (
    <main className="min-h-screen bg-[#070a12] text-white">
   
{/* ================= HERO ================= */}

    <section className="relative isolate overflow-hidden border-b border-white/[0.07] bg-[#070a12]">
      {/* Atmospheric background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-52 size-[560px] rounded-full bg-violet-500/[0.10] blur-[140px]" />

        <div className="absolute -bottom-48 -left-40 size-[480px] rounded-full bg-[#e7c98b]/[0.06] blur-[130px]" />

        <div className="absolute right-[18%] top-0 h-px w-72 bg-gradient-to-r from-transparent via-[#e7c98b]/30 to-transparent" />

        {/* Subtle star field */}

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(231,201,139,0.8) 0.7px, transparent 1px), radial-gradient(circle, rgba(167,139,250,0.7) 0.7px, transparent 1px)",
            backgroundSize: "73px 73px, 109px 109px",
            backgroundPosition: "0 0, 35px 48px",
          }}
        />

        {/* Orbital rings */}

        <div className="absolute -right-28 top-1/2 hidden size-[460px] -translate-y-1/2 rounded-full border border-white/[0.055] lg:block" />

        <div className="absolute -right-12 top-1/2 hidden size-[330px] -translate-y-1/2 rounded-full border border-[#e7c98b]/[0.10] lg:block" />

        <div className="absolute right-[105px] top-[calc(50%-165px)] hidden size-2 rounded-full bg-[#e7c98b] shadow-[0_0_18px_4px_rgba(231,201,139,0.3)] lg:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          {/* Main content */}

          <div className="max-w-3xl">
            {/* Eyebrow */}

            <div className="mb-7 inline-flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/[0.08] text-violet-200">
                <Rocket className="size-[18px]" />
              </span>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e7c98b]">
                  Explore the cosmos
                </p>

                <p className="mt-1 text-xs text-white/40">
                  NASA Open Science Data Repository
                </p>
              </div>
            </div>

            {/* Heading */}

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.5rem]">
              Every mission
              <br />

              <span className="bg-gradient-to-r from-[#f0dcae] via-[#e7c98b] to-violet-300 bg-clip-text text-transparent">
                expands our horizon.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              From pioneering spaceflight to scientific discovery,
              explore the missions and research helping humanity
              understand the universe beyond our world.
            </p>

            {/* Metadata */}

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/45">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-300/80" />
                Research-driven exploration
              </span>

              <span className="hidden h-3 w-px bg-white/15 sm:block" />

              <span className="inline-flex items-center gap-2">
                <Database className="size-3.5 text-[#e7c98b]/80" />
                NASA research data
              </span>
            </div>
          </div>

          {/* Mission data panel */}

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-violet-500/[0.06] blur-2xl" />

            <div className="relative rounded-2xl border border-white/[0.09] bg-[#0d111c]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                    Mission index
                  </p>

                  <p className="mt-1 text-sm text-white/80">
                    Explore the database
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-xl border border-[#e7c98b]/15 bg-[#e7c98b]/[0.06] text-[#e7c98b]">
                  <Compass className="size-5" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-white/45">
                      Available missions
                    </span>

                    <Rocket className="size-4 text-violet-300" />
                  </div>

                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {missions.length.toLocaleString()}
                  </p>

                  <p className="mt-1 text-[11px] text-white/35">
                    Missions in the current dataset
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e7c98b]/[0.08] text-[#e7c98b]">
                    <Database className="size-[18px]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/85">
                      NASA OSDR
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/40">
                      Open Science Data Repository
                    </p>
                  </div>

                  <span className="ml-auto size-1.5 shrink-0 rounded-full bg-violet-300/80" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
                <Sparkles className="size-3.5 text-[#e7c98b]/70" />

                <p className="text-[10px] tracking-wide text-white/35">
                  Science begins beyond the familiar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


      {/* ================= MISSION EXPLORER ================= */}

  <MissionExplorer missions={missionsWithImages} />
    </main>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/7 bg-white/[0.025] p-5 transition-colors hover:bg-white/[0.04]">
      <div className="flex items-center gap-3">
        <div className="text-violet-300">
          {icon}
        </div>

        <div>
          <p className="text-xl font-semibold">
            {value}
          </p>

          <p className="text-xs text-white/40">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}