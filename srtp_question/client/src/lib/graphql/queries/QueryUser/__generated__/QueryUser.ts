/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AgeRange, SignUpDate, UsersFilter } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryUser
// ====================================================

export interface QueryUser_queryUser_users_finishedForms {
  __typename: "Questionnaire";
  name: string;
  id: string;
  displayedFillInDate: string | null;
  userAnswerId: string | null;
  result: string | null;
  doctorUserName: string | null;
  doctorName: string | null;
  doctorId: string | null;
  key: string;
}

export interface QueryUser_queryUser_users {
  __typename: "User";
  id: string;
  name: string | null;
  userName: string | null;
  gender: string | null;
  education: string | null;
  jobStatus: string | null;
  age: string | null;
  marriageStatus: string | null;
  signUpDate: string | null;
  doctorName: string | null;
  doctorUserName: string | null;
  doctorId: string | null;
  finishedForms: QueryUser_queryUser_users_finishedForms[] | null;
  diagnosis: string | null;
}

export interface QueryUser_queryUser {
  __typename: "UserList";
  total: number;
  users: QueryUser_queryUser_users[];
}

export interface QueryUser {
  queryUser: QueryUser_queryUser;
}

export interface QueryUserVariables {
  userName?: string | null;
  name?: string | null;
  gender?: string | null;
  ageRange?: AgeRange | null;
  minSignUpDate?: SignUpDate | null;
  maxSignUpDate?: SignUpDate | null;
  limit: number;
  currentPageIndex: number;
  filter?: UsersFilter | null;
  onlyMyPatient?: boolean | null;
  additionalFields?: string[] | null;
}
