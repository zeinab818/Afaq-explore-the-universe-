export type BlackHoleImageSource =
  | "nasa"
  | "visualization";

export interface BlackHoleSource {
  id?: string;
  name?: string;
  url?: string;
  license?: string;
}

export interface BlackHole {
  slug: string;
  name: string;

  category: "black_hole";

  class?: string;
  object_type?: string;

  description?: string;

  mass_kg?: number;
  mass_msun?: number;

  distance_ly?: number;
  distance_pc?: number;

  constellation?: string;

  discovered?: string | number;

  designations?: string[];

  ra_deg?: number;
  dec_deg?: number;

  magnitude?: number;

  source?: string | BlackHoleSource;

  properties?: Record<string, unknown>;

  updated_at?: string;

  // NASA / UI
  imageUrl?: string | null;
  imageTitle?: string | null;
  imageSource?: BlackHoleImageSource;
  nasaId?: string | null;
}