
import type { OSDRStudyFile } from "@/types/osdr";

export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) {
    return "Unknown";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const size = bytes / Math.pow(1024, index);

  return `${size.toFixed(2)} ${units[index]}`;
}

export function formatDate(timestamp: number): string {
  if (!timestamp) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(timestamp * 1000));
}

export function getTotalSize(files: OSDRStudyFile[]): number {
  return files.reduce(
    (total, file) => total + file.file_size,
    0
  );
}

export function getCategories(
  files: OSDRStudyFile[]
): string[] {
  return [
    ...new Set(
      files
        .map((file) => file.category)
        .filter(Boolean)
    ),
  ];
}

export function getRestrictedCount(
  files: OSDRStudyFile[]
): number {
  return files.filter(
    (file) => file.restricted
  ).length;
}

export function getLargestFile(
  files: OSDRStudyFile[]
): OSDRStudyFile | null {
  if (!files.length) {
    return null;
  }

  return files.reduce((largest, file) =>
    file.file_size > largest.file_size
      ? file
      : largest
  );
}

export function groupFilesByCategory(
  files: OSDRStudyFile[]
): Record<string, OSDRStudyFile[]> {
  return files.reduce<
    Record<string, OSDRStudyFile[]>
  >((groups, file) => {
    const category = file.category || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(file);

    return groups;
  }, {});
}