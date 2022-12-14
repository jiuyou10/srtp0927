/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAccountInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAccount
// ====================================================

export interface CreateAccount_createAccount {
  __typename: "UserViewer";
  token: string | null;
  name: string | null;
  userName: string | null;
  gender: string | null;
  education: string | null;
  jobStatus: string | null;
  marriageStatus: string | null;
  didRequest: boolean;
  age: number | null;
  catelogy: string | null;
}

export interface CreateAccount {
  createAccount: CreateAccount_createAccount;
}

export interface CreateAccountVariables {
  input?: CreateAccountInput | null;
}
