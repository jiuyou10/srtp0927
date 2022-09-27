import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query QueryUser(
    $userName: String
    $name: String
    $gender: String
    $ageRange: AgeRange
    $minSignUpDate: SignUpDate
    $maxSignUpDate: SignUpDate
    $limit: Int!
    $currentPageIndex: Int!
    $filter: UsersFilter
    $onlyMyPatient: Boolean
    $additionalFields: [String!]
  ) {
    queryUser(
      userName: $userName
      name: $name
      gender: $gender
      ageRange: $ageRange
      minSignUpDate: $minSignUpDate
      maxSignUpDate: $maxSignUpDate
      limit: $limit
      currentPageIndex: $currentPageIndex
      filter: $filter
      onlyMyPatient: $onlyMyPatient
      additionalFields: $additionalFields
    ) {
      total
      users {
        id
        name
        userName
        gender
        education
        jobStatus
        age
        marriageStatus
        signUpDate
        doctorName
        doctorUserName
        doctorId
        finishedForms {
          name
          id
          displayedFillInDate
          userAnswerId
          result
          doctorUserName
          doctorName
          doctorId
          key
        }
        diagnosis
      }
    }
  }
`;
