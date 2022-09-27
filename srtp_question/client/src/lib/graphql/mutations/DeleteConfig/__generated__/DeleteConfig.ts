/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteConfigInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteConfig
// ====================================================

export interface DeleteConfig_deleteConfig {
  __typename: "OperationResult";
  result: boolean;
}

export interface DeleteConfig {
  deleteConfig: DeleteConfig_deleteConfig;
}

export interface DeleteConfigVariables {
  input?: DeleteConfigInput | null;
}
