/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddDoctorInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddDoctor
// ====================================================

export interface AddDoctor_addDoctor {
  __typename: "OperationResult";
  result: boolean;
}

export interface AddDoctor {
  addDoctor: AddDoctor_addDoctor;
}

export interface AddDoctorVariables {
  input?: AddDoctorInput | null;
}
