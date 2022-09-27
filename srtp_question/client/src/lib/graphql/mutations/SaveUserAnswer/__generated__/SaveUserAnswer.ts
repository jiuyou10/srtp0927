/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserAnswerInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: SaveUserAnswer
// ====================================================

export interface SaveUserAnswer_saveUserAnswer {
  __typename: "Result";
  didRequest: boolean;
}

export interface SaveUserAnswer {
  saveUserAnswer: SaveUserAnswer_saveUserAnswer;
}

export interface SaveUserAnswerVariables {
  input?: UserAnswerInput | null;
}
