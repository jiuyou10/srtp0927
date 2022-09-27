import { gql } from "@apollo/client";

export const DOCTOR_CONFIG_LIST = gql`
  query DoctorConfigList {
    doctorConfigList {
      configs {
        selected
        formIds
        configName
        id
      }
    }
  }
`;
