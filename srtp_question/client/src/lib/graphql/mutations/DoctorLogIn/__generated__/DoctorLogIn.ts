/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DoctorLoginInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: DoctorLogIn
// ====================================================

export interface DoctorLogIn_doctorLogIn {
  __typename: "Doctor";
  name: string | null;
  userName: string | null;
  didRequest: boolean;
}

export interface DoctorLogIn {
  doctorLogIn: DoctorLogIn_doctorLogIn;
}

export interface DoctorLogInVariables {
  input?: DoctorLoginInput | null;
}
