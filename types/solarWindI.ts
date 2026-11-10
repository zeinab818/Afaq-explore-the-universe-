export interface SolarWindData {
  speed: {
    proton_speed: number;
    time_tag: string;
  }[];

  magneticField: {
    bt: number;
    bz_gsm: number;
    time_tag: string;
  }[];
}