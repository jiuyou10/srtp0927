import { gql } from "@apollo/client";

export const CHECK_IF_DOCTOR_CONFIG_USER_NAME_UNIQUE = gql`
  query CheckIfDoctorConfigNameUnique($doctorConfigName: String!) {
    checkIfDoctorConfigNameUnique(doctorConfigName: $doctorConfigName) {
      result
    }
  }
`;
