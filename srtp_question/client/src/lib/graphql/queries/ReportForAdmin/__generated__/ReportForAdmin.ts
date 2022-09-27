/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReportForAdmin
// ====================================================

export interface ReportForAdmin_reportForAdmin {
  __typename: "Report";
  pdf: string;
}

export interface ReportForAdmin {
  reportForAdmin: ReportForAdmin_reportForAdmin | null;
}

export interface ReportForAdminVariables {
  userId?: string | null;
  userAnswerIds: string[];
  pageSize?: string | null;
}
