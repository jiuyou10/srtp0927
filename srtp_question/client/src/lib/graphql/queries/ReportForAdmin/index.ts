import { gql } from "@apollo/client";

export const REPORT_FOR_ADMIN = gql`
  query ReportForAdmin($userId: String, $userAnswerIds: [String!]!, $pageSize: String) {
    reportForAdmin(userId: $userId, userAnswerIds: $userAnswerIds, pageSize: $pageSize) {
      pdf
    }
  }
`;
