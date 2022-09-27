/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckIfDoctorNameUnique
// ====================================================

export interface CheckIfDoctorNameUnique_checkIfDoctorUserNameUnique {
  __typename: "OperationResult";
  result: boolean;
}

export interface CheckIfDoctorNameUnique {
  checkIfDoctorUserNameUnique: CheckIfDoctorNameUnique_checkIfDoctorUserNameUnique;
}

export interface CheckIfDoctorNameUniqueVariables {
  userName: string;
}
