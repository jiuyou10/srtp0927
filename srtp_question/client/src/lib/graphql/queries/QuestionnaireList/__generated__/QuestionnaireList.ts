/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuestionnaireList
// ====================================================

export interface QuestionnaireList_questionnaireList {
  __typename: "Questionnaire";
  name: string;
  description: string | null;
  id: string;
  done: boolean;
  displayedFillInDate: string | null;
  userAnswerId: string | null;
  result: string | null;
  key: string;
}

export interface QuestionnaireList {
  questionnaireList: QuestionnaireList_questionnaireList[];
}

export interface QuestionnaireListVariables {
  isReport: boolean;
  showAll?: boolean | null;
}
