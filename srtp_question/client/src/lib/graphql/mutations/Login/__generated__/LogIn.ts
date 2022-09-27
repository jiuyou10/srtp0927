/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_logIn_UserViewer {
  __typename: "UserViewer";
  token: string | null;
  name: string | null;
  userName: string | null;
  gender: string | null;
  education: string | null;
  jobStatus: string | null;
  age: number | null;
  marriageStatus: string | null;
  didRequest: boolean;
  catelogy: string | null;
}

export interface LogIn_logIn_AdminViewer {
  __typename: "AdminViewer";
  name: string | null;
  userName: string | null;
  didRequest: boolean;
  token: string | null;
  catelogy: string | null;
}

export type LogIn_logIn = LogIn_logIn_UserViewer | LogIn_logIn_AdminViewer;

export interface LogIn {
  logIn: LogIn_logIn;
}

export interface LogInVariables {
  input?: LogInInput | null;
}
