import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: CreateAccountInput) {
    createAccount(input: $input) {
      token
      name
      userName
      gender
      education
      jobStatus
      marriageStatus
      didRequest
      age
      catelogy
    }
  }
`;
