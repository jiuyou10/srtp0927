/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UsersFilter {
  DATE_LATEST = "DATE_LATEST",
  DATE_OLDEST = "DATE_OLDEST",
}

export interface AddDiagnosisInput {
  patientId: string;
  diagnosis: string;
}

export interface AddDoctorInput {
  userName: string;
  name: string;
  password: string;
}

export interface AgeRange {
  min?: number | null;
  max?: number | null;
}

export interface CreateAccountInput {
  userName: string;
  password: string;
  name: string;
  education: string;
  jobStatus: string;
  gender: string;
  marriageStatus: string;
  age?: number | null;
}

export interface DeleteConfigInput {
  configId: string;
}

export interface DoctorConfigInput {
  selected: boolean;
  formIds: string[];
  configName: string;
}

export interface DoctorLoginInput {
  userName: string;
  password: string;
}

export interface LogInInput {
  userName: string;
  password: string;
}

export interface SelectConfigInput {
  configId?: string | null;
}

export interface SignUpDate {
  year: number;
  month: number;
  day: number;
}

export interface UserAnswerInput {
  questionnaireId: string;
  answers: number[];
}

export interface UserLoginInput {
  userName: string;
  name: string;
  education?: string | null;
  jobStatus?: string | null;
  gender?: string | null;
  marriageStatus?: string | null;
  age?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
