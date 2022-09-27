export interface Viewer {
  token?: string | null;
  didRequest: boolean;
  userName?: string | null;
  name?: string | null;
  gender?: string | null;
  age?: number | null;
  education?: string | null;
  jobStatus?: string | null;
  marriageStatus?: string | null;
  catelogy?: string | null;
}

export interface Doctor {
  name?: string | null;
  userName?: string | null;
  didRequest: boolean;
}

export interface Patient {
  // token: string | null;
  didRequest: boolean;
  userName?: string | null;
  name?: string | null;
  gender?: string | null;
  age?: number | null;
  education?: string | null;
  jobStatus?: string | null;
  marriageStatus?: string | null;
}
