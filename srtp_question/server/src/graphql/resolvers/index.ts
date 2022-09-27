import merge from "lodash.merge";
import { questionnaireContentResolvers } from "./QuestionnaireContent";
import { questionnaireListResolvers } from "./QuestionnaireList";
import { userResolvers } from "./User";
import { userAnswerResolvers } from "./UserAnswer";
import { viewerResolvers } from "./Viewer";
import { reportResolvers } from "./Report";
import { queryUserResolvers } from "./QueryUser";
import { doctorResolvers } from "./Doctor";
import { patientResolvers } from "./Patient";
import { doctorListResolvers } from "./DoctorList";
import { addDiagnosisResolvers } from "./Diagnosis";
import { doctorConfigResolvers } from "./DoctorConfig";
import { dateResolver } from "./Date";

export const resolvers = merge(
  userResolvers,
  viewerResolvers,
  questionnaireListResolvers,
  questionnaireContentResolvers,
  userAnswerResolvers,
  reportResolvers,
  queryUserResolvers,
  doctorResolvers,
  patientResolvers,
  doctorListResolvers,
  addDiagnosisResolvers,
  doctorConfigResolvers,
  dateResolver
);
