/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Report
// ====================================================

export interface Report_report {
  __typename: "Report";
  pdf: string;
}

export interface Report {
  report: Report_report | null;
}

export interface ReportVariables {
  userAnswerIds: string[];
  pageSize?: string | null;
}
