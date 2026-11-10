export type CelestialEventType =
  | "total_solar_eclipse"
  | "annular_solar_eclipse"
  | "partial_solar_eclipse"
  | "total_lunar_eclipse"
  | "partial_lunar_eclipse"
  | "penumbral_lunar_eclipse";

export interface CelestialEvent {
  id: string;
  type: CelestialEventType;
  body: "Sun" | "Moon";
  date: string;
  peak: string | null;
  start: string | null;
  end: string | null;
  altitude: number | null;
  extraInfo?: {
    obscuration?: number;
  };
}