/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserAnswerInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: SavePartialAnswer
// ====================================================

export interface SavePartialAnswer_savePartialAnswer {
  __typename: "Result";
  didRequest: boolean;
}

export interface SavePartialAnswer {
  savePartialAnswer: SavePartialAnswer_savePartialAnswer;
}

export interface SavePartialAnswerVariables {
  input?: UserAnswerInput | null;
}
