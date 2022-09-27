/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLoginInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: PatientLogIn
// ====================================================

export interface PatientLogIn_patientLogIn {
  __typename: "UserViewer";
  name: string | null;
  userName: string | null;
  education: string | null;
  jobStatus: string | null;
  gender: string | null;
  marriageStatus: string | null;
  age: number | null;
  didRequest: boolean;
}

export interface PatientLogIn {
  patientLogIn: PatientLogIn_patientLogIn;
}

export interface PatientLogInVariables {
  input?: UserLoginInput | null;
}
