export interface LogInArgs {
  input: { userName: string; password: string } | null;
}

export interface CreateAccountArgs {
  input: {
    userName: string;
    password: string;
    name: string;
    education: string;
    jobStatus: string;
    gender: string;
    marriageStatus: string;
    age: number;
  };
}
