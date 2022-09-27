import { gql } from "@apollo/client";

export const SAVE_USER_ANSWER = gql`
  mutation SaveUserAnswer($input: UserAnswerInput) {
    saveUserAnswer(input: $input) {
      didRequest
    }
  }
`;
