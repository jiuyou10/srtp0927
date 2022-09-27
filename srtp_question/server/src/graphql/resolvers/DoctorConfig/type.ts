import { ObjectId } from "bson";

export interface AddDoctorConfigInput {
  input: {
    selected: boolean;
    formIds: string[];
    configName: string;
  };
}

export interface SelectConfigInput {
  input: {
    configId?: string;
  };
}

export interface DeleteConfigInput {
  input: {
    configId: string;
  };
}

export interface CheckIfDoctorConfigNameUniqueArgs {
  doctorConfigName: string;
}

export interface DoctorConfigList {
  configs: {
    selected: boolean;
    formIds: string[];
    configName: string;
    _id: ObjectId;
  }[];
}
