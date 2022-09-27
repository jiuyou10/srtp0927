/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DoctorConfigInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddDoctorConfig
// ====================================================

export interface AddDoctorConfig_addDoctorConfig {
  __typename: "OperationResult";
  result: boolean;
}

export interface AddDoctorConfig {
  addDoctorConfig: AddDoctorConfig_addDoctorConfig;
}

export interface AddDoctorConfigVariables {
  input?: DoctorConfigInput | null;
}
