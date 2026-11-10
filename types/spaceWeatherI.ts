export interface SpaceWeatherScale {
  Scale: string | null;
  Text: string | null;
}

export interface RadioBlackoutScale extends SpaceWeatherScale {
  MinorProb: string | null;
  MajorProb: string | null;
}

export interface SolarRadiationScale extends SpaceWeatherScale {
  Prob: string | null;
}

export interface SpaceWeatherDay {
  DateStamp: string;
  TimeStamp: string;

  R: RadioBlackoutScale;

  S: SolarRadiationScale;

  G: SpaceWeatherScale;
}

export interface SpaceWeatherData {
  [key: string]: SpaceWeatherDay;
}
