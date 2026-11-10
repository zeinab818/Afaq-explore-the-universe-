export interface MeteorShowerActivity {
  start: string;
  end: string;
}

export interface MeteorShower {
  code: string;
  name: string;
  slug: string;
  zhr: number;
  popIndex: number;
  url: string;
  solLongPeak: number;
  active: MeteorShowerActivity;
}

export interface MeteorShowerMeta {
  version: string;
  generatedAt: string;
  sources: string[];
  license: string;
  licenseUrl: string;
  attribution: string;
}

export interface MeteorShowerResponse {
  meta: MeteorShowerMeta;
  showers: MeteorShower[];
  license: {
    license: string;
    licenseUrl: string;
    attribution: string;
  };
}