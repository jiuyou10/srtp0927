"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
  scalar Date

  type User {
    id: ID!
    name: String
    gender: String
    age: String
    education: String
    jobStatus: String
    marriageStatus: String
    catelogy: String!
    userName: String
    signUpDate: String
    finishedForms: [Questionnaire!]
    doctorId: String
    doctorName: String
    doctorUserName: String
    diagnosis: String
  }

  type Admin {
    id: ID!
    name: String!
    userName: String!
    catelogy: String!
  }

  union UserOrAdmin = User | Admin

  input AgeRange {
    min: Int
    max: Int
  }

  input SignUpDate {
    year: Int!
    month: Int!
    day: Int!
  }

  type UserList {
    users: [User!]!
    total: Int!
  }

  enum UsersFilter {
    DATE_LATEST
    DATE_OLDEST
  }

  type AdminList {
    admins: [Admin!]!
    total: Int!
  }

  type OperationResult {
    result: Boolean!
  }

  type DoctorConfigItem {
    selected: Boolean!
    formIds: [String!]!
    configName: String!
    id: String!
  }

  type DoctorConfigList {
    configs: [DoctorConfigItem!]!
  }

  type Query {
    user(id: ID!): UserOrAdmin!
    queryUser(
      userName: String
      name: String
      gender: String
      ageRange: AgeRange
      minSignUpDate: SignUpDate
      maxSignUpDate: SignUpDate
      limit: Int!
      currentPageIndex: Int!
      filter: UsersFilter
      onlyMyPatient: Boolean
      additionalFields: [String!]
    ): UserList!
    questionnaireList(isReport: Boolean!, showAll: Boolean): [Questionnaire!]!
    questionnaire(id: String!): QuestionnaireContent!
    userAnswer(questionnaireId: String!): UserAnswer
    partialAnswer(questionnaireId: String!): UserAnswer
    report(userAnswerIds: [String!]!, pageSize: String): Report
    reportForAdmin(userId: String, userAnswerIds: [String!]!, pageSize: String): Report
    doctorList(limit: Int!, currentPageIndex: Int!): AdminList!
    checkIfDoctorUserNameUnique(userName: String!): OperationResult!
    checkIfDoctorConfigNameUnique(doctorConfigName: String!): OperationResult!
    doctorConfigList: DoctorConfigList!
  }

  type Report {
    pdf: String!
  }

  type UserAnswer {
    answers: [Int!]
    date: Date
  }

  type Questionnaire {
    id: ID!
    name: String!
    key: String!
    description: String
    done: Boolean!
    displayedFillInDate: String
    userAnswerId: String
    result: String
    doctorId: ID
    doctorUserName: String
    doctorName: String
  }

  type Question {
    position: Int
    content: String
    choices: [String!]!
    parent: String
  }

  type QuestionnaireContent {
    questionnaireId: ID!
    name: String!
    description: String
    instruction: String
    questions: [Question!]!
    key: String!
  }

  type UserViewer {
    id: ID
    token: String
    name: String
    gender: String
    age: Int
    education: String
    jobStatus: String
    marriageStatus: String
    didRequest: Boolean!
    userName: String
    catelogy: String
  }

  type AdminViewer {
    id: ID
    token: String
    userName: String
    didRequest: Boolean!
    name: String
    catelogy: String
  }

  union Viewer = UserViewer | AdminViewer

  type Doctor {
    userName: String
    name: String
    didRequest: Boolean!
  }

  input DoctorLoginInput {
    userName: String!
    password: String!
  }

  input UserLoginInput {
    userName: String!
    name: String!
    education: String
    jobStatus: String
    gender: String
    marriageStatus: String
    age: Int
  }

  input LogInInput {
    userName: String!
    password: String!
  }

  input CreateAccountInput {
    userName: String!
    password: String!
    name: String!
    education: String!
    jobStatus: String!
    gender: String!
    marriageStatus: String!
    age: Int
  }

  input UserAnswerInput {
    questionnaireId: String!
    answers: [Float!]!
  }

  type Result {
    didRequest: Boolean!
  }

  input AddDoctorInput {
    userName: String!
    name: String!
    password: String!
  }

  input AddDiagnosisInput {
    patientId: String!
    diagnosis: String!
  }

  input DoctorConfigInput {
    selected: Boolean!
    formIds: [String!]!
    configName: String!
  }

  input SelectConfigInput {
    configId: String
  }

  input DeleteConfigInput {
    configId: String!
  }

  type Mutation {
    doctorLogIn(input: DoctorLoginInput): Doctor!
    doctorLogOut: Doctor!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    patientLogIn(input: UserLoginInput): UserViewer!
    patientLogOut: UserViewer!
    createAccount(input: CreateAccountInput): UserViewer!
    saveUserAnswer(input: UserAnswerInput): Result!
    savePartialAnswer(input: UserAnswerInput): Result!
    addDoctor(input: AddDoctorInput): OperationResult!
    addDiagnosis(input: AddDiagnosisInput): OperationResult!
    addDoctorConfig(input: DoctorConfigInput): OperationResult!
    selectConfig(input: SelectConfigInput): OperationResult!
    deleteConfig(input: DeleteConfigInput): OperationResult!
  }
`;
