import { gql } from "@apollo/client";

export const DOCTOR_LOG_OUT = gql`
  mutation DoctorLogOut {
    doctorLogOut {
      didRequest
    }
  }
`;
