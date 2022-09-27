import { gql } from "@apollo/client";

export const DOCTOR_LOG_IN = gql`
  mutation DoctorLogIn($input: DoctorLoginInput) {
    doctorLogIn(input: $input) {
      name
      userName
      didRequest
    }
  }
`;
