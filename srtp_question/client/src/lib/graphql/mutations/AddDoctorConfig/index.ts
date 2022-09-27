import { gql } from "@apollo/client";

export const ADD_DOCTOR_CONFIG = gql`
  mutation AddDoctorConfig($input: DoctorConfigInput) {
    addDoctorConfig(input: $input) {
      result
    }
  }
`;
