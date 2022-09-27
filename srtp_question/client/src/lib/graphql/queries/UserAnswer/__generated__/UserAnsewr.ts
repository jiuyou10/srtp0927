/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserAnsewr
// ====================================================

export interface UserAnsewr_userAnswer {
  __typename: "UserAnswer";
  answers: number[] | null;
}

export interface UserAnsewr {
  userAnswer: UserAnsewr_userAnswer | null;
}

export interface UserAnsewrVariables {
  questionnaireId: string;
}
