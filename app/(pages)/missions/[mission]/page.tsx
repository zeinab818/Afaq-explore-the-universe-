import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Database,
  FlaskConical,
  Rocket,
  Satellite,
  Sparkles,
} from "lucide-react";

import {
  getMission,
  getMissionImage,
} from "@/lib/missions";

interface MissionDetailsPageProps {
  params: Promise<{
    mission: string;
  }>;
}

export default async function MissionDetailsPage({
  params,
}: MissionDetailsPageProps) {
  const { mission } = await params;

  const missionName = decodeURIComponent(mission);

  const data = await getMission(missionName);

  const image = await getMissionImage(data.identifier);

  const vehicleName = data.vehicle?.vehicle
    ? decodeURIComponent(
        data.vehicle.vehicle.split("/").pop() ?? ""
      ).replaceAll("_", " ")
    : null;

  const payloads =
    data.parents?.payload?.map((item) =>
      decodeURIComponent(
        item.payload.split("/").pop() ?? ""
      ).replaceAll("_", " ")
    ) ?? [];

  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-white/5">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 size-[520px] rounded-full bg-violet-500/10 blur-[130px]" />

          <div className="absolute -bottom-40 -left-40 size-[420px] rounded-full bg-[#e7c98b]/5 blur-[110px]" />

          <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.03] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
          {/* Back */}

          <Link
            href="/missions"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Missions
          </Link>

          {/* Hero grid */}

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Image */}

            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/8 bg-[#0d111c]">
              {image.imageUrl ? (
                <Image
                  src={image.imageUrl}
                  alt={
                    image.title ??
                    `${data.identifier} NASA mission`
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_65%)]">
                  <Rocket className="size-20 text-violet-300/20" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-transparent" />

              <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md">
                NASA
              </div>
            </div>

            {/* Content */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-violet-200">
                <Sparkles className="size-3.5" />
                Space Mission
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                {data.identifier}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/45">
                Mission information and scientific
                connections available through NASA&apos;s
                Open Science Data Repository.
              </p>

              {image.title &&
              image.title !== data.identifier ? (
                <p className="mt-5 text-sm leading-6 text-white/30">
                  {image.title}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-[#e7c98b]/70">
            Mission Overview
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Mission Details
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={<CalendarDays />}
            label="Start Date"
            value={data.startDate || "Not available"}
          />

          <InfoCard
            icon={<CalendarDays />}
            label="End Date"
            value={data.endDate || "Not available"}
          />

          <InfoCard
            icon={<Clock3 />}
            label="Duration"
            value={
              data.duration
                ? `${data.duration} days`
                : "Not available"
            }
          />

          <InfoCard
            icon={<Database />}
            label="Data Source"
            value="NASA OSDR"
          />
        </div>
      </section>

      {/* ================= MISSION CONNECTIONS ================= */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-[#e7c98b]/70">
            Mission Connections
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Mission Components
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            Vehicles and payloads connected to this
            mission in NASA&apos;s data repository.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vehicle */}

          <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-violet-400/10 bg-violet-400/5 p-3">
                <Rocket className="size-5 text-violet-300" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Vehicle
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  {vehicleName || "Not available"}
                </h3>
              </div>
            </div>
          </div>

          {/* Payloads */}

          <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-violet-400/10 bg-violet-400/5 p-3">
                <Satellite className="size-5 text-violet-300" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Payloads
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  {payloads.length}
                </h3>
              </div>
            </div>

            {payloads.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {payloads.map((payload) => (
                  <span
                    key={payload}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-white/55"
                  >
                    {payload}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-white/30">
                No payload information available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= REPOSITORY ================= */}

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl border border-white/8 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-[#e7c98b]/10 bg-[#e7c98b]/5 p-3">
              <FlaskConical className="size-5 text-[#e7c98b]" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Scientific Research Connection
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                This mission is represented in NASA&apos;s
                Open Science Data Repository, where
                mission-related scientific data can be
                connected to research studies and
                experiments.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <RepositoryStat
              label="Files"
              value={String(data.files?.length ?? 0)}
            />

            <RepositoryStat
              label="People"
              value={String(data.people?.length ?? 0)}
            />

            <RepositoryStat
              label="Version"
              value={`v${data.versionInfo?.version ?? 1}`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
      <div className="text-violet-300/70">
        {icon}
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>

      <p className="mt-2 text-base font-medium text-white/80">
        {value}
      </p>
    </div>
  );
}

/* ================= REPOSITORY STAT ================= */

function RepositoryStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/7 bg-white/[0.02] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}