import { gql } from "@apollo/client";

export const QUESTIONNAIRE_LIST = gql`
  query QuestionnaireList($isReport: Boolean!, $showAll: Boolean) {
    questionnaireList(isReport: $isReport, showAll: $showAll) {
      name
      description
      id
      done
      displayedFillInDate
      userAnswerId
      result
      key
    }
  }
`;
