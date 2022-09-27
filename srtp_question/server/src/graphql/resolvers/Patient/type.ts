export interface PatientLoginArgs {
  input: {
    userName: string;
    name: string;
    education?: string;
    jobStatus?: string;
    gender?: string;
    marriageStatus?: string;
    age?: number;
  } | null;
}
