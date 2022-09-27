import { gql } from "@apollo/client";

export const PATIENT_LOG_IN = gql`
  mutation PatientLogIn($input: UserLoginInput) {
    patientLogIn(input: $input) {
      name
      userName
      education
      jobStatus
      gender
      marriageStatus
      age
      didRequest
    }
  }
`;
