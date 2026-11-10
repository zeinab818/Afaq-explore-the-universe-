
"use client";

import MeteorShowers from "@/components/ui/Events/MeteorShower";
import type { CelestialEvent, CelestialEventType } from "@/types/events";
import LoadingState from "./loading"
import ErrorState from "./errors"
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {

  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Compass,

  Moon,
  RefreshCw,
  Sparkles,
  Sun,
} from "lucide-react";

const eventNames: Record<CelestialEventType, string> = {
  total_solar_eclipse: "Total Solar Eclipse",
  annular_solar_eclipse: "Annular Solar Eclipse",
  partial_solar_eclipse: "Partial Solar Eclipse",
  total_lunar_eclipse: "Total Lunar Eclipse",
  partial_lunar_eclipse: "Partial Lunar Eclipse",
  penumbral_lunar_eclipse: "Penumbral Lunar Eclipse",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatTime = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

function EventIcon({ body }: { body: string }) {
  return body === "Sun" ? (
    <Sun className="h-6 w-6 text-[#e7c98b]" strokeWidth={1.5} />
  ) : (
    <Moon className="h-6 w-6 text-[#c4b5fd]" strokeWidth={1.5} />
  );
}



function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="rounded-4xl border border-white/8 bg-[#0d111c]/70 px-6 py-14 text-center md:px-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e7c98b]/15 bg-[#e7c98b]/5">
        <Sparkles className="h-7 w-7 text-[#e7c98b]" strokeWidth={1.3} />
      </div>

      <h2 className="mt-6 text-2xl font-medium text-white">
        Nothing on the calendar just yet.
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/45">
        No upcoming events were returned for your location. Check again
        later to see what the sky has in store.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-[#e7c98b]/40 hover:text-[#e7c98b]"
      >
        <RefreshCw className="h-4 w-4" />
        Check Again
      </button>
    </section>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<CelestialEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retrying, setRetrying] = useState(false);

  const loadEvents = useCallback(() => {
    setLoading(true);
    setRetrying(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      setLoading(false);
      setRetrying(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, altitude } = position.coords;

          const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude),
            elevation: String(altitude ?? 0),
          });

          const response = await fetch(
            `/api/celestial-events?${params.toString()}`,
            { cache: "no-store" }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || "Failed to fetch celestial events."
            );
          }

          if (!Array.isArray(data)) {
            throw new Error("The server returned an unexpected response.");
          }

          setEvents(data);
        } catch (err) {
          console.error("Celestial events error:", err);

          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading celestial events."
          );
        } finally {
          setLoading(false);
          setRetrying(false);
        }
      },
      (geoError) => {
        console.error("Location error:", geoError);

        const messages: Record<number, string> = {
          1: "Location access was denied. Allow location access in your browser settings, then try again.",
          2: "Your location could not be determined. Check your device location settings and try again.",
          3: "Getting your location took too long. Please try again.",
        };

        setError(
          messages[geoError.code] ||
            "We couldn't access your location. Please try again."
        );

        setLoading(false);
        setRetrying(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadEvents, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadEvents]);

  const nextEvent = events[0];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070a12] px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 right-[-10%] h-120 w-120 rounded-full bg-violet-600/9 blur-[120px]" />
        <div className="absolute left-[-15%] top-152 h-100 w-100 rounded-full bg-blue-500/5 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 0.7px, transparent 0.7px)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
     
       
        {/* Cosmic Editorial Hero */}
        <header className="relative mb-20 overflow-hidden border-b border-white/8 pb-12 pt-6 sm:pb-16 lg:mb-24 lg:pb-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            {/* Editorial text */}
            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#e7c98b]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#e7c98b]">
                  Āfāq — Celestial Almanac
                </span>
              </div>

              <h1 className="max-w-3xl text-5xl font-medium leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                The universe,
                <br />
                <span className="font-serif font-normal italic text-[#e7c98b]">
                  right on time.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-8 text-white/50 sm:text-base">
                Every eclipse has its moment. Every celestial encounter has its
                place in time. Discover what the skies have planned next.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="#events"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#e7c98b] px-6 py-3.5 text-sm font-medium text-[#10121a] transition duration-300 hover:bg-[#f2dca9]"
                >
                  Explore upcoming events
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </Link>

                <span className="text-xs tracking-wide text-white/35">
                  Look up. There is more.
                </span>
              </div>
            </div>

            {/* Quiet celestial illustration */}
            <div
              aria-hidden="true"
              className="relative mx-auto flex aspect-square w-full max-w-105 items-center justify-center lg:ml-auto"
            >
              <div className="absolute inset-[8%] rounded-full border border-white/6" />
              <div className="absolute inset-[18%] rounded-full border border-[#e7c98b]/12" />
              <div className="absolute inset-[29%] rounded-full border border-white/8" />

              <div className="absolute inset-[8%] rounded-full bg-violet-500/6 blur-3xl" />

              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#e7c98b]/20 bg-linear-to-br from-[#e7c98b]/15 via-[#a78bfa]/10 to-transparent shadow-[0_0_80px_rgba(167,139,250,0.08)] sm:h-44 sm:w-44">
                <div className="absolute inset-3 rounded-full border border-white/[0.07]" />
                <div className="h-20 w-20 rounded-full bg-linear-to-br from-[#e7c98b]/25 to-violet-400/10 blur-xl sm:h-28 sm:w-28" />
                <span className="absolute right-5 top-7 h-2 w-2 rounded-full bg-[#e7c98b] shadow-[0_0_18px_#e7c98b]" />
              </div>

              <span className="absolute left-[17%] top-[25%] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_#a78bfa]" />
              <span className="absolute bottom-[24%] right-[17%] h-1.5 w-1.5 rounded-full bg-[#e7c98b] shadow-[0_0_12px_#e7c98b]" />
              <span className="absolute right-[20%] top-[18%] h-1 w-1 rounded-full bg-white/60" />
              <span className="absolute bottom-[19%] left-[29%] h-1 w-1 rounded-full bg-white/40" />

              <div className="absolute bottom-[8%] left-0">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                  Beyond the ordinary
                </p>
                <p className="mt-2 font-serif text-lg italic text-white/70">
                  A universe in motion.
                </p>
              </div>

              <div className="absolute right-0 top-[9%] text-right">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#e7c98b]/70">
                  The cosmic calendar
                </p>
                <p className="mt-2 text-[10px] text-white/30">
                  Observe · Discover · Wonder
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={loadEvents}
            retrying={retrying}
          />
        ) : events.length === 0 ? (
          <EmptyState onRetry={loadEvents} />
        ) : (
          <>
            {/* Featured event */}
            <section className="mb-20">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#e7c98b]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#e7c98b]">
                  On the horizon
                </p>
              </div>

              <article className="group relative overflow-hidden rounded-4xl border border-white/9 bg-linear-to-br from-[#151727] via-[#101321] to-[#0b0e17]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-violet-500/12 blur-[90px] transition duration-700 group-hover:bg-violet-500/18"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-40 left-[25%] h-80 w-80 rounded-full bg-[#e7c98b]/5 blur-[100px]"
                />

                <div className="relative grid lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="p-7 sm:p-10 lg:p-14">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
                        <EventIcon body={nextEvent.body} />
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                          Featured celestial event
                        </p>
                        <p className="mt-1 text-xs text-white/65">
                          {nextEvent.body}
                        </p>
                      </div>
                    </div>

                    <h2 className="mt-9 max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                      {eventNames[nextEvent.type]}
                    </h2>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/45">
                      A moment in the celestial dance worth looking up for.
                      Explore its timing and details below.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#e7c98b]/20 bg-[#e7c98b]/6 px-4 py-2.5 text-sm text-[#f0d9a1]">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(nextEvent.date)}
                      </span>

                      <Link
                        href="#events"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#10121a] transition hover:bg-[#e7c98b]"
                      >
                        Explore details
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative flex min-h-65 flex-col justify-end overflow-hidden border-t border-white/6 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="absolute h-64 w-64 rounded-full border border-violet-300/8" />
                      <div className="absolute h-48 w-48 rounded-full border border-[#e7c98b]/12" />
                      <div className="absolute h-32 w-32 rounded-full border border-white/8" />
                      <div className="absolute h-20 w-20 rounded-full bg-violet-400/10 blur-2xl" />
                      <div className="absolute h-3 w-3 translate-x-20 -translate-y-20 rounded-full bg-[#e7c98b] shadow-[0_0_24px_#e7c98b]" />
                      <div className="absolute h-2 w-2 -translate-x-24 translate-y-12 rounded-full bg-violet-300 shadow-[0_0_20px_#a78bfa]" />
                    </div>

                    <div className="relative">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                        Event details
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-6">
                        <div>
                          <Clock3 className="mb-3 h-4 w-4 text-[#e7c98b]" />
                          <p className="text-xs text-white/35">Peak time</p>
                          <p className="mt-1 text-lg font-medium">
                            {formatTime(nextEvent.peak)}
                          </p>
                        </div>

                        <div>
                          <Compass className="mb-3 h-4 w-4 text-violet-300" />
                          <p className="text-xs text-white/35">
                            Altitude
                          </p>
                          <p className="mt-1 text-lg font-medium">
                            {nextEvent.altitude != null
                              ? `${nextEvent.altitude.toFixed(2)}°`
                              : "—"}
                          </p>
                        </div>
                      </div>

                      <p className="mt-6 text-xs leading-6 text-white/30">
                        Visibility and observing conditions depend on your
                        location and local sky conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            {/* Event list */}
            <section id="events" className="scroll-mt-28">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
                    Mark your calendar
                  </p>
                  <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                    Upcoming events
                  </h2>
                </div>

                <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50">
                  {events.length}{" "}
                  {events.length === 1 ? "event" : "events"}
                </span>
              </div>

              <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {events.map((event, index) => (
                  <article
                    key={event.id}
                    className="group grid gap-5 py-6 transition-colors hover:bg-white/1.5 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-7"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/2.5 transition group-hover:border-[#e7c98b]/25">
                      <EventIcon body={event.body} />
                    </div>

                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#e7c98b]">
                          {formatDate(event.date)}
                        </span>

                        {index === 0 && (
                          <span className="rounded-full border border-[#e7c98b]/20 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#e7c98b]">
                            Next event
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-medium text-white/90 transition group-hover:text-white sm:text-xl">
                        {eventNames[event.type]}
                      </h3>

                      <p className="mt-2 text-xs text-white/35">
                        {event.body} event
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-7 gap-y-3 sm:justify-end">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30">
                          Peak
                        </p>
                        <p className="mt-1 text-sm text-white/70">
                          {formatTime(event.peak)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/30">
                          Altitude
                        </p>
                        <p className="mt-1 text-sm text-white/70">
                          {event.altitude != null
                            ? `${event.altitude.toFixed(2)}°`
                            : "—"}
                        </p>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Meteor showers */}
            <section className="mt-20">
              <div className="mb-7">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#e7c98b]">
                  Beyond the eclipses
                </p>
                <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                  More wonders in the sky
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/45">
                  Keep exploring the recurring celestial displays that make
                  every season different.
                </p>
              </div>

              <MeteorShowers />
            </section>
          </>
        )}

        <footer className="mt-20 border-t border-white/[0.07] pt-6">
          <p className="text-xs leading-6 text-white/30">
            Celestial event predictions are location-dependent. Always
            check local observing conditions and never look directly at the
            Sun without certified solar viewing protection.
          </p>
        </footer>
      </div>
    </main>
  );
}
