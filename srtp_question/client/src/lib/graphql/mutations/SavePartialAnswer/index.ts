import { gql } from "@apollo/client";

export const SAVE_PARTIAL_ANSWER = gql`
  mutation SavePartialAnswer($input: UserAnswerInput) {
    savePartialAnswer(input: $input) {
      didRequest
    }
  }
`;
