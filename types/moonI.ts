export interface MoonPhase {
  name: string;
  phase_angle_deg: number;
  illumination: number;
  age_days: number;
  distance_km: number;
  is_waxing: boolean;
}

export interface MoonZodiac {
  sign: string;
  sign_id: string;
  degree: number;
  zodiac_type: string;
}

export interface MoonVisual {
  type: string;
  svg?: string;
  shadow_ratio?: number;
  waxing?: boolean;
}

export interface TraditionalMoon {
  name: string;
  naming_system: string;
  month: string;
  applies_to_full_moon_at: string;
  is_current_full_moon: boolean;
}

export interface NextPhases {
  new_moon: string;
  first_quarter: string;
  full_moon: string;
  last_quarter: string;
}

export interface Eclipse {
  is_eclipse: boolean;
  is_blood_moon: boolean;
}

export interface MoonPosition {
  altitude: number;
  azimuth: number;
  distance: number;
}

export interface MoonDay {
  calendar_date: string;
  timestamp: string;

  phase: MoonPhase;

  zodiac?: MoonZodiac;

  moon_visual?: MoonVisual;

  traditional_moon?: TraditionalMoon;

  next_phases?: NextPhases;

  eclipse?: Eclipse;

  position: MoonPosition;

  moonrise: string | null;

  moonset: string | null;
}

export interface SignTimeline {
  sign: string;
  sign_id: string;

  starts_at: string;
  ends_at: string;

  starts_at_local: string;
  ends_at_local: string;

  duration_hours: number;
  duration_minutes: number;

  next_sign: string;
  next_sign_id: string;

  label: string;

  continues_from_previous_month: boolean;
  continues_to_next_month: boolean;
}

export interface MoonIngress {
  from_sign: string;
  from_sign_id: string;

  to_sign: string;
  to_sign_id: string;

  at: string;
  at_local: string;

  label: string;
}
export interface MoonCalendarResponse {
  year: number;
  month: number;
  month_name: string;
  days_in_month: number;

  calendar_basis: string;
  calendar_timezone: string;

  latitude: number;
  longitude: number;

  days: MoonDay[];

  current_moon: MoonDay;
  moon_events: MoonEvent[];
}

export type MoonEventType =
  | "full_moon"
  | "supermoon"
  | "blue_moon";

export interface MoonEvent {
  id: string;
  type: MoonEventType;
  name: string;
  date: string;
  distance_km: number;
  traditional_moon?: TraditionalMoon;
}