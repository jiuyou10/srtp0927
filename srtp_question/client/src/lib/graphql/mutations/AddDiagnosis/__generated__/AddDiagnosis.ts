/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddDiagnosisInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddDiagnosis
// ====================================================

export interface AddDiagnosis_addDiagnosis {
  __typename: "OperationResult";
  result: boolean;
}

export interface AddDiagnosis {
  addDiagnosis: AddDiagnosis_addDiagnosis;
}

export interface AddDiagnosisVariables {
  input?: AddDiagnosisInput | null;
}
