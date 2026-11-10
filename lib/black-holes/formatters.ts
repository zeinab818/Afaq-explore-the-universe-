
export function formatMass(value: number | null) {
  if (value == null) return "Not confirmed";

  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} M☉`;
}

export function formatDistance(value: number | null) {
  if (value == null) return "Not confirmed";

  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} light-years`;
}

export function formatClass(value: string) {
  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
