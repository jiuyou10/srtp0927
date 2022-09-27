import { gql } from "@apollo/client";

export const DELETE_CONFIG = gql`
  mutation DeleteConfig($input: DeleteConfigInput) {
    deleteConfig(input: $input) {
      result
    }
  }
`;
