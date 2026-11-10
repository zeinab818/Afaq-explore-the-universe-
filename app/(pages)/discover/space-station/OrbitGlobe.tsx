
"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const Globe: any = dynamic(
  async () => {
    const module = await import("react-globe.gl");
    const GlobeComponent = module.default;

    // Preserve access to the imperative Globe API
    // through a custom prop instead of a ref on next/dynamic.
    return function GlobeWithRef(props: any) {
      const { globeRef, ...globeProps } = props;

      return (
        <GlobeComponent
          {...globeProps}
          ref={globeRef}
        />
      );
    };
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center text-sm text-white/50">
        Initializing orbital display…
      </div>
    ),
  },
);

export type GlobeObject = {
  name: string;
  noradId: string;
  latitude: number;
  longitude: number;
  altitudeKm: number;
  group: string;
};

type Props = {
  objects: GlobeObject[];
  selectedId: string | null;
  onSelect: (object: GlobeObject) => void;
};

type GlobePoint = GlobeObject & {
  lat: number;
  lng: number;
  alt: number;
};

export default function OrbitGlobe({
  objects,
  selectedId,
  onSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  const [size, setSize] = useState({
    width: 800,
    height: 440,
  });

  const [globeReady, setGlobeReady] = useState(false);

  // Responsive globe dimensions.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const width = Math.floor(container.clientWidth);

      if (width > 0) {
        setSize({
          width,
          height: Math.max(360, Math.min(520, width * 0.68)),
        });
      }
    };

    updateSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);

      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const points = useMemo<GlobePoint[]>(
    () =>
      objects
        .filter(
          (object) =>
            Number.isFinite(object.latitude) &&
            Number.isFinite(object.longitude) &&
            object.latitude >= -90 &&
            object.latitude <= 90 &&
            object.longitude >= -180 &&
            object.longitude <= 180,
        )
        .map((object) => ({
          ...object,
          lat: object.latitude,
          lng: object.longitude,
          // Marker height is visual, not the actual orbital altitude.
          alt: 0.012,
        })),
    [objects],
  );

  const selectedObject = useMemo(
    () => points.find((object) => object.noradId === selectedId),
    [points, selectedId],
  );

  // Display only one label to prevent duplicate station names.
  const labels = useMemo(
    () =>
      points.filter(
        (object) => object.noradId === selectedId,
      ),
    [points, selectedId],
  );

  const handleGlobeReady = useCallback(() => {
    setGlobeReady(true);
  }, []);

  // Focus the camera on the currently selected object.
  const focusSelectedObject = useCallback(() => {
    if (!globeReady || !globeRef.current || !selectedObject) {
      return;
    }

    const globe = globeRef.current;

    if (typeof globe.pointOfView !== "function") {
      console.warn(
        "Globe camera API is not available yet.",
      );
      return;
    }

    const controls = globe.controls?.();

    if (controls) {
      controls.autoRotate = false;
    }

    globe.pointOfView(
      {
        lat: selectedObject.lat,
        lng: selectedObject.lng,
        altitude: 0.45,
      },
      1500,
    );
  }, [globeReady, selectedObject]);

  useEffect(() => {
    focusSelectedObject();
  }, [focusSelectedObject]);

  const handlePointClick = useCallback(
    (point: GlobePoint) => {
      onSelect(point);
    },
    [onSelect],
  );

  return (
    <div
      ref={containerRef}
      className="relative min-w-0 overflow-hidden rounded-2xl"
      style={{
        background:
          "radial-gradient(ellipse at center, #101a30 0%, #070a12 70%)",
      }}
    >
      {/* Top information */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2 sm:left-4 sm:top-4">
        <span className="rounded-full border border-white/10 bg-[#070a12]/80 px-2.5 py-1.5 text-[10px] text-white/55 backdrop-blur">
          EARTH ORBIT
        </span>

        <span className="rounded-full border border-white/10 bg-[#070a12]/80 px-2.5 py-1.5 text-[10px] text-white/55 backdrop-blur">
          {points.length} plotted
        </span>
      </div>

      {!globeReady && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <span className="rounded-full border border-white/10 bg-[#070a12]/75 px-4 py-2 text-xs text-white/50 backdrop-blur">
            Preparing 3D globe…
          </span>
        </div>
      )}

      <Globe
        globeRef={globeRef}
        width={size.width}
        height={size.height}
        onGlobeReady={handleGlobeReady}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        atmosphereColor="#8d9fd8"
        atmosphereAltitude={0.16}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointAltitude="alt"
        pointRadius={(point: GlobePoint) =>
          point.noradId === selectedId ? 0.24 : 0.14
        }
        pointColor={(point: GlobePoint) =>
          point.noradId === selectedId
            ? "#e7c98b"
            : point.group === "STATIONS"
              ? "#fb7185"
              : point.group === "STARLINK"
                ? "#a78bfa"
                : "#c4b5fd"
        }
        pointResolution={8}
        onPointClick={handlePointClick}
        pointsMerge={false}
        labelsData={labels}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={0.42}
        labelDotRadius={0.2}
        labelColor={() => "#f1e7d2"}
        labelResolution={2}
        labelIncludeDot
      />

      {/* Bottom legend */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-3 sm:bottom-4 sm:left-4 sm:right-4">
        <div className="flex flex-wrap gap-x-3 gap-y-2 rounded-xl border border-white/[0.08] bg-[#070a12]/85 px-3 py-2.5 backdrop-blur">
          <span className="flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[#e7c98b]" />
            Selected
          </span>

          <span className="flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="h-2 w-2 rounded-full bg-pink-400" />
            Stations
          </span>

          <span className="flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            Satellites
          </span>
        </div>

        <span className="rounded-lg border border-white/[0.08] bg-[#070a12]/85 px-2.5 py-2 text-[10px] text-white/40 backdrop-blur">
          Select a marker to explore
        </span>
      </div>
    </div>
  );
}
