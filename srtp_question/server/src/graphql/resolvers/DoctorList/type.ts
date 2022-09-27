export interface DoctorListArgs {
  limit: number;
  currentPageIndex: number;
}

export interface DoctorList {
  total: number;
  admins: {
    userName: string;
    name: string;
  }[];
}

export interface AddDoctorInput {
  input: {
    userName: string;
    name: string;
    password: string;
  };
}

export interface OperationResult {
  result: boolean;
}
