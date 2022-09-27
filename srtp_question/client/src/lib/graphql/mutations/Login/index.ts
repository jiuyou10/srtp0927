import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation LogIn($input: LogInInput) {
    logIn(input: $input) {
      ... on UserViewer {
        token
        name
        userName
        gender
        education
        jobStatus
        age
        marriageStatus
        didRequest
        catelogy
      }
      ... on AdminViewer {
        name
        userName
        didRequest
        token
        catelogy
      }
    }
  }
`;
