"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import * as Astronomy from "astronomy-engine";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,

  LocateFixed,
  MapPin,
  Moon,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  Sun,
  Telescope,
} from "lucide-react";

import {
  constellations,
  type Constellation,
} from "@/lib/astronomy/constellations";
import Link from "next/link";

type ObserverLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

type ProjectedStar = {
  ra: number;
  dec: number;
  id: string;
  name: string;
  magnitude: number;
  altitude: number;
  azimuth: number;
  x: number;
  y: number;
};

type SkyConstellation = {
  data: Constellation;
  stars: ProjectedStar[];
  visibleStars: number;
  visible: boolean;
};

const MAP_SIZE = 640;
const CENTER = MAP_SIZE / 2;
const RADIUS = 265;

function getLocalDateTimeValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function getStarPosition(
  ra: number,
  dec: number,
  date: Date,
  observer: Astronomy.Observer,
) {
  const equatorialVector = Astronomy.VectorFromSphere(
    {
      lat: dec,
      lon: ra * 15,
      dist: 1,
    },
    date,
  );

  const rotation = Astronomy.Rotation_EQJ_HOR(date, observer);

  const horizontalVector = Astronomy.RotateVector(rotation, equatorialVector);

  const horizontal = Astronomy.HorizonFromVector(horizontalVector, "normal");

  return {
    altitude: horizontal.lat,
    azimuth: horizontal.lon,
  };
}

function projectToMap(altitude: number, azimuth: number) {
  const distance = (90 - altitude) / 90;
  const radius = distance * RADIUS;

  const angle = (azimuth * Math.PI) / 180;

  return {
    x: CENTER + Math.sin(angle) * radius,
    y: CENTER - Math.cos(angle) * radius,
  };
}

function getSkyData(
  location: ObserverLocation,
  date: Date,
): {
  constellations: SkyConstellation[];
  sunAltitude: number;
} {
  const observer = new Astronomy.Observer(
    location.latitude,
    location.longitude,
    0,
  );

  const rotation = Astronomy.Rotation_EQJ_HOR(date, observer);

  const sunVector = Astronomy.GeoVector(Astronomy.Body.Sun, date, true);

  const horizontalSun = Astronomy.RotateVector(rotation, sunVector);

  const sunPosition = Astronomy.HorizonFromVector(horizontalSun, "normal");

  const results = constellations.map((constellation) => {
    const stars = constellation.stars.map((star) => {
      const position = getStarPosition(star.ra, star.dec, date, observer);

      const projected = projectToMap(position.altitude, position.azimuth);

      return {
        ra: star.ra,
        dec: star.dec,
        id: star.id,
        name: star.name,
        magnitude: star.magnitude,
        altitude: position.altitude,
        azimuth: position.azimuth,
        ...projected,
      };
    });

    const visibleStars = stars.filter((star) => star.altitude > 10).length;

    return {
      data: constellation,
      stars,
      visibleStars,
      visible: visibleStars >= 2,
    };
  });

  return {
    constellations: results,
    sunAltitude: sunPosition.lat,
  };
}

function formatCoordinate(value: number, positive: string, negative: string) {
  const direction = value >= 0 ? positive : negative;

  return `${Math.abs(value).toFixed(2)}° ${direction}`;
}

export default function ConstellationsExplorer() {
  const [location, setLocation] = useState<ObserverLocation | null>(null);

  const [locationStatus, setLocationStatus] = useState<
    "loading" | "ready" | "denied" | "unsupported" | "error"
  >("loading");

  const [observationTime, setObservationTime] = useState(() => new Date());

  const [isLive, setIsLive] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });

        setLocationStatus("ready");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus("denied");
        } else {
          setLocationStatus("error");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    if (!isLive) return;

    const interval = window.setInterval(() => {
      setObservationTime(new Date());
    }, 60000);

    return () => window.clearInterval(interval);
  }, [isLive]);

  const sky = useMemo(() => {
    if (!location) return null;

    try {
      return getSkyData(location, observationTime);
    } catch (error) {
      console.error("Sky calculation failed:", error);
      return null;
    }
  }, [location, observationTime]);

  const visibleConstellations = useMemo(() => {
    if (!sky) return [];

    return sky.constellations
      .filter((item) => item.visible)
      .sort((a, b) => b.visibleStars - a.visibleStars);
  }, [sky]);

  const selectedConstellation = useMemo(() => {
    if (!sky || !selectedId) return null;

    return (
      sky.constellations.find((item) => item.data.id === selectedId) ?? null
    );
  }, [sky, selectedId]);

  const filteredConstellations = useMemo(() => {
    const source = showAll
      ? (sky?.constellations ?? [])
      : visibleConstellations;

    return source.filter((item) =>
      `${item.data.name} ${item.data.title} ${item.data.region}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [sky, showAll, visibleConstellations, search]);

  const isNight = sky ? sky.sunAltitude <= -6 : false;
  const isAstronomicalNight = sky ? sky.sunAltitude <= -18 : false;
  const isTwilight = sky
    ? sky.sunAltitude > -18 && sky.sunAltitude <= -6
    : false;

  const skyCondition = !sky
    ? "Calculating..."
    : isAstronomicalNight
      ? "Astronomical Night"
      : isTwilight
        ? "Twilight"
        : "Daylight";

  const handleTimeChange = (value: string) => {
    if (!value) return;

    setObservationTime(new Date(value));
    setIsLive(false);
  };

  const resetTime = () => {
    setObservationTime(new Date());
    setIsLive(true);
  };

  const selectConstellation = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  const getAltitudeLabel = (altitude: number) => {
    if (altitude < 0) return "Below horizon";
    if (altitude < 10) return "Near horizon";
    if (altitude < 35) return "Low in the sky";
    if (altitude < 65) return "Well above horizon";
    return "High in the sky";
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-white">
      {/* Hero */}

      <section className="relative flex min-h-[490px] items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: "url('/images/discoveries/constellations.jpeg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#070a12] via-[#070a12]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#e7c98b]">
            <Sparkles size={15} />
            Celestial Exploration
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-light leading-tight md:text-7xl">
            The Stories
            <br />
            Written in the{" "}
            <span className="font-normal italic text-[#e7c98b]">Stars</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-8 text-white/60 md:text-base">
            Explore the constellations, discover their brightest stars, and see
            what is above your horizon right now.
          </p>

          <a
            href="#tonights-sky"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#e7c98b] px-7 py-4 text-sm font-medium text-[#070a12] transition hover:bg-[#f3dba9]"
          >
            Explore Tonight&apos;s Sky
            <ArrowDown size={17} />
          </a>
        </div>
      </section>

      {/* Current sky */}

      <section
        id="tonights-sky"
        className="mx-auto max-w-7xl px-5 py-20 md:px-8"
      >
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e7c98b]">
              <Compass size={16} />
              Your Local Sky
            </div>

            <h2 className="mt-4 text-3xl font-light md:text-5xl">
              Tonight&apos;s Sky
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
              A real-time view of the stars and constellations above your
              location.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white/65">
              <MapPin size={15} className="text-[#e7c98b]" />

              {locationStatus === "loading" && "Finding your location..."}
              {locationStatus === "ready" && "Location detected"}
              {locationStatus === "denied" && "Location permission denied"}
              {locationStatus === "unsupported" && "Location unavailable"}
              {locationStatus === "error" && "Unable to detect location"}
            </div>

            <button
              onClick={requestLocation}
              disabled={locationStatus === "loading"}
              aria-label="Refresh location"
              className="rounded-full border border-white/10 p-3 text-white/60 transition hover:border-[#e7c98b]/50 hover:text-[#e7c98b] disabled:opacity-40"
            >
              <LocateFixed size={18} />
            </button>
          </div>
        </div>

        {/* Location states */}

        {locationStatus !== "ready" && (
          <div className="rounded-3xl border border-white/10 bg-[#0d111c] px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#e7c98b]/20 bg-[#e7c98b]/5">
              <LocateFixed size={27} className="text-[#e7c98b]" />
            </div>

            <h3 className="mt-6 text-xl font-light">
              {locationStatus === "loading"
                ? "Finding Your Sky"
                : "Location Access Required"}
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/45">
              {locationStatus === "loading"
                ? "Allow location access to calculate the constellations visible from your position."
                : locationStatus === "denied"
                  ? "Location access was denied. Allow it in your browser settings, then try again."
                  : locationStatus === "unsupported"
                    ? "Your browser does not support location services."
                    : "We couldn't determine your location. Please try again."}
            </p>

            {locationStatus !== "loading" && (
              <button
                onClick={requestLocation}
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#e7c98b] px-6 py-3 text-sm font-medium text-[#070a12] transition hover:bg-[#f3dba9]"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            )}
          </div>
        )}

        {location && sky && (
          <div className="grid gap-7 lg:grid-cols-[1.4fr_0.8fr]">
            {/* Sky map */}

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5">
                <div>
                  <h3 className="text-lg font-light">Interactive Sky Map</h3>
                  <p className="mt-1 text-xs text-white/40">
                    Altitude and azimuth projection
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className={`rounded-full border px-3 py-2 text-xs transition ${
                      showLabels
                        ? "border-[#e7c98b]/40 text-[#e7c98b]"
                        : "border-white/10 text-white/45"
                    }`}
                  >
                    Labels
                  </button>

                  <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs text-white/55">
                    <span
                      className={`h-2 w-2 rounded-full ${isNight ? "bg-emerald-400" : "bg-amber-400"}`}
                    />
                    {isNight ? "Night sky" : "Daylight / Twilight"}
                  </span>
                </div>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-[680px] p-2 sm:p-5">
                <svg
                  viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
                  className="h-full w-full overflow-visible"
                  role="img"
                  aria-label="Interactive local sky map showing stars above the horizon"
                >
                  <defs>
                    <radialGradient id="sky-gradient">
                      <stop offset="0%" stopColor="#17243c" />
                      <stop offset="75%" stopColor="#0d1628" />
                      <stop offset="100%" stopColor="#080d19" />
                    </radialGradient>

                    <filter id="star-glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <clipPath id="sky-clip">
                      <circle cx={CENTER} cy={CENTER} r={RADIUS} />
                    </clipPath>
                  </defs>

                  {/* Sky background */}

                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="url(#sky-gradient)"
                    stroke="#e7c98b"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                  />

                  {/* Altitude rings */}

                  {[0.25, 0.5, 0.75].map((factor) => (
                    <circle
                      key={factor}
                      cx={CENTER}
                      cy={CENTER}
                      r={RADIUS * factor}
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.1"
                      strokeDasharray="3 7"
                    />
                  ))}

                  {/* Cardinal directions */}

                  {[
                    { label: "N", x: CENTER, y: 28 },
                    { label: "E", x: MAP_SIZE - 25, y: CENTER + 5 },
                    { label: "S", x: CENTER, y: MAP_SIZE - 12 },
                    { label: "W", x: 25, y: CENTER + 5 },
                  ].map((direction) => (
                    <text
                      key={direction.label}
                      x={direction.x}
                      y={direction.y}
                      fill="#e7c98b"
                      fontSize="13"
                      fontWeight="500"
                      textAnchor="middle"
                      opacity="0.8"
                    >
                      {direction.label}
                    </text>
                  ))}

                  <g clipPath="url(#sky-clip)">
                    {/* Constellation lines */}

                    {sky.constellations.map((item) => {
                      const active = selectedId === item.data.id;

                      return (
                        <g
                          key={item.data.id}
                          role="button"
                          tabIndex={0}
                          aria-label={`Select ${item.data.name}`}
                          onClick={() => selectConstellation(item.data.id)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              selectConstellation(item.data.id);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          {item.data.lines.map(([from, to], index) => {
                            const first = item.stars[from];
                            const second = item.stars[to];

                            if (first.altitude <= 0 || second.altitude <= 0)
                              return null;

                            return (
                              <line
                                key={index}
                                x1={first.x}
                                y1={first.y}
                                x2={second.x}
                                y2={second.y}
                                stroke={active ? "#e7c98b" : "#a78bfa"}
                                strokeWidth={active ? 2.3 : 1.1}
                                strokeOpacity={active ? 1 : 0.35}
                                strokeLinecap="round"
                              />
                            );
                          })}
                        </g>
                      );
                    })}

                    {/* Stars */}

                    {sky.constellations.flatMap((item) =>
                      item.stars
                        .filter((star) => star.altitude > 0)
                        .map((star) => {
                          const active = selectedId === item.data.id;

                          const radius = Math.max(
                            1.6,
                            4.3 - star.magnitude * 0.65,
                          );

                          return (
                            <g key={`${item.data.id}-${star.id}`}>
                              <circle
                                cx={star.x}
                                cy={star.y}
                                r={radius + (active ? 2 : 0)}
                                fill={active ? "#e7c98b" : "#ffffff"}
                                opacity={active ? 1 : 0.8}
                                filter="url(#star-glow)"
                              />

                              {showLabels && star.magnitude < 2.1 && (
                                <text
                                  x={star.x + 8}
                                  y={star.y - 8}
                                  fontSize="9"
                                  fill="#ffffff"
                                  opacity={active ? 1 : 0.65}
                                >
                                  {star.name}
                                </text>
                              )}
                            </g>
                          );
                        }),
                    )}

                    {/* Selected constellation label */}

                    {selectedConstellation && (
                      <text
                        x={CENTER}
                        y={CENTER + RADIUS * 0.83}
                        textAnchor="middle"
                        fill="#e7c98b"
                        fontSize="14"
                      >
                        {selectedConstellation.data.name}
                      </text>
                    )}
                  </g>

                  {/* Zenith */}

                  <circle cx={CENTER} cy={CENTER} r="3" fill="#e7c98b" />

                  <text
                    x={CENTER + 9}
                    y={CENTER - 9}
                    fill="#ffffff"
                    fontSize="9"
                    opacity="0.5"
                  >
                    Zenith
                  </text>
                </svg>

                {!isNight && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-amber-300/20 bg-[#070a12]/90 px-4 py-2 text-center text-[10px] text-amber-200/80 backdrop-blur">
                    Stars are geometrically above the horizon, but sunlight may
                    hide them.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 border-t border-white/10 text-center">
                <div className="p-4">
                  <span className="block text-xs text-white/35">Latitude</span>
                  <span className="mt-2 block text-sm text-white/80">
                    {location.latitude.toFixed(2)}°
                  </span>
                </div>

                <div className="border-x border-white/10 p-4">
                  <span className="block text-xs text-white/35">Longitude</span>
                  <span className="mt-2 block text-sm text-white/80">
                    {location.longitude.toFixed(2)}°
                  </span>
                </div>

                <div className="p-4">
                  <span className="block text-xs text-white/35">
                    Stars above horizon
                  </span>
                  <span className="mt-2 block text-sm text-[#e7c98b]">
                    {sky.constellations.reduce(
                      (total, item) =>
                        total +
                        item.stars.filter((star) => star.altitude > 0).length,
                      0,
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Current sky information */}

            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-white/10 bg-[#0d111c] p-6">
                <div className="flex items-center gap-3">
                  <Telescope size={20} className="text-[#e7c98b]" />
                  <h3 className="text-lg font-light">Observation Details</h3>
                </div>

                <div className="mt-7 space-y-6">
                  <div>
                    <span className="text-xs text-white/35">
                      Observation location
                    </span>
                    <p className="mt-2 text-sm">Your current position</p>
                    <p className="mt-1 text-xs text-white/40">
                      {formatCoordinate(location.latitude, "N", "S")}
                      {" · "}
                      {formatCoordinate(location.longitude, "E", "W")}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-white/35">
                      Local observation time
                    </span>

                    <input
                      type="datetime-local"
                      value={getLocalDateTimeValue(observationTime)}
                      onChange={(event) => handleTimeChange(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#070a12] px-3 py-3 text-sm text-white outline-none [color-scheme:dark] focus:border-[#e7c98b]/50"
                    />

                    <button
                      onClick={resetTime}
                      className="mt-3 flex items-center gap-2 text-xs text-[#e7c98b] hover:text-white"
                    >
                      <RefreshCw size={13} />
                      Return to current time
                    </button>
                  </div>

                  <div>
                    <span className="text-xs text-white/35">
                      Solar conditions
                    </span>

                    <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.035] p-4">
                      {isNight ? (
                        <Moon className="text-[#e7c98b]" size={22} />
                      ) : (
                        <Sun className="text-amber-300" size={22} />
                      )}

                      <div>
                        <p className="text-sm">
                          {isNight
                            ? "Astronomical night"
                            : "Daylight or twilight"}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          Sun altitude: {sky.sunAltitude.toFixed(1)}°
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-3xl border border-white/10 bg-[#0d111c] p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-light">Above Your Horizon</h3>

                  <span className="rounded-full bg-[#e7c98b]/10 px-3 py-1 text-xs text-[#e7c98b]">
                    {visibleConstellations.length} found
                  </span>
                </div>

                <p className="mt-3 text-xs leading-6 text-white/40">
                  Constellations with at least two reference stars more than 10°
                  above your horizon.
                </p>

                <div className="mt-5 space-y-2">
                  {visibleConstellations.length === 0 && (
                    <p className="py-8 text-center text-sm text-white/40">
                      No featured constellations currently meet this visibility
                      threshold.
                    </p>
                  )}

                  {visibleConstellations.map((item) => (
                    <button
                      key={item.data.id}
                      onClick={() => selectConstellation(item.data.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                        selectedId === item.data.id
                          ? "border-[#e7c98b]/50 bg-[#e7c98b]/10"
                          : "border-white/5 bg-white/[0.025] hover:border-white/20"
                      }`}
                    >
                      <div>
                        <p className="text-sm">{item.data.name}</p>
                        <p className="mt-1 text-xs text-white/40">
                          {item.data.title}
                        </p>
                      </div>

                      <ArrowUpRight size={16} className="text-[#e7c98b]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Constellation directory */}

      {sky && (
        <section className="border-y border-white/5 bg-[#0d111c] px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[#e7c98b]">
                  Explore the Celestial Sphere
                </span>

                <h2 className="mt-4 text-3xl font-light md:text-5xl">
                  Featured Constellations
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">
                  Discover their brightest stars, celestial positions, and
                  traditional star patterns.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <label className="relative">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search constellations..."
                    className="w-full rounded-full border border-white/10 bg-[#070a12] py-3 pl-11 pr-5 text-sm outline-none focus:border-[#e7c98b]/50 sm:w-64"
                  />
                </label>

                <button
                  onClick={() => setShowAll(!showAll)}
                  className="rounded-full border border-[#e7c98b]/30 px-5 py-3 text-xs text-[#e7c98b] transition hover:bg-[#e7c98b] hover:text-[#070a12]"
                >
                  {showAll ? "Visible Only" : "Explore All"}
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredConstellations.map((item) => {
                const selected = selectedId === item.data.id;

                const brightest = item.stars.find(
                  (star) => star.name === item.data.brightestStar,
                );

                return (
                  <article
                    key={item.data.id}
                    className={`overflow-hidden rounded-2xl border bg-[#080d17] transition duration-300 ${
                      selected
                        ? "border-[#e7c98b]/50"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <button
                      onClick={() => selectConstellation(item.data.id)}
                      className="block w-full text-left"
                    >
                      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[#182238] via-[#10182a] to-[#080d17]">
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage:
                              "radial-gradient(white 0.7px, transparent 0.7px)",
                            backgroundSize: "22px 22px",
                          }}
                        />

                        <svg
                          viewBox="0 0 220 150"
                          className="relative h-full w-full p-5"
                        >
                          {item.data.lines.map(([from, to], index) => {
                            const first = item.stars[from];
                            const second = item.stars[to];

                            return (
                              <line
                                key={index}
                                x1={30 + (first.ra / 24) * 160}
                                y1={75 - (first.dec / 90) * 60}
                                x2={30 + (second.ra / 24) * 160}
                                y2={75 - (second.dec / 90) * 60}
                                stroke="#e7c98b"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                              />
                            );
                          })}

                          {item.stars.map((star) => (
                            <circle
                              key={star.id}
                              cx={30 + (star.ra / 24) * 160}
                              cy={75 - (star.dec / 90) * 60}
                              r={Math.max(2, 4 - star.magnitude * 0.4)}
                              fill="#ffffff"
                            />
                          ))}
                        </svg>

                        <span className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.2em] text-white/45">
                          {item.data.region}
                        </span>

                        <span
                          className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] ${
                            item.visible
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-white/5 text-white/35"
                          }`}
                        >
                          {item.visible ? "Above horizon" : "Below / low"}
                        </span>
                      </div>

                      <div className="p-6">
                        <span className="text-xs text-[#e7c98b]">
                          {item.data.title}
                        </span>

                        <h3 className="mt-2 text-2xl font-light">
                          {item.data.name}
                        </h3>

                        <p className="mt-3 min-h-[72px] text-sm leading-7 text-white/45">
                          {item.data.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                          <span className="text-xs text-white/35">
                            Brightest star
                          </span>

                          <span className="text-sm text-[#e7c98b]">
                            {item.data.brightestStar}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs text-white/35">
                          <span>
                            {item.visibleStars} reference stars above 10°
                          </span>

                          <ArrowRight size={16} className="text-[#e7c98b]" />
                        </div>

                        {selected && brightest && (
                          <div className="mt-5 rounded-xl border border-[#e7c98b]/20 bg-[#e7c98b]/5 p-4">
                            <p className="text-xs text-[#e7c98b]">
                              Selected Star
                            </p>

                            <p className="mt-2 text-sm">{brightest.name}</p>

                            <p className="mt-2 text-xs text-white/45">
                              Altitude: {brightest.altitude.toFixed(1)}°{" · "}
                              Azimuth: {brightest.azimuth.toFixed(1)}°
                            </p>

                            <p className="mt-2 text-xs text-white/45">
                              {getAltitudeLabel(brightest.altitude)}
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  </article>
                );
              })}

              {filteredConstellations.length === 0 && (
                <div className="col-span-full py-16 text-center text-sm text-white/40">
                  No constellations found.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Scientific note */}

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="rounded-3xl border border-[#e7c98b]/15 bg-gradient-to-r from-[#131a2b] to-[#0a0f1b] p-8 md:p-12">
          <div className="flex items-start gap-4">
            <Star className="mt-1 shrink-0 text-[#e7c98b]" size={24} />

            <div>
              <h2 className="text-2xl font-light">
                Understanding the Night Sky
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-8 text-white/50">
                A constellation is an officially defined region of the celestial
                sphere. The stars that form familiar patterns may appear close
                together from Earth, even though they can be separated by
                enormous distances in space.
              </p>
            <Link
            href="https://www.iau.org/IAU/Astronomy-FAQs/Constellations.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#e7c98b] hover:text-white transition-colors"
            >
            International Astronomical Union
            <ArrowUpRight size={16} />
            </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
