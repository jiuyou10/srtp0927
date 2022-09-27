/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DoctorList
// ====================================================

export interface DoctorList_doctorList_admins {
  __typename: "Admin";
  name: string;
  userName: string;
}

export interface DoctorList_doctorList {
  __typename: "AdminList";
  total: number;
  admins: DoctorList_doctorList_admins[];
}

export interface DoctorList {
  doctorList: DoctorList_doctorList;
}

export interface DoctorListVariables {
  limit: number;
  currentPageIndex: number;
}
