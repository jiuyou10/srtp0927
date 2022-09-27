/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DoctorConfigList
// ====================================================

export interface DoctorConfigList_doctorConfigList_configs {
  __typename: "DoctorConfigItem";
  selected: boolean;
  formIds: string[];
  configName: string;
  id: string;
}

export interface DoctorConfigList_doctorConfigList {
  __typename: "DoctorConfigList";
  configs: DoctorConfigList_doctorConfigList_configs[];
}

export interface DoctorConfigList {
  doctorConfigList: DoctorConfigList_doctorConfigList;
}
