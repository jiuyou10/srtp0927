import { gql } from "@apollo/client";

export const ADD_DOCTOR = gql`
  mutation AddDoctor($input: AddDoctorInput) {
    addDoctor(input: $input) {
      result
    }
  }
`;
