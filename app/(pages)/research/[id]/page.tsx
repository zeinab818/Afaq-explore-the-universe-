
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Database,
  Download,
  File,
  FileStack,
  HardDrive,
  Layers3,
  Lock,
  Package,
  FlaskConical,
} from "lucide-react";

import { getResearch } from "@/lib/osdr";
import type { OSDRStudyFile } from "@/types/osdr";

import {
  formatDate,
  formatFileSize,
  getCategories,
  getLargestFile,
  getRestrictedCount,
  getTotalSize,
  groupFilesByCategory,
} from "@/utils/osdr";
import SaveButton from "@/components/ui/exploration/SaveButton";

export const revalidate = 3600;

interface ResearchDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResearchDetails({
  params,
}: ResearchDetailsProps) {
  const { id } = await params;

  const data = await getResearch();
  const study = data.studies[id];

  if (!study) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070a12] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/40">
            <Database className="size-6" />
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-[#e7c98b]">
            Āfāq / Research Archive
          </p>

          <h1 className="mt-4 break-words font-serif text-3xl text-white/90">
            Study Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/40">
            This research study could not be found in the available
            NASA Open Science Data Repository data.
          </p>

          <Link
            href="/research"
            className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#e7c98b] transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to Research
          </Link>
        </div>
      </main>
    );
  }

  const files = study.study_files;

  const totalSize = getTotalSize(files);
  const categories = getCategories(files);
  const restrictedCount = getRestrictedCount(files);
  const largestFile = getLargestFile(files);

  const groupedFiles = groupFilesByCategory(files);
  const categoryEntries = Object.entries(groupedFiles);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070a12] text-[#f5e9df]">

      {/* Hero */}
      <section className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-violet-500/[0.07] blur-[130px]" />
          <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-[#e7c98b]/[0.04] blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-6 pb-16 pt-24 md:px-12 md:pb-20 lg:px-16 lg:pt-32">

          {/* Breadcrumb */}
          <Link
            href="/research"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-[#e7c98b]"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Research Archive
          </Link>

          {/* Study Identity */}
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">

            <div>
              <div className="mb-7 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[0.06] text-violet-200">
                  <FlaskConical className="size-5" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-violet-200/65">
                    NASA Open Science Data Repository
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    Research Study / Dataset Details
                  </p>
                </div>
              </div>

              <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
                Research Collection
              </p>

              <h1 className="max-w-5xl break-words font-serif text-4xl font-normal leading-tight tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-7xl">
                {id}
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/45 md:text-base">
                Explore the scientific datasets and research files
                associated with this NASA study.
              </p>
              <div className="mt-7">
                <SaveButton
                  item={{
                    id: id,
                    type: "research",
                    title: id,
                    route: `/research/${id}`,
                  }}
                />
            </div>
            </div>

            {/* Study Reference */}
            <div className="hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 lg:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                Data Source
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Database className="size-5 text-[#e7c98b]" />
                <span className="text-sm text-white/75">
                  NASA OSDR
                </span>
              </div>

              <div className="mt-6 h-px bg-white/[0.07]" />

              <p className="mt-5 text-[10px] uppercase tracking-[0.15em] text-white/30">
                Study Identifier
              </p>

              <p className="mt-2 break-all text-xs leading-6 text-white/60">
                {id}
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<FileStack className="size-5" />}
              value={String(files.length)}
              label="Total Files"
              index="01"
            />

            <StatCard
              icon={<Layers3 className="size-5" />}
              value={String(categories.length)}
              label="Data Categories"
              index="02"
            />

            <StatCard
              icon={<HardDrive className="size-5" />}
              value={formatFileSize(totalSize)}
              label="Total Data Size"
              index="03"
            />

            <StatCard
              icon={<Lock className="size-5" />}
              value={String(restrictedCount)}
              label="Restricted Files"
              index="04"
            />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-12 lg:px-16">

        <SectionHeading
          eyebrow="Study Overview"
          title="Understanding the"
          accent="Dataset"
          description="A closer look at the data structure and available research resources."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.8fr]">

          {/* Categories */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c111d] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Layers3 className="size-5 text-violet-200" />
                <h3 className="text-sm font-medium text-white/85">
                  Data Categories
                </h3>
              </div>

              <span className="text-[10px] text-white/30">
                {categories.length} TYPES
              </span>
            </div>

            {categoryEntries.length > 0 ? (
              <div className="mt-7 space-y-3">
                {categoryEntries.map(([category, categoryFiles], index) => (
                  <div
                    key={category}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 transition-colors hover:border-violet-300/20"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="font-serif text-sm text-violet-200/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="break-words text-sm text-white/75">
                        {category}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[10px] text-white/45">
                      {categoryFiles.length}{" "}
                      {categoryFiles.length === 1 ? "file" : "files"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-white/35">
                No categories available.
              </p>
            )}
          </div>

          {/* Largest File */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#e7c98b]/15 bg-[#0c111d] p-6 md:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#e7c98b]/[0.06] blur-[90px]" />

            <div className="relative flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-[#e7c98b]/15 bg-[#e7c98b]/[0.05] text-[#e7c98b]">
                <Package className="size-5" />
              </div>

              <div>
                <p className="text-sm text-white/85">
                  Largest File
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/30">
                  Dataset Highlight
                </p>
              </div>
            </div>

            {largestFile ? (
              <div className="relative mt-10">
                <p className="break-all text-sm leading-7 text-white/65">
                  {largestFile.file_name}
                </p>

                <p className="mt-5 font-serif text-4xl text-[#e7c98b]">
                  {formatFileSize(largestFile.file_size)}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs text-white/35">
                  <Layers3 className="size-3.5" />
                  {largestFile.category}
                </div>
              </div>
            ) : (
              <p className="relative mt-8 text-sm text-white/35">
                No file information available.
              </p>
            )}

            <div className="relative mt-auto pt-10">
              <div className="h-px bg-white/[0.07]" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-white/25">
                File size comparison
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Explorer */}
      <section className="border-t border-white/[0.06] bg-[#090d17]">
        <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-24 lg:px-16">

          <div className="flex flex-col justify-between gap-6 border-b border-white/[0.07] pb-9 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Research Resources"
              title="Dataset"
              accent="Explorer"
              description="Browse and access the files associated with this research study."
            />

            <div className="flex items-center gap-3 text-xs text-white/40">
              <span className="size-1.5 rounded-full bg-[#e7c98b]" />
              {files.length} {files.length === 1 ? "File" : "Files"} Available
            </div>
          </div>

          {files.length > 0 ? (
            <div className="mt-12 space-y-14">
              {categoryEntries.map(([category, categoryFiles], index) => (
                <section key={category}>

                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-sm text-[#e7c98b]/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-sm font-medium text-white/85">
                        {category}
                      </h3>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-white/30">
                      {categoryFiles.length}{" "}
                      {categoryFiles.length === 1 ? "File" : "Files"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categoryFiles.map((file) => (
                      <FileRow
                        key={`${file.file_name}-${file.remote_url}`}
                        file={file}
                      />
                    ))}
                  </div>
              
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-20 text-center">
              <FileStack className="mx-auto size-8 text-white/25" />

              <h3 className="mt-5 font-serif text-2xl text-white/80">
                No Research Files
              </h3>

              <p className="mt-3 text-sm text-white/35">
                There are currently no files available for this study.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Reference */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-6 py-7 text-[10px] text-white/30 sm:flex-row sm:items-center sm:justify-between md:px-12 lg:px-16">
          <span>Āfāq / Research Archive</span>

          <span className="inline-flex items-center gap-2">
            Data provided by NASA Open Science Data Repository
            <ArrowUpRight className="size-3" />
          </span>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------- */
/* Section Heading */
/* ---------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#e7c98b]">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#f5e9df] sm:text-4xl">
        {title}{" "}
        <span className="italic text-[#e7c98b]">{accent}</span>
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
        {description}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Stat Card */
/* ---------------------------------- */

function StatCard({
  icon,
  value,
  label,
  index,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  index: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#0c111d] p-5 transition-colors hover:border-[#e7c98b]/20 md:p-6">
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl border border-[#e7c98b]/15 bg-[#e7c98b]/[0.05] text-[#e7c98b]">
          {icon}
        </div>

        <span className="font-serif text-xs text-white/20">
          {index}
        </span>
      </div>

      <p className="mt-7 break-words font-serif text-2xl text-white/90 md:text-3xl">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/40">
        {label}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* File Row */
/* ---------------------------------- */

function FileRow({
  file,
}: {
  file: OSDRStudyFile;
}) {
  const downloadUrl = file.remote_url.startsWith("http")
    ? file.remote_url
    : `https://osdr.nasa.gov${file.remote_url}`;

  return (
    <article className="group rounded-xl border border-white/[0.07] bg-[#0c111d] p-5 transition-all duration-300 hover:border-violet-300/20 hover:bg-[#101625] md:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* File Information */}
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-violet-200/70 transition-colors group-hover:border-violet-300/20">
            <File className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="break-all text-sm font-medium leading-6 text-white/80 transition-colors group-hover:text-white">
              {file.file_name}
            </h4>

            {file.subcategory && (
              <p className="mt-1 text-xs text-white/35">
                {file.subcategory}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] text-white/35">
              <span className="inline-flex items-center gap-2">
                <HardDrive className="size-3.5" />
                {formatFileSize(file.file_size)}
              </span>

              <span className="inline-flex items-center gap-2">
                <Calendar className="size-3.5" />
                {formatDate(file.date_created)}
              </span>

              {file.restricted && (
                <span className="inline-flex items-center gap-2 text-rose-300/75">
                  <Lock className="size-3.5" />
                  Restricted Access
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Download Action */}
        {file.restricted ? (
          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-rose-300/10 bg-rose-300/[0.04] px-4 py-2.5 text-xs text-rose-200/60 lg:self-center">
            <Lock className="size-3.5" />
            Restricted
          </span>
        ) : (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-[#e7c98b]/20 bg-[#e7c98b]/[0.05] px-4 py-2.5 text-xs text-[#e7c98b] transition-all hover:border-[#e7c98b]/40 hover:bg-[#e7c98b]/10 hover:text-white lg:self-center"
          >
            <Download className="size-4" />
            Download
            <ArrowUpRight className="size-3.5 opacity-50" />
          </a>
        )}
      </div>
    </article>
  );
}
