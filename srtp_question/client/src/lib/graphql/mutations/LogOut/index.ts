import { gql } from "@apollo/client";

export const LOG_OUT = gql`
  mutation Logout {
    logOut {
      ... on UserViewer {
        id
        token
        didRequest
        catelogy
      }
      ... on AdminViewer {
        id
        token
        didRequest
        catelogy
      }
    }
  }
`;
