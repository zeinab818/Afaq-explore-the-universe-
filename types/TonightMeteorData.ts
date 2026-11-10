interface TonightMeteorData {
  location: {
    lat: number;
    lon: number;
    label: string;
    tz: string;
    country: string;
    bortle: number | null;
    sqm: number | null;
    skyBrightnessKnown: boolean;
  };
  nightOf: string;
  verdict: {
    tier: "go" | "maybe" | "no" | "invisible";
    headline: string;
    detail: string;
  };
  shower: {
    code: string;
    name: string;
    slug: string;
    zhr: number;
    popIndex: number;
    url: string;
  } | null;
  bestWindow: {
    start: string;
    end: string;
  } | null;
  peakHr: number;
  radiantAltMax: number;
  moonIllum: number;
  cloudPct: number | null;
  weather: {
    source: string;
    available: boolean;
    attribution: string;
  };
  nextGoodNight: string | null;
  hourly: Array<{
    local: string;
    utc: string;
    radiantAlt: number;
    moonAlt: number;
    moonIllum: number;
    cloud: number | null;
    limitingMag: number;
    hr: number;
  }>;
  alsoActive: Array<{
    code: string;
    name: string;
    slug: string;
    zhr: number;
    popIndex: number;
    url: string;
  }>;
}
export type { TonightMeteorData };