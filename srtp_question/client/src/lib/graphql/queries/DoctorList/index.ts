import { gql } from "@apollo/client";

export const DOCTOR_LIST = gql`
  query DoctorList($limit: Int!, $currentPageIndex: Int!) {
    doctorList(limit: $limit, currentPageIndex: $currentPageIndex) {
      total
      admins {
        name
        userName
      }
    }
  }
`;
