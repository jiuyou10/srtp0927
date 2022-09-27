import { gql } from "@apollo/client";

export const USER_ANSWER = gql`
  query UserAnsewr($questionnaireId: String!) {
    userAnswer(questionnaireId: $questionnaireId) {
      answers
    }
  }
`;
