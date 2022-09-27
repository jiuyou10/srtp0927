import { DisplayedUser } from "../../../lib/type";

export interface SignUpDate {
  year: number;
  month: number;
  day: number;
}

export enum UsersFilter {
  DATE_LATEST = "DATE_LATEST",
  DATE_OLDEST = "DATE_OLDEST",
}

export interface QueryUserResolversArgs {
  userName?: string;
  name?: string;
  gender?: string;
  ageRange?: {
    max: number;
    min: number;
  };
  minSignUpDate?: SignUpDate;
  maxSignUpDate?: SignUpDate;
  limit: number;
  currentPageIndex: number;
  filter?: UsersFilter;
  onlyMyPatient?: boolean;
  additionalFields?: string[];
}

export interface UserList {
  total: number;
  users: DisplayedUser[];
}
