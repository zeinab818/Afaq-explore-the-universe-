"use client";

import { useCallback, useEffect, useState } from "react";
import type { SunApiResponse, SolarTimes } from "@/types/sunI";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import SunImages from "@/data/SunImages";
import SolarStatus from "@/components/ui/sun/SolarStatus";
import SunState from "@/components/ui/sun/SunState";
import SunStat from "@/components/ui/SunStat/SunStat";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface SunTimesResponse {
  status: string;
  error: string | null;
  data: SolarTimes;
}

const CAIRO: Coordinates = {
  latitude: 30.0444,
  longitude: 31.2357,
};

const DEFAULT_TIMEZONE = "Africa/Cairo";

export default function SunPage() {
  const [coordinates, setCoordinates] =
    useState<Coordinates | null>(null);

  const [locationError, setLocationError] =
    useState<string | null>(null);

  const [detectingLocation, setDetectingLocation] =
    useState(true);

  const [requestingLocation, setRequestingLocation] =
    useState(false);

  const [response, setResponse] =
    useState<SunApiResponse | null>(null);

  const [solarTimes, setSolarTimes] =
    useState<SolarTimes | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [retryKey, setRetryKey] = useState(0);

  // 1. Request the user's location only after they choose to.
  const handleRequestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser. You can continue with Cairo."
      );
      return;
    }

    setRequestingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationError(null);
        setDetectingLocation(false);
        setRequestingLocation(false);
      },
      (geoError) => {
        let message =
          "We couldn't detect your location. Please try again or continue with Cairo.";

        if (geoError.code === geoError.PERMISSION_DENIED) {
          message =
            "Location permission was denied. You can try again or continue with Cairo.";
        } else if (geoError.code === geoError.TIMEOUT) {
          message =
            "Location detection timed out. Please try again or continue with Cairo.";
        }

        setLocationError(message);
        setRequestingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  // 2. Use Cairo without requesting location permission.
  const handleUseDefaultLocation = useCallback(() => {
    setCoordinates(CAIRO);
    setLocationError(null);
    setDetectingLocation(false);
  }, []);

  // 3. Fetch the current solar position and solar event times.
 

    useEffect(() => {
      if (!coordinates) return;

      // Capture the non-null coordinates before entering the async function.
      const currentCoordinates = coordinates;

      const controller = new AbortController();

      async function fetchSunData() {
        setLoading(true);
        setError(null);
        setResponse(null);
        setSolarTimes(null);

        try {
          const latitude = String(currentCoordinates.latitude);
          const longitude = String(currentCoordinates.longitude);

          const query = new URLSearchParams({
            lat: latitude,
            lon: longitude,
          });

          const sunResponse = await fetch(
            `/api/sun?${query.toString()}`,
            {
              signal: controller.signal,
              cache: "no-store",
            }
          );

          const sunData: SunApiResponse =
            await sunResponse.json();

          if (
            !sunResponse.ok ||
            sunData.status !== "success"
          ) {
            throw new Error(
              sunData.error ||
                "Failed to retrieve solar data."
            );
          }

          if (!sunData.data?.sun || !sunData.data.date) {
            throw new Error(
              "The solar API returned invalid data."
            );
          }

          const timezone =
            sunData.data.timezone || DEFAULT_TIMEZONE;

          const timesQuery = new URLSearchParams({
            lat: latitude,
            lon: longitude,
            date: sunData.data.date,
            timezone,
          });

          const timesResponse = await fetch(
            `/api/sun-times?${timesQuery.toString()}`,
            {
              signal: controller.signal,
              cache: "no-store",
            }
          );

          const timesData: SunTimesResponse =
            await timesResponse.json();

          if (
            !timesResponse.ok ||
            timesData.status !== "success"
          ) {
            throw new Error(
              timesData.error ||
                "Failed to retrieve sunrise and sunset times."
            );
          }

          if (!timesData.data) {
            throw new Error(
              "Solar event times are unavailable."
            );
          }

          if (controller.signal.aborted) return;

          setResponse(sunData);
          setSolarTimes(timesData.data);
        } catch (err) {
          if (
            err instanceof Error &&
            err.name === "AbortError"
          ) {
            return;
          }

          console.error("Sun page error:", err);

          if (!controller.signal.aborted) {
            setError(
              err instanceof Error
                ? err.message
                : "Something went wrong while loading solar data."
            );
          }
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      }

      void fetchSunData();

      return () => controller.abort();
    }, [coordinates, retryKey]);

  // 4. Retry fetching without reloading the entire page.
  const handleRetry = useCallback(() => {
    setRetryKey((previous) => previous + 1);
  }, []);

if (detectingLocation) {
  return (
    <SunState
      type="location"
      message={
        locationError ??
        "Allow location access to calculate the Sun's position in your sky, or continue with Cairo."
      }
      onRequestLocation={handleRequestLocation}
      onUseDefaultLocation={handleUseDefaultLocation}
      loading={requestingLocation}
    />
  );
}

  // 6. Solar data loading screen.
  if (loading || !coordinates) {
    return <SunState type="loading" />;
  }

  // 7. Error screen.
  if (error || !response?.data?.sun || !solarTimes) {
    return (
      <SunState
        type="error"
        message={error ?? "Solar data is unavailable."}
        onRetry={handleRetry}
      />
    );
  }

  // 8. Data is ready.
  const { sun, date, time, timezone } = response.data;

      return (
    <main className="min-h-screen w-full bg-background text-foreground">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">

        {/* Ambient Background Glow */}
        <div className="pointer-events-none absolute inset-0">

          <div
            className="
              absolute
              left-1/4
              top-1/3
              h-100
              w-100
              rounded-full
              bg-yellow-400/10
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              right-1/4
              top-1/2
              h-75
              w-75
              rounded-full
              bg-orange-500/10
              blur-[110px]
            "
          />

        </div>

        {/* Large Background Orbit */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-100
            w-150
            -translate-x-1/2
            -translate-y-1/2
            rotate-12
            rounded-[50%]
            border
            border-yellow-400/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-125
            w-175
            -translate-x-1/2
            -translate-y-1/2
            -rotate-12
            rounded-[50%]
            border
            border-white/5
          "
        />

        {/* Main Container */}
        <div
          className="
            relative
            mx-auto
            flex
            min-h-screen
            max-w-7xl
            items-center
            px-6
            py-32
            lg:px-8
          "
        >

          <div
            className="
              grid
              w-full
              items-center
              gap-20
              lg:grid-cols-2
            "
          >

            {/* =================================================
                TEXT
            ================================================= */}

            <div>

              <p
                className="
                  mb-4
                  text-sm
                  uppercase
                  tracking-[0.35em]
                  text-yellow-400
                "
              >
                Solar Observatory
              </p>

              <h1
                className="
                  font-display
                  text-6xl
                  font-semibold
                  tracking-tight
                  md:text-8xl
                "
              >
                The Sun
              </h1>

              <p
                className="
                  mt-4
                  font-display
                  text-xl
                  text-yellow-300
                "
              >
                Observe our star
              </p>

              <p
                className="
                  mt-6
                  max-w-xl
                  text-lg
                  leading-8
                  text-foreground-secondary
                "
              >
                Explore the current position of the Sun in the sky,
                its direction, altitude, and daylight conditions
                from your selected location.
              </p>

              {/* Location Information */}

              <div
                className="
                  mt-10
                  space-y-3
                  text-sm
                  text-foreground-muted
                "
              >

                <p>
                  Coordinates:{" "}
                  <span className="text-foreground">
                    {coordinates.latitude},{" "}
                    {coordinates.longitude}
                  </span>
                </p>

                <p>
                  Local Time:{" "}
                  <span className="text-foreground">
                    {date} · {time}
                  </span>
                </p>

                <p>
                  Timezone:{" "}
                  <span className="text-foreground">
                    {timezone}
                  </span>
                </p>

              </div>

            </div>

 
{/* =================================================
    SUN VISUAL
================================================= */}

        <div
          className={`
            relative
            flex
            min-h-125
            items-center
            justify-center
            overflow-visible
            transition-all
            duration-1000
          `}
        >

          {/* =================================================
              AMBIENT SUN GLOW
          ================================================= */}

          <div
            className={`
              pointer-events-none
              absolute
              h-80
              w-80
              rounded-full
              blur-[100px]
              transition-all
              duration-1000
              ${
                sun.isDaylight
                  ? "bg-yellow-400/25 animate-pulse"
                  : "bg-yellow-500/5"
              }
            `}
          />

          {/* =================================================
              SOLAR RAYS
          ================================================= */}

          <div
            className={`
              pointer-events-none
              absolute
              h-95
              w-95
              rounded-full
              transition-all
              duration-1000
              ${
                sun.isDaylight
                  ? "opacity-100 animate-[spin_40s_linear_infinite]"
                  : "opacity-20"
              }
            `}
          >

            {/* Ray 1 */}
            <span
              className="
                absolute
                left-1/2
                top-0
                h-16
                w-px
                -translate-x-1/2
                bg-linear-to-b
                from-yellow-300/0
                via-yellow-300/40
                to-transparent
                blur-[1px]
              "
            />

            {/* Ray 2 */}
            <span
              className="
                absolute
                bottom-0
                left-1/2
                h-16
                w-px
                -translate-x-1/2
                rotate-180
                bg-linear-to-b
                from-yellow-300/0
                via-yellow-300/40
                to-transparent
                blur-[1px]
              "
            />

            {/* Ray 3 */}
            <span
              className="
                absolute
                left-0
                top-1/2
                h-px
                w-16
                -translate-y-1/2
                bg-linear-to-r
                from-yellow-300/0
                via-yellow-300/40
                to-transparent
                blur-[1px]
              "
            />

            {/* Ray 4 */}
            <span
              className="
                absolute
                right-0
                top-1/2
                h-px
                w-16
                -translate-y-1/2
                rotate-180
                bg-linear-to-r
                from-yellow-300/0
                via-yellow-300/40
                to-transparent
                blur-[1px]
              "
            />

            {/* Diagonal Rays */}

            <span
              className="
                absolute
                left-[14%]
                top-[14%]
                h-12
                w-px
                rotate-45
                bg-yellow-300/30
                blur-[1px]
              "
            />

            <span
              className="
                absolute
                right-[14%]
                top-[14%]
                h-12
                w-px
                rotate-45
                bg-yellow-300/30
                blur-[1px]
              "
            />

            <span
              className="
                absolute
                bottom-[14%]
                left-[14%]
                h-12
                w-px
                rotate-45
                bg-yellow-300/30
                blur-[1px]
              "
            />

            <span
              className="
                absolute
                bottom-[14%]
                right-[14%]
                h-12
                w-px
               -rotate-45
                bg-yellow-300/30
                blur-[1px]
              "
            />

          </div>


          {/* =================================================
              ORBIT RING
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              h-80
              w-120
              rotate-12
              rounded-[50%]
              border
              border-yellow-400/15
              animate-[spin_35s_linear_infinite]
            "
          />

          {/* =================================================
              SECOND ORBIT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              h-65
              w-100
              -rotate-20
              rounded-[50%]
              border
              border-orange-400/10
              animate-[spin_45s_linear_infinite_reverse]
            "
          />

          {/* =================================================
              ORBIT POINT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              left-[18%]
              top-[25%]
              h-2
              w-2
              rounded-full
              bg-yellow-300
              shadow-[0_0_20px_rgba(250,204,21,0.9)]
              animate-pulse
            "
          />


          {/* =================================================
              SUN
          ================================================= */}

          <div
            className={`
              relative
              z-10
              h-64
              w-64
              rounded-full
              bg-linear-to-br
              from-yellow-100
              via-yellow-400
              to-orange-500
              transition-all
              duration-1000
              md:h-80
              md:w-80

              ${
                sun.isDaylight
                  ? `
                    shadow-[0_0_90px_rgba(250,204,21,0.65)]
                    animate-[sunPulse_5s_ease-in-out_infinite]
                  `
                  : `
                    opacity-45
                    shadow-[0_0_35px_rgba(250,204,21,0.15)]
                    scale-95
                  `
              }
            `}
          >

            {/* =================================================
                INNER SOLAR GLOW
            ================================================= */}

            <div
              className={`
                absolute
                inset-5
                rounded-full
                bg-yellow-200/30
                blur-xl
                transition-all
                duration-1000
                ${
                  sun.isDaylight
                    ? "opacity-100"
                    : "opacity-30"
                }
              `}
            />


            {/* =================================================
                SUN SURFACE
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                rounded-full
                bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.45),transparent_18%),radial-gradient(circle_at_65%_65%,rgba(234,88,12,0.25),transparent_35%)]
                animate-[sunSurface_12s_linear_infinite]
              "
            />


            {/* =================================================
                HIGHLIGHT
            ================================================= */}

            <div
              className="
                absolute
                left-1/4
                top-1/5
                h-20
                w-20
                rounded-full
                bg-white/30
                blur-2xl
              "
            />


            {/* =================================================
                SOLAR FLARE
            ================================================= */}

            <div
              className="
                absolute
                bottom-1/4
                right-1/5
                h-12
                w-12
                rounded-full
                bg-orange-200/50
                blur-xl
                animate-pulse
              "
            />


            {/* =================================================
                STATUS
            ================================================= */}

            <div
              className="
                absolute
                -bottom-14
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                rounded-full
                border
                border-yellow-400/10
                bg-black/20
                px-4
                py-2
                text-xs
                uppercase
                tracking-[0.2em]
                text-yellow-200/70
                backdrop-blur-md
              "
            >
              {sun.isDaylight
                ? "Above the horizon"
                : "Below the horizon"}
            </div>

          </div>

        </div>

          </div>

        </div>
      </section>
     {solarTimes && (
       
        <SolarStatus
          solarTimes={solarTimes}
          timezone={timezone || DEFAULT_TIMEZONE}
        />
      )}


      {/* =====================================================
          SOLAR GALLERY
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-t
          border-white/6
          py-20
        "
      >

        {/* Gallery Glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-100
            w-100
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-yellow-400/5
            blur-[120px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-6
            lg:px-8
          "
        >

          {/* Heading */}

          <div className="mb-10">

            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-yellow-400
              "
            >
              Solar Gallery
            </p>

            <h2
              className="
                mt-3
                font-display
                text-3xl
                font-semibold
                md:text-4xl
              "
            >
              The Sun, observed
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                leading-8
                text-foreground-secondary
              "
            >
              A glimpse into the surface, atmosphere, and
              ever-changing appearance of our closest star.
            </p>

          </div>


          {/* =================================================
              CAROUSEL
          ================================================= */}

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >

            <CarouselContent className="-ml-4">

             {SunImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="
                    basis-[85%]
                    pl-4
                    sm:basis-[60%]
                    md:basis-[45%]
                    lg:basis-[32%]
                  "
                >

                  <div
                    className="
                      group
                      relative
                      aspect-4/3
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white/8
                      bg-white/2
                      shadow-[0_0_50px_rgba(250,204,21,0.05)]
                      backdrop-blur-xl
                    "
                  >

                    <Image
                      src={image}
                      alt={`The Sun ${index + 1}`}
                      fill
                      sizes="
                        (max-width: 640px) 85vw,
                        (max-width: 768px) 60vw,
                        (max-width: 1024px) 45vw,
                        32vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* Image Gradient */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-linear-to-t
                        from-black/60
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* Image Number */}

                    <div
                      className="
                        absolute
                        bottom-4
                        left-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-black/30
                        text-xs
                        text-white/80
                        backdrop-blur-md
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                  </div>

                </CarouselItem>

              ))}

            </CarouselContent>


            {/* Previous */}

            <CarouselPrevious
              className="
                left-2
                border-white/10
                bg-background/70
                text-foreground-secondary
                backdrop-blur-xl
                hover:border-yellow-400/30
                hover:bg-yellow-400/10
                hover:text-yellow-400
                md:-left-5
              "
            />

            {/* Next */}

            <CarouselNext
              className="
                right-2
                border-white/10
                bg-background/70
                text-foreground-secondary
                backdrop-blur-xl
                hover:border-yellow-400/30
                hover:bg-yellow-400/10
                hover:text-yellow-400
                md:-right-5
              "
            />

          </Carousel>

        </div>

      </section>


      {/* =====================================================
          SUN POSITION
      ===================================================== */}

      <section
        className="
          border-t
          border-white/6
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            lg:px-8
          "
        >

          <div className="mb-12">

            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-yellow-400
              "
            >
              Sun Position
            </p>

            <h2
              className="
                mt-3
                font-display
                text-3xl
                font-semibold
                md:text-4xl
              "
            >
              Where is the Sun?
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                leading-8
                text-foreground-secondary
              "
            >
              The Sun&apos;s apparent position depends on the
              selected location and local time.
            </p>

          </div>


          {/* Stats */}

          <div
            className="
              grid
              grid-cols-1
              gap-px
              overflow-hidden
              rounded-2xl
              border
              border-white/6
              bg-white/3
              sm:grid-cols-3
            "
          >

            <SunStat
              label="Altitude"
              value={`${sun.altitudeDegrees.toFixed(2)}°`}
            />

            <SunStat
              label="Azimuth"
              value={`${sun.azimuthDegrees.toFixed(2)}°`}
            />

            <SunStat
              label="Daylight"
              value={sun.isDaylight ? "Yes" : "No"}
            />

          </div>

        </div>

      </section>


     {/* =================================================
SKY POSITION
================================================= */}

<section className="relative overflow-hidden py-24">

{/* Ambient background */}

  <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/5 blur-[140px]" />

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">


{/* Heading */}
<div className="mb-12">

  <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
    Sky Position
  </p>

  <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
    Where is the Sun?
  </h2>

  <p className="mt-6 max-w-2xl leading-8 text-foreground-secondary">
    The Sun&apos;s position in the sky is determined by its
    altitude and azimuth relative to the selected location.
  </p>

</div>


{/* =================================================
    SKY VISUALIZATION
================================================= */}

<div
  className="
    relative
    mx-auto
    aspect-video
    w-full
    max-w-5xl
    overflow-hidden
    rounded-3xl
    border
    border-white/8
    bg-linear-to-b
    from-black/5
    via-yellow-950/5
    to-background
    shadow-[0_0_80px_rgba(250,204,21,0.05)]
  "
>

  {/* Sky glow */}
  <div
    className={`
      pointer-events-none
      absolute
      left-1/2
      top-1/3
      h-72
      w-72
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      blur-[100px]
      transition-all
      duration-1000
      ${
        sun.isDaylight
          ? "bg-yellow-400/20"
          : "bg-yellow-400/5"
      }
    `}
  />


  {/* =================================================
      ALTITUDE ARC
  ================================================= */}

  <div
    className="
      absolute
      bottom-[18%]
      left-1/2
      h-[55%]
      w-[75%]
      -translate-x-1/2
      rounded-t-full
      border-t
      border-l
      border-r
      border-dashed
      border-white/10
    "
  />

  {/* Inner arc */}

  <div
    className="
      absolute
      bottom-[18%]
      left-1/2
      h-[35%]
      w-[50%]
      -translate-x-1/2
      rounded-t-full
      border-t
      border-l
      border-r
      border-dashed
      border-yellow-400/10
    "
  />


  {/* =================================================
      HORIZON
  ================================================= */}

  <div
    className="
      absolute
      bottom-[18%]
      left-[8%]
      right-[8%]
      h-px
      bg-linear-to-r
      from-transparent
      via-white/25
      to-transparent
    "
  />

  {/* Horizon label */}

  <div
    className="
      absolute
      bottom-[11%]
      left-1/2
      -translate-x-1/2
      text-[10px]
      uppercase
      tracking-[0.3em]
      text-foreground-muted
    "
  >
    Horizon
  </div>


  {/* =================================================
      CARDINAL DIRECTIONS
  ================================================= */}

  <span
    className="
      absolute
      bottom-[19%]
      left-[7%]
      text-xs
      uppercase
      tracking-[0.2em]
      text-foreground-muted
    "
  >
    W
  </span>

  <span
    className="
      absolute
      bottom-[19%]
      right-[7%]
      text-xs
      uppercase
      tracking-[0.2em]
      text-foreground-muted
    "
  >
    E
  </span>

  <span
    className="
      absolute
      left-1/2
      top-[8%]
      -translate-x-1/2
      text-xs
      uppercase
      tracking-[0.2em]
      text-foreground-muted
    "
  >
    N
  </span>

  <span
    className="
      absolute
      bottom-[2%]
      left-1/2
      -translate-x-1/2
      text-xs
      uppercase
      tracking-[0.2em]
      text-foreground-muted
    "
  >
    S
  </span>


  {/* =================================================
      SUN POSITION
  ================================================= */}

  <div
    className="
      absolute
      left-1/2
      top-1/2
      h-7
      w-7
      -translate-x-1/2
      -translate-y-1/2
      transition-all
      duration-1000
    "
    style={{
      /*
        Convert altitude (-90 → 90)
        into a vertical position.

        90°  = top
        0°   = horizon
        -90° = below horizon
      */
      top: `${50 - (sun.altitudeDegrees / 180) * 60}%`,
      left: `${50 + (sun.azimuthDegrees / 360) * 70 - 35}%`,
    }}
  >

    {/* Sun glow */}

    <div
      className={`
        absolute
        -inset-5
        rounded-full
        blur-xl
        transition-all
        duration-1000
        ${
          sun.isDaylight
            ? "bg-yellow-400/30"
            : "bg-yellow-400/5"
        }
      `}
    />

    {/* Sun point */}

    <div
      className={`
        relative
        h-7
        w-7
        rounded-full
        bg-linear-to-br
        from-yellow-100
        via-yellow-400
        to-orange-500
        transition-all
        duration-1000
        ${
          sun.isDaylight
            ? "shadow-[0_0_30px_rgba(250,204,21,0.9)]"
            : "opacity-40 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
        }
      `}
    />

  </div>


  {/* =================================================
      SUN DATA
  ================================================= */}

  <div
    className="
      absolute
      left-6
      top-6
      rounded-2xl
      border
      border-white/8
      bg-black/20
      px-5
      py-4
      backdrop-blur-xl
    "
  >

    <p className="text-[10px] uppercase tracking-[0.25em] text-foreground-muted">
      Current Position
    </p>

    <div className="mt-3 space-y-2">

      <p className="text-sm">
        Altitude
        <span className="ml-3 font-display text-yellow-300">
          {sun.altitudeDegrees.toFixed(2)}°
        </span>
      </p>

      <p className="text-sm">
        Azimuth
        <span className="ml-3 font-display text-yellow-300">
          {sun.azimuthDegrees.toFixed(2)}°
        </span>
      </p>

      <p className="text-xs uppercase tracking-wider text-foreground-muted">
        {sun.isDaylight
          ? "Above the horizon"
          : "Below the horizon"}
      </p>

    </div>

  </div>


  {/* =================================================
      BOTTOM INFO
  ================================================= */}

  <div
    className="
      absolute
      bottom-6
      left-1/2
      -translate-x-1/2
      whitespace-nowrap
      rounded-full
      border
      border-yellow-400/10
      bg-black/20
      px-5
      py-2
      text-xs
      uppercase
      tracking-[0.2em]
      text-yellow-200/60
      backdrop-blur-xl
    "
  >
    Solar altitude · {sun.altitudeDegrees.toFixed(2)}°
  </div>

</div>


{/* =================================================
    POSITION CARDS
================================================= */}

<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">

  <SunStat
    label="Altitude"
    value={`${sun.altitudeDegrees.toFixed(2)}°`}
  />

  <SunStat
    label="Azimuth"
    value={`${sun.azimuthDegrees.toFixed(2)}°`}
  />

  <SunStat
    label="Visibility"
    value={sun.isDaylight ? "Above horizon" : "Below horizon"}
  />

</div>


  </div>

</section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <section
        className="
          border-t
          border-white/6
          py-20
        "
      >

        <div
          className="
            mx-auto
            max-w-7xl
            px-6
            lg:px-8
          "
        >

          <div
            className="
              rounded-3xl
              border
              border-white/6
              bg-white/2
              p-8
              backdrop-blur-xl
              md:p-12
            "
          >

            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-yellow-400
              "
            >
              Āfāq
            </p>

            <h2
              className="
                mt-4
                font-display
                text-2xl
                font-semibold
                md:text-3xl
              "
            >
              Look up. There is always more to discover.
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                leading-7
                text-foreground-secondary
              "
            >
              From the planets around us to the stars beyond them,
              every position tells a story.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   SUN STAT
============================================================ */

