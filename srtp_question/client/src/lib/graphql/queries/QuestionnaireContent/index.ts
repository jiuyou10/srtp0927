import { gql } from "@apollo/client";

export const QUESTIONNAIRE_CONTENT = gql`
  query QuestionnaireContent($id: String!) {
    questionnaire(id: $id) {
      instruction
      name
      questions {
        choices
        content
        parent
      }
      key
    }
    partialAnswer(questionnaireId: $id) {
      answers
      date
    }
  }
`;
