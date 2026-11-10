import Link from "next/link";
import {
  ArrowRight,

  Database,
  FileStack,
  FlaskConical,
  Microscope,
} from "lucide-react";

import { getResearch } from "@/lib/osdr";
import SaveButton from "@/components/ui/exploration/SaveButton";

export const revalidate =3600;

export default async function Research() {
  const data = await getResearch();

  const studies = Object.entries(data.studies);

  const totalFiles = studies.reduce(
    (total, [, study]) => total + study.file_count,
    0
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#070a12] text-[#f5e9df]">

      {/* Hero */}
      <section className="relative border-b border-white/[0.07]">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-violet-500/8 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-[#e7c98b]/5 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-6 pb-16 pt-24 md:px-12 md:pb-20 lg:px-16 lg:pt-32">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e7c98b]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
              Āfāq / Research Archive
            </span>
          </div>

          {/* Heading */}
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/35">
                Explore the science behind space
              </p>

              <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.08] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[6.2rem]">
                Beyond
                <br />
                <span className="italic text-[#e7c98b]">
                  Discovery.
                </span>
              </h1>
            </div>

            <div className="max-w-md lg:justify-self-end lg:pb-3">
              <div className="mb-5 flex size-12 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/[0.06] text-violet-200">
                <Microscope className="size-5" />
              </div>

              <p className="text-sm leading-8 text-white/55 md:text-base">
                Explore scientific studies and research datasets from
                NASA&apos;s Open Science Data Repository. Discover the
                data behind space exploration and scientific research.
              </p>

              <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                <span className="size-1.5 rounded-full bg-[#e7c98b]" />
                NASA Open Science Data Repository
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/ bg-white/ sm:grid-cols-3">
            <StatCard
              icon={<Database className="size-5" />}
              value={String(data.total_hits)}
              label="Available Studies"
              description="Research records"
            />

            <StatCard
              icon={<FileStack className="size-5" />}
              value={String(totalFiles)}
              label="Research Files"
              description="Associated datasets"
            />

            <StatCard
              icon={<FlaskConical className="size-5" />}
              value="NASA"
              label="Research Source"
              description="Open science repository"
            />
          </div>
        </div>
      </section>

      {/* Research Studies */}
      <section className="relative mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-28 lg:px-16">

        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
              The Research Collection
            </p>

            <h2 className="font-serif text-3xl font-normal tracking-tight text-[#f5e9df] sm:text-4xl">
              Explore Research
              <span className="text-[#e7c98b]"> Studies</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              Browse scientific studies and explore the datasets
              associated with each research project.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/35">
            <span className="size-1.5 rounded-full bg-[#e7c98b]" />
            {studies.length} Research {studies.length === 1 ? "Study" : "Studies"}
          </div>
        </div>

        {/* Studies */}
        {studies.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {studies.map(([studyId, study], index) => {
              const categories = [
                ...new Set(
                  study.study_files
                    .map((file) => file.category)
                    .filter(Boolean)
                ),
              ];

              return (
                <article
                  key={studyId}
                  className="group relative flex min-h-97.5 flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0c111d] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-[#101625] md:p-7"
                >
                  {/* Decorative number */}
                  <div className="pointer-events-none absolute -right-3 -top-8 font-serif text-[110px] leading-none text-white/2.5 transition-colors duration-500 group-hover:text-violet-200/[0.06]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Card header */}
                  <div className="relative flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/6 text-violet-200 transition-colors duration-300 group-hover:border-violet-300/30 group-hover:bg-violet-300/10">
                      <FlaskConical className="size-5" />
                    </div>

                    <span className="rounded-full border border-white/8 bg-white/2.5 px-3 py-1.5 text-[10px] tracking-wide text-white/45">
                      {study.file_count}{" "}
                      {study.file_count === 1 ? "FILE" : "FILES"}
                    </span>
                  </div>

                  {/* Study details */}
                  <div className="relative mt-8">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-violet-200/60">
                      Research Study
                    </p>

                    <h3 className="mt-3 wrap-break-words font-serif text-2xl font-medium text-[#f5e9df] transition-colors group-hover:text-[#e7c98b]">
                      {studyId}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/40">
                      Scientific research data available through
                      NASA&apos;s Open Science Data Repository.
                    </p>
                  </div>

                  {/* Categories */}
                  <div className="relative mt-7">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                        Data Categories
                      </p>

                      <span className="text-[10px] text-white/25">
                        {categories.length}{" "}
                        {categories.length === 1 ? "Category" : "Categories"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <span
                            key={category}
                            className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-white/50"
                          >
                            {category}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-white/30">
                          No categories available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="relative mt-auto pt-8">
                    <div className="mb-5 h-px w-full bg-white/[0.07]" />

                 
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                          <Link
                            href={`/research/${studyId}`}
                            className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.17em] text-[#e7c98b] transition-colors hover:text-white"
                          >
                            Explore Study
                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>

                          <SaveButton
                            item={{
                              id: studyId,
                              type: "research",
                              title: studyId,
                              image: undefined,
                              route: `/research/${studyId}`,
                            }}
                          />
                        </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-white/2 px-6 py-20 text-center">
            <Database className="mx-auto size-8 text-white/25" />

            <h3 className="mt-5 font-serif text-2xl text-white/80">
              No Research Studies Found
            </h3>

            <p className="mt-3 text-sm text-white/40">
              There are currently no studies available to display.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-[#0c111d] p-6 md:p-7">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#e7c98b]/15 bg-[#e7c98b]/[0.05] text-[#e7c98b]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-serif text-2xl text-[#f5e9df]">
          {value}
        </p>

        <p className="mt-1 text-xs text-white/65">
          {label}
        </p>

        <p className="mt-1 text-[10px] text-white/30">
          {description}
        </p>
      </div>
    </div>
  );
}