import { gql } from "@apollo/client";

export const CHECK_IF_DOCTOR_USER_NAME_UNIQUE = gql`
  query CheckIfDoctorNameUnique($userName: String!) {
    checkIfDoctorUserNameUnique(userName: $userName) {
      result
    }
  }
`;
