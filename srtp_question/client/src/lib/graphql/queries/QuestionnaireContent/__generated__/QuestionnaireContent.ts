/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuestionnaireContent
// ====================================================

export interface QuestionnaireContent_questionnaire_questions {
  __typename: "Question";
  choices: string[];
  content: string | null;
  parent: string | null;
}

export interface QuestionnaireContent_questionnaire {
  __typename: "QuestionnaireContent";
  instruction: string | null;
  name: string;
  questions: QuestionnaireContent_questionnaire_questions[];
  key: string;
}

export interface QuestionnaireContent_partialAnswer {
  __typename: "UserAnswer";
  answers: number[] | null;
  date: any | null;
}

export interface QuestionnaireContent {
  questionnaire: QuestionnaireContent_questionnaire;
  partialAnswer: QuestionnaireContent_partialAnswer | null;
}

export interface QuestionnaireContentVariables {
  id: string;
}
