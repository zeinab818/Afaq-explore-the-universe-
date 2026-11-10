export interface MissionReference {
  mission: string;
}

export interface MissionsResponse {
  data: MissionReference[];
}

export interface MissionVehicle {
  vehicle: string;
}

export interface MissionPayload {
  payload: string;
}

export interface MissionParents {
  payload: MissionPayload[];
  experiment: string[];
  GLDS_Study: string[];
}

export interface MissionVersionInfo {
  documentKey: string;
  version: number;
  deleted: boolean;
}

export interface Mission {
  id: string;
  identifier: string;
  identifierLowercase: string;
  esID: string;
  duration: number;
  aliases: string[];
  startDate: string;
  endDate: string;
  files: unknown[];
  vehicle: MissionVehicle;
  people: unknown[];
  versionInfo: MissionVersionInfo;
  parents: MissionParents;
}