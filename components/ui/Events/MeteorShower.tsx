"use client";

import { useEffect, useState } from "react";
import type {
  MeteorShower,
  MeteorShowerResponse,
} from "@/types/meteorShowerI";
import { TonightMeteorData } from "@/types/TonightMeteorData";
import { verdictStyles } from "./MeteorsStoriesStyles";
import Link from "next/link";


const formatTime = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatDateRange = (start: string, end: string) => {
  const format = (value: string) => {
    const [month, day] = value.split("-");

    return new Date(
      2026,
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return `${format(start)} — ${format(end)}`;
};


export default function MeteorShowers() {
  const [showers, setShowers] = useState<MeteorShower[]>([]);
  const [tonight, setTonight] =useState<TonightMeteorData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      queueMicrotask(() => {
        setError(
          "Geolocation is not supported by your browser."
        );
        setLoading(false);
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const [showersResponse, tonightResponse] =
            await Promise.all([
              fetch("/api/meteor-showers"),
              fetch(
                `/api/meteor-showers/tonight?lat=${latitude}&lon=${longitude}`
              ),
            ]);

          const showersData: MeteorShowerResponse =
            await showersResponse.json();

          const tonightData = await tonightResponse.json();

          if (!showersResponse.ok) {
            throw new Error(
              "Failed to fetch meteor shower list."
            );
          }

          if (!tonightResponse.ok) {
            throw new Error(
              tonightData.error ||
                "Failed to fetch tonight's meteor shower."
            );
          }

          setShowers(showersData.showers);
          setTonight(tonightData);
        } catch (error) {
          console.error(error);

          setError(
            error instanceof Error
              ? error.message
              : "Something went wrong."
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Location error:", error);

        setError(
          "Location permission is required to show meteor shower conditions."
        );

        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex min-h-62.5 items-center justify-center">
            <p className="text-white/40">
              Checking meteor showers above you...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-red-400/20 bg-red-400/5 p-8">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const verdict = tonight
    ? verdictStyles[tonight.verdict.tier]
    : null;

  return (
    <section className="border-t border-white/6 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#e7c98b]" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#e7c98b]">
              Meteor Showers
            </p>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Rivers of light across the night sky.
          </h2>

          <p className="mt-5 text-base leading-7 text-white/50">
            Explore annual meteor showers and discover how
            tonight&apos;s observing conditions look from your
            location.
          </p>
        </div>

        {/* Tonight */}
        {tonight && (
          <div className="mb-14 overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-[#141a28] to-[#0d111c]">
            <div className="relative p-8 md:p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#a78bfa]/10 blur-3xl" />

              <div className="relative">
                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/35">
                      Tonight
                    </p>

                    <h3 className="text-2xl font-semibold md:text-3xl">
                      {tonight.shower?.name ??
                        "No active meteor shower"}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                      {tonight.verdict.detail}
                    </p>
                  </div>

                  {verdict && (
                    <span
                      className={`w-fit rounded-full border px-4 py-2 text-xs font-medium ${verdict.className}`}
                    >
                      {verdict.label}
                    </span>
                  )}
                </div>

                {tonight.shower && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-widest text-white/30">
                        Best Viewing
                      </p>

                      <p className="text-lg text-white/90">
                        {tonight.bestWindow
                          ? `${formatTime(
                              tonight.bestWindow.start
                            )} — ${formatTime(
                              tonight.bestWindow.end
                            )}`
                          : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs uppercase tracking-widest text-white/30">
                        Expected Rate
                      </p>

                      <p className="text-lg text-white/90">
                        {tonight.peakHr > 0
                          ? `${tonight.peakHr} / hr`
                          : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs uppercase tracking-widest text-white/30">
                        Moon
                      </p>

                      <p className="text-lg text-white/90">
                        {Math.round(
                          tonight.moonIllum * 100
                        )}
                        %
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs uppercase tracking-widest text-white/30">
                        Cloud Cover
                      </p>

                      <p className="text-lg text-white/90">
                        {tonight.cloudPct !== null
                          ? `${Math.round(
                              tonight.cloudPct
                            )}%`
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/35">
                  <span>
                    📍 {tonight.location.label}
                  </span>

                  <span>
                    · Radiant altitude{" "}
                    {tonight.radiantAltMax.toFixed(1)}°
                  </span>

                  {tonight.location.skyBrightnessKnown && (
                    <span>
                      · Bortle {tonight.location.bortle}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

    
        {/* Annual Showers */}
        <section>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#a78bfa]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#a78bfa]">
                  Annual Calendar
                </p>
              </div>

              <h3 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Meteor Showers
              </h3>

              <p className="mt-3 max-w-md text-sm leading-7 text-white/40">
                Earth crosses ancient trails of cosmic dust, creating fleeting
                streaks of light across the night sky.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/2 px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_10px_#a78bfa]" />
              <span className="text-sm text-white/60">
                {showers.length}{" "}
                {showers.length === 1 ? "shower" : "showers"}
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {showers.map((shower, index) => (
              <article
                key={shower.code}
                className="group relative isolate overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#0c101b] transition-all duration-500 hover:-translate-y-1 hover:border-[#a78bfa]/30"
              >
                {/* Atmospheric background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                >
                  <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-violet-500/[0.07] blur-[70px] transition duration-500 group-hover:bg-violet-500/[0.14]" />

                  <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle,#ffffff_0.7px,transparent_0.7px)] bg-size-[24px_24px]" />

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-transparent via-[#a78bfa]/70 to-transparent transition-all duration-700 group-hover:w-full" />
                </div>

                <div className="p-6 sm:p-7">
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
                      Shower {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="rounded-full border border-[#a78bfa]/20 bg-[#a78bfa]/6 px-3 py-1.5 text-[10px] tracking-[0.15em] text-violet-200/80">
                      {shower.code}
                    </span>
                  </div>

                  {/* Meteor illustration */}
                  <div
                    aria-hidden="true"
                    className="relative my-7 flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-linear-to-br from-violet-400/[0.07] via-transparent to-[#e7c98b]/3"
                  >
                    <div className="absolute h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />

                    <svg
                      viewBox="0 0 280 100"
                      fill="none"
                      className="h-full w-full"
                    >
                      <path
                        d="M34 72 L117 35"
                        stroke="#a78bfa"
                        strokeOpacity=".12"
                        strokeWidth="1"
                      />
                      <path
                        d="M64 82 L139 48"
                        stroke="#a78bfa"
                        strokeOpacity=".22"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M100 74 L159 47"
                        stroke="#c4b5fd"
                        strokeOpacity=".45"
                        strokeWidth="2"
                      />
                      <path
                        d="M125 62 L170 41"
                        stroke="#e7c98b"
                        strokeOpacity=".8"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="176"
                        cy="38"
                        r="3"
                        fill="#f4dfad"
                      />
                      <circle
                        cx="176"
                        cy="38"
                        r="8"
                        fill="#e7c98b"
                        fillOpacity=".12"
                      />
                      <circle cx="55" cy="24" r="1" fill="white" fillOpacity=".6" />
                      <circle cx="218" cy="25" r="1.2" fill="#c4b5fd" />
                      <circle cx="231" cy="73" r="1" fill="white" fillOpacity=".5" />
                      <circle cx="202" cy="62" r=".8" fill="white" fillOpacity=".6" />
                    </svg>

                    <span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-[0.25em] text-white/25">
                      Cosmic debris
                    </span>
                  </div>

                  {/* Shower identity */}
                  <h4 className="text-xl font-medium tracking-tight text-white transition-colors group-hover:text-[#d8c9ff] sm:text-2xl">
                    {shower.name}
                  </h4>

                  <div className="mt-3 flex items-start gap-2.5 text-sm text-white/45">
                    <span className="mt-0.5 text-[#a78bfa]">↗</span>
                    <span>
                      Active period
                      <span className="mt-1 block text-white/75">
                        {formatDateRange(
                          shower.active.start,
                          shower.active.end
                        )}
                      </span>
                    </span>
                  </div>

                  {/* Data panel */}
                  <div className="mt-7 grid grid-cols-2 divide-x divide-white/8 border-t border-white/8 pt-5">
                    <div className="pr-4">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                        ZHR
                      </p>

                      <p className="mt-2 text-2xl font-light tabular-nums text-[#e7c98b]">
                        {shower.zhr}
                      </p>

                      <p className="mt-1 text-[10px] text-white/30">
                        Meteors per hour
                      </p>
                    </div>

                    <div className="pl-5">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                        Peak solar longitude
                      </p>

                      <p className="mt-2 text-2xl font-light tabular-nums text-white/85">
                        {shower.solLongPeak}°
                      </p>

                      <p className="mt-1 text-[10px] text-white/30">
                        Solar longitude
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* Attribution */}
        <p className="mt-10 text-xs leading-5 text-white/25">
          Meteor data by{" "}
          <Link
            href="https://meteorshowercal.com/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-white/50"
          >
            MeteorShowerCal
          </Link>{" "}
          under CC BY 4.0.
        </p>
      </div>
    </section>
  );
}