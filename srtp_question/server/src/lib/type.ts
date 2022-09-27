import { Collection, ObjectId } from "mongodb";
import { DisplayedQuestionnaire } from "../graphql/resolvers/QuestionnaireList/type";

export interface User {
  userName: string;
  password: string;
  name?: string;
  gender?: string;
  age?: number;
  education?: string;
  jobStatus?: string;
  marriageStatus?: string;
  token?: string;
  catelogy: "User";
  doctor: ObjectId;
  gad7Total?: number;
  phq9Total?: number;
  scl90Total?: number;
  scl90GeneralSymptomaticIndex?: number;
  scl90NumberOfItemsGreaterThanOrEqualToTwo?: number;
  scl90NumberOfItemsLessThanTwo?: number;
  scl90PositiveSymptomDistressLevel?: number;
  scl90PositiveSymptomAverage?: number;
  scl90F1?: number;
  scl90F2?: number;
  scl90F3?: number;
  scl90F4?: number;
  scl90F5?: number;
  scl90F6?: number;
  scl90F7?: number;
  scl90F8?: number;
  scl90F9?: number;
  scl90F10?: number;
  epq88ETScore?: number;
  epq88NTScore?: number;
  epq88PTScore?: number;
  epq88LTScore?: number;
  epq88ChildrenETScore?: number;
  epq88ChildrenNTScore?: number;
  epq88ChildrenPTScore?: number;
  epq88LChildrenTScore?: number;
  diagnosis?: string;
  yaleBrownMind?: number;
  yaleBrownBehavior?: number;
  yaleBrownTotal?: number;
  hcl32Total?: number;
  epdsTotal?: number;
  psssP?: number;
  psssS?: number;
  psssTotal?: number;
  mdqTotal?: number;
  isMdqTwoSituationsHappenAtSameTime?: boolean;
  mdqInfluence?: number;
  psqiA?: number;
  psqiB?: number;
  psqiC?: number;
  psqiD?: number;
  psqiE?: number;
  psqiF?: number;
  psqiG?: number;
  psqiTotal?: number;
  phcssTotal?: number;
  phcss1?: number;
  phcss2?: number;
  phcss3?: number;
  phcss4?: number;
  phcss5?: number;
  phcss6?: number;
  embuIsFatherAnswerCompleted?: boolean;
  embuIsMotherAnswerCompleted?: boolean;
  embuFatherComponents?: number[];
  embuMotherComponents?: number[];
}

export interface UserWithDate extends User {
  signUpDate: Date;
}

export interface DisplayedUser extends User {
  signUpDate: string;
  finishedForms: DisplayedQuestionnaire[];
  doctorName?: string;
  doctorId?: ObjectId;
  doctorUserName?: string;
}

export interface Admin {
  userName: string;
  password: string;
  name: string;
  catelogy: "Admin";
  token?: string;
  signUpDate: Date;
}

export interface AdminWithId extends Admin {
  _id: ObjectId;
}

export interface UserWithId extends UserWithDate {
  _id: ObjectId;
}

export interface Database {
  users: Collection<UserWithId>;
  admins: Collection<AdminWithId>;
  questionnaires: Collection<Questionnaire>;
  questionnaireContents: Collection<QuestionnaireContent>;
  userAnswers: Collection<UserAnswer>;
  partialAnswers: Collection<UserAnswer>;
  doctorConfigs: Collection<DoctorConfig>;
}

export interface UserViewer {
  _id?: string;
  token?: string;
  didRequest: boolean;
  name?: string;
  gender?: string;
  age?: number;
  education?: string;
  jobStatus?: string;
  marriageStatus?: string;
  userName?: string;
  catelogy: string;
}

export interface AdminViewer {
  _id?: string;
  token?: string;
  didRequest: boolean;
  name?: string;
  userName?: string;
  catelogy?: string;
}

export type Viewer = AdminViewer | UserViewer;

// Doctor type return to frontend.
export type DoctorReturned = {
  userName?: string;
  name?: string;
  didRequest: boolean;
};

export interface Questionnaire {
  name: string;
  description?: string;
  _id: ObjectId;
  done?: boolean;
  fillInDate?: Date;
  order: number;
  disabled?: boolean;
  key: string;
}

export interface Question {
  position: number;
  content: string;
  parent?: string;
  choices: string[];
}

export interface QuestionnaireContent {
  questionnaireId: ObjectId;
  instruction: string;
  questions: Question[];
  name: string;
  description?: string;
  key: string;
}

export interface UserAnswer {
  questionnaireId: ObjectId;
  userId: ObjectId;
  answers: number[];
  _id: ObjectId;
  fillInDate: Date;
  result: string | number;
  doctor: ObjectId;
}

export interface DoctorConfig {
  doctorId: ObjectId;
  _id: ObjectId;
  selected: boolean;
  formIds: ObjectId[];
  configName: string;
  addDate: Date;
}
