export interface ReportArgs {
  userAnswerIds: string[];
  pageSize: string;
}

export interface ReportForAdminArgs extends ReportArgs {
  userId: string;
}
