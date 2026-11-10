
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import OrbitGlobe, { type GlobeObject } from "./OrbitGlobe";

type Group =
  | "STATIONS"
  | "STARLINK"
  | "SCIENCE"
  | "WEATHER"
  | "GPS-OPS";

type OrbitalObject = GlobeObject & {
  objectId: string | null;
  velocityKmh: number | null;
  epoch: string | null;
  positionCalculatedAt: string;
};

type IssTelemetry = {
  name: string;
  noradId: number;
  latitude: number;
  longitude: number;
  altitudeKm: number;
  velocityKmh: number;
  visibility: string | null;
  timestamp: number;
  source: string;
};

type CatalogResponse = {
  objects: OrbitalObject[];
  count: number;
  catalogCount: number;
  calculatedAt: string;
  source: string;
  groupLabel: string;
};

const GROUPS: { id: Group; label: string }[] = [
  { id: "STATIONS", label: "Space stations" },
  { id: "STARLINK", label: "Starlink" },
  { id: "SCIENCE", label: "Science satellites" },
  { id: "WEATHER", label: "Weather satellites" },
  { id: "GPS-OPS", label: "GPS satellites" },
];

type ClassificationColor = "gold" | "pink" | "violet" | "muted";

type ObjectClassification = {
  label: string;
  color: ClassificationColor;
};

function classifyObject(
  object: Pick<OrbitalObject, "name" | "group">,
): ObjectClassification {
  const name = object.name.toUpperCase();

  // Check spacecraft names before the group so a visiting
  // vehicle is not automatically labelled as a space station.
  if (
    /\bCREW DRAGON\b|\bCARGO DRAGON\b|\bDRAGON\b|\bSOYUZ\b|\bPROGRESS\b|\bCYGNUS\b|\bSTARLINER\b|\bSHENZHOU\b|\bTIANZHOU\b|\bHTV\b|\bKOUNOTORI\b|\bORION\b|\bSPACE SHUTTLE\b/.test(
      name,
    )
  ) {
    return { label: "Spacecraft", color: "gold" };
  }

  if (
    object.group === "STATIONS" ||
    /\bISS\b|TIANGONG|SPACE STATION/.test(name)
  ) {
    return { label: "Space station", color: "pink" };
  }

  if (
    /\bDEBRIS\b|\bR\/B\b|\bROCKET BODY\b|\bDEB\b/.test(name)
  ) {
    return { label: "Orbital debris", color: "muted" };
  }

  if (
    object.group === "STARLINK" ||
    object.group === "SCIENCE" ||
    object.group === "WEATHER" ||
    object.group === "GPS-OPS"
  ) {
    return { label: "Satellite", color: "violet" };
  }

  return { label: "Other object", color: "muted" };
}

function formatNumber(
  value: number | null | undefined,
  digits = 1,
): string {
  if (value == null || !Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString(undefined, {
    maximumFractionDigits: digits,
  });
}

function formatTime(
  timestamp?: number | string | null,
): string {
  if (timestamp == null) return "—";

  const date =
    typeof timestamp === "number"
      ? new Date(timestamp * 1000)
      : new Date(timestamp);

  if (!Number.isFinite(date.getTime())) return "—";

  return (
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }) + " UTC"
  );
}

function Metric({
  label,
  value,
  unit,
  detail,
}: {
  label: string;
  value: string;
  unit?: string;
  detail?: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <p className="text-[10px] uppercase tracking-[0.17em] text-white/40">
        {label}
      </p>

      <p className="mt-3 flex flex-wrap items-baseline gap-1.5">
        <span className="break-all text-2xl font-medium tracking-tight text-[#f2e8d5]">
          {value}
        </span>

        {unit && (
          <span className="text-xs text-white/40">{unit}</span>
        )}
      </p>

      {detail && (
        <p className="mt-2 text-[10px] leading-4 text-white/35">
          {detail}
        </p>
      )}
    </div>
  );
}

function Status({
  children,
  color = "gold",
}: {
  children: ReactNode;
  color?: ClassificationColor;
}) {
  const colors: Record<ClassificationColor, string> = {
    gold: "bg-[#e7c98b]/10 text-[#e7c98b]",
    pink: "bg-pink-400/10 text-pink-300",
    violet: "bg-violet-400/10 text-violet-300",
    muted: "bg-white/[0.06] text-white/45",
  };

  const dots: Record<ClassificationColor, string> = {
    gold: "bg-[#e7c98b]",
    pink: "bg-pink-300",
    violet: "bg-violet-300",
    muted: "bg-white/30",
  };

  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] ${colors[color]}`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${dots[color]}`}
      />
      {children}
    </span>
  );
}

export default function SpaceStationTracker() {
  const [group, setGroup] = useState<Group>("STATIONS");
  const [objects, setObjects] = useState<OrbitalObject[]>([]);
  const [catalogCount, setCatalogCount] = useState(0);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [catalogUpdated, setCatalogUpdated] = useState("");

  const [iss, setIss] = useState<IssTelemetry | null>(null);
  const [issError, setIssError] = useState("");
  const [issLoading, setIssLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Prevent older, slower requests from overwriting newer results.
  const catalogRequestId = useRef(0);
  const issRequestId = useRef(0);

  const loadCatalog = useCallback(async () => {
    const requestId = ++catalogRequestId.current;

    setCatalogLoading(true);
    setCatalogError("");

    try {
      const response = await fetch(
        `/api/space/objects?group=${encodeURIComponent(group)}`,
        { cache: "no-store" },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to load the orbital catalog.",
        );
      }

      const result = data as CatalogResponse;

      if (requestId !== catalogRequestId.current) return;

      setObjects(result.objects);
      setCatalogCount(result.catalogCount);
      setCatalogUpdated(result.calculatedAt);

      setSelectedId((current) => {
        if (
          current &&
          result.objects.some(
            (object) => object.noradId === current,
          )
        ) {
          return current;
        }

        return result.objects[0]?.noradId ?? null;
      });
    } catch (error) {
      if (requestId !== catalogRequestId.current) return;

      setCatalogError(
        error instanceof Error
          ? error.message
          : "Unable to load orbital data.",
      );
    } finally {
      if (requestId === catalogRequestId.current) {
        setCatalogLoading(false);
      }
    }
  }, [group]);

  const loadIss = useCallback(async () => {
    const requestId = ++issRequestId.current;

    try {
      const response = await fetch("/api/space/iss", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "ISS telemetry is unavailable.",
        );
      }

      if (requestId !== issRequestId.current) return;

      setIss(data as IssTelemetry);
      setIssError("");
    } catch (error) {
      if (requestId !== issRequestId.current) return;

      setIssError(
        error instanceof Error
          ? error.message
          : "Unable to load ISS telemetry.",
      );
    } finally {
      if (requestId === issRequestId.current) {
        setIssLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadCatalog();

    const timer = window.setInterval(() => {
      void loadCatalog();
    }, 60_000);

    return () => {
      window.clearInterval(timer);
      catalogRequestId.current += 1;
    };
  }, [loadCatalog]);

  useEffect(() => {
    void loadIss();

    const timer = window.setInterval(() => {
      void loadIss();
    }, 5_000);

    return () => {
      window.clearInterval(timer);
      issRequestId.current += 1;
    };
  }, [loadIss]);

  const filteredObjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return objects;

    return objects.filter(
      (object) =>
        object.name.toLowerCase().includes(normalized) ||
        object.noradId.includes(normalized) ||
        (object.objectId ?? "")
          .toLowerCase()
          .includes(normalized),
    );
  }, [objects, query]);

  // Use globeObjects for the details panel too. This means the ISS
  // details reflect direct telemetry instead of stale catalog data.
  const globeObjects = useMemo<OrbitalObject[]>(() => {
    const mapped: OrbitalObject[] = objects.map((object) => ({
      ...object,
      group,
    }));

    if (iss) {
      const issObject: OrbitalObject = {
        name: "International Space Station",
        noradId: "25544",
        objectId: null,
        group: "STATIONS",
        latitude: iss.latitude,
        longitude: iss.longitude,
        altitudeKm: iss.altitudeKm,
        velocityKmh: iss.velocityKmh,
        epoch: null,
        positionCalculatedAt: new Date(
          iss.timestamp * 1000,
        ).toISOString(),
      };

      const index = mapped.findIndex(
        (object) => object.noradId === "25544",
      );

      if (index >= 0) {
        mapped[index] = issObject;
      } else {
        mapped.unshift(issObject);
      }
    }

    return mapped;
  }, [objects, group, iss]);

  const selectedObject = useMemo(
    () =>
      globeObjects.find(
        (object) => object.noradId === selectedId,
      ),
    [globeObjects, selectedId],
  );

  const globeSelection = useCallback(
    (object: GlobeObject) => {
      setSelectedId(object.noradId);
    },
    [],
  );

  function handleGroupChange(nextGroup: Group) {
    if (nextGroup === group) return;

    setGroup(nextGroup);
    setObjects([]);
    setCatalogCount(0);
    setCatalogUpdated("");
    setSelectedId(null);
    setQuery("");
    setCatalogError("");
  }

  return (
    <main className="min-h-screen bg-[#070a12] px-4 pb-16 pt-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
       
      <header className="relative mb-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111321] via-[#0b0f19] to-[#070a12] px-5 py-7 sm:px-8 sm:py-9">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full bg-violet-500/[0.09] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/3 size-64 rounded-full bg-[#e7c98b]/[0.05] blur-3xl"
        />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Heading */}
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-[#e7c98b]/70" />

              <p className="text-[10px] uppercase tracking-[0.28em] text-[#e7c98b]/75 sm:text-xs">
                Āfāq <span className="mx-1.5 text-white/20">/</span>
                Discover <span className="mx-1.5 text-white/20">/</span>
                Space
              </p>
            </div>

            <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
              Space{" "}
              <span className="bg-gradient-to-r from-[#e7c98b] to-[#f5e4b8] bg-clip-text text-transparent">
                Tracker
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
              Follow the movement of orbital objects around Earth.
              Explore their positions and monitor the International
              Space Station in real time.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/35">
              <span className="size-1.5 rounded-full bg-violet-300/80" />
              Orbital intelligence
              <span className="text-white/15">·</span>
              Earth observation
            </div>
          </div>

          {/* Live status */}
          <div className="grid grid-cols-2 gap-3 lg:min-w-[310px]">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${
                    iss && !issError
                      ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]"
                      : "bg-white/25"
                  }`}
                />

                <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                  ISS telemetry
                </p>
              </div>

              <p className="mt-4 text-sm font-medium text-white/85">
                {iss && !issError ? "Connected" : "Unavailable"}
              </p>

              <p className="mt-1 text-[11px] text-white/35">
                {iss && !issError
                  ? "Live position feed"
                  : "Position feed offline"}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${
                    catalogLoading
                      ? "animate-pulse bg-[#e7c98b]"
                      : objects.length > 0
                        ? "bg-pink-400"
                        : "bg-white/25"
                  }`}
                />

                <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Orbital catalog
                </p>
              </div>

              <p className="mt-4 text-sm font-medium text-white/85">
                {catalogLoading && objects.length === 0
                  ? "Loading…"
                  : objects.length > 0
                    ? objects.length.toLocaleString()
                    : "No data"}
              </p>

              <p className="mt-1 text-[11px] text-white/35">
                {catalogLoading && objects.length === 0
                  ? "Fetching orbital data"
                  : objects.length > 0
                    ? "Objects available"
                    : "Catalog unavailable"}
              </p>
            </div>
          </div>
        </div>
      </header>


        <section className="mb-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/65">
                Live telemetry
              </p>
              <p className="mt-1 text-xs text-white/35">
                International Space Station · NORAD 25544
              </p>
            </div>

            <p className="text-[10px] text-white/35">
              Source timestamp: {formatTime(iss?.timestamp)}
            </p>
          </div>

          {issError && (
            <div className="mb-3 rounded-xl border border-pink-300/20 bg-pink-300/5 p-3 text-xs text-pink-200">
              {issError}
              {iss && " Showing the last successful reading."}
            </div>
          )}

          {issLoading && !iss ? (
            <div className="rounded-2xl border border-white/[0.08] p-6 text-sm text-white/45">
              Loading real ISS telemetry…
            </div>
          ) : iss ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric
                label="Altitude"
                value={formatNumber(iss.altitudeKm)}
                unit="km"
                detail="Reported by the ISS position source"
              />
              <Metric
                label="Velocity"
                value={formatNumber(iss.velocityKmh, 0)}
                unit="km/h"
                detail="Reported orbital velocity"
              />
              <Metric
                label="Latitude"
                value={formatNumber(iss.latitude, 3)}
                unit="°"
                detail="Current reported position"
              />
              <Metric
                label="Longitude"
                value={formatNumber(iss.longitude, 3)}
                unit="°"
                detail="Current reported position"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 p-5 text-sm text-white/45">
              ISS telemetry could not be loaded. No placeholder
              measurements are displayed.
            </div>
          )}
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
          <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#0c111c] p-3 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <div>
                <p className="text-sm text-white/85">
                  Earth orbital view
                </p>
                <p className="mt-1 text-[10px] text-white/35">
                  Calculated positions · Not to scale
                </p>
              </div>

              <Status color="muted">
                {globeObjects.length} plotted objects
              </Status>
            </div>

            {catalogError && objects.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-start justify-center gap-3 p-5">
                <p className="text-sm text-pink-200">
                  Orbital catalog unavailable
                </p>
                <p className="text-xs text-white/40">
                  {catalogError}
                </p>
                <button
                  type="button"
                  onClick={() => void loadCatalog()}
                  className="rounded-lg border border-white/15 px-4 py-2 text-xs hover:border-[#e7c98b]/60"
                >
                  Retry
                </button>
              </div>
            ) : globeObjects.length > 0 ? (
              <OrbitGlobe
                objects={globeObjects}
                selectedId={selectedId}
                onSelect={globeSelection}
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center text-sm text-white/40">
                {catalogLoading
                  ? "Loading orbital elements…"
                  : "No orbital objects available."}
              </div>
            )}

            <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-white/[0.07] px-1 pt-4 text-[10px] text-white/35">
              <span>Orbital source: CelesTrak GP / OMM</span>
              <span>Calculated: {formatTime(catalogUpdated)}</span>
            </div>
          </div>

          <aside className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#0c111c] p-4 sm:p-5">
            <div>
              <p className="text-sm text-white/85">Object catalog</p>
              <p className="mt-1 text-[10px] leading-5 text-white/35">
                Search by object name, catalog number, or designator.
              </p>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-white/40">
                Catalog group
              </span>

              <select
                value={group}
                onChange={(event) =>
                  handleGroupChange(event.target.value as Group)
                }
                className="w-full rounded-xl border border-white/10 bg-[#080c14] px-3 py-3 text-xs text-white outline-none focus:border-[#e7c98b]/60"
              >
                {GROUPS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-3 block">
              <span className="sr-only">Search orbital objects</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search catalog…"
                className="w-full rounded-xl border border-white/10 bg-[#080c14] px-3 py-3 text-xs text-white outline-none placeholder:text-white/25 focus:border-[#e7c98b]/60"
              />
            </label>

            {catalogError && (
              <p className="mt-3 text-xs text-pink-200">
                Refresh failed: {catalogError}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between gap-3 text-[10px] text-white/35">
              <span>{filteredObjects.length} results</span>
              <button
                type="button"
                onClick={() => void loadCatalog()}
                disabled={catalogLoading}
                className="shrink-0 text-[#e7c98b] hover:text-white disabled:cursor-wait disabled:opacity-50"
              >
                {catalogLoading ? "Refreshing…" : "Refresh positions ↻"}
              </button>
            </div>

            <div className="mt-3 max-h-[310px] space-y-1 overflow-y-auto pr-1">
              {filteredObjects.map((object) => {
                const active = object.noradId === selectedId;
                const classification = classifyObject(object);

                return (
                  <button
                    type="button"
                    key={object.noradId}
                    onClick={() => setSelectedId(object.noradId)}
                    aria-pressed={active}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-[#e7c98b]/35 bg-[#e7c98b]/[0.07]"
                        : "border-transparent hover:border-white/10 hover:bg-white/[0.025]"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate text-xs text-white/85">
                          {object.name}
                        </span>

                        <span className="mt-1 block text-[10px] text-white/35">
                          NORAD {object.noradId}
                        </span>

                        <span className="mt-2 block">
                          <Status color={classification.color}>
                            {classification.label}
                          </Status>
                        </span>
                      </span>

                      <span className="shrink-0 text-[10px] text-[#e7c98b]/70">
                        {formatNumber(object.altitudeKm, 0)} km
                      </span>
                    </span>
                  </button>
                );
              })}

              {!catalogLoading && filteredObjects.length === 0 && (
                <p className="px-2 py-6 text-center text-xs text-white/35">
                  No matching objects in this group.
                </p>
              )}
            </div>

            {selectedObject && (
              <div className="mt-5 border-t border-white/[0.08] pt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#e7c98b]/70">
                  Selected object
                </p>

                <h2 className="mt-2 break-words text-lg font-light text-white/90">
                  {selectedObject.name}
                </h2>

                <p className="mt-1 text-[10px] text-white/35">
                  NORAD {selectedObject.noradId}
                </p>

                <div className="mt-3">
                  <Status
                    color={classifyObject(selectedObject).color}
                  >
                    {classifyObject(selectedObject).label}
                  </Status>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Metric
                    label="Latitude"
                    value={formatNumber(selectedObject.latitude, 3)}
                    unit="°"
                  />
                  <Metric
                    label="Longitude"
                    value={formatNumber(selectedObject.longitude, 3)}
                    unit="°"
                  />
                  <Metric
                    label="Altitude"
                    value={formatNumber(selectedObject.altitudeKm)}
                    unit="km"
                  />
                  <Metric
                    label="Speed"
                    value={formatNumber(selectedObject.velocityKmh, 0)}
                    unit="km/h"
                  />
                </div>

                <p className="mt-3 text-[10px] leading-5 text-white/35">
                  Position calculated:{" "}
                  {formatTime(selectedObject.positionCalculatedAt)}
                </p>

                <p className="mt-1 break-words text-[10px] leading-5 text-white/35">
                  Orbital elements epoch:{" "}
                  {selectedObject.epoch ?? "Not supplied"}
                </p>
              </div>
            )}

            {catalogCount > objects.length && (
              <p className="mt-4 text-[10px] leading-5 text-white/35">
                The source returned {catalogCount.toLocaleString()}{" "}
                records. This view processes a limited subset for
                performance; it is not the complete group.
              </p>
            )}
          </aside>
        </section>

        <footer className="mt-6 flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-[10px] leading-5 text-white/35 sm:flex-row sm:justify-between">
          <p>
            ISS telemetry and orbital-element calculations are
            different data products.
          </p>
          <p>Sources: Where the ISS at? · CelesTrak</p>
        </footer>
      </div>
    </main>
  );
}
