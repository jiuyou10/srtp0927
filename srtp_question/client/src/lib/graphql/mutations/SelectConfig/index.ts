import { gql } from "@apollo/client";

export const SELECT_CONFIG = gql`
  mutation SelectConfig($input: SelectConfigInput) {
    selectConfig(input: $input) {
      result
    }
  }
`;
