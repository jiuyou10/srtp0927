/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_logOut_UserViewer {
  __typename: "UserViewer";
  id: string | null;
  token: string | null;
  didRequest: boolean;
  catelogy: string | null;
}

export interface Logout_logOut_AdminViewer {
  __typename: "AdminViewer";
  id: string | null;
  token: string | null;
  didRequest: boolean;
  catelogy: string | null;
}

export type Logout_logOut = Logout_logOut_UserViewer | Logout_logOut_AdminViewer;

export interface Logout {
  logOut: Logout_logOut;
}
