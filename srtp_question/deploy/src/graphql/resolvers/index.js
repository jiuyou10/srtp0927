"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const QuestionnaireContent_1 = require("./QuestionnaireContent");
const QuestionnaireList_1 = require("./QuestionnaireList");
const User_1 = require("./User");
const UserAnswer_1 = require("./UserAnswer");
const Viewer_1 = require("./Viewer");
const Report_1 = require("./Report");
const QueryUser_1 = require("./QueryUser");
const Doctor_1 = require("./Doctor");
const Patient_1 = require("./Patient");
const DoctorList_1 = require("./DoctorList");
const Diagnosis_1 = require("./Diagnosis");
const DoctorConfig_1 = require("./DoctorConfig");
const Date_1 = require("./Date");
exports.resolvers = lodash_merge_1.default(User_1.userResolvers, Viewer_1.viewerResolvers, QuestionnaireList_1.questionnaireListResolvers, QuestionnaireContent_1.questionnaireContentResolvers, UserAnswer_1.userAnswerResolvers, Report_1.reportResolvers, QueryUser_1.queryUserResolvers, Doctor_1.doctorResolvers, Patient_1.patientResolvers, DoctorList_1.doctorListResolvers, Diagnosis_1.addDiagnosisResolvers, DoctorConfig_1.doctorConfigResolvers, Date_1.dateResolver);
