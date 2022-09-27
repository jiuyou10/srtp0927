import { gql } from "@apollo/client";

export const PATIENT_LOG_OUT = gql`
  mutation PatientLogOut {
    patientLogOut {
      didRequest
    }
  }
`;
