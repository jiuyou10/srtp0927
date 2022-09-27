import { gql } from "@apollo/client";

export const ADD_DIAGNOSIS = gql`
  mutation AddDiagnosis($input: AddDiagnosisInput) {
    addDiagnosis(input: $input) {
      result
    }
  }
`;
