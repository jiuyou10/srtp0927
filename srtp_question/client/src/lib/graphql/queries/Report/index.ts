import { gql } from "@apollo/client";

export const REPORT = gql`
  query Report($userAnswerIds: [String!]!, $pageSize: String) {
    report(userAnswerIds: $userAnswerIds, pageSize: $pageSize) {
      pdf
    }
  }
`;
