export interface SolarEclipse {
  timestamp: number;
  datestamp: string;
  type: string;
  visibility_regions: string;
}
export interface SunData {
  altitude: number;
  azimuth: number;
  altitudeDegrees: number;
  azimuthDegrees: number;
  compassBearing: number;
  isDaylight: boolean;
 nextSolarEclipse: SolarEclipse | null;

  equationOfTime: number | null;
  airMass: number | null;
  clearSky: ClearSky | null;
  shadowRatio: number | null;
  panelAim: PanelAim | null;

  declination: number | null;
  rightAscension: number | null;
  hourAngle: number | null;
  distance: number | null;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ClearSky {
  directNormal: number;
  globalHorizontal: number;
}

export interface PanelAim {
  tilt: number;
  azimuth: number;
}

export interface SunApiData {
  date: string;
  time: string;
  timezone: string;
  timestampUTC: string;

  coordinates: Coordinates;
  sun: SunData;

  solarTimes?: SolarTimes;
}

export interface SunApiResponse {
  status: string;
  error: string | null;
  data: SunApiData;
}

export interface SolarTimes {
  solarNoon?: string | null;
  sunrise: string | null;
  sunset: string | null;
  sunriseEnd?: string | null;
  sunsetStart?: string | null;
  dawn?: string | null;
  dusk?: string | null;
  nauticalDawn?: string | null;
  nauticalDusk?: string | null;
  nightEnd?: string | null;
  night?: string | null;
  goldenHourEnd?: string | null;
  goldenHour?: string | null;
}