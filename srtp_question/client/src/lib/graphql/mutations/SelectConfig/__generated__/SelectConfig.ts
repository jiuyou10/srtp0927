/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SelectConfigInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: SelectConfig
// ====================================================

export interface SelectConfig_selectConfig {
  __typename: "OperationResult";
  result: boolean;
}

export interface SelectConfig {
  selectConfig: SelectConfig_selectConfig;
}

export interface SelectConfigVariables {
  input?: SelectConfigInput | null;
}
