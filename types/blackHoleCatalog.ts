export type ImageKind =
  | "observation"
  | "simulation"
  | "illustration";

export type BlackHoleImage = {
  url: string;
  kind: ImageKind;
  title: string;
  credit: string;
  sourceUrl: string;
  alt: string;
};

export type ScientificSource = {
  label: string;
  url: string;
  supports: string[];
};

export type BlackHoleCatalogEntry = {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  class: "stellar" | "intermediate" | "supermassive";
  massSolar: number | null;
  distanceLightYears: number | null;
  discoveryYear: number | null;
  images: BlackHoleImage[];
  sources: ScientificSource[];
};