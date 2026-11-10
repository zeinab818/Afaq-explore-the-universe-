export interface OSDRResponse {
  hits: number;
  input: string;
  page_number: number;
  page_size: number;
  page_total: number;
  studies: OSDRStudies;
  success: boolean;
  total_hits: number;
  valid_input: string[];
}

export interface OSDRStudies {
  [studyId: string]: OSDRStudy;
}

export interface OSDRStudy {
  file_count: number;
  study_files: OSDRStudyFile[];
}

export interface OSDRStudyFile {
  category: string;
  date_created: number;
  date_updated: string;
  file_name: string;
  file_size: number;
  organization: string;
  remote_url: string;
  restricted: boolean;
  subcategory: string;
  subdirectory: string;
  visible: boolean;
}